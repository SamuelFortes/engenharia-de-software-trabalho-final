package com.condovote.auth.model;

import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.List;

@Entity
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario implements UserDetails {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String cpfCnpj; // Chave de login
    @Column(nullable = false)
    private String senha; // Senha com hash BCrypt
    private String email;
    private boolean ativo = true; // Status de ativo/inativo
    private boolean precisaTrocarSenha = true; // Troca obrigatória no primeiro acesso

    // ... Getters/Setters e implementações UserDetails (simplificadas)
}