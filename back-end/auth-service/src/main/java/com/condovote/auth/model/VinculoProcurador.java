package com.condovote.auth.model;

import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.List;

@Entity
@Table(name = "vinculo_procurador")
public class VinculoProcurador {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID do VÍNCULO (contexto de atuação)
    
    @ManyToOne @JoinColumn(name = "procurador_id", nullable = false)
    private Usuario procurador; // O usuário que tem a procuração
    
    @ManyToOne @JoinColumn(name = "titular_id", nullable = false)
    private Titular titular; // O titular/unidade que deu a procuração
    
    private boolean ativo = true; // Se a procuração está ativa
    
    public String getNomePerfil() {
        return "Procurador de " + titular.getNomeCompleto() + " (" + titular.getUnidade() + ")";
    }
    // ... Getters/Setters
}
