package com.sistema.controleprojetos.service;

import com.sistema.controleprojetos.dto.TarefaDTO;
import com.sistema.controleprojetos.exception.RecursoNaoEncontradoException;
import com.sistema.controleprojetos.model.Projeto;
import com.sistema.controleprojetos.model.Tarefa;
import com.sistema.controleprojetos.repository.TarefaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class TarefaService {

    private final TarefaRepository tarefaRepository;
    private final ProjetoService projetoService;

    public Page<Tarefa> listarTodos(Pageable pageable) {
        return tarefaRepository.findAll(pageable);
    }

    public Tarefa buscarPorId(Long id) {
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Tarefa não encontrada com ID: " + id));
    }

    @Transactional
    public Tarefa salvar(TarefaDTO dto) {
        Projeto projeto = projetoService.buscarPorId(dto.getProjetoId());

        Tarefa tarefa = new Tarefa();
        preencherDados(tarefa, dto, projeto);

        return tarefaRepository.save(tarefa);
    }

    @Transactional
    public Tarefa atualizar(Long id, TarefaDTO dto) {
        Tarefa tarefa = buscarPorId(id);
        Projeto projeto = projetoService.buscarPorId(dto.getProjetoId());

        preencherDados(tarefa, dto, projeto);

        return tarefaRepository.save(tarefa);
    }

    @Transactional
    public void deletar(Long id) {
        buscarPorId(id);
        tarefaRepository.deleteById(id);
    }

    private void preencherDados(Tarefa tarefa, TarefaDTO dto, Projeto projeto) {
        tarefa.setTitulo(dto.getTitulo());
        tarefa.setDescricao(dto.getDescricao());
        tarefa.setPrioridade(dto.getPrioridade());
        tarefa.setStatus(dto.getStatus());
        tarefa.setProjeto(projeto);
    }
}
