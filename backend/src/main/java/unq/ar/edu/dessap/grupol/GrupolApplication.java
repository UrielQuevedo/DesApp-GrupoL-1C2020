package unq.ar.edu.dessap.grupol;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class GrupolApplication implements WebMvcConfigurer {

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE")
//                .allowedOrigins("*")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }

    public static void main(String[] args) {
        SpringApplication.run(GrupolApplication.class, args);
    }

}
