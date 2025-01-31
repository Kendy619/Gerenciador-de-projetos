package com.xwz.gerenciamento.infra.repositories;

import com.xwz.gerenciamento.domain.entities.Tarefa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
	List<Tarefa> findByProjeto_Id(Long projetoId);
}
