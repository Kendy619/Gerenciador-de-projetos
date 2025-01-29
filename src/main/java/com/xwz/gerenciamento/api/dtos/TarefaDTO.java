package com.xwz.gerenciamento.api.dtos;

import lombok.Data;

@Data
public class TarefaDTO {
    private String titulo;
    private String descricao;
    private Integer prazo;
    private String status;
    private String responsavel;
    private Long projetoId;
}