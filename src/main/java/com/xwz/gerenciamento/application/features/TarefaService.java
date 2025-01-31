package com.xwz.gerenciamento.application.features;

import com.xwz.gerenciamento.domain.entities.Tarefa;
import com.xwz.gerenciamento.infra.repositories.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

   
    public Tarefa createTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    
    public List<Tarefa> getAllTarefas() {
        return tarefaRepository.findAll();
    }

    
    public Tarefa getTarefaById(Long id) {
        Optional<Tarefa> tarefaOptional = tarefaRepository.findById(id);
        if (tarefaOptional.isPresent()) {
            return tarefaOptional.get();
        } else {
            throw new RuntimeException("Tarefa com ID " + id + " não encontrada");
        }
    }

   
    public Tarefa updateTarefa(Long id, Tarefa tarefaDetails) {
        Tarefa tarefaExistente = getTarefaById(id);

        tarefaExistente.setTitulo(tarefaDetails.getTitulo());
        tarefaExistente.setDescricao(tarefaDetails.getDescricao());
        tarefaExistente.setStatus(tarefaDetails.getStatus());
        tarefaExistente.setPrazo(tarefaDetails.getPrazo());
        tarefaExistente.setProjeto(tarefaDetails.getProjeto());

        return tarefaRepository.save(tarefaExistente);
    }


    public void deleteTarefa(Long id) {
        Tarefa tarefa = getTarefaById(id);
        tarefaRepository.delete(tarefa);
    }
}
