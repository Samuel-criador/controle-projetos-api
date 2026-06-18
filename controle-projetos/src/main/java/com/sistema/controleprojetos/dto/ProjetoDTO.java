package com.sistema.controleprojetos.dto;

import com.sistema.controleprojetos.model.enums.StatusProjeto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoDTO {

    private Long id;

    @NotBlank(message = "Nome do projeto é obrigatório")
    private String nome;

    private String descricao;

    @NotNull(message = "Data de início é obrigatória")
    private LocalDate dataInicio;

    private LocalDate dataPrevisao;

    @NotNull(message = "Status é obrigatório")
    private StatusProjeto status;

    @NotNull(message = "Responsável é obrigatório")
    private Long responsavelId;

}
