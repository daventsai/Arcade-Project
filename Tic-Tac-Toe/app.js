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
  let decision;
  compTurnPause = true;
  //for randomized comp AI selection
  setTimeout(()=>{
    compAI();
    compTurnPause = false;
  },500);
}
function checkCompTurn(){
  if (playerAssignment === players[1].symbol && singlePlayerMode === true && compTurnPause === false){
    compTurn();
  }
}

//compAI - concept: fill in all empty slots of the board with T for temp and then calculate
//                  a percentage for winning combos using number of T's in the winning combo
//                  over the tempBoard.length. Based on %, it will either random a choice,
//                  block a move, or go for a win 
function compAI(){
  const tempBoard = gameState.board.map(arr=>arr.slice());
  const possibleDecisionLv1=[];
  const possibleDecisionLv2=[];
  const possibleDecisionLv3=[];
  const possibleDecisionLv4=[];
  const randoDecision=[];
  //Row check---------------------------------------------------------
  for (let i=0;i<tempBoard.length;i++){
    let rowCalc = 0;
    //checks future outcome probability for winning
    for (let j=0;j<tempBoard.length;j++){
      let onlySameSymbol = true;
      let symbolStorage = [];
      if (tempBoard[i][j]===players[1].symbol){
        symbolStorage.push(tempBoard[i][j]);
        if (symbolStorage.length > 1){
          for (let k=1;k<symbolStorage.length;k++){
            if (symbolStorage[k-1] !== symbolStorage[k]){
              onlySameSymbol = false;
              continue;
            }
          }
        }
        if (onlySameSymbol ===true){
          rowCalc++;
        }
      }
      else if (tempBoard[i][j]===players[0].symbol){
        symbolStorage.push(tempBoard[i][j]);
        if (symbolStorage.length > 1){
          for (let k=1;k<symbolStorage.length;k++){
            if (symbolStorage[k-1] !== symbolStorage[k]){
              onlySameSymbol = false;
              continue;
            }
          }
        }
        if (onlySameSymbol ===true){
          rowCalc--;
        }
      }
      if (tempBoard[i][j]===null){
        randoDecision.push(`${i}-${j}`);
      }
      //does math check for probability for winning and assigns a weight for which to push
      if (rowCalc<0 && ((((rowCalc*-1)/tempBoard.length)*100)>=30 || ((rowCalc/tempBoard.length)*100)>=30)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[i][k]===null){
            possibleDecisionLv1.push(`${i}-${k}`);
          }
        }
      }
      if (rowCalc<0 && ((((rowCalc*-1)/tempBoard.length)*100)>=45|| ((rowCalc/tempBoard.length)*100)>=45)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[i][k]===null){
            possibleDecisionLv2.push(`${i}-${k}`);
          }
        }
      }
      if (rowCalc<0 && ((((rowCalc*-1)/tempBoard.length)*100)>=60|| ((rowCalc/tempBoard.length)*100)>=60)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[i][k]===null){
            possibleDecisionLv3.push(`${i}-${k}`);
          }
        }
      }
      if (rowCalc<0 && ((((rowCalc*-1)/tempBoard.length)*100)>=75|| ((rowCalc/tempBoard.length)*100)>=75)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[i][k]===null){
            possibleDecisionLv4.push(`${i}-${k}`);
          }
        }
      }
    }
  }
  //column check---------------------------------------------------------
  for (let i=0;i<tempBoard.length;i++){
    let colCalc = 0;
    //checks future outcome probability for winning
    for (let j=0;j<tempBoard.length;j++){
      let onlySameSymbol = true;
      let symbolStorage = [];
      if (tempBoard[j][i]===players[1].symbol){
        symbolStorage.push(tempBoard[j][i]);
        if (symbolStorage.length > 1){
          for (let k=1;k<symbolStorage.length;k++){
            if (symbolStorage[k-1] !== symbolStorage[k]){
              onlySameSymbol = false;
              continue;
            }
          }
        }
        if (onlySameSymbol ===true){
          colCalc++;
        }
      }
      else if (tempBoard[j][i]===players[0].symbol){
        symbolStorage.push(tempBoard[j][i]);
        if (symbolStorage.length > 1){
          for (let k=1;k<symbolStorage.length;k++){
            if (symbolStorage[k-1] !== symbolStorage[k]){
              onlySameSymbol = false;
              continue;
            }
          }
        }
        if (onlySameSymbol ===true){
          colCalc--;
        }
      }
      if (tempBoard[j][i]===null){
        randoDecision.push(`${j}-${i}`);
      }
      //does math check for probability for winning and assigns a weight for which to push
      if (colCalc<0 && ((((colCalc*-1)/tempBoard.length)*100)>=30 || ((colCalc/tempBoard.length)*100)>=30)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[k][i]===null){
            possibleDecisionLv1.push(`${k}-${i}`);
          }
        }
      }
      if (colCalc<0 && ((((colCalc*-1)/tempBoard.length)*100)>=45|| ((colCalc/tempBoard.length)*100)>=45)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[k][i]===null){
            possibleDecisionLv2.push(`${k}-${i}`);
          }
        }
      }
      if (colCalc<0 && ((((colCalc*-1)/tempBoard.length)*100)>=60|| ((colCalc/tempBoard.length)*100)>=60)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[k][i]===null){
            possibleDecisionLv3.push(`${k}-${i}`);
          }
        }
      }
      if (colCalc<0 && ((((colCalc*-1)/tempBoard.length)*100)>=75|| ((colCalc/tempBoard.length)*100)>=75)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[k][i]===null){
            possibleDecisionLv4.push(`${k}-${i}`);
          }
        }
      }
    }
  }
  //diagonal check-------------------------------------------------------
  let diagCalc1 = 0;
  let diagCalc2 = 0;
  for (let i=0;i<tempBoard.length;i++){
    //checks future outcome probability for winning
    for (let j=0;j<tempBoard.length;j++){
      if (tempBoard[i][j]===players[1].symbol && i===j && i===tempBoard.length-j-1){
        diagCalc1++;
        diagCalc2++
      }
      else if (tempBoard[i][j]===players[1].symbol && i===j){
        diagCalc1++;
      }
      else if (tempBoard[i][j] === players[1].symbol && i===tempBoard.length-j-1){
        diagCalc2++;
      }
      else if (tempBoard[i][j] === players[0].symbol && i===j && i===tempBoard.length-j-1){
        diagCalc1--;
        diagCalc2--;
      }
      else if (tempBoard[i][j]===players[0].symbol && i===j){
        diagCalc1--;
      }
      else if (tempBoard[i][j] === players[0].symbol && i===tempBoard.length-j-1){
        diagCalc2--;
      }
      if (tempBoard[i][j]===null){
        randoDecision.push(`${i}-${j}`);
      }
      //does math check for probability for winning and assigns a weight for which to push
      if ((diagCalc1<0 && ((((diagCalc1*-1)/tempBoard.length)*100)>=30 || ((diagCalc1/tempBoard.length)*100)>=30))||diagCalc2<0 && ((((diagCalc2*-1)/tempBoard.length)*100)>=30 || ((diagCalc2/tempBoard.length)*100)>=30)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[i][k]===null){
            possibleDecisionLv1.push(`${i}-${k}`);
          }
        }
      }
      if ((diagCalc1<0 && ((((diagCalc1*-1)/tempBoard.length)*100)>=45|| ((diagCalc1/tempBoard.length)*100)>=45))||diagCalc2<0 && ((((diagCalc2*-1)/tempBoard.length)*100)>=45|| ((diagCalc2/tempBoard.length)*100)>=45)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[i][k]===null){
            possibleDecisionLv2.push(`${i}-${k}`);
          }
        }
      }
      if ((diagCalc1<0 && ((((diagCalc1*-1)/tempBoard.length)*100)>=60|| ((diagCalc1/tempBoard.length)*100)>=60))||diagCalc2<0 && ((((diagCalc2*-1)/tempBoard.length)*100)>=60|| ((diagCalc2/tempBoard.length)*100)>=60)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[i][k]===null){
            possibleDecisionLv3.push(`${i}-${k}`);
          }
        }
      }
      if ((diagCalc1<0 && ((((diagCalc1*-1)/tempBoard.length)*100)>=75|| ((diagCalc1/tempBoard.length)*100)>=75))||diagCalc2<0 && ((((diagCalc2*-1)/tempBoard.length)*100)>=75|| ((diagCalc2/tempBoard.length)*100)>=75)){
        for (let k=0;k<tempBoard.length;k++){
          if (tempBoard[i][k]===null){
            possibleDecisionLv4.push(`${i}-${k}`);
          }
        }
      }
    }
  }
  //Choosing which to go with--------------------------------------------
  if (possibleDecisionLv4.length>0){
    decision = possibleDecisionLv4[Math.floor(Math.random()*possibleDecisionLv4.length)];
  }
  else if (possibleDecisionLv3.length>0){
    decision = possibleDecisionLv3[Math.floor(Math.random()*possibleDecisionLv4.length)];
  }
  else if (possibleDecisionLv2.length>0 && possibleDecisionLv1.length>0){
    if (Math.random()*100>70){
      decision = possibleDecisionLv2[Math.floor(Math.random()*possibleDecisionLv2.length)];
    }
    else {
      decision = possibleDecisionLv1[Math.floor(Math.random()*possibleDecisionLv1.length)];
    }
  }
  else if (possibleDecisionLv1.length>0){
    decision = possibleDecisionLv1[Math.floor(Math.random()*possibleDecisionLv1.length)];
  }
  else{
    decision = randoDecision[Math.floor(Math.random()*randoDecision.length)];
  }
  console.log(decision);
  console.log(`number of lv1: ${possibleDecisionLv1.length}, number of lv2: ${possibleDecisionLv2.length}, number of lv3: ${possibleDecisionLv3.length}, number of lv4: ${possibleDecisionLv4.length}`);
  let split = decision.split("-");
  gameState.board[parseInt(split[0])][parseInt(split[1])] = playerAssignment;
  document.getElementById(`${decision}`).innerText = playerAssignment;
  evalWinCondition();
  changePlayers();
  if (gameWon !== true){
    turn++;
    turnText.innerText = `Turn: ${turn}`;
  }
}