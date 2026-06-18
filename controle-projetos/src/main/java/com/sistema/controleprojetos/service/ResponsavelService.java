package com.sistema.controleprojetos.service;

import com.sistema.controleprojetos.dto.ResponsavelDTO;
import com.sistema.controleprojetos.exception.RecursoNaoEncontradoException;
import com.sistema.controleprojetos.model.Responsavel;
import com.sistema.controleprojetos.repository.ResponsavelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class ResponsavelService {

    private final ResponsavelRepository responsavelRepository;

    public Page<Responsavel> listarTodos(Pageable pageable) {
        return responsavelRepository.findAll(pageable);
    }

    public Responsavel buscarPorId(Long id) {
        return responsavelRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Responsável não encontrado com ID: " + id));
    }

    @Transactional
    public Responsavel salvar(ResponsavelDTO dto) {
        Responsavel responsavel = new Responsavel();
        preencherDados(responsavel, dto);
        return responsavelRepository.save(responsavel);
    }

    @Transactional
    public Responsavel atualizar(Long id, ResponsavelDTO dto) {
        Responsavel responsavel = buscarPorId(id);
        preencherDados(responsavel, dto);
        return responsavelRepository.save(responsavel);
    }

    @Transactional
    public void deletar(Long id) {
        buscarPorId(id);
        responsavelRepository.deleteById(id);
    }

    private void preencherDados(Responsavel responsavel, ResponsavelDTO dto) {
        responsavel.setNome(dto.getNome());
        responsavel.setEmail(dto.getEmail());
        responsavel.setCargo(dto.getCargo());
    }
}
