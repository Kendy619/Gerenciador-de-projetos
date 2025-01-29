package com.xwz.gerenciamento.infra.repositories;

import com.xwz.gerenciamento.domain.entities.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

}
