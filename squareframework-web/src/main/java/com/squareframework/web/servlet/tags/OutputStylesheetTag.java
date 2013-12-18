package com.squareframework.web.servlet.tags;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.squareframework.web.WebContext;
import com.squareframework.web.config.WebConfig.Mode;

public class OutputStylesheetTag extends SimpleTagSupport {


	@Override
	public void doTag() throws JspException, IOException {
		final PageContext context = (PageContext) this.getJspContext();
		final JspWriter out = context.getOut();
		
		final WebContext webContext = WebContext.getCurrentInstance();
		
		if(webContext.getWebConfig().getMode() == Mode.PRODUCTION){	
			out.print("<link href='");
			out.print(context.getServletContext().getContextPath());
			out.print("/");
			out.print(webContext.getWebConfig().getResourceUriPrefix());
			out.print("/");
			out.print(webContext.getWebConfig().getProjectVersion());
			
			out.print("/css/all.css' rel='stylesheet' type='text/css'/>");
			
		}else{
			out.print("<link href='");
			out.print(context.getServletContext().getContextPath());
			out.print("/");
			out.print(webContext.getWebConfig().getResourceUriPrefix());			
			out.print("/css/app.less' rel='stylesheet/less' type='text/css'/>");
			
			out.print("<script src='");
			out.print(context.getServletContext().getContextPath());
			out.print("/");
			out.print(webContext.getWebConfig().getResourceUriPrefix());	
			out.print("/spa/vendor/lessjs/less.js' type='text/javascript'></script>");
		}
		
	}
	
}