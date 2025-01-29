CREATE TABLE Projeto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_inicio DATE,
    data_termino DATE,
    equipe VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL
);

INSERT INTO Projeto (nome, descricao, data_inicio, data_termino, equipe, status)
VALUES 
('Projeto Alpha', 'Descrição do Projeto Alpha', '2023-10-01', '2023-12-31', 'ADMFIN', 'PLANEJADO'),
('Projeto Beta', 'Descrição do Projeto Beta', '2023-11-01', '2024-01-31', 'ADMPLN', 'EM_EXECUCAO');