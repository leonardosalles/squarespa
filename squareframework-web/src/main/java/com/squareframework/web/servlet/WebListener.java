package com.squareframework.web.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.squareframework.web.WebContext;
import com.squareframework.web.config.SSOConfig;
import com.squareframework.web.config.UserConfig;
import com.squareframework.web.config.WebConfig;

public class WebListener implements ServletContextListener, ServletRequestListener {

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		final ServletContext context = sce.getServletContext();

		final SSOConfig ssoConfig = new SSOConfig();
		ssoConfig.setHeaderParam(StringUtils.defaultIfBlank(context.getInitParameter("squareframework.sso_header_param"), "oam_remote_user"));
		ssoConfig.setMode(SSOConfig.Mode.modeOf(context.getInitParameter("squareframework.sso_mode")));
		ssoConfig.setLogoutUrl(context.getInitParameter("squareframework.sso_logout_url"));
		
		
		final WebConfig webConfig = new WebConfig();
		webConfig.setMode(WebConfig.Mode.modeOf(context.getInitParameter("squareframework.mode")));
		webConfig.setProjectVersion(context.getInitParameter("squareframework.project_version"));
		webConfig.setRestfulUriPrefix(StringUtils.defaultIfBlank(context.getInitParameter("squareframework.restful_uri_prefix"), "rest"));
		webConfig.setResourceUriPrefix("static");
		webConfig.setWebsocketUriPrefix(StringUtils.defaultIfBlank(context.getInitParameter("squareframework.websocket_uri_prefix"), "websocket"));

		context.setAttribute(SSOConfig.class.getName(), ssoConfig);
		context.setAttribute(WebConfig.class.getName(), webConfig);
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		final ServletContext servletContext = sce.getServletContext();
		servletContext.removeAttribute(SSOConfig.class.getName());
		servletContext.removeAttribute(WebConfig.class.getName());
	}
	
	
	@Override
	public void requestInitialized(ServletRequestEvent sre) {
		final ServletContext context = sre.getServletContext();
		final HttpServletRequest httpRequest = (HttpServletRequest) sre.getServletRequest();
		final SSOConfig ssoConfig = (SSOConfig) context.getAttribute(SSOConfig.class.getName());
		
		final WebContext webContext = new WebContext(context, httpRequest);
		WebContext.setCurrentInstance(webContext);
		
		if(ssoConfig.getMode() != SSOConfig.Mode.NONE && StringUtils.isNotBlank(httpRequest.getHeader(ssoConfig.getHeaderParam()))){
			final UserConfig userConfig = new UserConfig();
			userConfig.setUsername(httpRequest.getHeader(ssoConfig.getHeaderParam()));
			webContext.setUserConfig(userConfig);
		}
	}
	
	
	@Override
	public void requestDestroyed(ServletRequestEvent sre) {
		WebContext.setCurrentInstance(null);
	}

}