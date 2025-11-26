// Configuração do jogo
const gameConfig = {
    totalRounds: 5, 
    currentRound: 1,
    score: 0,
    playerName: '',
    playerSerie: '',
    timePerRound: 30,
    timer: null,
    timeLeft: 30
};

// Banco de dados dos locais (Coordenadas baseadas na imagem original)
const locations = [
    { id: 1, name: "Entrada porta principal", photo: "Imagens/entradaPrincipal.jpg", correctPosition: { x: 588, y: 228 }, radius: 30 },
    { id: 2, name: "Secretaria", photo: "Imagens/secretaria.jpg", correctPosition: { x: 440, y: 267 }, radius: 30 },
    { id: 3, name: "Sala dos Professores", photo: "Imagens/salaProfs.jpg", correctPosition: { x: 433, y: 295 }, radius: 30 },
    { id: 4, name: "Informática", photo: "Imagens/informatica.jpg", correctPosition: { x: 425, y: 379 }, radius: 30 },
    { id: 5, name: "Sala 9 - Informática", photo: "Imagens/sala9.jpg", correctPosition: { x: 450, y: 370 }, radius: 30 },
    { id: 6, name: "Diretoria", photo: "Imagens/diretoria.jpg", correctPosition: { x: 516, y: 280 }, radius: 30 },
    { id: 7, name: "Corredor Inferior", photo: "Imagens/corredorInferior.jpg", correctPosition: { x: 689, y: 223 }, radius: 30 },
    { id: 8, name: "Corredor Superior Bloco B", photo: "Imagens/corredorBlocoB.jpg", correctPosition: { x: 484, y: 221 }, radius: 30 },
    { id: 9, name: "Banheiro Professores (2º Andar)", photo: "Imagens/banheiroProfs.jpg", correctPosition: { x: 665, y: 291 }, radius: 30 },
    { id: 10, name: "Escada Principal", photo: "Imagens/escadaBlocoPrincipal.jpg", correctPosition: { x: 587, y: 238 }, radius: 30 },
    { id: 11, name: "Porta  da entrada para o pátio", photo: "Imagens/portaRefeitorio.jpg", correctPosition: { x: 581, y: 346 }, radius: 30 },
    { id: 12, name: "Entrada do corredor pátio", photo: "Imagens/corredorRefeitorio.jpg", correctPosition: { x: 580, y: 370 }, radius: 30 },
    { id: 13, name: "Escada Bloco A", photo: "Imagens/escadaBlocoA.jpg", correctPosition: { x: 690, y: 345 }, radius: 30 },
    { id: 14, name: "Escada Bloco B", photo: "Imagens/escadaBlocoB.jpg", correctPosition: { x: 475, y: 342 }, radius: 30 },
    { id: 15, name: "Mesa exterior perto da escada bloco A", photo: "Imagens/mesaExterior.jpg", correctPosition: { x: 686, y: 419 }, radius: 30 },
    { id: 16, name: "Entrada para o bloco de espanhol", photo: "Imagens/entradaBlocoEspanhol.jpg", correctPosition: { x: 701, y: 607 }, radius: 30 },
    { id: 17, name: "Escada do bloco de espanhol", photo: "Imagens/escadaBlocoEspanhol.jpg", correctPosition: { x: 848, y: 579 }, radius: 30 },
    { id: 18, name: "Piso superior bloco de espanhol", photo: "Imagens/andarSupEspanhol.jpg", correctPosition: { x: 778, y: 594 }, radius: 30 },
    { id: 19, name: "Cantina", photo: "Imagens/cantina.jpg", correctPosition: { x: 652, y: 690 }, radius: 30 },
    { id: 20, name: "Entrada para sala de vídeo/biblioteca", photo: "Imagens/entradaBiblioteca.jpg", correctPosition: { x: 598, y: 770 }, radius: 30 },
    { id: 21, name: "Portão garagem", photo: "Imagens/portaoGaragem.jpg", correctPosition: { x: 572, y: 68 }, radius: 30 },
    { id: 22, name: "Saída da quadra", photo: "Imagens/saidaQuadra.jpg", correctPosition: { x: 438, y: 72 }, radius: 30 },
    { id: 23, name: "Lado esquerdo da entrada", photo: "Imagens/ladoEsqEntradaPrincipal.jpg", correctPosition: { x: 685, y: 202 }, radius: 30 },
    { id: 24, name: "Sala da coordenação", photo: "Imagens/salaAdriana.jpg", correctPosition: { x: 653, y: 290 }, radius: 30 },
    { id: 25, name: "Frente da cozinha", photo: "Imagens/frenteCozinha.jpg", correctPosition: { x: 501, y: 614 }, radius: 30 },
    { id: 26, name: "Entrada do bloco perto do bebedouro", photo: "Imagens/entradaBlocoBebedouro.jpg", correctPosition: { x: 410, y: 593 }, radius: 30 },
    { id: 27, name: "Escada do bloco do bebedouro", photo: "Imagens/escadaBlocoBebedouro.jpg", correctPosition: { x: 312, y: 576 }, radius: 30 },
    { id: 28, name: "Pátio ( perto do banheiro)", photo: "Imagens/patio.jpg", correctPosition: { x: 648, y: 613 }, radius: 30 },
    { id: 29, name: "Sala do Grêmio", photo: "Imagens/salaGremio.jpg", correctPosition: { x: 539, y: 328 }, radius: 30 },
    { id: 30, name: "Sala de vídeo", photo: "Imagens/salaVideo.jpg", correctPosition: { x: 666, y: 848 }, radius: 30 },
    { id: 31, name: "Fundos da escola", photo: "Imagens/fundoEscola.jpg", correctPosition: { x: 666, y: 1007 }, radius: 30 },
    { id: 32, name: "Corredor secretaria", photo: "Imagens/corredorSecretaria.jpg", correctPosition: { x: 484, y: 221 }, radius: 30 }
];

// Variáveis globais
let currentLocation = null;
let usedLocations = [];
let userGuess = null; // Armazena em PORCENTAGEM agora: { xPct: 50, yPct: 50 }
let currentTimer = null;

// Elementos DOM
const elements = {
    // Telas
    registrationScreen: document.getElementById('registrationScreen'),
    gameScreen: document.getElementById('gameScreen'),
    roundResultScreen: document.getElementById('roundResultScreen'),
    gameOverScreen: document.getElementById('gameOverScreen'),
    
    // Cadastro
    playerName: document.getElementById('playerName'),
    playerYear: document.getElementById('playerYear'),
    playerClass: document.getElementById('playerClass'),
    startGameBtn: document.getElementById('startGameBtn'),
    selectedName: document.getElementById('selectedName'),
    selectedSerie: document.getElementById('selectedSerie'),
    
    // Jogo
    currentPlayerName: document.getElementById('currentPlayerName'),
    currentPlayerSerie: document.getElementById('currentPlayerSerie'),
    timer: document.getElementById('timer'),
    score: document.getElementById('score'),
    round: document.getElementById('round'),
    currentPhoto: document.getElementById('currentPhoto'),
    
    // Mapa e Controles
    miniMapWrapper: document.getElementById('miniMapWrapper'),
    schoolMap: document.getElementById('schoolMap'),
    mapOverlay: document.getElementById('mapOverlay'),
    confirmGuess: document.getElementById('confirmGuess'),
    exitGameBtn: document.getElementById('exitGameBtn'), // Botão Sair
    
    // Resultados
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultMessage: document.getElementById('resultMessage'),
    pointsEarned: document.getElementById('pointsEarned'),
    totalScore: document.getElementById('totalScore'),
    nextRoundNumber: document.getElementById('nextRoundNumber'),
    nextRoundBtn: document.getElementById('nextRoundBtn'),
    finalPlayerName: document.getElementById('finalPlayerName'),
    finalPlayerSerie: document.getElementById('finalPlayerSerie'),
    finalScore: document.getElementById('finalScore'),
    performance: document.getElementById('performance'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    backToMenuBtn: document.getElementById('backToMenuBtn') // Botão Menu Final
};

function init() {
    setupEventListeners();
    showScreen('registrationScreen');
}

function setupEventListeners() {
    elements.playerName.addEventListener('input', updateStartButton);
    elements.playerYear.addEventListener('change', handleYearChange);
    elements.playerClass.addEventListener('change', updateStartButton);
    elements.startGameBtn.addEventListener('click', startGame);
    
    // Jogo
    elements.schoolMap.addEventListener('click', handleMapClick); 
    elements.confirmGuess.addEventListener('click', confirmGuess);
    elements.exitGameBtn.addEventListener('click', exitToMenu);
    
    // Navegação
    elements.nextRoundBtn.addEventListener('click', nextRound);
    elements.playAgainBtn.addEventListener('click', playAgain);
    elements.backToMenuBtn.addEventListener('click', exitToMenu);
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Cadastro
function handleYearChange() {
    const year = elements.playerYear.value;
    elements.playerClass.disabled = !year;
    if (!year) elements.playerClass.value = '';
    updateStartButton();
}

function updateStartButton() {
    const name = elements.playerName.value.trim();
    const year = elements.playerYear.value;
    const classLetter = elements.playerClass.value;
    
    if (name && year && classLetter) {
        elements.startGameBtn.disabled = false;
        const serie = `${year}º${classLetter}`;
        elements.selectedName.classList.remove('hidden');
        elements.selectedName.querySelector('span').textContent = name;
        elements.selectedSerie.classList.remove('hidden');
        elements.selectedSerie.querySelector('span').textContent = serie;
    } else {
        elements.startGameBtn.disabled = true;
        elements.selectedName.classList.add('hidden');
        elements.selectedSerie.classList.add('hidden');
    }
}

function startGame() {
    const year = elements.playerYear.value;
    const classLetter = elements.playerClass.value;
    gameConfig.playerName = elements.playerName.value.trim();
    gameConfig.playerSerie = `${year}º${classLetter}`;
    
    elements.currentPlayerName.textContent = gameConfig.playerName;
    elements.currentPlayerSerie.textContent = gameConfig.playerSerie;
    
    startRound();
}

// Início de Rodada
function startRound() {
    showScreen('gameScreen');
    
    userGuess = null;
    elements.confirmGuess.disabled = true;
    elements.mapOverlay.innerHTML = '';
    
    const available = locations.filter(loc => !usedLocations.includes(loc.id));
    if (available.length > 0) {
        currentLocation = available[Math.floor(Math.random() * available.length)];
    } else {
        currentLocation = locations[Math.floor(Math.random() * locations.length)];
    }
    
    usedLocations.push(currentLocation.id);
    
    elements.currentPhoto.src = currentLocation.photo;
    elements.round.textContent = gameConfig.currentRound;
    elements.score.textContent = gameConfig.score;
    
    startTimer();
}

function startTimer() {
    gameConfig.timeLeft = gameConfig.timePerRound;
    elements.timer.textContent = gameConfig.timeLeft;
    elements.timer.classList.remove('warning');
    if (currentTimer) clearInterval(currentTimer);
    
    currentTimer = setInterval(() => {
        gameConfig.timeLeft--;
        elements.timer.textContent = gameConfig.timeLeft;
        if (gameConfig.timeLeft <= 10) elements.timer.classList.add('warning');
        if (gameConfig.timeLeft <= 0) {
            clearInterval(currentTimer);
            timeUp();
        }
    }, 1000);
}

function timeUp() {
    if (!userGuess) {
        userGuess = null; 
        showRoundResult(false, 9999, 0); 
    } else {
        confirmGuess();
    }
}

// =========================================================
// LÓGICA DE CLIQUE COM PORCENTAGEM (Para funcionar com o zoom)
// =========================================================

function handleMapClick(event) {
    if (gameConfig.timeLeft <= 0) return;
    
    const img = elements.schoolMap;
    const rect = img.getBoundingClientRect();
    
    // Pega onde clicou na TELA (pixels visuais)
    const clickVisualX = event.clientX - rect.left;
    const clickVisualY = event.clientY - rect.top;
    
    // Converte para PORCENTAGEM
    const pctX = (clickVisualX / rect.width) * 100;
    const pctY = (clickVisualY / rect.height) * 100;
    
    // Salva em porcentagem
    userGuess = { xPct: pctX, yPct: pctY };
    
    // Desenha marcador usando porcentagem (assim ele acompanha o zoom do mapa)
    drawMarkerPercentage(pctX, pctY, 'user');
    
    elements.confirmGuess.disabled = false;
}

function drawMarkerPercentage(leftPct, topPct, type) {
    elements.mapOverlay.innerHTML = '';
    const marker = document.createElement('div');
    marker.className = `marker ${type}`;
    // Importante: Usa % para posicionar
    marker.style.left = `${leftPct}%`;
    marker.style.top = `${topPct}%`;
    elements.mapOverlay.appendChild(marker);
}

function confirmGuess() {
    if (!userGuess && gameConfig.timeLeft > 0) return;
    clearInterval(currentTimer);
    
    let points = 0;
    let distance = 9999;
    let isPerfect = false;

    if (userGuess) {
        // Converte a porcentagem do clique para pixels REAIS da imagem original para calcular a distância
        const img = elements.schoolMap;
        const realClickX = (userGuess.xPct / 100) * img.naturalWidth;
        const realClickY = (userGuess.yPct / 100) * img.naturalHeight;
        
        distance = calculateDistance(
            realClickX, realClickY,
            currentLocation.correctPosition.x,
            currentLocation.correctPosition.y
        );
        
        const maxScore = 1000;
        const maxErrorDistance = 200; 
        
        isPerfect = distance <= currentLocation.radius;
        
        if (isPerfect) {
            points = maxScore;
        } else if (distance < maxErrorDistance) {
            points = Math.round(maxScore * (1 - (distance / maxErrorDistance)));
        }
    }
    
    gameConfig.score += points;
    showRoundResult(isPerfect, distance, points);
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function showRoundResult(isPerfect, distance, pointsEarned) {
    showScreen('roundResultScreen');
    
    if (pointsEarned === 1000) {
        elements.resultIcon.textContent = '🎯';
        elements.resultTitle.textContent = 'NA MOSCA!';
        elements.resultMessage.innerHTML = `<p>Local: <b>${currentLocation.name}</b></p><p>Perfeito!</p>`;
        elements.pointsEarned.style.color = '#00ff00';
    } else if (pointsEarned > 0) {
        elements.resultIcon.textContent = '👍';
        elements.resultTitle.textContent = 'Foi Perto!';
        elements.resultMessage.innerHTML = `<p>Local: <b>${currentLocation.name}</b></p><p>Erro: ${Math.round(distance)}px</p>`;
        elements.pointsEarned.style.color = '#ffff00';
    } else {
        elements.resultIcon.textContent = '❌';
        elements.resultTitle.textContent = 'Longe...';
        elements.resultMessage.innerHTML = `<p>Local: <b>${currentLocation.name}</b></p><p>Não pontuou.</p>`;
        elements.pointsEarned.style.color = '#ff6b6b';
    }
    
    elements.pointsEarned.textContent = `+${pointsEarned}`;
    elements.totalScore.textContent = gameConfig.score;
    elements.nextRoundNumber.textContent = `${Math.min(gameConfig.currentRound + 1, gameConfig.totalRounds)}/${gameConfig.totalRounds}`;
}

function nextRound() {
    gameConfig.currentRound++;
    if (gameConfig.currentRound > gameConfig.totalRounds) {
        endGame();
    } else {
        startRound();
    }
}

function endGame() {
    showScreen('gameOverScreen');
    elements.finalPlayerName.textContent = gameConfig.playerName;
    elements.finalPlayerSerie.textContent = gameConfig.playerSerie;
    elements.finalScore.textContent = gameConfig.score;
    elements.performance.textContent = getPerformance(gameConfig.score);
}

function getPerformance(score) {
    const max = gameConfig.totalRounds * 1000;
    const pct = score / max;
    if (pct >= 0.9) return 'Lendário! 👑';
    if (pct >= 0.7) return 'Incrível! 🏆';
    if (pct >= 0.5) return 'Muito Bom! ⭐';
    if (pct >= 0.3) return 'Bom! 👍';
    return 'Continue Treinando! 💪';
}

function playAgain() {
    gameConfig.currentRound = 1;
    gameConfig.score = 0;
    usedLocations = [];
    startRound();
}

// Função para Voltar ao Menu (Reseta tudo)
function exitToMenu() {
    if (confirm("Tem certeza que deseja sair? O progresso será perdido.")) {
        if (currentTimer) clearInterval(currentTimer);
        
        // Reseta dados do jogo
        gameConfig.currentRound = 1;
        gameConfig.score = 0;
        usedLocations = [];
        userGuess = null;
        
        // Limpa campos do cadastro
        elements.playerName.value = '';
        elements.playerYear.value = '';
        elements.playerClass.value = '';
        elements.playerClass.disabled = true;
        elements.selectedName.classList.add('hidden');
        elements.selectedSerie.classList.add('hidden');
        elements.startGameBtn.disabled = true;
        
        showScreen('registrationScreen');
    }
}

document.addEventListener('DOMContentLoaded', init);