package com.condovote.auth.model;

import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.List;

@Entity
public class Perfil {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private Role nome; // ROLE_ADMIN, ROLE_TITULAR, ROLE_PROCURADOR
}

enum Role { ROLE_ADMIN, ROLE_TITULAR, ROLE_PROCURADOR }
