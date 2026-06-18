package com.sistema.controleprojetos.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Sistema de Controle de Projetos API",
                version = "1.0",
                description = "API REST para gerenciamento de Projetos, Tarefas e Responsáveis."
        )
)
public class OpenApiConfig {
}
