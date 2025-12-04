# Anhanguera Guessr

Bem-vindo ao Anhanguera Guessr — um jogo educativo de descoberta de locais na planta da escola, criado para demonstrações em sala de aula.

## Visão Geral

O jogo apresenta uma foto (panorama) e o jogador deve localizar no mapa da planta baixa onde a foto foi tirada. A pontuação é baseada na proximidade do palpite em relação ao local correto. Recomendado para uso em apresentações e atividades de sala de aula.

## Como Jogar

- Na tela de cadastro, insira seu nome, série e turma e escolha a dificuldade (Fácil / Médio / Difícil).
- Clique em **Iniciar Jogo**. Cada jogo consiste em 5 rodadas (ou 2 no modo Prática).
- Em cada rodada, observe a foto e clique no mapa (mini-mapa) para posicionar sua aposta.
- Clique em **Confirmar** para submeter sua escolha.
- A pontuação por rodada é maior quanto mais próximo estiver do local correto. Existe um bônus de tempo se você responder rapidamente.

## Controles e HUD

- Confirmar palpite: botão `✅ Confirmar` abaixo do mini-mapa.
- Revelar área (lifeline): botão `🔎` no mini-mapa — pode ser usado até 2 vezes por jogo. Mostra uma área aproximada do local por alguns segundos.
- Mudo / Volume: controles de áudio na HUD (áudio pode precisar de interação do usuário para ativar em alguns navegadores).
- Sair: `🏠 Sair` volta ao menu principal.

Teclas/Interações de UX:
- Aperte `Esc` para fechar o tutorial (quando aberto).

## Modos e Dificuldade

- Fácil: maior tolerância de erro, mais tempo; ideal para iniciantes.
- Médio (padrão): equilíbrio entre precisão e tempo.
- Difícil: menor tolerância de erro, menos tempo; maior desafio.

O ajuste de dificuldade altera variáveis em `script.js` (procure por `difficultySettings` e `timePerRound`).

## Pontuação e Bônus de Tempo

- A pontuação é calculada com base na distância do palpite até o ponto correto.
- Bônus de tempo: respostas mais rápidas recebem pontos extras (visíveis no resultado da rodada).

## Placar (Leaderboard)

- Os resultados são salvos no `localStorage` do navegador. Não há backend por enquanto.
- É possível filtrar o ranking por série, turma e dificuldade.
- Exportar/Importar: exporte o ranking como JSON ou CSV para compartilhar ou fazer backup.
- Botão `Auto–backup (JSON)`: ao marcar, o sistema baixa um JSON automaticamente quando um usuário salva seu resultado.

Observação: o ranking está local ao navegador; para compartilhar entre máquinas, use a exportação/importação.

## Modo Prática

- O modo Prática limita a 2 rodadas e não salva resultados no ranking. Útil para demonstrações rápidas.

## Acessibilidade e Preferências

- O jogo respeita a preferência do usuário por reduzir animações (quando disponível).
- Tutorial inicial pode ser desativado marcando "Não mostrar novamente".

## Desenvolvimento e Execução Local

Requisitos:
- Navegador moderno (Chrome, Edge, Firefox)
- (Opcional) Python para servir via HTTP

Executar localmente (recomendado para evitar limitações do `file://`):

No `PowerShell` (Windows), rode:

```powershell
python -m http.server 8000
# Em seguida abra: http://localhost:8000
```

Ou use a extensão Live Server do VS Code.

Arquivos principais:
- `index.html` — interface e marcação principal.
- `style.css` — estilos do jogo.
- `script.js` — lógica do jogo (estado, pontuação, leaderboard, lifeline, timer, áudio, etc.).
- `Imagens/` — imagens e planta baixa usadas pelo jogo.

Onde ajustar comportamento e regras:
- `script.js` — variáveis e objetos relevantes:
  - `gameConfig.timePerRound` — tempo por rodada (ajuste por dificuldade em `startGame`).
  - `gameConfig.lifelineUses` — número inicial de usos da revelação (padrão atual: 2).
  - `difficultySettings` — multiplicadores e tolerâncias por dificuldade.
  - Funções úteis: `revealZoneLifeline()`, `drawGuessAndCorrectOverlay()`, `displayLeaderboard()`.

## Notas de Implementação

- O jogo usa `localStorage` para persistência local do ranking.
- Áudio: sons gerados via WebAudio API; alguns navegadores exigem interação do usuário para tocar áudio.
- Confete/Animações: implementados com elementos DOM e animações CSS/JS; respeitam `prefers-reduced-motion`.

## Contribuindo

- Para contribuir, edite o código e abra uma PR no repositório (ou envie os arquivos atualizados manualmente).
- Mantenha o estilo de código conciso e evite reformatar arquivos não relacionados.

## Licença

- Sinta-se livre para usar e adaptar este projeto para fins educacionais. Inclua atribuição ao autor original quando for o caso.

