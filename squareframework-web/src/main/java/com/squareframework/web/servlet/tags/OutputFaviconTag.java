package com.squareframework.web.servlet.tags;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import com.squareframework.web.WebContext;
import com.squareframework.web.config.WebConfig.Mode;

public class OutputFaviconTag extends SimpleTagSupport {

	private String href = "";
	
	
	@Override
	public void doTag() throws JspException, IOException {
		final PageContext context = (PageContext) this.getJspContext();
		final JspWriter out = context.getOut();

		final WebContext webContext = WebContext.getCurrentInstance();

		final String href = this.href != null && this.href.isEmpty() == false ? this.href : "/spa/img/favicon.ico"; 

		if(webContext.getWebConfig().getMode() == Mode.PRODUCTION){
			out.print("<link rel='shortcut icon' href='");
			out.print(context.getServletContext().getContextPath());
			out.print("/");
			out.print(webContext.getWebConfig().getResourceUriPrefix());
			out.print("/");
			out.print(webContext.getWebConfig().getProjectVersion());

			out.print(href);
			out.print("'></link>");

		}else{
			out.print("<link rel='shortcut icon' href='");
			out.print(context.getServletContext().getContextPath());
			out.print("/");
			out.print(webContext.getWebConfig().getResourceUriPrefix());

			out.print(href);
			out.print("'></link>");
		}

		super.doTag();
	}	
	
	
	public void setHref(String href) {
		this.href = href;
	}
	
	public String getHref() {
		return href;
	}
	
}