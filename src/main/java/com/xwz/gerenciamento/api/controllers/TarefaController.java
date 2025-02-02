package com.xwz.gerenciamento.api.controllers;

import com.xwz.gerenciamento.domain.entities.Projeto;
import com.xwz.gerenciamento.domain.entities.Tarefa;
import com.xwz.gerenciamento.api.dtos.TarefaDTO;
import com.xwz.gerenciamento.api.dtos.TarefaResponseDTO;
import com.xwz.gerenciamento.api.dtos.TarefaUpdateDTO;
import com.xwz.gerenciamento.domain.enums.Responsavel;
import com.xwz.gerenciamento.domain.enums.Status;
import com.xwz.gerenciamento.application.features.ProjetoService;
import com.xwz.gerenciamento.application.features.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;
    
    @Autowired
    private ProjetoService projetoService;

    @PostMapping
    public ResponseEntity<TarefaResponseDTO> createTarefa(@RequestBody TarefaDTO tarefaDTO) {
        try {
            Projeto projeto = projetoService.getProjetoById(tarefaDTO.getProjetoId());
            if (projeto == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            Tarefa tarefa = new Tarefa();
            tarefa.setTitulo(tarefaDTO.getTitulo());
            tarefa.setDescricao(tarefaDTO.getDescricao());
            tarefa.setPrazo(tarefaDTO.getPrazo());
            tarefa.setStatus(Status.valueOf(tarefaDTO.getStatus()));
            tarefa.setResponsavel(Responsavel.valueOf(tarefaDTO.getResponsavel()));
            tarefa.setProjeto(projeto);

            Tarefa novaTarefa = tarefaService.createTarefa(tarefa);

            TarefaResponseDTO responseDTO = new TarefaResponseDTO();
            responseDTO.setId(novaTarefa.getId());
            responseDTO.setTitulo(novaTarefa.getTitulo());
            responseDTO.setDescricao(novaTarefa.getDescricao());
            responseDTO.setPrazo(novaTarefa.getPrazo());
            responseDTO.setStatus(novaTarefa.getStatus());
            responseDTO.setResponsavel(novaTarefa.getResponsavel());
            responseDTO.setProjetoId(projeto.getId());

            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> getAllTarefas(@RequestParam(required = false) Long projetoId) {
    	if (projetoId != null) {
            return new ResponseEntity<>(tarefaService.getTarefasPorProjeto(projetoId), HttpStatus.OK);
        }
    	return new ResponseEntity<>(tarefaService.getAllTarefas(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> getTarefaById(@PathVariable Long id) {
        Tarefa tarefa = tarefaService.getTarefaById(id);
        return new ResponseEntity<>(tarefa, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> updateTarefa(
        @PathVariable Long id,
        @RequestBody TarefaUpdateDTO tarefaUpdateDTO
    ) {
        Tarefa tarefaExistente = tarefaService.getTarefaById(id);

        if (tarefaUpdateDTO.getTitulo() != null) {
            tarefaExistente.setTitulo(tarefaUpdateDTO.getTitulo());
        }
        if (tarefaUpdateDTO.getDescricao() != null) {
            tarefaExistente.setDescricao(tarefaUpdateDTO.getDescricao());
        }
        if (tarefaUpdateDTO.getPrazo() != null) {
            tarefaExistente.setPrazo(tarefaUpdateDTO.getPrazo());
        }
        if (tarefaUpdateDTO.getStatus() != null) {
            tarefaExistente.setStatus(Status.valueOf(tarefaUpdateDTO.getStatus()));
        }
        if (tarefaUpdateDTO.getResponsavel() != null) {
            tarefaExistente.setResponsavel(Responsavel.valueOf(tarefaUpdateDTO.getResponsavel()));
        }

        Tarefa updatedTarefa = tarefaService.updateTarefa(id, tarefaExistente);
        return new ResponseEntity<>(updatedTarefa, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarefa(@PathVariable Long id) {
        tarefaService.deleteTarefa(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}