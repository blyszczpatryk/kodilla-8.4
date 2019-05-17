'use strict';

var newGameButton = document.getElementById('new-game-btn');

var output = document.getElementById('output');

var result = document.getElementById('result');

var rounds = document.getElementById('rounds-left');

var params = {
	roundsNumber: 0,
	playerWinnings: 0,
	computerWinnings: 0,
	moveNames: {
	    1: 'rock',
	    2: 'paper',
	    3: 'scissors'
	},
}

var playerPick;

var computerPick = params.moveNames[Math.floor(Math.random() * 3) + 1];

var showButtons = document.getElementById('game-buttons');

function hideElements(){
	showButtons.classList.add('hide-buttons');
}

function showRounds(){
	if (params.roundsNumber > 0){
		params.roundsNumber--;
		rounds.innerHTML = `Rounds left: ${params.roundsNumber}`
	}
};

function winner(){
	if (params.roundsNumber == 0 && params.playerWinnings > params.computerWinnings){
		output.innerHTML = 'YOU WON THE ENTIRE GAME!';
		hideElements();
	}
	else if (params.roundsNumber == 0 && params.playerWinnings < params.computerWinnings){
		output.innerHTML = 'YOU LOST THE GAME!';
		hideElements();
	}
	else if (params.roundsNumber == 0 && params.playerWinnings === params.computerWinnings){
		params.roundsNumber++;
		output.innerHTML = 'TIE! ONE EXTRA PICK!';
		rounds.innerHTML = `Rounds left: ${params.roundsNumber}`;
	}

};

function countWinnings(){
	if (playerPick === computerPick) {
		output.innerHTML = `TIE! You both played ${playerPick}.`;
		result.innerHTML = `${params.playerWinnings} - ${params.computerWinnings}`;
	}
	else if (playerPick === 'paper' && computerPick === 'rock' || playerPick === 'rock' && computerPick === 'scissors' || playerPick === 'scissors' && computerPick === 'paper'){
		output.innerHTML = `YOU WON! You played ${playerPick}. Computer played ${computerPick}.`;
		params.playerWinnings++;
		result.innerHTML = `${params.playerWinnings} - ${params.computerWinnings}`;
	}
	else {
		output.innerHTML = `YOU LOST! You played ${playerPick}. Computer played ${computerPick}.`;
		params.computerWinnings++;
		result.innerHTML = `${params.playerWinnings} - ${params.computerWinnings}`;
	}
};

function computerRandom(){
	computerPick = params.moveNames[Math.floor(Math.random() * 3) + 1];
	return computerPick;
};

var playerMove = function(){
	var button = this;
	playerPick = button.getAttribute('data-move');
	computerPick = computerRandom();
	countWinnings(playerPick, computerPick);
	showRounds(params.roundsNumber);
	winner(params.roundsNumber, params.playerWinnings, params.computerWinnings);
};

var gameButtons = document.getElementsByClassName('player-move');

for(var i = 0; i < gameButtons.length; i++){
	gameButtons[i].addEventListener('click', playerMove);
};

newGameButton.addEventListener('click', function() {
	params.roundsNumber = prompt('Set number of rounds');
	rounds.innerHTML = `Rounds left: ${params.roundsNumber}`
	showButtons.classList.remove('hide-buttons');
	params.playerWinnings = 0;
	params.computerWinnings = 0;
	result.innerHTML = `${params.playerWinnings} - ${params.computerWinnings}`;
	output.innerHTML = 'NEW GAME HAS STARTED!';
});