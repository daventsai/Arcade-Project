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
        console.log(gameState.board);
        //changes to next player
        if (playerAssignment === 'X'){
          playerAssignment = 'O';
        }
        else if (playerAssignment === 'O'){
          playerAssignment = 'X';
        }
    }
    else{
        window.alert("The square is already filled in!");
    }
}
