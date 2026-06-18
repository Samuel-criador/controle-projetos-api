# Sistema de Controle de Projetos API

<p align="left">
  <img src="https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java 17" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.2.4-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot 3.2.4" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white" alt="Maven" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</p>

## 🚀 Sobre o Projeto
O **Sistema de Controle de Projetos** é uma API REST robusta desenvolvida para centralizar e organizar fluxos de trabalho corporativos ou acadêmicos. A plataforma permite o gerenciamento completo de projetos, vinculando-os a colaboradores responsáveis e permitindo a distribuição e o acompanhamento de tarefas específicas com diferentes níveis de prioridade.

A aplicação foi construída seguindo as melhores práticas de desenvolvimento de software, incluindo padrões de projeto como **DTO (Data Transfer Object)**, tratamento global de exceções, validação de dados com Bean Validation e arquitetura em camadas (Controller, Service, Repository, Model).

## 🛠️ Tecnologias Utilizadas
* **Linguagem Principal:** Java 17 (JDK 17)
* **Framework:** Spring Boot 3.2.4
* **Acesso a Banco de Dados:** Spring Data JPA / Hibernate
* **Banco de Dados Relacional:** MySQL
* **Documentação e Testes de Endpoint:** OpenAPI 3 / Swagger UI
* **Gerenciador de Dependências:** Apache Maven
* **Produtividade:** Project Lombok

## ⚙️ Principais Funcionalidades
* **Gestão de Responsáveis:** Cadastro, consulta, atualização e remoção de membros da equipe com validação de e-mail único.
* **Controle de Projetos:** Criação e monitoramento de projetos atrelados a um responsável, contendo data de início e status do ciclo de vida.
* **Gerenciamento de Tarefas:** Distribuição de demandas vinculadas a projetos específicos, categorizadas por prioridade (Alta, Média, Baixa) e status (Pendente, Em Andamento, Concluído).
* **Tratamento de Erros:** Respostas HTTP padronizadas e amigáveis utilizando `@ControllerAdvice` para capturar falhas de validação ou recursos não encontrados.

## 📂 Estrutura do Pacote Principal
```text
src/main/java/com/projeto/controleprojetos/
├── config/        # Configurações do Swagger/OpenAPI
├── controller/    # Classes Controladoras (Endpoints REST)
├── dto/           # Objetos de Transferência de Dados (Request/Response)
├── exception/     # Manipulador Global de Erros e Exceções Customizadas
├── model/         # Entidades de Domínio (Mapeamento JPA)
├── repository/    # Interfaces de Acesso ao Banco de Dados (JPA Repository)
└── service/       # Camada de Regras de Negócio da Aplicação
