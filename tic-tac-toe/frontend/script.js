document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const statusDiv = document.getElementById('status');
  const resetButton = document.getElementById('reset');

  const playerScoreDiv = document.getElementById('playerScore');
  const tieScoreDiv = document.getElementById('tieScore');
  const computerScoreDiv = document.getElementById('computerScore');

  const playerLabel = document.getElementById('playerLabel');
  const tieLabel = document.getElementById('tieLabel');
  const computerLabel = document.getElementById('computerLabel');

  const onepModeBtn = document.getElementById('onepMode');
  const twopModeBtn = document.getElementById('twopMode');

  
  let playerScore_pve = 0;
  let tieScore_pve = 0;
  let computerScore_pve = 0;

  
  let player1Score_pvp = 0;
  let tieScore_pvp = 0;
  let player2Score_pvp = 0;

  
  if(localStorage.getItem('playerScore_pve')) {
    playerScore_pve = parseInt(localStorage.getItem('playerScore_pve'), 10);
    tieScore_pve = parseInt(localStorage.getItem('tieScore_pve'), 10);
    computerScore_pve = parseInt(localStorage.getItem('computerScore_pve'), 10);
  }

  if(localStorage.getItem('player1Score_pvp')) {
    player1Score_pvp = parseInt(localStorage.getItem('player1Score_pvp'), 10);
    tieScore_pvp = parseInt(localStorage.getItem('tieScore_pvp'), 10);
    player2Score_pvp = parseInt(localStorage.getItem('player2Score_pvp'), 10);
  }

  let cells = Array.from(document.querySelectorAll('.cell'));
  let currentPlayer = 'X';  
  let gameActive = true;
  
  let gameMode = 'pvp'; 
  let boardState = Array(9).fill('');

  
  let awaitingComputerMove = false;

  const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function updateLabels() {
    if (gameMode === 'pvp') {
      playerLabel.textContent = 'PLAYER 1 (X)';
      computerLabel.textContent = 'PLAYER 2 (O)';
    } else {
      playerLabel.textContent = 'PLAYER (X)';
      computerLabel.textContent = 'COMPUTER (O)';
    }
    tieLabel.textContent = 'TIE';
  }

  function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (!gameActive || (gameMode === 'pve' && currentPlayer === 'O') || awaitingComputerMove) {
      return;
    }

    if (boardState[index] !== '') {
      return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      statusDiv.textContent = `Победитель: ${currentPlayer}`;
      gameActive = false;
      saveResult(currentPlayer);
      updateScores();
      return;
    }

    if (boardState.every(cell => cell !== '')) {
      statusDiv.textContent = 'Ничья!';
      gameActive = false;
      saveResult('draw');
      updateScores();
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'pve' && currentPlayer === 'O' && gameActive) {
      awaitingComputerMove = true;
      setTimeout(() => {
        computerMove();
      }, 500);
    }
  }

  function computerMove() {
    let emptyIndices = boardState
      .map((val, i) => val === '' ? i : null)
      .filter(i => i !== null);

    if (emptyIndices.length === 0) return;

    let randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    boardState[randIndex] = 'O';
    cells[randIndex].textContent = 'O';

    if (checkWin('O')) {
      statusDiv.textContent = 'Победил компьютер (O)';
      gameActive = false;
      saveResult('O');
      updateScores();
      awaitingComputerMove = false;
      return;
    }

    if (boardState.every(cell => cell !== '')) {
      statusDiv.textContent = 'Ничья!';
      gameActive = false;
      saveResult('draw');
      updateScores();
      awaitingComputerMove = false;
      return;
    }

    currentPlayer = 'X';
    awaitingComputerMove = false;
  }

  function checkWin(player) {
    return winningConditions.some(condition => {
      return condition.every(index => boardState[index] === player);
    });
  }

  function resetGame() {
    boardState = Array(9).fill('');
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    statusDiv.textContent = '';
    gameActive = true;
    awaitingComputerMove = false;
  }

  function saveResult(winner) {
    if (gameMode === 'pve') {
      
      if (winner === 'X') {
        playerScore_pve++;
      } else if (winner === 'O') {
        computerScore_pve++;
      } else if (winner === 'draw') {
        tieScore_pve++;
      }
      
      localStorage.setItem('playerScore_pve', playerScore_pve);
      localStorage.setItem('tieScore_pve', tieScore_pve);
      localStorage.setItem('computerScore_pve', computerScore_pve);

    } else {
      
      if (winner === 'X') {
        player1Score_pvp++;
      } else if (winner === 'O') {
        player2Score_pvp++;
      } else if (winner === 'draw') {
        tieScore_pvp++;
      }
      
      localStorage.setItem('player1Score_pvp', player1Score_pvp);
      localStorage.setItem('tieScore_pvp', tieScore_pvp);
      localStorage.setItem('player2Score_pvp', player2Score_pvp);
    }
  }

  function updateScores() {
    if (gameMode === 'pve') {
    
      playerScoreDiv.textContent = playerScore_pve;
      tieScoreDiv.textContent = tieScore_pve;
      computerScoreDiv.textContent = computerScore_pve;
    } else {
      
      playerScoreDiv.textContent = player1Score_pvp;
      tieScoreDiv.textContent = tieScore_pvp;
      computerScoreDiv.textContent = player2Score_pvp;
    }
  }

  onepModeBtn.addEventListener('click', () => {
    gameMode = 'pve';
    activateModeButton(onepModeBtn, twopModeBtn);
    updateLabels();
    updateScores();
    resetGame();
  });

  twopModeBtn.addEventListener('click', () => {
    gameMode = 'pvp';
    activateModeButton(twopModeBtn, onepModeBtn);
    updateLabels();
    updateScores();
    resetGame();
  });

  function activateModeButton(activeBtn, inactiveBtn) {
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
  }

  board.addEventListener('click', handleCellClick);
  resetButton.addEventListener('click', resetGame);

  updateScores();
  updateLabels();

 
  activateModeButton(twopModeBtn, onepModeBtn);
});
