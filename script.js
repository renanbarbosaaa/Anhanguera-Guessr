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
    { id: 1, name: "Entrada porta principal", photo: "Imagens/entradaPrincipal.jpg", correctPosition: { x: 588, y: 228 }, radius: 60 },
    { id: 2, name: "Secretaria", photo: "Imagens/secretaria.jpg", correctPosition: { x: 440, y: 267 }, radius: 60 },
    { id: 3, name: "Sala dos Professores", photo: "Imagens/salaProfs.jpg", correctPosition: { x: 433, y: 295 }, radius: 60 },
    { id: 4, name: "Informática", photo: "Imagens/informatica.jpg", correctPosition: { x: 425, y: 379 }, radius: 60 },
    { id: 5, name: "Sala 9 - Informática", photo: "Imagens/sala9.jpg", correctPosition: { x: 450, y: 370 }, radius: 60 },
    { id: 6, name: "Diretoria", photo: "Imagens/diretoria.jpg", correctPosition: { x: 516, y: 280 }, radius: 60 },
    { id: 7, name: "Corredor Inferior", photo: "Imagens/corredorInferior.jpg", correctPosition: { x: 689, y: 223 }, radius: 60 },
    { id: 8, name: "Corredor Superior Bloco B", photo: "Imagens/corredorBlocoB.jpg", correctPosition: { x: 484, y: 221 }, radius: 60 },
    { id: 9, name: "Banheiro Professores (2º Andar)", photo: "Imagens/banheiroProfs.jpg", correctPosition: { x: 665, y: 291 }, radius: 60 },
    { id: 10, name: "Escada Principal", photo: "Imagens/escadaBlocoPrincipal.jpg", correctPosition: { x: 587, y: 238 }, radius: 60 },
    { id: 11, name: "Porta  da entrada para o pátio", photo: "Imagens/portaRefeitorio.jpg", correctPosition: { x: 581, y: 346 }, radius: 60 },
    { id: 12, name: "Entrada do corredor pátio", photo: "Imagens/corredorRefeitorio.jpg", correctPosition: { x: 580, y: 370 }, radius: 60 },
    { id: 13, name: "Escada Bloco A", photo: "Imagens/escadaBlocoA.jpg", correctPosition: { x: 690, y: 345 }, radius: 60 },
    { id: 14, name: "Escada Bloco B", photo: "Imagens/escadaBlocoB.jpg", correctPosition: { x: 475, y: 342 }, radius: 60 },
    { id: 15, name: "Mesa exterior perto da escada bloco A", photo: "Imagens/mesaExterior.jpg", correctPosition: { x: 686, y: 419 }, radius: 60 },
    { id: 16, name: "Entrada para o bloco de espanhol", photo: "Imagens/entradaBlocoEspanhol.jpg", correctPosition: { x: 701, y: 607 }, radius: 60 },
    { id: 17, name: "Escada do bloco de espanhol", photo: "Imagens/escadaBlocoEspanhol.jpg", correctPosition: { x: 848, y: 579 }, radius: 60 },
    { id: 18, name: "Piso superior bloco de espanhol", photo: "Imagens/andarSupEspanhol.jpg", correctPosition: { x: 778, y: 594 }, radius: 60 },
    { id: 19, name: "Cantina", photo: "Imagens/cantina.jpg", correctPosition: { x: 652, y: 690 }, radius: 60 },
    { id: 20, name: "Entrada para sala de vídeo/biblioteca", photo: "Imagens/entradaBiblioteca.jpg", correctPosition: { x: 598, y: 770 }, radius: 60 },
    { id: 21, name: "Portão garagem", photo: "Imagens/portaoGaragem.jpg", correctPosition: { x: 572, y: 68 }, radius: 60 },
    { id: 22, name: "Saída da quadra", photo: "Imagens/saidaQuadra.jpg", correctPosition: { x: 438, y: 72 }, radius: 60 },
    { id: 23, name: "Lado esquerdo da entrada", photo: "Imagens/ladoEsqEntradaPrincipal.jpg", correctPosition: { x: 685, y: 202 }, radius: 60 },
    { id: 24, name: "Sala da coordenação", photo: "Imagens/salaAdriana.jpg", correctPosition: { x: 653, y: 290 }, radius: 60 },
    { id: 25, name: "Frente da cozinha", photo: "Imagens/frenteCozinha.jpg", correctPosition: { x: 501, y: 614 }, radius: 60 },
    { id: 26, name: "Entrada do bloco perto do bebedouro", photo: "Imagens/entradaBlocoBebedouro.jpg", correctPosition: { x: 410, y: 593 }, radius: 60 },
    { id: 27, name: "Escada do bloco do bebedouro", photo: "Imagens/escadaBlocoBebedouro.jpg", correctPosition: { x: 312, y: 576 }, radius: 60 },
    { id: 28, name: "Pátio ( perto do banheiro)", photo: "Imagens/patio.jpg", correctPosition: { x: 648, y: 613 }, radius: 60 },
    { id: 29, name: "Sala do Grêmio", photo: "Imagens/salaGremio.jpg", correctPosition: { x: 539, y: 328 }, radius: 60 },
    { id: 30, name: "Sala de vídeo", photo: "Imagens/salaVideo.jpg", correctPosition: { x: 666, y: 848 }, radius: 60 },
    { id: 31, name: "Fundos da escola", photo: "Imagens/fundoEscola.jpg", correctPosition: { x: 666, y: 1007 }, radius: 60 },
    { id: 32, name: "Corredor secretaria", photo: "Imagens/corredorSecretaria.jpg", correctPosition: { x: 484, y: 221 }, radius: 60 }
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
    finalPlayerRank: document.getElementById('finalPlayerRank'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    backToMenuBtn: document.getElementById('backToMenuBtn') // Botão Menu Final
    ,
    openLeaderboardBtn: document.getElementById('openLeaderboardBtn'),
    leaderboardScreen: document.getElementById('leaderboardScreen'),
    leaderboardTable: document.getElementById('leaderboardTable'),
    closeLeaderboardBtn: document.getElementById('closeLeaderboardBtn'),
    clearLeaderboardBtn: document.getElementById('clearLeaderboardBtn'),
    filterYear: document.getElementById('filterYear'),
    filterClass: document.getElementById('filterClass'),
    clearFiltersBtn: document.getElementById('clearFiltersBtn'),
    exportLeaderboardBtn: document.getElementById('exportLeaderboardBtn'),
    importLeaderboardBtn: document.getElementById('importLeaderboardBtn'),
    importJsonInput: document.getElementById('importJsonInput'),
    autoBackupCheckbox: document.getElementById('autoBackupCheckbox'),
    saveToLeaderboardBtn: document.getElementById('saveToLeaderboardBtn')
    ,muteBtn: document.getElementById('muteBtn'),
    volumeSlider: document.getElementById('volumeSlider'),
    practiceModeCheckbox: document.getElementById('practiceModeCheckbox'),
    exportLeaderboardCSVBtn: document.getElementById('exportLeaderboardCSVBtn'),
    copyLeaderboardBtn: document.getElementById('copyLeaderboardBtn'),
    copyResultBtn: document.getElementById('copyResultBtn'),
    timerRingProgress: document.getElementById('timerRingProgress'),
    modeIndicator: document.getElementById('modeIndicator'),
    revealZoneBtn: document.getElementById('revealZoneBtn'),
    revealCount: document.getElementById('revealCount'),
    difficultySelect: document.getElementById('difficultySelect'),
    filterDifficulty: document.getElementById('filterDifficulty'),
};

// Tutorial elements
elements.tutorialModal = document.getElementById('tutorialModal');
elements.closeTutorialBtn = document.getElementById('closeTutorialBtn');
elements.dontShowTutorial = document.getElementById('dontShowTutorial');
elements.openTutorialBtn = document.getElementById('openTutorialBtn');

// Confetti helper
function spawnConfetti(count = 30) {
    const container = document.getElementById('confettiContainer');
    // respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!container) return;
    const colors = ['#ffd166','#06d6a0','#118ab2','#ef476f','#ffe66d'];
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 20}%`;
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
        el.style.opacity = String(0.9 - Math.random()*0.3);
        container.appendChild(el);
        // Animate fall
        const fallDuration = 1500 + Math.random()*1000;
        el.animate([
            { transform: `translateY(0) rotate(${Math.random()*360}deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
        ], { duration: fallDuration, easing: 'cubic-bezier(.2,.8,.2,1)' });
        // Remove after animation
        setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, fallDuration + 200);
    }
}

// Simple sound using WebAudio for success/fail
function playTone(type='success') {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        if (type === 'success') o.frequency.value = 880;
        else if (type === 'perfect') o.frequency.value = 1320;
        else o.frequency.value = 220;
        if (audioMuted) return;
        const baseVolume = 0.0025;
        g.gain.value = baseVolume * Math.max(0, Math.min(1, audioVolume)); // subtle volume scaled
        o.connect(g); g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.12);
        // Fade out
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        // Close context after short time
        setTimeout(() => { try { ctx.close(); } catch (e) {} }, 300);
    } catch (e) {
        console.warn('Audio not supported', e);
    }
}

function init() {
    setupEventListeners();
    showScreen('registrationScreen');

    // Restore auto-backup checkbox state
    const auto = localStorage.getItem('leaderboard_auto_backup');
    if (auto && elements.autoBackupCheckbox) elements.autoBackupCheckbox.checked = auto === '1';
    // Show tutorial modal on first visit unless user opted out
    const seen = localStorage.getItem('anhanguera_seen_tutorial');
    if (!seen) showTutorial();
    // Restore audio settings
    const muted = localStorage.getItem('anhanguera_audio_mute');
    const vol = localStorage.getItem('anhanguera_audio_volume');
    audioMuted = muted === '1';
    audioVolume = vol ? parseFloat(vol) : 1.0;
    if (elements.muteBtn) elements.muteBtn.textContent = audioMuted ? '🔇' : '🔈';
    if (elements.volumeSlider) elements.volumeSlider.value = audioVolume;
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
    elements.openLeaderboardBtn.addEventListener('click', () => { displayLeaderboard(); showScreen('leaderboardScreen'); });
    elements.openTutorialBtn.addEventListener('click', () => { showTutorial(); });
    elements.closeLeaderboardBtn.addEventListener('click', () => showScreen('registrationScreen'));
    elements.clearLeaderboardBtn.addEventListener('click', clearLeaderboard);
    elements.filterYear.addEventListener('change', () => displayLeaderboard());
    elements.filterClass.addEventListener('change', () => displayLeaderboard());
    elements.clearFiltersBtn.addEventListener('click', () => { elements.filterYear.value = ''; elements.filterClass.value = ''; if (elements.filterDifficulty) elements.filterDifficulty.value = ''; displayLeaderboard(); });
    elements.exportLeaderboardBtn.addEventListener('click', exportLeaderboard);
    elements.importLeaderboardBtn.addEventListener('click', () => elements.importJsonInput.click());
    elements.importJsonInput.addEventListener('change', importLeaderboardFromFile);
    elements.autoBackupCheckbox.addEventListener('change', (e) => {
        localStorage.setItem('leaderboard_auto_backup', e.target.checked ? '1' : '0');
    });
    elements.saveToLeaderboardBtn.addEventListener('click', () => {
        if (!elements.saveToLeaderboardBtn.disabled) savePlayerScore();
    });
    // Audio controls
    if (elements.muteBtn) elements.muteBtn.addEventListener('click', () => {
        audioMuted = !audioMuted;
        localStorage.setItem('anhanguera_audio_mute', audioMuted ? '1' : '0');
        elements.muteBtn.textContent = audioMuted ? '🔇' : '🔈';
    });
    if (elements.volumeSlider) elements.volumeSlider.addEventListener('input', (e) => {
        audioVolume = parseFloat(e.target.value);
        localStorage.setItem('anhanguera_audio_volume', String(audioVolume));
    });
    // Practice mode checkbox (no save)
    if (elements.practiceModeCheckbox) elements.practiceModeCheckbox.addEventListener('change', () => {
        // Just visual change: we could show a small toast when toggled
        showToast(elements.practiceModeCheckbox.checked ? 'Modo Prática ativado (2 rodadas)' : 'Modo Prática desativado', 2000, 'info');
    });
    // Leaderboard CSV export / copy
    if (elements.exportLeaderboardCSVBtn) elements.exportLeaderboardCSVBtn.addEventListener('click', exportLeaderboardCSV);
    if (elements.copyLeaderboardBtn) elements.copyLeaderboardBtn.addEventListener('click', copyLeaderboardCSVToClipboard);
    if (elements.copyResultBtn) elements.copyResultBtn.addEventListener('click', copyGameResultToClipboard);
    
    // Navegação
    elements.nextRoundBtn.addEventListener('click', nextRound);
    elements.playAgainBtn.addEventListener('click', playAgain);
    elements.backToMenuBtn.addEventListener('click', exitToMenu);
        // Reveal Zone lifeline and Zoom controls
        if (elements.revealZoneBtn) elements.revealZoneBtn.addEventListener('click', () => revealZoneLifeline());
        // Difficulty filter
        if (elements.filterDifficulty) elements.filterDifficulty.addEventListener('change', () => displayLeaderboard());
}

// Tutorial modal event hooks
if (elements.closeTutorialBtn) {
    elements.closeTutorialBtn.addEventListener('click', () => {
        if (elements.dontShowTutorial && elements.dontShowTutorial.checked) {
            localStorage.setItem('anhanguera_seen_tutorial', '1');
        }
        hideTutorial();
    });
}
if (elements.tutorialModal) {
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.tutorialModal.getAttribute('aria-hidden') === 'false') hideTutorial();
    });
}

// Tutorial modal handlers
function showTutorial() {
    if (!elements.tutorialModal) return;
    elements.tutorialModal.setAttribute('aria-hidden', 'false');
}

function hideTutorial() {
    if (!elements.tutorialModal) return;
    elements.tutorialModal.setAttribute('aria-hidden', 'true');
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
    // Permite salvar o score novamente nesta nova sessão
    savedThisSession = false;
    // Practice mode
    if (elements.practiceModeCheckbox && elements.practiceModeCheckbox.checked) {
        gameConfig.isPractice = true;
        gameConfig.totalRounds = 2;
        if (elements.modeIndicator) elements.modeIndicator.style.display = 'inline-block';
    } else {
        gameConfig.isPractice = false;
        gameConfig.totalRounds = 5; // reset default
        if (elements.modeIndicator) elements.modeIndicator.style.display = 'none';
    }
    // Difficulty setting
    gameConfig.difficulty = elements.difficultySelect ? elements.difficultySelect.value : 'medium';
    const difficultySettings = {
        easy: { timePerRound: 40, radiusMultiplier: 1.8, maxErrorDistance: 300 },
        medium: { timePerRound: 30, radiusMultiplier: 1.0, maxErrorDistance: 200 },
        hard: { timePerRound: 20, radiusMultiplier: 0.6, maxErrorDistance: 150 }
    };
    const ds = difficultySettings[gameConfig.difficulty] || difficultySettings.medium;
    gameConfig.timePerRound = ds.timePerRound;
    gameConfig.difficultySettings = ds;
    // reset lifeline usage (allow 2 uses per match)
    gameConfig.lifelineUses = 2;
    if (elements.revealCount) elements.revealCount.textContent = `${gameConfig.lifelineUses}/2`;
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
    // Apply difficulty multiplier to effective radius and max error distance
    const ds = gameConfig.difficultySettings || { radiusMultiplier: 1, maxErrorDistance: 200 };
    currentLocation.effectiveRadius = currentLocation.radius * (ds.radiusMultiplier || 1);
    currentLocation.maxErrorDistance = ds.maxErrorDistance || 200;
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
    if (elements.timerRingProgress) elements.timerRingProgress.setAttribute('stroke-dashoffset', 0);
    if (currentTimer) clearInterval(currentTimer);
    
    currentTimer = setInterval(() => {
        gameConfig.timeLeft--;
        elements.timer.textContent = gameConfig.timeLeft;
        // Update circular timer progress based on time left
        if (elements.timerRingProgress) {
            const percent = gameConfig.timeLeft / gameConfig.timePerRound;
            const offset = (1 - percent) * 100;
            try { elements.timerRingProgress.setAttribute('stroke-dashoffset', offset); } catch (e) {}
        }
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
    // For user markers: keep only one marker so multiple clicks replace the marker
    if (type === 'user') {
        const existing = elements.mapOverlay.querySelectorAll('.marker.user');
        existing.forEach(e => e.parentNode.removeChild(e));
    }
    const marker = document.createElement('div');
    marker.className = `marker ${type}`;
    // Importante: Usa % para posicionar
    marker.style.left = `${leftPct}%`;
    marker.style.top = `${topPct}%`;
    elements.mapOverlay.appendChild(marker);
}

function clearMapOverlay() {
    elements.mapOverlay.innerHTML = '';
}

function drawGuessAndCorrectOverlay(userGuessPct, location) {
    // Clear overlay first
    clearMapOverlay();
    // Add user marker
    drawMarkerPercentage(userGuessPct.xPct, userGuessPct.yPct, 'user');

    const img = elements.schoolMap;
    const rect = img.getBoundingClientRect();
    const correctXpct = (location.correctPosition.x / img.naturalWidth) * 100;
    const correctYpct = (location.correctPosition.y / img.naturalHeight) * 100;
    // Add correct marker
    const correctMarker = document.createElement('div');
    correctMarker.className = 'marker correct';
    correctMarker.style.left = `${correctXpct}%`;
    correctMarker.style.top = `${correctYpct}%`;
    elements.mapOverlay.appendChild(correctMarker);

    // Circle for radius (convert radius in image pixels to current screen px)
    const radiusPx = location.radius * (rect.width / img.naturalWidth);
    const circle = document.createElement('div');
    circle.className = 'map-overlay-circle';
    circle.style.width = `${radiusPx * 2}px`;
    circle.style.height = `${radiusPx * 2}px`;
    circle.style.left = `${correctXpct}%`;
    circle.style.top = `${correctYpct}%`;
    elements.mapOverlay.appendChild(circle);

    // Draw line using SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'map-overlay-line-svg');
    svg.setAttribute('width', rect.width);
    svg.setAttribute('height', rect.height);
    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    // compute pixel positions
    const userXpx = (userGuessPct.xPct / 100) * rect.width;
    const userYpx = (userGuessPct.yPct / 100) * rect.height;
    const correctXpx = (correctXpct / 100) * rect.width;
    const correctYpx = (correctYpct / 100) * rect.height;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', userXpx);
    line.setAttribute('y1', userYpx);
    line.setAttribute('x2', correctXpx);
    line.setAttribute('y2', correctYpx);
    line.setAttribute('stroke', 'rgba(255,255,255,0.8)');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
    // Append svg with absolute positioning centered on mapOverlay
    svg.style.position = 'absolute';
    svg.style.left = '0'; svg.style.top = '0'; svg.style.width = '100%'; svg.style.height = '100%'; svg.style.pointerEvents = 'none';
    elements.mapOverlay.appendChild(svg);
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
        const maxErrorDistance = currentLocation.maxErrorDistance || 200; 
        
        isPerfect = distance <= (currentLocation.effectiveRadius || currentLocation.radius);
        
        if (isPerfect) {
            points = maxScore;
        } else if (distance < maxErrorDistance) {
            points = Math.round(maxScore * (1 - (distance / maxErrorDistance)));
        }
    }
    
    // Apply time bonus
    const timeBonus = Math.round((gameConfig.timeLeft / gameConfig.timePerRound) * TIME_BONUS_MAX);
    gameConfig.score += points + timeBonus;
    // Draw visual overlay showing user guess and correct location
    if (userGuess) drawGuessAndCorrectOverlay(userGuess, currentLocation);
    // show result with points earned and time bonus included
    showRoundResult(isPerfect, distance, points, timeBonus);
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function showRoundResult(isPerfect, distance, pointsEarned, timeBonus = 0) {
    showScreen('roundResultScreen');
    
    if (pointsEarned === 1000) {
        elements.resultIcon.textContent = '🎯';
        elements.resultTitle.textContent = 'NA MOSCA!';
        elements.resultMessage.innerHTML = `<p>Local: <b>${currentLocation.name}</b></p><p>Perfeito!</p>`;
        elements.pointsEarned.style.color = '#00ff00';
        // Celebration: confetti + sound
        spawnConfetti(40);
        playTone('perfect');
    } else if (pointsEarned > 0) {
        elements.resultIcon.textContent = '👍';
        elements.resultTitle.textContent = 'Foi Perto!';
        elements.resultMessage.innerHTML = `<p>Local: <b>${currentLocation.name}</b></p><p>Erro: ${Math.round(distance)}px</p>`;
        elements.pointsEarned.style.color = '#ffff00';
        playTone('success');
    } else {
        elements.resultIcon.textContent = '❌';
        elements.resultTitle.textContent = 'Longe...';
        elements.resultMessage.innerHTML = `<p>Local: <b>${currentLocation.name}</b></p><p>Não pontuou.</p>`;
        elements.pointsEarned.style.color = '#ff6b6b';
        playTone('fail');
    }
    
    const totalPoints = pointsEarned + (timeBonus || 0);
    elements.pointsEarned.textContent = `+${totalPoints}`;
    if (timeBonus && timeBonus > 0) {
        elements.resultMessage.innerHTML += `<p class="time-bonus">Bônus de tempo: +${timeBonus}</p>`;
    }
    elements.totalScore.textContent = gameConfig.score;
    elements.nextRoundNumber.textContent = `${Math.min(gameConfig.currentRound + 1, gameConfig.totalRounds)}/${gameConfig.totalRounds}`;
    // If practice mode, show textual hint
    if (gameConfig.isPractice) {
        const hint = getLocationHint(currentLocation.name);
        elements.resultMessage.innerHTML += `<p class="hint">Dica: ${hint}</p>`;
    }
}

function getLocationHint(name) {
    if (!name) return '';
    const lower = name.toLowerCase();
    if (lower.includes('bloco')) {
        const match = name.match(/Bloco\s+([A-Za-z0-9]+)/i);
        if (match && match[1]) return `No ${match[0]}`;
    }
    if (lower.includes('sala')) return 'É uma sala';
    if (lower.includes('entrada') || lower.includes('porta')) return 'Perto de uma entrada';
    if (lower.includes('cantina') || lower.includes('cozinha')) return 'Na área da cantina/cozinha';
    if (lower.includes('escada')) return 'Perto de uma escada';
    if (lower.includes('corredor')) return 'Em um corredor';
    // Otherwise give first word as hint
    const first = name.split(/\s+/)[0];
    return `Relacionado a: ${first}`;
}

function revealZoneLifeline() {
    if (!elements.revealZoneBtn) return;
    if (!('lifelineUses' in gameConfig)) gameConfig.lifelineUses = 2;
    if (gameConfig.lifelineUses <= 0) { showToast('Lifeline já utilizada nesta sessão', 2000, 'warn'); return; }
    if (!currentLocation) { showToast('Sem local atual', 2000, 'warn'); return; }
    const img = elements.schoolMap;
    const rect = img.getBoundingClientRect();
    const correctXpct = (currentLocation.correctPosition.x / img.naturalWidth) * 100;
    const correctYpct = (currentLocation.correctPosition.y / img.naturalHeight) * 100;
    const radiusPx = (currentLocation.effectiveRadius || currentLocation.radius) * (rect.width / img.naturalWidth);
    const reveal = document.createElement('div');
    reveal.className = 'map-overlay-circle';
    reveal.style.background = 'rgba(255,215,102,0.12)';
    reveal.style.border = '2px dashed rgba(255,215,102,0.9)';
    reveal.style.width = `${radiusPx * 2.6}px`;
    reveal.style.height = `${radiusPx * 2.6}px`;
    reveal.style.left = `${correctXpct}%`;
    reveal.style.top = `${correctYpct}%`;
    elements.mapOverlay.appendChild(reveal);
    gameConfig.lifelineUses = Math.max(0, (gameConfig.lifelineUses || 0) - 1);
    if (elements.revealCount) elements.revealCount.textContent = `${gameConfig.lifelineUses}/2`;
    if (gameConfig.lifelineUses <= 0) elements.revealZoneBtn.disabled = true;
    showToast('Área revelada por alguns segundos', 2500, 'info');
    setTimeout(() => { if (reveal.parentNode) reveal.parentNode.removeChild(reveal); }, 5500);
}

function zoomMap(factor) {
    mapScale = Math.max(1, Math.min(3, mapScale * factor));
    const transform = `scale(${mapScale})`;
    if (elements.schoolMap) elements.schoolMap.style.transform = transform;
    if (elements.mapOverlay) elements.mapOverlay.style.transform = transform;
}

function zoomReset() {
    mapScale = 1;
    if (elements.schoolMap) elements.schoolMap.style.transform = '';
    if (elements.mapOverlay) elements.mapOverlay.style.transform = '';
}

function spawnMedal(rank) {
    const container = document.body;
    const el = document.createElement('div');
    el.className = 'medal-anim';
    el.textContent = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : '🥉');
    container.appendChild(el);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 1200);
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

    // Reset save button state
    elements.saveToLeaderboardBtn.disabled = false;
    elements.saveToLeaderboardBtn.textContent = '💾 Salvar no Ranking';

    // Mostra a posição projetada no ranking (se fosse salvo agora)
    const projected = getProjectedPosition(gameConfig.score);
    if (projected <= LEADERBOARD_MAX) elements.finalPlayerRank.textContent = `#${projected}`;
    else elements.finalPlayerRank.textContent = `Fora do Top ${LEADERBOARD_MAX}`;
    // If in practice mode, disable save and show note
    if (gameConfig.isPractice) {
        elements.saveToLeaderboardBtn.disabled = true;
        showToast('Sessão em Modo Prática — não é possível salvar no Ranking.', 4000, 'warn');
    }
}

/* ======= RANKING / LEADERBOARD ======= */


const LEADERBOARD_KEY = 'anhanguera_guessr_leaderboard_v1';
const LEADERBOARD_MAX = 10;
let savedThisSession = false;
// Audio state
let audioMuted = false;
let audioVolume = 1.0; // 0..1
const TIME_BONUS_MAX = 250; // max bonus to add by time left

function getLeaderboard() {
    try {
        const raw = localStorage.getItem(LEADERBOARD_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        console.error('Erro ao ler o leaderboard', e);
        return [];
    }
}

function saveLeaderboard(list) {
    try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(list));
    } catch (e) {
        console.error('Erro ao salvar o leaderboard', e);
    }
}

function formatDateISOToShort(isoString) {
    const d = new Date(isoString);
    return d.toLocaleString();
}

function savePlayerScore() {
    if (savedThisSession) return;
    if (gameConfig.isPractice) { showToast('Modo prática: pontuação não pode ser salva', 3000, 'warn'); return; }
    const lb = getLeaderboard();
    const entry = {
        name: gameConfig.playerName || 'Anônimo',
        serie: gameConfig.playerSerie || '',
        difficulty: gameConfig.difficulty || 'medium',
        score: gameConfig.score || 0,
        date: new Date().toISOString()
    };
    lb.push(entry);
    // Ordena desc por score, se empate -> por data (mais recente na frente)
    lb.sort((a, b) => {
        if (b.score === a.score) return new Date(b.date) - new Date(a.date);
        return b.score - a.score;
    });
    const trimmed = lb.slice(0, LEADERBOARD_MAX);
    saveLeaderboard(trimmed);
    savedThisSession = true;
    elements.saveToLeaderboardBtn.disabled = true;
    elements.saveToLeaderboardBtn.textContent = '✅ Salvo!';
    // Mostrar posição ao jogador
    const position = trimmed.findIndex(e => e.name === entry.name && e.score === entry.score && e.date === entry.date) + 1;
    if (position > 0) {
        showToast(`✅ Score salvo! Você ficou na posição #${position}.`, 4000, 'success');
        if (position <= 3) { spawnConfetti(60); playTone('perfect'); spawnMedal(position); }
    } else {
        showToast('✅ Score salvo!', 3000, 'success');
    }
    // Atualiza tabela do leaderboard caso esteja aberta
    displayLeaderboard();
    // Se o auto-backup está ativo, exporta o JSON automaticamente
    try {
        const auto = localStorage.getItem('leaderboard_auto_backup');
        if (auto === '1') exportLeaderboard();
    } catch (e) {
        console.warn('Falha ao ler configuração de auto-backup', e);
    }
}


function showToast(message, timeout = 3000, kind='info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `toast ${kind}`;
    el.textContent = message;
    container.appendChild(el);
    // enter animation
    el.style.opacity = '0'; el.style.transform = 'translateY(-8px)';
    requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-8px)'; }, timeout - 300);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, timeout);
}

function displayLeaderboard() {
    const lb = getLeaderboard();
    const tbody = elements.leaderboardTable.querySelector('tbody');
    tbody.innerHTML = '';
        // Apply filters
    const selectedYear = elements.filterYear ? elements.filterYear.value : '';
    const selectedClass = elements.filterClass ? elements.filterClass.value : '';
    const selectedDifficulty = elements.filterDifficulty ? elements.filterDifficulty.value : '';
        let filtered = lb.slice();
    if (selectedYear) filtered = filtered.filter(e => e.serie && e.serie.startsWith(selectedYear));
    if (selectedClass) filtered = filtered.filter(e => e.serie && e.serie.includes(selectedClass));
    if (selectedDifficulty) filtered = filtered.filter(e => e.difficulty && e.difficulty === selectedDifficulty);
    if (!filtered || filtered.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 6;
        td.textContent = 'Nenhum registro ainda. Jogue e salve sua pontuação!';
        td.style.textAlign = 'center';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }
    filtered.forEach((entry, index) => {
        const tr = document.createElement('tr');
        if (index === 0) tr.classList.add('top');
        const tdRank = document.createElement('td'); tdRank.className = 'rank'; tdRank.textContent = index + 1;
        // medal icons for top 3
        if (index === 0) tdRank.innerHTML = '🥇';
        else if (index === 1) tdRank.innerHTML = '🥈';
        else if (index === 2) tdRank.innerHTML = '🥉';
        const tdName = document.createElement('td'); tdName.textContent = entry.name;
        const tdSerie = document.createElement('td'); tdSerie.textContent = entry.serie || '-';
            const tdDiff = document.createElement('td'); tdDiff.textContent = entry.difficulty || 'Dificuldade';
        const tdPoints = document.createElement('td'); tdPoints.className = 'points'; tdPoints.textContent = entry.score;
        const tdDate = document.createElement('td'); tdDate.className = 'date'; tdDate.textContent = formatDateISOToShort(entry.date);
        tr.appendChild(tdRank); tr.appendChild(tdName); tr.appendChild(tdSerie); tr.appendChild(tdDiff); tr.appendChild(tdPoints); tr.appendChild(tdDate);
        // For mobile friendly show labels
        tdRank.setAttribute('data-label', '#');
        tdName.setAttribute('data-label', 'Jogador');
        tdSerie.setAttribute('data-label', 'Série');
        tdDiff.setAttribute('data-label', 'Dificuldade');
        tdPoints.setAttribute('data-label', 'Pontos');
        tdDate.setAttribute('data-label', 'Data');
        tbody.appendChild(tr);
    });
}

function getProjectedPosition(score) {
    const lb = getLeaderboard();
    const higher = lb.filter(e => e.score > score).length;
    // Position is after those higher scores; ties will consider new entry to be more recent => goes immediately after higher.
    return higher + 1;
}

function clearLeaderboard() {
    if (!confirm('Tem certeza que deseja limpar o ranking? Esta ação não pode ser desfeita.')) return;
    localStorage.removeItem(LEADERBOARD_KEY);
    displayLeaderboard();
}

function exportLeaderboard() {
    const lb = getLeaderboard();
    const dataStr = JSON.stringify(lb, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = `anhanguera_guessr_leaderboard_${new Date().toISOString().slice(0,10)}.json`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportLeaderboardCSV() {
    const lb = getLeaderboard();
    if (!lb || lb.length === 0) { showToast('Nenhum registro para exportar', 2000, 'warn'); return; }
    const header = ['Rank','Jogador','Série','Dificuldade','Pontos','Data'];
    const rows = lb.map((r, idx) => [idx+1, r.name.replace(/"/g, '""'), r.serie, r.difficulty || 'medium', r.score, r.date]);
    const csv = [header].concat(rows).map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `anhanguera_guessr_leaderboard_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

function copyLeaderboardCSVToClipboard() {
    const lb = getLeaderboard();
    if (!lb || lb.length === 0) { showToast('Nenhum registro para copiar', 2000, 'warn'); return; }
    const header = ['Rank','Jogador','Série','Dificuldade','Pontos','Data'];
    const rows = lb.map((r, idx) => [idx+1, r.name, r.serie, r.difficulty || 'medium', r.score, r.date]);
    const csv = [header].concat(rows).map(r => r.map(String).join(',')).join('\n');
    navigator.clipboard.writeText(csv).then(() => showToast('CSV copiado para a área de transferência', 2500, 'success')).catch(() => showToast('Falha ao copiar', 2000, 'warn'));
}

function copyGameResultToClipboard() {
    const data = {
        name: gameConfig.playerName,
        serie: gameConfig.playerSerie,
        score: gameConfig.score,
        date: new Date().toISOString()
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => showToast('Resultado copiado!', 2500, 'success')).catch(() => showToast('Falha ao copiar', 2000, 'warn'));
}

function importLeaderboardFromFile(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if (!Array.isArray(json)) throw new Error('JSON inválido: esperado um array');
            // Basic validation: entries must have name, score, date
            const isValid = json.every(item => typeof item.name === 'string' && typeof item.score === 'number' && typeof item.date === 'string');
            if (!isValid) throw new Error('Formato inválido: cada entrada deve ter name (string), score (number) e date (ISO string)');
            if (!confirm('Deseja substituir o ranking atual pelos dados do arquivo importado?')) return;
            // Sort and trim to top
            json.sort((a, b) => {
                if (b.score === a.score) return new Date(b.date) - new Date(a.date);
                return b.score - a.score;
            });
            const trimmed = json.slice(0, LEADERBOARD_MAX);
            saveLeaderboard(trimmed);
            displayLeaderboard();
            alert('Ranking importado com sucesso!');
        } catch (err) {
            alert('Falha ao importar o arquivo JSON: ' + err.message);
        }
    };
    reader.readAsText(file);
    // Reset input so same file can be chosen again later
    event.target.value = null;
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
    // If practice mode, keep rounds small (2)
    if (elements.practiceModeCheckbox && elements.practiceModeCheckbox.checked) gameConfig.totalRounds = 2; else gameConfig.totalRounds = 5;
    gameConfig.isPractice = elements.practiceModeCheckbox && elements.practiceModeCheckbox.checked;
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
        savedThisSession = false;
        // reset lifeline count
        gameConfig.lifelineUses = 2;
        if (elements.revealCount) elements.revealCount.textContent = `${gameConfig.lifelineUses}/2`;
        
        showScreen('registrationScreen');
        // Reset any practice flags
        gameConfig.isPractice = false; gameConfig.totalRounds = 5;
    }
}

document.addEventListener('DOMContentLoaded', init);