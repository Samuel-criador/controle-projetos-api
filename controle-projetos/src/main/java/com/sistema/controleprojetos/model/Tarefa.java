package com.sistema.controleprojetos.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sistema.controleprojetos.model.enums.Prioridade;
import com.sistema.controleprojetos.model.enums.StatusTarefa;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tarefas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Prioridade prioridade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusTarefa status;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    private Projeto projeto;

}
