package com.sistema.controleprojetos.controller;

import com.sistema.controleprojetos.dto.ProjetoDTO;
import com.sistema.controleprojetos.model.Projeto;
import com.sistema.controleprojetos.service.ProjetoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springdoc.api.annotations.ParameterObject;

@RestController
@RequestMapping("/api/projetos")
@RequiredArgsConstructor
@Tag(name = "Projetos", description = "Gerenciamento de projetos")
public class ProjetoController {

    private final ProjetoService projetoService;

    @GetMapping
    @Operation(summary = "Listar todos os projetos")
    public ResponseEntity<Page<Projeto>> listarTodos(@ParameterObject Pageable pageable) {
        return ResponseEntity.ok(projetoService.listarTodos(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar projeto por ID")
    public ResponseEntity<Projeto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(projetoService.buscarPorId(id));
    }

    @PostMapping
    @Operation(summary = "Cadastrar novo projeto")
    public ResponseEntity<Projeto> salvar(@Valid @RequestBody ProjetoDTO dto) {
        Projeto salvo = projetoService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar projeto")
    public ResponseEntity<Projeto> atualizar(@PathVariable Long id, @Valid @RequestBody ProjetoDTO dto) {
        return ResponseEntity.ok(projetoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar projeto")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        projetoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

}
