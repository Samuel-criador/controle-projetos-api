package com.sistema.controleprojetos.controller;

import com.sistema.controleprojetos.dto.TarefaDTO;
import com.sistema.controleprojetos.model.Tarefa;
import com.sistema.controleprojetos.service.TarefaService;
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
@RequestMapping("/api/tarefas")
@RequiredArgsConstructor
@Tag(name = "Tarefas", description = "Gerenciamento de tarefas dos projetos")
public class TarefaController {

    private final TarefaService tarefaService;

    @GetMapping
    @Operation(summary = "Listar todas as tarefas")
    public ResponseEntity<Page<Tarefa>> listarTodos(@ParameterObject Pageable pageable) {
        return ResponseEntity.ok(tarefaService.listarTodos(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar tarefa por ID")
    public ResponseEntity<Tarefa> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(tarefaService.buscarPorId(id));
    }

    @PostMapping
    @Operation(summary = "Cadastrar nova tarefa")
    public ResponseEntity<Tarefa> salvar(@Valid @RequestBody TarefaDTO dto) {
        Tarefa salva = tarefaService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar tarefa")
    public ResponseEntity<Tarefa> atualizar(@PathVariable Long id, @Valid @RequestBody TarefaDTO dto) {
        return ResponseEntity.ok(tarefaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar tarefa")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        tarefaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

}
