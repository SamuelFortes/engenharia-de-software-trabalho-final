package com.condovote.auth.service;

import com.condovote.auth.model.Titular;
import com.condovote.auth.repository.TitularRepository;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service("securityContextUtils") // Nome do bean para uso no @PreAuthorize
public class SecurityContextUtils {

    private final JwtService jwtService;
    private final TitularRepository titularRepository;
    // ... VinculoProcuradorRepository injetado (omitted)

    // Construtor injetável

    public Claims getActiveClaims() {
        // Recupera o token do contexto (o JWT foi armazenado como credential no filtro)
        String token = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        return jwtService.extractAllClaims(token);
    }

    /**
     * Verifica a adimplência do titular dono do perfil ativo.
     */
    public boolean isAdimplente() {
        Claims claims = getActiveClaims();
        Long activeProfileId = claims.get("activeProfileId", Long.class);
        String activeProfileType = claims.get("activeProfileType", String.class);
        
        if (activeProfileId == null || activeProfileType.equals("ADMIN")) {
            return false;
        }
        
        Optional<Titular> titularOpt = Optional.empty();
        
        if (activeProfileType.equals("TITULAR")) {
            titularOpt = titularRepository.findById(activeProfileId);
        } 
        // Em um cenário real, TitularRepository teria um método para achar o Titular
        // pelo ID do VinculoProcurador:
        // else if (activeProfileType.equals("PROCURADOR")) {
        //     titularOpt = titularRepository.findTitularByVinculoId(activeProfileId);
        // }
        
        return titularOpt.map(Titular::isAdimplente).orElse(false);
    }
}
