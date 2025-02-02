# 🚀 Gerenciador de Projetos [![Java](https://img.shields.io/badge/Java-21-red.svg)](https://www.java.com/) [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-blue.svg)](https://spring.io/projects/spring-boot)

Uma aplicação completa para gestão de projetos e tarefas, desenvolvida com as melhores práticas de desenvolvimento backend.

## 🌟 Recursos Destacados
- ✅ CRUD completo para projetos e tarefas
- ✅ API RESTful documentada
- ✅ Interface web intuitiva
- ✅ Integração com banco de dados MySQL
- ✅ Configuração simplificada com Spring Boot

---

## 🛠️ Tecnologias

<div align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" height="30">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" height="30">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" height="30">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" height="30">
  <img src="https://img.shields.io/badge/Lombok-0A2463?style=for-the-badge&logo=lombok&logoColor=white" height="30">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" height="30">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="30">
</div>

---

## ⚡ Instalação Rápida

### Pré-requisitos
- Java 21+
- MySQL 8+
- Maven 3.9+

```bash
# 1. Clonar repositório
git clone https://github.com/Kendy619/Gerenciador-de-projetos.git
cd Gerenciador-de-projetos

# 2. Configurar banco de dados
mysql -u root -p -e "CREATE DATABASE gerenciamento_projetos;"

# 3. Iniciar aplicação
mvn spring-boot:run
```


🔍 Configuração Detalhada
🔑 Configuração do Banco de Dados
Edite src/main/resources/application.properties:

```bash
spring.datasource.url=jdbc:mysql://localhost:3306/gerenciamento_projetos
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

🌐 Endpoints da API
Projetos
|Método	|Endpoint	|Descrição |
| :---        |    :----:   |          ---: |
|POST	|/projetos	|Cria novo projeto|
|GET	|/projetos	|Lista todos projetos|
|GET	|/projetos/{id}	|Obtém projeto por ID|
|PUT	|/projetos/{id}	|Atualiza projeto|
|DELETE |/projetos/{id} |Remove projeto|


Tarefas
|Método|	Endpoint|	Descrição
| :---        |    :----:   |          ---: |
|POST	|/tarefas	|Cria nova tarefa|
|GET	|/tarefas	|Lista todas tarefas|
|GET	|/tarefas/{id}	|Obtém tarefa por ID|
|PUT	|/tarefas/{id}	|Atualiza tarefa|
DELETE	|/tarefas/{id}|	Remove tarefa|



🖥️ Interface Web
Acesse a interface intuitiva em http://localhost:8080

✨ Funcionalidades:

🎯 Dashboard de projetos

📅 Gerenciamento de tarefas interativo

⚡ Atualizações em tempo real

🎨 Design responsivo


# Autor

Kendy Ferreira

[Linkedin](www.linkedin.com/in/kendy-ferreira-de-oliveira-1a51b1163)
