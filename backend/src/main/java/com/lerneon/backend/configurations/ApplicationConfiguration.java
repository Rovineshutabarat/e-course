package com.lerneon.backend.configurations;

import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.sql.DataSource;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.spi.JdbiPlugin;
import org.jdbi.v3.core.statement.SqlLogger;
import org.jdbi.v3.core.statement.StatementContext;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@AllArgsConstructor
@Slf4j
public class ApplicationConfiguration {
    private final UserRepository userRepository;;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(List.of(
                System.getenv().getOrDefault("CORS_ALLOWED_ORIGINS", "http://localhost:3000").split(",")));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    UserDetailsService userDetailsService() {
        return (email) -> userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("User was not found."));
    }

    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    Jdbi jdbi(DataSource dataSource, List<JdbiPlugin> jdbiPlugins, List<RowMapper<?>> rowMappers) {
        Jdbi jdbi = Jdbi.create(new TransactionAwareDataSourceProxy(dataSource));
        jdbi.setSqlLogger(new SqlLogger() {
            @Override
            public void logAfterExecution(StatementContext ctx) {
                log.info("SQL: {} ({} ms)", ctx.getRenderedSql(),
                        ctx.getElapsedTime(ChronoUnit.MILLIS));
            }
        });
        return jdbi;
    }

    @Bean
    RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
            MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter);
        rabbitTemplate.setReturnsCallback(returned -> {
            log.warn("Message returned: {} - reason: {}", returned.getMessage(), returned.getReplyText());
        });
        return rabbitTemplate;
    }
}
