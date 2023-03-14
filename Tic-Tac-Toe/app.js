const gameDisplay = document.querySelector('.game-title');
const gameBoard = document.querySelector('.board');
const p1Display = document.querySelector('.p1');
const p2Display = document.querySelector('.p2');
const p1Score = document.querySelector('.p1-score');
const p2Score = document.querySelector('.p2-score');
const dial = document.querySelector('.pop-up');
const playAgainButton = document.querySelector('#playAgain');
const resetButton = document.querySelector('#reset');
const turnInfo = document.querySelector('.under-board');
const turnText = document.querySelector('.turn');
const yourTurnText = document.querySelector('.your-move');
let boardSize;
let turn = 1;
let playerAssignment = '';
let gameWon = false;
const gameState = {
  players: ['X', 'O'],
  board: []
}
const players = [
  {
    name: '',
    wins: 0,
    symbol: ''
  },
  {
    name: '',
    wins: 0,
    symbol: ''
  }
]
let singlePlayerMode;
let compTurnPause = false;
gameDisplay.innerText = 'Tic Tac Toe';
const playerSelector1 = document.querySelector('#P1');
const playerSelector2 = document.querySelector('#P2');
playerSelector1.addEventListener('click',gameSetup);
playerSelector2.addEventListener('click',gameSetup);

function gameSetup(event){
  assignPlayerRole();
  promptPlayer(event);
  askSize();
  document.querySelector(".player-container").style.display = 'none';
  gameBoard.style.display = 'grid';
  document.querySelector(".player-position").style.display = 'flex';
  document.querySelector(".scores").style.display = 'flex';
  turnInfo.style.display = 'flex';
  checkCompTurn();
  if (players[0].name === null||players[1].name === null||boardSize===null){
    resetAll();
  }
}
function assignPlayerRole(){
  playerAssignment = gameState.players[Math.floor(Math.random()*2)];
  players[0].symbol = playerAssignment;
  if (playerAssignment === 'X'){
    players[1].symbol = 'O';
  }
  else{
    players[1].symbol = 'X';
  }
  playerAssignment = 'X';
}
function promptPlayer(event){
  if (event.target.id === "P1"){
    players[0].name = prompt("What is Player 1's name?");
    players[1].name = "Computer";
    singlePlayerMode = true;
  }
  else{
    players[0].name = prompt("What is Player 1's name?");
    if (players[0].name !== null){
      players[1].name = prompt("What is Player 2's name?");
    }
    singlePlayerMode = false;
  }
  players[0].wins = 0;
  players[1].wins = 0;
  p1Display.innerText = players[0].name + ' - ' + players[0].symbol;
  p2Display.innerText = players[1].name + ' - ' + players[1].symbol;
  p1Score.innerText = 'Wins: ' + players[0].wins;
  p2Score.innerText = 'Wins: ' + players[1].wins;
}
function askSize(){
  let correctSize = false;
  do{
    if (players[0].name !== null && players[1].name !== null){
      boardSize = prompt("What board size board would you like (enter a whole number)?");
    }
    else{
      resetAll();
      break;
    }
    if (!isNaN(boardSize)){
      correctSize = true;
      break;
    }
  } while (!correctSize);
  makeBoard();
}
function makeBoard(){
  for (let i=0;i<boardSize;i++){
    gameState.board.push([]);
    for (let j=0;j<boardSize;j++){
      gameState.board[i].push(null);
    }
  }
  document.querySelector(".board").style.gridTemplate = `repeat(${gameState.board.length},1fr)/repeat(${gameState.board.length},1fr)`;
  for (let i=0;i<gameState.board.length; i++){
    for (let j=0;j<gameState.board.length;j++){
      const square = document.createElement("div");
      square.className ='box';
      square.id = `${i}-${j}`;
      square.style.fontSize = (280/gameState.board.length)+'px'
      gameBoard.appendChild(square);
    }
  }
  turnText.innerText = `Turn: ${turn}`;
  if (players[0].symbol === 'X' && playerAssignment ==='X'){
    yourTurnText.innerText = `${players[0].name}, it is your move`;
  }
  else{
    yourTurnText.innerText = `${players[1].name}, it is your move`;
  }
}
//Player filling in the squares
gameBoard.addEventListener('click',fillInSquare);
function fillInSquare(event){
  if (((singlePlayerMode === true && players[0].symbol === playerAssignment)||singlePlayerMode === false) && compTurnPause === false){
    const target = event.target;
    if (target.innerText === '' && gameWon===false){
      const tempSquarePosition = target.id;
      target.innerText = playerAssignment;
      let arraySplit = tempSquarePosition.split("-");
      gameState.board[parseInt(arraySplit[0])][parseInt(arraySplit[1])] = playerAssignment;
      evalWinCondition();
      changePlayers();
      if (gameWon !== true){
        turn++;
        turnText.innerText = `Turn: ${turn}`;
      }
    }
    else if ((target.innerText === 'X' || target.innerText === 'O') && gameWon ===false){
      target.classList.add('animate');
      target.addEventListener('animationend',(event)=>{
        if (event.animationName === 'shake'){
          target.classList.remove('animate');
        }
      });
    }
  }
  checkCompTurn();
}
function changePlayers(){
  if (gameWon !== true){
    if (playerAssignment === 'X'){
      playerAssignment = 'O';
    }
    else if (playerAssignment === 'O'){
      playerAssignment = 'X';
    }
    if (players[0].symbol ===playerAssignment){
      yourTurnText.innerText = `${players[0].name}, it is your move`;
    }
    else{
      yourTurnText.innerText = `${players[1].name}, it is your move`;
    }
  }
}

function evalWinCondition(){
//Row Win
  let boardLen = gameState.board.length;
  for (let i=0;i<boardLen;i++){
    let rowCalc = 0;
    for (let j=0;j<boardLen;j++){
      if (gameState.board[i][j]==='X'){
        rowCalc++;
      }
      else if (gameState.board[i][j]==='O'){
        rowCalc--;
      }
      if (rowCalc === boardLen && gameWon === false){
        gameWon = true;
      }
      else if (rowCalc === -boardLen && gameWon === false){
        gameWon = true;
      }
    }
  }
  //Column Win
  for (let i=0;i<boardLen;i++){
    let colCalc = 0;
    for (let j=0;j<boardLen;j++){
      if (gameState.board[j][i]==='X'){
        colCalc++;
      }
      else if (gameState.board[j][i]==='O'){
        colCalc--;
      }
      if (colCalc === boardLen && gameWon === false){
        gameWon = true;
      }
      else if (colCalc === -boardLen && gameWon === false){
        gameWon = true;
      }
    }
  }
  //Diagonal Win New
  let diagCalc1 = 0;
  let diagCalc2 = 0;
  for (let i=0;i<boardLen;i++){
    for (let j=0;j<boardLen;j++){
      if (gameState.board[i][j] === "X" && i===j && i===boardLen-j-1){
        diagCalc1++;
        diagCalc2++;
      }
      else if (gameState.board[i][j] ==="X" && i===j){
        diagCalc1++;
      }
      else if (gameState.board[i][j] === "X" && i===boardLen-j-1){
        diagCalc2++;
      }
      else if (gameState.board[i][j] === "O" && i===j && i===boardLen-j-1){
        diagCalc1--;
        diagCalc2--;
      }
      else if (gameState.board[i][j] ==="O" && i===j){
        diagCalc1--;
      }
      else if (gameState.board[i][j] === "O" && i===boardLen-j-1){
        diagCalc2--;
      }
      if (diagCalc1 === boardLen && gameWon === false){
        gameWon = true;
      }
      else if (diagCalc1 === -boardLen && gameWon === false){
        gameWon = true;
      }
      else if (diagCalc2 === boardLen && gameWon === false){
        gameWon = true;
      }
      else if (diagCalc2 === -boardLen && gameWon === false){
        gameWon = true;
      }
    }
  }
  if (gameWon === true){
    if (players[0].symbol === playerAssignment){
      players[0].wins++;
      p1Score.innerText = 'Wins: '+ players[0].wins;
      setTimeout(()=>{
        alert(`${players[0].name} Wins!`);
      },10);
    }
    else{
      players[1].wins++;
      p2Score.innerText = 'Wins: '+ players[1].wins;
      setTimeout(()=>{
        alert(`${players[1].name} Wins!`);
      },10);
    }
  }

  //Check ties
  if (gameWon === false){
    let emptySquares = boardLen*boardLen;
    for (let i=0;i<boardLen; i++){
      for (let j=0;j<boardLen; j++){
        if (gameState.board[i][j]!==null){
          emptySquares--;
        }
      }
    }
    if (emptySquares ===0){
      setTimeout(()=>{
        alert(`There is a tie!`);
      },10);
      gameWon = true;
    }
  }
  if (gameWon === true){
    dial.show();
  }
}
function resetBoard(){
  gameState.board = [];
  const squares = document.getElementsByClassName("box");
  while(squares.length > 0){
    squares[0].parentNode.removeChild(squares[0]);
  }
}

playAgainButton.addEventListener("click",()=>{
  resetBoard();
  assignPlayerRole();
  p1Display.innerText = players[0].name + ' - ' + players[0].symbol;
  p2Display.innerText = players[1].name + ' - ' + players[1].symbol;
  turn = 1;
  gameWon = false;
  makeBoard();
  checkCompTurn();
});

resetButton.addEventListener("click",(event)=>{
  resetAll();
});

function resetAll(){
  resetBoard();
  document.querySelector(".player-container").style.display = '';
  gameBoard.style.display = 'none';
  document.querySelector(".player-position").style.display = 'none';
  document.querySelector(".scores").style.display = 'none';
  turnInfo.style.display = 'none';
  gameWon = false;
  turn = 1;
}

//Computer Logic
function compTurn(){
  compTurnPause = true;
  setTimeout(()=>{
    let boardLen = gameState.board.length;
    const emptySpaceMap = new Map();
    let key = 0;
    for (let i=0;i<boardLen;i++){
      for (let j=0;j<boardLen;j++){
        if (gameState.board[i][j]===null){
          emptySpaceMap.set(key,`${i}-${j}`);
          key++;
        }
      }
    }
    if (key > 0){
      const randChoice = Math.floor(Math.random()*key);
      let mapSplit = emptySpaceMap.get(randChoice).split("-");
      console.log(mapSplit);
      gameState.board[parseInt(mapSplit[0])][parseInt(mapSplit[1])] = playerAssignment;
      document.getElementById(`${emptySpaceMap.get(randChoice)}`).innerText = playerAssignment;
      evalWinCondition();
      changePlayers();
      if (gameWon !== true){
        turn++;
        turnText.innerText = `Turn: ${turn}`;
      }
    }
    compTurnPause = false;
  },500);
}
function checkCompTurn(){
  if (playerAssignment === players[1].symbol && singlePlayerMode === true && compTurnPause === false){
    compTurn();
  }
}