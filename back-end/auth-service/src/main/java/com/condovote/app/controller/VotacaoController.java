package com.condovote.app.controller;

// Exemplo de Autorização em Controller Protegido

// ... imports

@RestController
@RequestMapping("/votacao")
@RequiredArgsConstructor
public class VotacaoController {

    /**
     * REQUISITO: Apenas ADMIN pode criar/editar votações.
     * Implementação: Apenas checa o papel.
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> criarVotacao(@RequestBody Object votacaoDto) {
        return ResponseEntity.ok("Votação criada com sucesso pelo Admin.");
    }

    /**
     * REQUISITO: Apenas TITULAR/PROCURADOR podem votar, e devem estar adimplentes.
     * Implementação: Checa o papel E a condição customizada.
     */
    @PostMapping("/votar")
    @PreAuthorize("hasAnyRole('ROLE_TITULAR', 'ROLE_PROCURADOR') and @securityContextUtils.isAdimplente()")
    public ResponseEntity<String> registrarVoto(@RequestBody Object votoDto) {
        // O perfil ativo (activeProfileId) é usado aqui para registrar o voto
        // e é garantido que o perfil está adimplente pela anotação @PreAuthorize.
        return ResponseEntity.ok("Voto registrado com sucesso para o perfil ativo.");
    }
    
    /**
     * REQUISITO: Apenas TITULAR/PROCURADOR podem consultar histórico (adimplência é irrelevante para consulta).
     * Implementação: Apenas checa o papel.
     */
    @GetMapping("/historico")
    @PreAuthorize("hasAnyRole('ROLE_TITULAR', 'ROLE_PROCURADOR')")
    public ResponseEntity<String> consultarHistorico() {
        // Lógica de negócio usa o 'activeProfileId' do JWT para buscar o histórico da unidade.
        return ResponseEntity.ok("Histórico de votação do perfil ativo retornado.");
    }
}
