package com.sistema.controleprojetos.dto;

import com.sistema.controleprojetos.model.enums.Prioridade;
import com.sistema.controleprojetos.model.enums.StatusTarefa;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TarefaDTO {

    private Long id;

    @NotBlank(message = "Título da tarefa é obrigatório")
    private String titulo;

    private String descricao;

    @NotNull(message = "Prioridade é obrigatória")
    private Prioridade prioridade;

    @NotNull(message = "Status é obrigatório")
    private StatusTarefa status;

    @NotNull(message = "Projeto é obrigatório")
    private Long projetoId;

}
