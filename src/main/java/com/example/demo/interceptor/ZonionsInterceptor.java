package com.example.demo.interceptor;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.controller.RestaurantController;

@Component
public class ZonionsInterceptor implements HandlerInterceptor{
	
	private static Logger log = LoggerFactory.getLogger(ZonionsInterceptor.class);
	@Autowired
	RestaurantController restaurantController;
	@Override
	   public boolean preHandle(
	      HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		 Date creationTime = new Date(request.getSession().getCreationTime());
		    log.info(creationTime + " Inside - preHandle " + request.getMethod() + " "
		       + request.getRequestURI());
//		 System.out.println(creationTime + " Inside - preHandle " + request.getMethod() + " "
//		       + request.getRequestURI());
		
		    return true;
	   }
	   @Override
	   public void postHandle(
	      HttpServletRequest request, HttpServletResponse response, Object handler, 
	      ModelAndView modelAndView) throws Exception {
		   Date creationTime = new Date(request.getSession().getCreationTime());
		    log.info(creationTime + " Inside - postHandle" + " " + request);
		    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	   }
	   
	   @Override
	   public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
	      Object handler, Exception exception) throws Exception {
		   Date creationTime = new Date(request.getSession().getCreationTime());
		    log.info(creationTime + " Inside - afterCompletion" + " " + request);
		    HandlerInterceptor.super.afterCompletion(request, response, handler, exception);
	   }

}
