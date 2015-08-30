package com.hhl.inter;
import javax.servlet.*;
import java.io.IOException;

public class AuthInterceptor implements Filter{



	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	
	public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) throws IOException, ServletException {
		
		System.out.println("AuthInterceptor doFilter");
			chain.doFilter(request, response);
	}
	
	@Override
	public void destroy() {
	}
}