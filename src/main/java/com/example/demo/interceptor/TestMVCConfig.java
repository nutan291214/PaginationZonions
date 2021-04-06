//package com.example.demo.interceptor;
//
//import java.lang.reflect.WildcardType;
//import java.util.Collections;
//
//import javax.annotation.Resource;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.context.request.async.DeferredResult;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
//
//import com.fasterxml.classmate.TypeResolver;
//
//import io.swagger.models.Contact;
//import springfox.documentation.builders.ApiInfoBuilder;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiInfo;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
//@Configuration
//@EnableSwagger2
//public class TestMVCConfig extends WebMvcConfigurationSupport {
//
//    @Resource
//    private TypeResolver typeResolver;
//
//
//    @Resource
//    private ZonionsInterceptor loginInterceptor;
//
//
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("swagger-ui.html")
//                .addResourceLocations("classpath:/META-INF/resources/");
//        registry.addResourceHandler("/webjars/**")
//                .addResourceLocations("classpath:/META-INF/resources/webjars/");
//    }
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(loginInterceptor)
//                                 // addPathPatterns is used to add interception rules. All paths are added to the interception, and then excluded one by one.
//                .addPathPatterns("/**")
//                .excludePathPatterns("/swagger-ui.html")
//                .excludePathPatterns("/swagger-resources/**")
//                .excludePathPatterns("/error")
//                .excludePathPatterns("/webjars/**");
//    }
//
//
//    @Bean
//    public Docket productApi() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.example.demo"))
//                .paths(PathSelectors.any())
//                .build()
//                .apiInfo(metaData())
//                                 .alternateTypeRules ( // custom rules, if you encounter a DeferredResult, convert the generic class to json
//                        newRule(typeResolver.resolve(DeferredResult.class,
//                                typeResolver.resolve(ResponseEntity.class, WildcardType.class)),
//                                typeResolver.resolve(WildcardType.class)))
//                ;
//    }
//
////    private ApiInfo metaData() {
////        return new ApiInfoBuilder()
////                                 .title("General Service APIs")
////                /*.description("\"REST API for Online Store\"")*/
////                .version("1.0.0")
////                /* .license("Apache License Version 2.0")
////                 .licenseUrl("https://www.apache.org/licenses/LICENSE-2.0\"")*/
////                                 .contact(new Contact("http://localhost:8080/zonions/restaurants", "zonions@food.com",
////                     	       "https://localhost:8080/zonions/restaurants") )
////                .build();
////    }
//    private ApiInfo metaData() {
//        return new ApiInfoBuilder()
//                                 .title("General Service APIs")
//                /*.description("\"REST API for Online Store\"")*/
//                .version("1.0.0")
//                /* .license("Apache License Version 2.0")
//                 .licenseUrl("https://www.apache.org/licenses/LICENSE-2.0\"")*/
//                                 .contact(new Contact(" ", "", "mail@mail"))
//                .build();
//    }
//}
//
