package cdb.swagger.gen_swagger.config;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import cdb.swagger.gen_swagger.GenSwaggerApplication;


/**
 * This class
 *
 * @author davidbarrineau - david.barrineau@phxlogistics.com
 * @since Feb 4, 2026 9:47:38 AM
 */
@Configuration
public class WebConfig extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(GenSwaggerApplication.class);
    }

    /**
     * Enable CORS
     *
     * @return
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            /**
             * Setup CORS
             */
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedHeaders("X-Requested-With", "Content-Type", "Origin", "Accept", "Access-Control-Allow-Origin").allowedMethods("PUT", "DELETE", "POST", "GET", "OPTIONS", "PATCH").maxAge(3600);
            }
        };
    }

}