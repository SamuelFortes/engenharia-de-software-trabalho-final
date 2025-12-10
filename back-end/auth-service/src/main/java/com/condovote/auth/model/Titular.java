package com.condovote.auth.model;

import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.List;

@Entity
@PrimaryKeyJoinColumn(name = "usuario_id")
public class Titular extends Usuario {
    private String nomeCompleto;
    @Column(nullable = false)
    private String unidade; // Ex: Lote 12, Casa 1
    private boolean adimplente = true; // Status de adimplência (bom pagador)
    // ... Getters/Setters
}
