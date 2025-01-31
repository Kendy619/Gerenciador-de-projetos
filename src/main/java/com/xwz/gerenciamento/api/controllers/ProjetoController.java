package com.xwz.gerenciamento.api.controllers;

import com.xwz.gerenciamento.domain.entities.Projeto;
import com.xwz.gerenciamento.application.features.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoService projetoService;

    @PostMapping
    public ResponseEntity<Projeto> createProjeto(@RequestBody Projeto projeto) {
    	try {
            Projeto novoProjeto = projetoService.createProjeto(projeto);
            return new ResponseEntity<>(novoProjeto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Projeto>> getAllProjetos() {
        List<Projeto> projetos = projetoService.getAllProjetos();
        return new ResponseEntity<>(projetos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projeto> getProjetoById(@PathVariable Long id) {
        Projeto projeto = projetoService.getProjetoById(id);
        return new ResponseEntity<>(projeto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projeto> updateProjeto(@PathVariable Long id, @RequestBody Projeto projetoDetails) {
        Projeto updatedProjeto = projetoService.updateProjeto(id, projetoDetails);
        return new ResponseEntity<>(updatedProjeto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjeto(@PathVariable Long id) {
        projetoService.deleteProjeto(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}