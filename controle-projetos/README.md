# ====================================================
# SISTEMA DE CONTROLE DE PROJETOS
# Script SQL + JSONs de Teste + Passo a Passo
# ====================================================


## ── SCRIPT SQL ──────────────────────────────────────

```sql
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS controle_projetos
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE controle_projetos;

-- O Hibernate criará as tabelas automaticamente via ddl-auto=update
-- Para reset manual, execute:

-- DROP TABLE IF EXISTS tarefas;
-- DROP TABLE IF EXISTS projetos;
-- DROP TABLE IF EXISTS responsaveis;
```


## ── EXEMPLOS DE JSON PARA TESTES ───────────────────

### 1. Criar Responsável
**POST** `http://localhost:8080/api/responsaveis`

```json
{
  "nome": "Ana Paula Silva",
  "email": "ana.paula@empresa.com",
  "cargo": "Gerente de TI"
}
```

### 2. Criar Projeto (use o ID do responsável criado)
**POST** `http://localhost:8080/api/projetos`

```json
{
  "nome": "Sistema de E-commerce",
  "descricao": "Desenvolvimento da plataforma de vendas online",
  "dataInicio": "2025-01-15",
  "dataPrevisao": "2025-06-30",
  "status": "EM_ANDAMENTO",
  "responsavelId": 1
}
```

> **Status válidos para Projeto:** `PLANEJADO`, `EM_ANDAMENTO`, `CONCLUIDO`, `CANCELADO`

### 3. Criar Tarefa (use o ID do projeto criado)
**POST** `http://localhost:8080/api/tarefas`

```json
{
  "titulo": "Configurar banco de dados",
  "descricao": "Instalar e configurar o MySQL para o projeto",
  "prioridade": "ALTA",
  "status": "PENDENTE",
  "projetoId": 1
}
```

> **Prioridades válidas:** `BAIXA`, `MEDIA`, `ALTA`, `CRITICA`
>
> **Status válidos para Tarefa:** `PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA`, `CANCELADA`

### 4. Atualizar Responsável
**PUT** `http://localhost:8080/api/responsaveis/1`

```json
{
  "nome": "Ana Paula Costa",
  "email": "ana.costa@empresa.com",
  "cargo": "Diretora de TI"
}
```

### 5. Atualizar Projeto
**PUT** `http://localhost:8080/api/projetos/1`

```json
{
  "nome": "Sistema de E-commerce v2",
  "descricao": "Plataforma de vendas online com módulo mobile",
  "dataInicio": "2025-02-01",
  "dataPrevisao": "2025-08-15",
  "status": "EM_ANDAMENTO",
  "responsavelId": 1
}
```

### 6. Atualizar Tarefa
**PUT** `http://localhost:8080/api/tarefas/1`

```json
{
  "titulo": "Configurar banco de dados e migrations",
  "descricao": "Instalar MySQL e configurar Flyway para migrations",
  "prioridade": "ALTA",
  "status": "CONCLUIDA",
  "projetoId": 1
}
```


## ── PASSO A PASSO PARA EXECUTAR ─────────────────────

### Pré-requisitos
- Java 21 instalado
- MySQL rodando na porta 3306
- Maven instalado (ou usar o wrapper mvnw)
- IntelliJ IDEA ou VS Code com Extension Pack for Java

---

### Variáveis de Ambiente (opcional)
Configure as credenciais do banco sem alterar o código-fonte:

```bash
# Linux/Mac
export DB_USERNAME=root
export DB_PASSWORD=sua_senha

# Windows (PowerShell)
$env:DB_USERNAME="root"
$env:DB_PASSWORD="sua_senha"
```

> Se não configurar, os valores padrão são: `root` / `senha`

---

### No IntelliJ IDEA

1. Abra o IntelliJ → **File > Open** → selecione a pasta `controle-projetos`
2. Aguarde o Maven baixar as dependências (barra de progresso no rodapé)
3. Configure o MySQL:
   - Crie o banco: `CREATE DATABASE controle_projetos;`
   - Ajuste usuário/senha em `src/main/resources/application.properties` ou use variáveis de ambiente
4. Localize `ControleProjetosApplication.java`
5. Clique no botão ▶ verde ao lado da classe `main`
6. Acesse: `http://localhost:8080/swagger-ui/index.html`

---

### No VS Code

1. Instale o **Extension Pack for Java** (Microsoft)
2. Abra a pasta: **File > Open Folder** → `controle-projetos`
3. Aguarde a indexação do projeto
4. Configure o MySQL em `application.properties` ou use variáveis de ambiente
5. Abra `ControleProjetosApplication.java`
6. Clique em **Run** acima do método `main`
7. Acesse: `http://localhost:8080/swagger-ui/index.html`

---

### Via Terminal (qualquer SO)

```bash
# Na raiz do projeto
./mvnw spring-boot:run

# Ou no Windows
mvnw.cmd spring-boot:run
```

---

### Endpoints disponíveis

| Método | URL                        | Descrição                   |
|--------|----------------------------|-----------------------------|
| GET    | /api/responsaveis          | Listar responsáveis         |
| POST   | /api/responsaveis          | Criar responsável           |
| GET    | /api/responsaveis/{id}     | Buscar responsável por ID   |
| PUT    | /api/responsaveis/{id}     | Atualizar responsável       |
| DELETE | /api/responsaveis/{id}     | Deletar responsável         |
| GET    | /api/projetos              | Listar projetos             |
| POST   | /api/projetos              | Criar projeto               |
| GET    | /api/projetos/{id}         | Buscar projeto por ID       |
| PUT    | /api/projetos/{id}         | Atualizar projeto           |
| DELETE | /api/projetos/{id}         | Deletar projeto             |
| GET    | /api/tarefas               | Listar tarefas              |
| POST   | /api/tarefas               | Criar tarefa                |
| GET    | /api/tarefas/{id}          | Buscar tarefa por ID        |
| PUT    | /api/tarefas/{id}          | Atualizar tarefa            |
| DELETE | /api/tarefas/{id}          | Deletar tarefa              |

### Swagger UI
- http://localhost:8080/swagger-ui/index.html
- http://localhost:8080/swagger-ui.html

### Valores aceitos nos Enums

| Campo              | Valores aceitos                                    |
|--------------------|----------------------------------------------------|
| Projeto → status   | `PLANEJADO`, `EM_ANDAMENTO`, `CONCLUIDO`, `CANCELADO` |
| Tarefa → status    | `PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA`, `CANCELADA`  |
| Tarefa → prioridade| `BAIXA`, `MEDIA`, `ALTA`, `CRITICA`                   |

### Ordem recomendada para testes
1. Criar um **Responsável**
2. Criar um **Projeto** (informando o `responsavelId`)
3. Criar **Tarefas** (informando o `projetoId`)
