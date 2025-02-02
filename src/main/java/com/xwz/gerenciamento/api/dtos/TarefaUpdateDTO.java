package com.xwz.gerenciamento.api.dtos;

import lombok.Data;

@Data
public class TarefaUpdateDTO {
	 private String titulo;
	 private String descricao;
	 private Integer prazo;
	 private String status;
}
