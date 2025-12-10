package com.condovote.auth.controller;

import com.condovote.auth.dto.AuthResponse;
import com.condovote.auth.dto.ChangePasswordRequest;
import com.condovote.auth.dto.GenericResponse;
import com.condovote.auth.dto.LoginRequest;
import com.condovote.auth.dto.ProfileContextResponse;
import com.condovote.auth.dto.SelectProfileRequest;
import com.condovote.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // POST /auth/login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // POST /auth/refresh (Opcional)
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestHeader("Authorization") String authorizationHeader) {
        // Requer o Refresh Token no header Authorization: Bearer <refresh_token>
        AuthResponse response = authService.refreshToken(authorizationHeader);
        return ResponseEntity.ok(response);
    }

    // POST /auth/change-password (Para o primeiro acesso obrigatório)
    @PostMapping("/change-password")
    public ResponseEntity<GenericResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        authService.changePassword(request);
        return ResponseEntity.ok(new GenericResponse("Senha alterada com sucesso.", "A troca de senha obrigatória foi desativada."));
    }
    
    // POST /auth/select-profile (Para escolha de perfil de atuação)
    @PostMapping("/select-profile")
    public ResponseEntity<ProfileContextResponse> selectProfile(@RequestHeader("Authorization") String authorizationHeader, 
                                                            @RequestBody SelectProfileRequest request) {
        // Requer o Access Token no header Authorization: Bearer <access_token>
        ProfileContextResponse response = authService.selectProfile(authorizationHeader, request);
        return ResponseEntity.ok(response);
    }
}
