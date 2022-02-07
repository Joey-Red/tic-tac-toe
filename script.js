//Global Stuff
var turnNum = 1;
var playerTurn = 'even';
let gameOver = false;

let gameBoard = {
  boardMap: function(){
    gameBoard.boardSpot.forEach((boardSpot, index)=>{
      boardSpot.addEventListener("click", (e)=>{
        gameBoard.play(e, index)
        displayController.whosTurn();
      });
    }
  )},
  play: function(e, index){
    if (turnNum % 2 !== 0){
      if (e.target.textContent != 'X' && e.target.textContent!= 'O' && gameOver == false){
        e.target.textContent = playerOne.avatar;
        let col = index % 3
        let row = (index - col)/3
        winnerArr.arr[row][col] = playerOne.number;
        winnerArr.checkWinner()
      } else {} 
    } else {
      if (e.target.textContent != 'X' && e.target.textContent!= 'O' && gameOver == false){
        
        e.target.textContent = playerTwo.avatar;
        let col = index % 3
        let row = (index - col)/3
        winnerArr.arr[row][col] = playerTwo.number;
        winnerArr.checkWinner()
      } else {} 
    }
  }
}
let winnerArr = {
  arr: [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ],
  checkWinner: function(){
    for (let i = 0; i < 3; i++){
      let rowSum = winnerArr.arr[i][0] + winnerArr.arr[i][1] + winnerArr.arr[i][2];
      let colSum = winnerArr.arr[0][i] + winnerArr.arr[1][i] + winnerArr.arr[2][i];
      if (rowSum == 3 || colSum == 3){
        winnerArr.resetButtonController.disabled = false;
        winnerArr.resetButtonController.style.display = 'flex';
        winnerArr.winnerDiv.style.display = 'flex';
        winnerArr.winnerDiv.textContent = `${playerOne.name} (X) Wins!`
        return gameOver = true;
      } else if (rowSum == -3 || colSum == -3){
        winnerArr.resetButtonController.disabled = false;
        winnerArr.resetButtonController.style.display = 'flex';
        winnerArr.winnerDiv.style.display = 'flex';
        winnerArr.winnerDiv.textContent = `${playerTwo.name} (O) Wins!`
        return gameOver = true;
      }
    }
    let diagonalSumLR = winnerArr.arr[0][0] + winnerArr.arr[1][1] + winnerArr.arr[2][2]; 
    let diagonalSumRL = winnerArr.arr[0][2] + winnerArr.arr[1][1] + winnerArr.arr[2][0];  
    if (diagonalSumLR == 3 || diagonalSumRL == 3){
        winnerArr.resetButtonController.disabled = false;
        winnerArr.resetButtonController.style.display = 'flex';
        winnerArr.winnerDiv.style.display = 'flex';
        winnerArr.winnerDiv.textContent = `${playerOne.name} (X) Wins!`
        return gameOver = true;
      } else if (diagonalSumLR == -3 || diagonalSumRL == -3){
        winnerArr.resetButtonController.disabled = false;
        winnerArr.resetButtonController.style.display = 'flex';
        winnerArr.winnerDiv.style.display = 'flex';
        winnerArr.winnerDiv.textContent = `${playerTwo.name} (O) Wins!`
        return gameOver = true;
      } 
      if (winnerArr.arr[0].indexOf(0) == -1 && winnerArr.arr[1].indexOf(0) == -1 && winnerArr.arr[2].indexOf(0) == -1){
        winnerArr.winnerDiv.style.display = 'flex';
        winnerArr.winnerDiv.textContent = "Cat game!"
        winnerArr.resetButtonController.disabled = false;
        winnerArr.resetButtonController.style.display = 'flex';
        return gameOver = true;
    }
    
  }
}

winnerArr.winnerDiv = document.querySelector(".announceWinner");
winnerArr.winnerDiv.style.display = 'none';
winnerArr.resetButtonController = document.querySelector(".resetButton");
winnerArr.resetButtonController.disabled = true;
winnerArr.resetButtonController.style.display = 'none';


winnerArr.resetButtonController.addEventListener("click", function(){
  winnerArr.arr = 
  [
  [0,0,0],
  [0,0,0],
  [0,0,0]
  ];
  gameBoard.boardSpot.forEach((boardSpot)=>{
    boardSpot.textContent = ''
  });
  winnerArr.resetButtonController.disabled = true;
  winnerArr.resetButtonController.style.display = 'none';
  winnerArr.winnerDiv.style.display = 'none';
  gameOver = false;
  playerTurn = 'even';
  turnNum = 1;
})

gameBoard.boardSpot = document.querySelectorAll(".board");
gameBoard.boardMap();

let playerFactory = (number, avatar, name) => {
  return {number, avatar, name}
}

let playerOne = playerFactory(1, 'X', '');
let playerTwo = playerFactory(-1, 'O', '');
playerOne.name = prompt("Player One name:")
playerTwo.name = prompt("Player Two name:")

let displayController = {
  whosTurn: function(){
    let playerTwoTurn = 'even';
    let playerOneTurn = 'odd'; 
    if (turnNum % 2 == 0){
      playerTurn = playerTwoTurn;
      turnNum++
    } else if (turnNum %2!==0){
      playerTurn = playerOneTurn;
      turnNum++
    }
  }
}


