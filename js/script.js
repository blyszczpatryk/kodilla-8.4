'use strict';

const newGameButton = document.getElementById('new-game-btn');

const output = document.getElementById('output');

const result = document.getElementById('result');

const rounds = document.getElementById('rounds-left');

const modalOutput = document.getElementsByClassName('content')[0];

let params = {
	roundsNumber: 0,
	playerWinnings: 0,
	computerWinnings: 0,
	moveNames: {
	    1: 'paper',
	    2: 'rock',
	    3: 'scissors'
	},
	progress: [],
}

let objects;

let roundResult;

let table = document.querySelector("table");

let playerPick;

let computerPick = params.moveNames[Math.floor(Math.random() * 3) + 1];

function generateTableHead(table, data) {
	let thead = table.createTHead();
	let row = thead.insertRow();
	for (let key of Object.keys(params.progress[0])) {
		let th = document.createElement('th');
		let text = document.createTextNode(key);
		th.appendChild(text);
		row.appendChild(th);
	}
};

function generateTable(table, data) {
  	for (let element of data) {
    	let row = table.insertRow();
    	for (let key in element) {
      		let cell = row.insertCell();
      		let text = document.createTextNode(element[key]);
      		cell.appendChild(text);
    	}
  	}
};

function removeTable() {
	var tableParrent = document.getElementById('myTable');
	for(var i = tableParrent.rows.length - 1; i >= 0; i--) {
		tableParrent.deleteRow(i);
	}
};

function hideElements(){
	showButtons.classList.add('hide-buttons');
};

function showRounds(){
	if (params.roundsNumber > 0){
		params.roundsNumber--;
		rounds.innerHTML = `Rounds left: ${params.roundsNumber}`
	}
};

function winnings(text){
	modalOutput.innerHTML = text;
	hideElements();
	showModal();
	let data = Object.keys(params.progress[0])
	generateTableHead(table, data);
	generateTable(table, params.progress);
};

function winner(){
	if (params.roundsNumber == 0 && params.playerWinnings > params.computerWinnings){
		winnings('YOU WON THE ENTIRE GAME!');
	}
	else if (params.roundsNumber == 0 && params.playerWinnings < params.computerWinnings){
		winnings('YOU LOST THE GAME!');
	}
	else if (params.roundsNumber == 0 && params.playerWinnings === params.computerWinnings){
		winnings('TIE');
	}

};

function countWinnings(){
	if (playerPick === computerPick) {
		output.innerHTML = `TIE! You both played ${playerPick}.`;
		result.innerHTML = `${params.playerWinnings} - ${params.computerWinnings}`;
		roundResult = '0 - 0';
	}
	else if (playerPick === 'paper' && computerPick === 'rock' || playerPick === 'rock' && computerPick === 'scissors' || playerPick === 'scissors' && computerPick === 'paper'){
		output.innerHTML = `YOU WON! You played ${playerPick}. Computer played ${computerPick}.`;
		params.playerWinnings++;
		result.innerHTML = `${params.playerWinnings} - ${params.computerWinnings}`;
		roundResult = '1 - 0';
	}
	else {
		output.innerHTML = `YOU LOST! You played ${playerPick}. Computer played ${computerPick}.`;
		params.computerWinnings++;
		result.innerHTML = `${params.playerWinnings} - ${params.computerWinnings}`;
		roundResult = '0 - 1';
	}
};

function computerRandom(){
	computerPick = params.moveNames[Math.floor(Math.random() * 3) + 1];
	return computerPick;
};

 function playerMove(){
	let button = this;
	playerPick = button.getAttribute('data-move');
	computerPick = computerRandom();
	countWinnings(playerPick, computerPick);
	showRounds(params.roundsNumber);
	

	objects = {
		RoundNumber: [params.roundsNumber + 1],
		PlayerMove: playerPick,
		ComputerMove: computerPick,
		RoundResult: roundResult,
		Result: `${params.playerWinnings} - ${params.computerWinnings}`,
	}

	params.progress.push(objects);

	console.log(params.progress)

	winner();
};


const gameButtons = document.getElementsByClassName('player-move');

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
	params.progress = [];
	removeTable();
});

const showButtons = document.getElementById('game-buttons');

function showModal(){
	document.querySelector('#modal-overlay').classList.add('show');
};

function hideModal(){
	document.querySelector('#modal-overlay').classList.remove('show');
};

const closeButtons = document.querySelectorAll('.modal .close');
	
for(let i = 0; i < closeButtons.length; i++){
	closeButtons[i].addEventListener('click', hideModal);
};

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

const modals = document.querySelectorAll('.modal');
	
for(let i = 0; i < modals.length; i++){
	modals[i].addEventListener('click', function(event){
		event.stopPropagation();
	});
};

document.addEventListener('keyup', function(e) {
  	if(e.keyCode === 27) {
    	hideModal();
  	}
});