package com.xwz.gerenciamento.api.controllers;

import com.xwz.gerenciamento.domain.entities.Projeto;
import com.xwz.gerenciamento.domain.entities.Tarefa;
import com.xwz.gerenciamento.api.dtos.TarefaDTO;
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
    public ResponseEntity<Tarefa> createTarefa(@RequestBody TarefaDTO tarefaDTO) {
    	Projeto projeto = projetoService.getProjetoById(tarefaDTO.getProjetoId());
 
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(tarefaDTO.getTitulo());
        tarefa.setDescricao(tarefaDTO.getDescricao());
        tarefa.setPrazo(tarefaDTO.getPrazo());
        tarefa.setStatus(Status.valueOf(tarefaDTO.getStatus()));
        tarefa.setResponsavel(Responsavel.valueOf(tarefaDTO.getResponsavel()));
        tarefa.setProjeto(projeto);
        
        Tarefa novaTarefa = tarefaService.createTarefa(tarefa);
        return new ResponseEntity<>(novaTarefa, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> getAllTarefas() {
        List<Tarefa> tarefas = tarefaService.getAllTarefas();
        return new ResponseEntity<>(tarefas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> getTarefaById(@PathVariable Long id) {
        Tarefa tarefa = tarefaService.getTarefaById(id);
        return new ResponseEntity<>(tarefa, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> updateTarefa(@PathVariable Long id, @RequestBody Tarefa tarefaDetails) {
        Tarefa updatedTarefa = tarefaService.updateTarefa(id, tarefaDetails);
        return new ResponseEntity<>(updatedTarefa, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarefa(@PathVariable Long id) {
        tarefaService.deleteTarefa(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}