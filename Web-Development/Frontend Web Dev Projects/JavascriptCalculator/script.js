let text;
let value = '';
let result = '';
let operation = '';
let showResult = false;

let display = document.getElementById('display')
let answerDisplay = document.getElementById('answer-display')

function handleClick(element){
	text = element.textContent;

	if(text == 'X'){
		evaluate();
		operation = text;
	}

	else if(text == '/'){
		evaluate();
		operation = text;
	}

	else if(text == '+'){
		evaluate();
		operation = text;
	}

	else if(text == '-' && (operation == '' || value[0] == '-' || value != '')){
		evaluate();
		operation = text;
	}

	else if(text == '=' ){
			evaluate();
		showResult = true;
	}

	else if(text == 'C')
		clear();

	else if(text== '.')
		addDot();

	else if(text == '+/-')
		negate();

	else if(text == 'DEL')
		value = value.slice(1)

	else if(text == '0')
		addZero();

	else{
		value+=text;
	}

	if(showResult)
		display.textContent = result;
	else if(value=='')
		display.textContent = 0;
	else
		display.textContent = value;

	showResult = false;

}


function multiply(){
	if(value == '' || value == '-'){
		value = '';
		return;
	}
		result*=value;
		value='';
}

function divide(){
	if(value == '')
		return;
		result/=value;
		value='';

}

function add(){
	if(value == '' || result == ''){
		return;
	}

	if(/\./.test(result) || /\./.test(value))
		result = (parseFloat(result)+parseFloat(value)).toString();
	else
		result = (parseInt(result)+parseInt(value)).toString();
	
	value='';
}

function subtract(){
		result-=value;
		value='';
}

function addDot(){
	if(/\./.test(value))
		return;
	else{
		value+='.';
		display.textContent = value;
	}
}

function addZero(){
	if(value[0] != '0')
		value+=0;
}

function negate(){
	if(value != '')
		value*=-1;
}

function clear(){
	answerDisplay.textContent = '';
	result = '';
	value = '';
	operation = '';
}


function evaluate(){
	if(operation == '' && result == ''){
		result = value;
		value = '';
		answerDisplay.textContent = result;
		return;
	}


	if(operation == 'X'){
		operation = '';
		multiply();
	}

	if(operation == '/'){
		operation = '';
		divide();
	}

	if(operation == '+'){
		operation = '';
		add();
	}

	if(operation == '-'){
		operation = '';
		subtract();
	}

	answerDisplay.textContent = result;
}