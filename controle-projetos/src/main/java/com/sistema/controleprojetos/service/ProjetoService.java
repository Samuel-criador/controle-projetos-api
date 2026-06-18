package com.sistema.controleprojetos.service;

import com.sistema.controleprojetos.dto.ProjetoDTO;
import com.sistema.controleprojetos.exception.RecursoNaoEncontradoException;
import com.sistema.controleprojetos.model.Projeto;
import com.sistema.controleprojetos.model.Responsavel;
import com.sistema.controleprojetos.repository.ProjetoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetoRepository projetoRepository;
    private final ResponsavelService responsavelService;

    public Page<Projeto> listarTodos(Pageable pageable) {
        return projetoRepository.findAll(pageable);
    }

    public Projeto buscarPorId(Long id) {
        return projetoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Projeto não encontrado com ID: " + id));
    }

    @Transactional
    public Projeto salvar(ProjetoDTO dto) {
        Responsavel responsavel = responsavelService.buscarPorId(dto.getResponsavelId());

        Projeto projeto = new Projeto();
        preencherDados(projeto, dto, responsavel);

        return projetoRepository.save(projeto);
    }

    @Transactional
    public Projeto atualizar(Long id, ProjetoDTO dto) {
        Projeto projeto = buscarPorId(id);
        Responsavel responsavel = responsavelService.buscarPorId(dto.getResponsavelId());

        preencherDados(projeto, dto, responsavel);

        return projetoRepository.save(projeto);
    }

    @Transactional
    public void deletar(Long id) {
        buscarPorId(id);
        projetoRepository.deleteById(id);
    }

    private void preencherDados(Projeto projeto, ProjetoDTO dto, Responsavel responsavel) {
        projeto.setNome(dto.getNome());
        projeto.setDescricao(dto.getDescricao());
        projeto.setDataInicio(dto.getDataInicio());
        projeto.setDataPrevisao(dto.getDataPrevisao());
        projeto.setStatus(dto.getStatus());
        projeto.setResponsavel(responsavel);
    }
}
