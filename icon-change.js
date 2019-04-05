'use strict';

var icons = document.getElementsById('rock-icon');

var buttons = document.getElementsById('rock');

buttons.addEventListener('click', function() {
	icons.classList.add('icon-change');
});