CREATE TABLE Tarefa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    prazo INT,
    responsavel VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    projeto_id INT,
    FOREIGN KEY (projeto_id) REFERENCES Projeto(id)
);

INSERT INTO Tarefa (titulo, descricao, prazo, responsavel, status, projeto_id)
VALUES 
('Tarefa 1', 'Descrição da Tarefa 1', 10, 'PLO', 'EM_EXECUCAO', 1),
('Tarefa 2', 'Descrição da Tarefa 2', 5, 'GFU', 'PLANEJADO', 1),
('Tarefa 3', 'Descrição da Tarefa 3', 7, 'CTB', 'ABORTADO', 2);