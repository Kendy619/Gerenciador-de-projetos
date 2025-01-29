package com.xwz.gerenciamento.application.features;

import com.xwz.gerenciamento.domain.entities.Projeto;
import com.xwz.gerenciamento.infra.repositories.ProjetoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    // Cria um novo projeto
    @Transactional
    public Projeto createProjeto(Projeto projeto) {
        if (projeto.getNome() == null || projeto.getNome().isEmpty()) {
            throw new IllegalArgumentException("Nome do projeto é obrigatório");
        }
        return projetoRepository.save(projeto);
    }

    // Lista todos os projetos
    public List<Projeto> getAllProjetos() {
        return projetoRepository.findAll();
    }

    // Busca projeto por ID com tratamento de exceção específica
    public Projeto getProjetoById(Long id) {
        return projetoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto não encontrado com o ID: " + id));
    }

    // Atualiza projeto com validação
    @Transactional
    public Projeto updateProjeto(Long id, Projeto projetoDetails) {
        Projeto projetoExistente = getProjetoById(id);

        projetoExistente.setNome(projetoDetails.getNome());
        projetoExistente.setDescricao(projetoDetails.getDescricao());
        projetoExistente.setDataInicio(projetoDetails.getDataInicio());
        projetoExistente.setDataTermino(projetoDetails.getDataTermino());
        projetoExistente.setStatus(projetoDetails.getStatus());

        return projetoRepository.save(projetoExistente);
    }

    // Deleta projeto
    @Transactional
    public void deleteProjeto(Long id) {
        if (!projetoRepository.existsById(id)) {
            throw new EntityNotFoundException("Projeto com ID " + id + " não existe");
        }
        projetoRepository.deleteById(id);
    }
}