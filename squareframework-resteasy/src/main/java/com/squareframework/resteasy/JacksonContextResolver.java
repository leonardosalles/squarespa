package com.squareframework.resteasy;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.HashSet;

import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import org.jboss.resteasy.logging.Logger;
import org.scannotation.AnnotationDB;
import org.scannotation.WarUrlFinder;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.squareframework.resteasy.annotations.MixIn;

@Provider
public class JacksonContextResolver implements ContextResolver<ObjectMapper> {
 
	private static Logger logger = Logger.getLogger(JacksonContextResolver.class);
	
	protected ObjectMapper mapper;
    
    public JacksonContextResolver(@Context ServletContext servletContext) throws Exception {
        this.mapper = new ObjectMapper();
        this.mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        this.mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        this.mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"));

        final AnnotationDB db = new AnnotationDB();
        db.setScanClassAnnotations(true);
        db.setScanFieldAnnotations(false);
        db.setScanMethodAnnotations(false);
        db.setScanParameterAnnotations(false);
        
        final URL classes = WarUrlFinder.findWebInfClassesPath(servletContext);
        if(classes == null){
        	return;
        }
        
        db.addIgnoredPackages("org.atmosphere");
        db.scanArchives(classes);
        db.crossReferenceImplementedInterfaces();
        db.crossReferenceMetaAnnotations();
        
        
        for(String name : db.getAnnotationIndex().containsKey(MixIn.class.getName()) ? db.getAnnotationIndex().get(MixIn.class.getName()) : new HashSet<String>()){
        	MixIn mixIn = Class.forName(name).getAnnotation(MixIn.class);
        	logger.info("Adding scanned @MixIn: {0}", name);
        	
        	for(Class<?> target : mixIn.value()){
        		this.mapper.addMixInAnnotations(target, Class.forName(name));
        	}        	
        }     
        
    }

	@Override
	public ObjectMapper getContext(Class<?> arg0) {
		return this.mapper;
	}
    
    
}