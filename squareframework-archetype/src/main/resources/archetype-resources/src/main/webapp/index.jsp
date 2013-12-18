<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://squareframework.com" prefix="square" %>
<!--[if lt IE 9]> <html class="no-js lt-ie10 lt-ie9" lang="pt-br" spellcheck="false"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10" lang="pt-br" spellcheck="false"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="pt-br" spellcheck="false"> <!--<![endif]-->

	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<title></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		 
		<square:outputFavicon/>
		<square:outputStylesheet/>
	</head>
	
	
	
<body>
	<body>
		
		<div square-bootstrap="true"></div>		    	
		<div square-loading="true"></div>
		
		<div square-header="header"></div>
		<div square-subheader="subheader"></div>
		
		<div id="container">
			<div square-sidebar="menu"></div>		
			<div id="main" ng-view class="container-fluid"></div>
		</div>
	
		<square:outputScript/>
	</body>
	
</html>