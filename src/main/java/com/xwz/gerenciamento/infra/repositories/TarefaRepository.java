package com.xwz.gerenciamento.infra.repositories;

import com.xwz.gerenciamento.domain.entities.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

}
