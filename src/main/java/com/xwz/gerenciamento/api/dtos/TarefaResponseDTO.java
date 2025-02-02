package com.xwz.gerenciamento.api.dtos;

import com.xwz.gerenciamento.domain.enums.Responsavel;
import com.xwz.gerenciamento.domain.enums.Status;
import lombok.Data;

@Data
public class TarefaResponseDTO {
	private Long id;
    private String titulo;
    private String descricao;
    private Integer prazo;
    private Status status;
    private Responsavel responsavel;
    private Long projetoId;
}
