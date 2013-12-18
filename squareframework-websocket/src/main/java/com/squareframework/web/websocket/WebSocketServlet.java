package com.squareframework.web.websocket;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import org.atmosphere.container.Tomcat7BIOSupportWithWebSocket;
import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.cpr.AtmosphereFramework;
import org.atmosphere.cpr.AtmosphereServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WebSocketServlet extends AtmosphereServlet {

	private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketServlet.class);
	private static final long serialVersionUID = 1L;	
	@Override
	public void init(ServletConfig sc) throws ServletException {
		LOGGER.info("Starting WebSocket service...");
		framework().addInitParameter(ApplicationConfig.BROADCAST_FILTER_CLASSES, JsonBroadcasterFilter.class.getName());
		framework().addInitParameter(ApplicationConfig.WEBSOCKET_CONTENT_TYPE, "application/json");
		framework().addInitParameter(ApplicationConfig.PROPERTY_SESSION_SUPPORT, "true");
		framework().setAtmosphereDotXmlPath("/WEB-INF/classes" + AtmosphereFramework.DEFAULT_ATMOSPHERE_CONFIG_PATH);
		
		String serverInfo = sc.getServletContext().getServerInfo();
		if(serverInfo.startsWith("Apache Tomcat/7.")){
			framework().addInitParameter(ApplicationConfig.PROPERTY_COMET_SUPPORT, Tomcat7BIOSupportWithWebSocket.class.getName());
		}
		
		super.init(sc);
		LOGGER.info("WebSocket service successfully started");
	}
	
	@Override
	public void destroy() {
		super.destroy();
		LOGGER.info("WebSocket service stopped");
	}
	
}
