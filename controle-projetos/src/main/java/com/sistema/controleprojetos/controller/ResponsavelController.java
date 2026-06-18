package com.sistema.controleprojetos.controller;

import com.sistema.controleprojetos.dto.ResponsavelDTO;
import com.sistema.controleprojetos.model.Responsavel;
import com.sistema.controleprojetos.service.ResponsavelService;
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
@RequestMapping("/api/responsaveis")
@RequiredArgsConstructor
@Tag(name = "Responsáveis", description = "Gerenciamento de responsáveis pelos projetos")
public class ResponsavelController {

    private final ResponsavelService responsavelService;

    @GetMapping
    @Operation(summary = "Listar todos os responsáveis")
    public ResponseEntity<Page<Responsavel>> listarTodos(@ParameterObject Pageable pageable) {
        return ResponseEntity.ok(responsavelService.listarTodos(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar responsável por ID")
    public ResponseEntity<Responsavel> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(responsavelService.buscarPorId(id));
    }

    @PostMapping
    @Operation(summary = "Cadastrar novo responsável")
    public ResponseEntity<Responsavel> salvar(@Valid @RequestBody ResponsavelDTO dto) {
        Responsavel salvo = responsavelService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar responsável")
    public ResponseEntity<Responsavel> atualizar(@PathVariable Long id, @Valid @RequestBody ResponsavelDTO dto) {
        return ResponseEntity.ok(responsavelService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar responsável")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        responsavelService.deletar(id);
        return ResponseEntity.noContent().build();
    }

}
