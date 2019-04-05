'use strict';

var button = document.getElementById('rock');

var button2 = document.getElementById('paper');

var button3 = document.getElementById('scissors');

var button4 = document.getElementById('new-game-btn');

var output = document.getElementById('output');

var result = document.getElementById('result');

var rounds = document.getElementById('rounds-left');

var roundsNumber;

var playerPick;

var moveNames = {
    1: 'ROCK',
    2: 'PAPER',
    3: 'SCISSORS'
};

var computerPick = moveNames[Math.floor(Math.random() * 3) + 1];

var playerWinnings = 0;

var computerWinnings = 0;

var hideButtons = document.querySelector('.buttons');

function showRounds(){
	if (roundsNumber > 0){
		roundsNumber--;
		rounds.innerHTML = 'Rounds left: ' + roundsNumber;
	}
};

function winner(){
	if (roundsNumber == 0 && playerWinnings > computerWinnings){
		output.innerHTML = 'YOU WON THE ENTIRE GAME!';
	}
	else if (roundsNumber == 0 && playerWinnings < computerWinnings){
		output.innerHTML = 'YOU LOST THE GAME!';
	}
	else if (roundsNumber == 0 && playerWinnings === computerWinnings){
		roundsNumber++;
		output.innerHTML = 'TIE! ONE EXTRA PICK!';
		rounds.innerHTML = 'Rounds left: ' + roundsNumber;
	}
};

function countWinnings(){
	if (playerPick === computerPick) {
		output.innerHTML = 'TIE! You both played ' + playerPick + '.';
		result.innerHTML = playerWinnings + ' - ' + computerWinnings;
	}
	else if (playerPick === 'PAPER' && computerPick === 'ROCK' || playerPick === 'ROCK' && computerPick === 'SCISSORS' || playerPick === 'SCISSORS' && computerPick === 'PAPER'){
		output.innerHTML = 'YOU WON! You played ' + playerPick + '. Computer played ' + computerPick + '.';
		playerWinnings++;
		result.innerHTML = playerWinnings + ' - ' + computerWinnings;
	}
	else {
		output.innerHTML = 'YOU LOST! You played ' + playerPick + '. Computer played ' + computerPick + '.';
		computerWinnings++;
		result.innerHTML = playerWinnings + ' - ' +  computerWinnings;
	}
};

function computerRandom(){
	computerPick = moveNames[Math.floor(Math.random() * 3) + 1];
	return computerPick;
};

function playerPickedRock(){
	playerPick = 'ROCK';
	computerPick = computerRandom();
	countWinnings(playerPick, computerPick);
	showRounds(roundsNumber);
	winner(roundsNumber, playerWinnings, computerWinnings);
};

function playerPickedPaper(){
	playerPick = 'PAPER';
	computerPick = computerRandom();
	countWinnings(playerPick, computerPick);
	showRounds(roundsNumber);
	winner(roundsNumber, playerWinnings, computerWinnings);
};

function playerPickedScissors(){
	playerPick = 'SCISSORS';
	computerPick = computerRandom();
	countWinnings(playerPick, computerPick);
	showRounds(roundsNumber);
	winner(roundsNumber, playerWinnings, computerWinnings);
};

button.addEventListener('click', playerPickedRock);

button2.addEventListener('click', playerPickedPaper);

button3.addEventListener('click', playerPickedScissors);

button4.addEventListener('click') {
	roundsNumber = prompt('Set number of rounds');
	rounds.innerHTML = 'Rounds left: ' + roundsNumber;
};