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

// Banco de dados dos locais
const locations = [
    {
        id: 1,
        name: "Biblioteca",
        photo: "fotos/biblioteca.jpg",
        correctPosition: { x: 150, y: 80 },
        radius: 30
    },
    {
        id: 2,
        name: "Quadra de Esportes",
        photo: "fotos/quadra.jpg",
        correctPosition: { x: 250, y: 180 },
        radius: 40
    },
    {
        id: 3,
        name: "Cantina",
        photo: "fotos/cantina.jpg",
        correctPosition: { x: 100, y: 150 },
        radius: 25
    },
    {
        id: 4,
        name: "Sala de Aula 101",
        photo: "fotos/sala-aula.jpg",
        correctPosition: { x: 200, y: 100 },
        radius: 20
    },
    {
        id: 5,
        name: "Auditório",
        photo: "fotos/auditorio.jpg",
        correctPosition: { x: 180, y: 200 },
        radius: 35
    }
];

// Variáveis globais
let currentLocation = null;
let usedLocations = [];
let userGuess = null;
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
    schoolMap: document.getElementById('schoolMap'),
    mapOverlay: document.getElementById('mapOverlay'),
    confirmGuess: document.getElementById('confirmGuess'),
    
    // Resultado
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultMessage: document.getElementById('resultMessage'),
    pointsEarned: document.getElementById('pointsEarned'),
    totalScore: document.getElementById('totalScore'),
    nextRoundNumber: document.getElementById('nextRoundNumber'),
    nextRoundBtn: document.getElementById('nextRoundBtn'),
    
    // Final
    finalPlayerName: document.getElementById('finalPlayerName'),
    finalPlayerSerie: document.getElementById('finalPlayerSerie'),
    finalScore: document.getElementById('finalScore'),
    performance: document.getElementById('performance'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    changePlayerBtn: document.getElementById('changePlayerBtn')
};

// Inicialização
function init() {
    setupEventListeners();
    showScreen('registrationScreen');
}

// Configurar event listeners
function setupEventListeners() {
    // Cadastro
    elements.playerName.addEventListener('input', updateStartButton);
    elements.playerYear.addEventListener('change', handleYearChange);
    elements.playerClass.addEventListener('change', updateStartButton);
    elements.startGameBtn.addEventListener('click', startGame);
    
    // Jogo
    elements.schoolMap.addEventListener('click', handleMapClick);
    elements.confirmGuess.addEventListener('click', confirmGuess);
    
    // Navegação
    elements.nextRoundBtn.addEventListener('click', nextRound);
    elements.playAgainBtn.addEventListener('click', playAgain);
    elements.changePlayerBtn.addEventListener('click', changePlayer);
}

// Mostrar tela específica
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ===== CADASTRO =====
function handleYearChange() {
    const year = elements.playerYear.value;
    
    // Habilitar/desabilitar seleção de turma
    if (year) {
        elements.playerClass.disabled = false;
    } else {
        elements.playerClass.disabled = true;
        elements.playerClass.value = '';
    }
    
    updateStartButton();
}

function updateStartButton() {
    const name = elements.playerName.value.trim();
    const year = elements.playerYear.value;
    const classLetter = elements.playerClass.value;
    
    if (name && year && classLetter) {
        elements.startGameBtn.disabled = false;
        elements.startGameBtn.classList.remove('disabled');
        
        // Atualizar informações selecionadas
        const serie = `${year}º${classLetter}`;
        elements.selectedName.classList.remove('hidden');
        elements.selectedName.querySelector('span').textContent = name;
        elements.selectedSerie.classList.remove('hidden');
        elements.selectedSerie.querySelector('span').textContent = serie;
    } else {
        elements.startGameBtn.disabled = true;
        elements.startGameBtn.classList.add('disabled');
        
        // Esconder informações se não estiver completo
        if (!name) elements.selectedName.classList.add('hidden');
        if (!year || !classLetter) elements.selectedSerie.classList.add('hidden');
    }
}

function startGame() {
    const year = elements.playerYear.value;
    const classLetter = elements.playerClass.value;
    
    gameConfig.playerName = elements.playerName.value.trim();
    gameConfig.playerSerie = `${year}º${classLetter}`;
    
    // Atualizar display do jogador
    elements.currentPlayerName.textContent = gameConfig.playerName;
    elements.currentPlayerSerie.textContent = gameConfig.playerSerie;
    
    startRound();
}

// ===== JOGO =====
function startRound() {
    showScreen('gameScreen');
    
    // Resetar rodada
    userGuess = null;
    elements.confirmGuess.disabled = true;
    elements.mapOverlay.innerHTML = '';
    
    // Selecionar local
    const availableLocations = locations.filter(loc => !usedLocations.includes(loc.id));
    if (availableLocations.length === 0) {
        endGame();
        return;
    }
    
    currentLocation = availableLocations[Math.floor(Math.random() * availableLocations.length)];
    usedLocations.push(currentLocation.id);
    
    // Atualizar interface
    elements.currentPhoto.src = currentLocation.photo;
    elements.round.textContent = gameConfig.currentRound;
    elements.score.textContent = gameConfig.score;
    
    // Iniciar timer
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
        
        // Aviso visual nos últimos 10 segundos
        if (gameConfig.timeLeft <= 10) {
            elements.timer.classList.add('warning');
        }
        
        // Tempo esgotado
        if (gameConfig.timeLeft <= 0) {
            clearInterval(currentTimer);
            timeUp();
        }
    }, 1000);
}

function timeUp() {
    if (!userGuess) {
        // Usuário não fez palpite - considerar como erro
        userGuess = { x: -100, y: -100 }; // Fora do mapa
        showRoundResult(false, 999);
    }
}

function handleMapClick(event) {
    if (gameConfig.timeLeft <= 0) return;
    
    const rect = elements.schoolMap.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Salvar palpite do usuário
    userGuess = { x: clickX, y: clickY };
    
    // Mostrar marcador
    elements.mapOverlay.innerHTML = '';
    const marker = document.createElement('div');
    marker.className = 'marker user';
    marker.style.left = `${clickX}px`;
    marker.style.top = `${clickY}px`;
    elements.mapOverlay.appendChild(marker);
    
    // Ativar botão de confirmar
    elements.confirmGuess.disabled = false;
}

function confirmGuess() {
    if (!userGuess || gameConfig.timeLeft <= 0) return;
    
    clearInterval(currentTimer);
    
    // Calcular distância
    const distance = calculateDistance(
        userGuess.x, userGuess.y,
        currentLocation.correctPosition.x,
        currentLocation.correctPosition.y
    );
    
    const isCorrect = distance <= currentLocation.radius;
    const points = isCorrect ? 100 : 0;
    
    // Atualizar pontuação
    gameConfig.score += points;
    
    // Mostrar resultado
    showRoundResult(isCorrect, distance);
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// ===== RESULTADOS =====
function showRoundResult(isCorrect, distance) {
    showScreen('roundResultScreen');
    
    // Mostrar marcadores no mapa do resultado
    elements.mapOverlay.innerHTML = '';
    
    // Marcador do usuário
    const userMarker = document.createElement('div');
    userMarker.className = `marker ${isCorrect ? 'correct' : 'user'}`;
    userMarker.style.left = `${userGuess.x}px`;
    userMarker.style.top = `${userGuess.y}px`;
    elements.mapOverlay.appendChild(userMarker);
    
    // Marcador correto (se errou)
    if (!isCorrect) {
        const correctMarker = document.createElement('div');
        correctMarker.className = 'marker correct';
        correctMarker.style.left = `${currentLocation.correctPosition.x}px`;
        correctMarker.style.top = `${currentLocation.correctPosition.y}px`;
        elements.mapOverlay.appendChild(correctMarker);
    }
    
    // Configurar mensagem
    if (isCorrect) {
        elements.resultIcon.textContent = '🎉';
        elements.resultTitle.textContent = 'Acertou!';
        elements.resultMessage.innerHTML = `
            <p>Você identificou corretamente:</p>
            <h3>${currentLocation.name}</h3>
            <p>+100 pontos!</p>
        `;
        elements.pointsEarned.textContent = '+100';
        elements.pointsEarned.style.color = '#00ff00';
    } else {
        elements.resultIcon.textContent = '❌';
        elements.resultTitle.textContent = 'Que pena!';
        elements.resultMessage.innerHTML = `
            <p>Este local era:</p>
            <h3>${currentLocation.name}</h3>
            <p>Você errou por ${Math.round(distance)} pixels</p>
        `;
        elements.pointsEarned.textContent = '+0';
        elements.pointsEarned.style.color = '#ff6b6b';
    }
    
    elements.totalScore.textContent = gameConfig.score;
    elements.nextRoundNumber.textContent = `${gameConfig.currentRound + 1}/${gameConfig.totalRounds}`;
}

function nextRound() {
    gameConfig.currentRound++;
    
    if (gameConfig.currentRound > gameConfig.totalRounds) {
        endGame();
    } else {
        startRound();
    }
}

// ===== FIM DO JOGO =====
function endGame() {
    showScreen('gameOverScreen');
    
    // Atualizar informações finais
    elements.finalPlayerName.textContent = gameConfig.playerName;
    elements.finalPlayerSerie.textContent = gameConfig.playerSerie;
    elements.finalScore.textContent = gameConfig.score;
    
    // Determinar desempenho
    const performance = getPerformance(gameConfig.score);
    elements.performance.textContent = performance;
}

function getPerformance(score) {
    const maxScore = gameConfig.totalRounds * 100;
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) return 'Incrível! 🏆';
    if (percentage >= 60) return 'Muito Bom! ⭐';
    if (percentage >= 40) return 'Bom! 👍';
    return 'Continue praticando! 💪';
}

function playAgain() {
    // Resetar jogo
    gameConfig.currentRound = 1;
    gameConfig.score = 0;
    usedLocations = [];
    
    startRound();
}

function changePlayer() {
    // Voltar para cadastro
    showScreen('registrationScreen');
    
    // Limpar seleções
    elements.playerName.value = '';
    elements.playerYear.value = '';
    elements.playerClass.value = '';
    elements.playerClass.disabled = true;
    
    // Esconder informações
    elements.selectedName.classList.add('hidden');
    elements.selectedSerie.classList.add('hidden');
    
    updateStartButton();
}

// Iniciar aplicação
document.addEventListener('DOMContentLoaded', init);

// ===== FUNÇÃO SAIR PARA O MENU =====
function exitToMenu() {
    if (confirm('Tem certeza que deseja sair? Seu progresso atual será perdido.')) {
        // Parar timer se estiver rodando
        if (currentTimer) {
            clearInterval(currentTimer);
            currentTimer = null;
        }
        
        // Resetar jogo
        gameConfig.currentRound = 1;
        gameConfig.score = 0;
        usedLocations = [];
        userGuess = null;
        
        // Voltar para o menu
        showScreen('registrationScreen');
        
        // Opcional: Manter dados do jogador ou limpar
        // elements.playerName.value = gameConfig.playerName; // Manter nome
        // elements.playerYear.value = ''; // Limpar seleções
        // elements.playerClass.value = '';
        // elements.playerClass.disabled = true;
    }
}

