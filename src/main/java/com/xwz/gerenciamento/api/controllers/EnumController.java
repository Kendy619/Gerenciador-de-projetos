package com.xwz.gerenciamento.api.controllers;

import com.xwz.gerenciamento.domain.enums.Equipe;
import com.xwz.gerenciamento.domain.enums.Responsavel;
import com.xwz.gerenciamento.domain.enums.Status;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/enums")
public class EnumController {

    // Endpoint para listar os valores do Enum Status
    @GetMapping("/status")
    public List<Status> getStatusValues() {
        return Arrays.asList(Status.values());
    }

    // Endpoint para listar os valores do Enum Equipe
    @GetMapping("/equipes")
    public List<Equipe> getEquipeValues() {
        return Arrays.asList(Equipe.values());
    }

    // Endpoint para listar os valores do Enum Responsavel
    @GetMapping("/responsaveis")
    public List<Responsavel> getResponsavelValues() {
        return Arrays.asList(Responsavel.values());
    }
}