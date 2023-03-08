const gameDisplay = document.querySelector('.game-title');
const gameBoard = document.querySelector('.board');
// Will change shortly depending on which game it's on, but for now, hard code
gameDisplay.innerText = 'Tic Tac Toe';
let turn = 0;
let playerAssignment = '';
//*******Need to do something here********/
const gameState = {
    players: ['X', 'O'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }
  
  function makeBoard(){
    for (let i=0;i<gameState.board.length; i++){
      for (let j=0;j<gameState.board.length;j++){
        const square = document.createElement("div");
        square.className ='box';
        square.id = `${i}${j}`;
        gameBoard.appendChild(square);
      }
    }
  }
  makeBoard();

const playerSelector1 = document.querySelector('#P1');
const playerSelector2 = document.querySelector('#P2');
playerSelector1.addEventListener('click',gameSetup);
playerSelector2.addEventListener('click',gameSetup);
function gameSetup(event){
    playerAssignment = gameState.players[Math.floor(Math.random()*2)];
    console.log(event.target.id);
    if (event.target.id === "P1"){
      console.log('single player game, you are: ', playerAssignment);
    }
    else{
      console.log('2 player game, player one is:  ', playerAssignment);
    }
}


//Player filling in the squares
gameBoard.addEventListener('click',fillInSquare);
function fillInSquare(event){
    const target = event.target;
    console.log(target.innerText);
    if (target.innerText === ''){
        const tempSquarePosition = target.id;
        target.innerText = playerAssignment;
        turn++;
        let arraySplit = tempSquarePosition.split("");
        gameState.board[parseInt(arraySplit[0])][parseInt(arraySplit[1])] = playerAssignment;
        evalWinCondition();
        changePlayers();
    }
    else{
        window.alert("The square is already filled in!");
    }
}

function changePlayers(){
  if (playerAssignment === 'X'){
    playerAssignment = 'O';
  }
  else if (playerAssignment === 'O'){
    playerAssignment = 'X';
  }
}

function evalWinCondition(){
//Row Win
  let gameWon = false;
  for (let i=0;i<gameState.board.length;i++){
    let rowCalc = 0;
    for (let j=0;j<gameState.board.length;j++){
      if (gameState.board[i][j]==='X'){
        rowCalc++;
      }
      else if (gameState.board[i][j]==='O'){
        rowCalc--;
      }
      if (rowCalc === gameState.board.length && gameWon === false){
        alert("Player X Wins!");
        gameWon = true;
      }
      else if (rowCalc === -gameState.board.length && gameWon === false){
        alert("Player O Wins!");
        gameWon = true;
      }
    }
  }
  //Column Win
  for (let i=0;i<gameState.board.length;i++){
    let colCalc = 0;
    for (let j=0;j<gameState.board.length;j++){
      if (gameState.board[j][i]==='X'){
        colCalc++;
      }
      else if (gameState.board[j][i]==='O'){
        colCalc--;
      }
      if (colCalc === gameState.board.length && gameWon === false){
        alert("Player X Wins!");
        gameWon = true;
      }
      else if (colCalc === -gameState.board.length && gameWon === false){
        alert("Player O Wins!");
        gameWon = true;
      }
    }
  }
  //Diagonal Win
  if ((gameState.board[0][0] + gameState.board[1][1] + gameState.board[2][2] === 'XXX' ||
      gameState.board[0][2] + gameState.board[1][1] + gameState.board[2][0] === 'XXX') && gameWon === false){
    alert("Player X Wins!");
    gameWon = true;
  }
  else if ((gameState.board[0][0] + gameState.board[1][1] + gameState.board[2][2] === 'OOO' ||
          gameState.board[0][2] + gameState.board[1][1] + gameState.board[2][0] === 'OOO') && gameWon === false){
    alert("Player O Wins!");
    gameWon = true;
  }
  //Check ties
  if (gameWon === false){
    let emptySquares = 9;
    for (let i=0;i<gameState.board.length; i++){
      for (let j=0;j<gameState.board.length; j++){
        if (gameState.board[i][j]!==null){
          emptySquares--;
        }
      }
    }
    if (emptySquares ===0){
      alert("There is a tie");
      gameWon = true;
    }
  }
}