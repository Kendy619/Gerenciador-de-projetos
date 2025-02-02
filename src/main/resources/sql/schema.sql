USE sistema_projetos;


SHOW TABLES; 

SELECT * FROM projeto;
SELECT * FROM tarefa;

CREATE TABLE projeto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_inicio DATE,
    data_termino DATE,
	status VARCHAR(50) NOT NULL,
    equipe VARCHAR(50) NOT NULL
);

INSERT INTO projeto (nome, descricao, data_inicio, data_termino,  status, equipe_responsavel)
VALUES 
('Projeto Alpha', 'Descrição do Projeto Alpha', '2023-10-01', '2023-12-31','PLANEJADO', 'ADMFIN'),
('Projeto Beta', 'Descrição do Projeto Beta', '2023-11-01', '2024-01-31', 'EM_EXECUCAO', 'ADMPLN'),
('Projeto Y', 'Descrição do Projeto y', '2023-11-01', '2024-01-31', 'ABORTADO', 'ADMPLN'),
('Projeto Sefaz', 'Descrição do Projeto', '2023-11-01', '2024-01-31', 'FINALIZADO', 'ADMPLN');


CREATE TABLE tarefa (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    prazo INT,
    responsavel VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    projeto_id INT,
    FOREIGN KEY (projeto_id) REFERENCES Projeto(id)
);

INSERT INTO tarefa (titulo, descricao, prazo, responsavel,status, projeto_id)
VALUES 
('Tarefa 1', 'Descrição da Tarefa 1', 10, 'EM_EXECUCAO','PLO', 1),
('Tarefa 2', 'Descrição da Tarefa 2', 5, 'PLANEJADO', 'GFU',1),
('Tarefa 3', 'Descrição da Tarefa 3', 7, 'ABORTADO','CTB', 2);

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sistema_projetos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sistema_projetos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sistema_projetos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `sistema_projetos` ;

-- -----------------------------------------------------
-- Table `sistema_projetos`.`projeto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_projetos`.`projeto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `data_inicio` DATE NULL DEFAULT NULL,
  `data_termino` DATE NULL DEFAULT NULL,
  `descricao` TEXT NULL DEFAULT NULL,
  `equipe_responsavel` ENUM('ADMAPO', 'ADMFIN', 'ADMPLN') NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `status` ENUM('ABORTADO', 'EM_EXECUCAO', 'FINALIZADO', 'PLANEJADO') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sistema_projetos`.`tarefa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema_projetos`.`tarefa` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `descricao` TEXT NULL DEFAULT NULL,
  `prazo` INT NULL DEFAULT NULL,
  `responsavel` ENUM('CTB', 'GBP', 'GFU', 'PLO') NOT NULL,
  `status` ENUM('ABORTADO', 'EM_EXECUCAO', 'FINALIZADO', 'PLANEJADO') NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `projeto_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK31mg2pprceeim7dki4aq2qjkb` (`projeto_id` ASC) VISIBLE,
  CONSTRAINT `FK31mg2pprceeim7dki4aq2qjkb`
    FOREIGN KEY (`projeto_id`)
    REFERENCES `sistema_projetos`.`projeto` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `sistema_projetos`.`projeto` (`data_inicio`, `data_termino`, `descricao`, `equipe_responsavel`, `nome`, `status`) 
VALUES 
('2024-01-01', '2024-12-31', 'Projeto de automação de salas de aula', 'ADMPLN', 'Automação UFS', 'EM_EXECUCAO'),
('2024-02-01', '2024-06-30', 'Desenvolvimento de sistema financeiro', 'ADMFIN', 'Sistema Financeiro UFS', 'PLANEJADO'),
('2024-03-15', '2024-09-15', 'Projeto de segurança de rede', 'ADMAPO', 'Segurança de Rede UFS', 'FINALIZADO'),
('2024-04-01', '2024-12-01', 'Melhoria da infraestrutura de TI', 'ADMPLN', 'Infraestrutura TI UFS', 'EM_EXECUCAO'),
('2024-05-10', '2024-10-10', 'Desenvolvimento de aplicativo mobile', 'ADMFIN', 'App Mobile UFS', 'ABORTADO');


INSERT INTO `sistema_projetos`.`tarefa` (`descricao`, `prazo`, `responsavel`, `status`, `titulo`, `projeto_id`) 
VALUES
('Definir requisitos do sistema', 30, 'CTB', 'PLANEJADO', 'Requisitos Sistema', 1),
('Desenvolver código de autenticação', 45, 'GBP', 'EM_EXECUCAO', 'Autenticação', 1),
('Configuração de firewall', 20, 'GFU', 'FINALIZADO', 'Firewall Configuração', 3),
('Realizar testes de usabilidade', 25, 'PLO', 'EM_EXECUCAO', 'Testes de Usabilidade', 1),
('Documentação do projeto', 60, 'CTB', 'ABORTADO', 'Documentação do Sistema', 3);
