package com.squareframework.web.servlet.tags;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.squareframework.web.WebContext;
import com.squareframework.web.config.WebConfig.Mode;

public class OutputScriptTag extends SimpleTagSupport {

	@Override
	public void doTag() throws JspException, IOException {
		final PageContext pageContext = (PageContext) this.getJspContext();

		final WebContext webContext = WebContext.getCurrentInstance(); 

		final JspWriter out = pageContext.getOut();

		out.print("<script type='text/javascript'>");
		out.print("var SQUARE_CONFIG = {};");
		
		/* WEB CONFIG */
		out.print("SQUARE_CONFIG['mode'] = '" + webContext.getWebConfig().getMode() + "';");
		
		out.print("SQUARE_CONFIG['projectVersion'] = '");
		out.print((webContext.getWebConfig().getMode() == Mode.PRODUCTION ? webContext.getWebConfig().getProjectVersion() : "") + "';");		
		
		out.print("SQUARE_CONFIG['restfulUriPrefix'] = '" + webContext.getWebConfig().getRestfulUriPrefix() + "';");
		out.print("SQUARE_CONFIG['websocketUriPrefix'] = '" + webContext.getWebConfig().getWebsocketUriPrefix() + "';");		
		out.print("SQUARE_CONFIG['resourceUriPrefix'] = '" + webContext.getWebConfig().getResourceUriPrefix());
		out.print((webContext.getWebConfig().getMode() == Mode.PRODUCTION ? "/" + webContext.getWebConfig().getProjectVersion() : "") + "';");		

		
		/* SSO CONFIG */
		out.print("SQUARE_CONFIG['SSOMode'] = '" + webContext.getSSOConfig().getMode() + "';");
		out.print("SQUARE_CONFIG['SSOLogoutUrl'] = '" + webContext.getSSOConfig().getLogoutUrl() + "';");
		out.print("SQUARE_CONFIG['SSOExternalSecurityProvider'] = " + "true".equalsIgnoreCase(webContext.getContext().getInitParameter("external_security_provider")) + ";");

		/* USER CONFIG */
		if(webContext.getUserConfig() != null){
			out.print("SQUARE_CONFIG['appUsername'] = '" + webContext.getUserConfig().getUsername() + "';");
		}
		
		
		out.print("</script>");


		if(webContext.getWebConfig().getMode() == Mode.PRODUCTION){
			out.print("<script type='text/javascript' src='");
			out.print(pageContext.getServletContext().getContextPath());
			out.print("/");
			out.print(webContext.getWebConfig().getResourceUriPrefix());	
			out.print("/");
			out.print(webContext.getWebConfig().getProjectVersion());
			
			out.print("/all.js' async></script>");

		}else{
			out.print("<script type='text/javascript' data-main='");
			out.print(pageContext.getServletContext().getContextPath());
			out.print("/");
			out.print(webContext.getWebConfig().getResourceUriPrefix());
			out.print("/square/js/main' src='");
			out.print(pageContext.getServletContext().getContextPath());
			out.print("/");
			out.print(webContext.getWebConfig().getResourceUriPrefix());
			out.print("/square/vendor/requirejs/require.js' async></script>");
		}
		super.doTag();
	}	
}