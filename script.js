function addItem( element ) {
	let itemName = document.getElementsByClassName("menu-input")[0].value;
	
	if( itemName == "") {
		alert("Enter an item name.");
	}
	else if( itemName.length > 50) {
		alert("The name of this item is too long.");
	}
	else if( currentList.indexOf(itemName) > -1 ) { //GLOBAL VAR
		alert("This item is already on the list.");
	}
	else {
		element.target.previousElementSibling.value = ""; //clean input text
		let list = document.getElementsByClassName("list")[0];
		list.appendChild( newItem( "ID"+nextID, itemName, NOTCHECKED) ); //nextID and NOTCHECKED are GLOBAL
		//HANDLE GLOBAL CONTROL VARS
		nextID += 1;
		currentList.push(itemName);
		checkedList.push(false);
	}
}

function newItem( id, name, checked ){
	let li = document.createElement("li");
	li.id = id;
	li.className = "item";

	let box = document.createElement("div");
	box.className = "item-box";
	box.innerHTML = `<div class="item-checkbox ${checked}"><div class="item-checkmark"></div></div><p class="item-text">${name}</p>`;
	box.addEventListener( "click", clickItem );
	box.addEventListener( "mouseover", mouseoverItem );
	box.addEventListener( "mouseout", mouseoutItem );

	let eraseBtn = document.createElement("div");
	eraseBtn.className = "item-eraseBtn noselect";
	eraseBtn.innerHTML = "-";
	eraseBtn.addEventListener( "click", clickEraseBtn );
	eraseBtn.addEventListener( "mouseover", mouseoverEraseBtn );
	eraseBtn.addEventListener( "mouseout", mouseoutEraseBtn );

	li.appendChild(box);
	li.appendChild(eraseBtn);
	return li;
}

function clickItem( element ) {
	let checkbox = element.currentTarget.children[0];
	if( checkbox.className[14] == "N" ){
		checkbox.style.backgroundColor = "#090";
		checkbox.className = `item-checkbox ${YESCHECKED}`;
		//HANDLE GLOBAL CONTROL VARS
		let itemName = element.currentTarget.innerText;
		let pos = currentList.indexOf(itemName);
		checkedList[pos] = true;

	}
	else if( checkbox.className[14] == "Y" ){
		checkbox.style.backgroundColor = "#fff";
		checkbox.className = `item-checkbox ${NOTCHECKED}`;		
		//HANDLE GLOBAL CONTROL VARS
		let itemName = element.currentTarget.innerText;
		let pos = currentList.indexOf(itemName);
		checkedList[pos] = false;
	}
}

function mouseoverItem( element ) {
	element.currentTarget.style.boxShadow = "0 0 2px #070";
}

function mouseoutItem( element ) {
  element.currentTarget.style.boxShadow = "none";
}

///////////////////////////////////////////

function eraseList() {
	document.getElementsByClassName("list")[0].innerHTML = "";
	//HANDLE GLOBAL CONTROL VARS
	nextID = 0;
	currentList = [];
	checkedList = [];
}

function clickEraseBtn( element ){
	//HANDLE GLOBAL CONTROL VARS
	let itemName = element.target.previousElementSibling.innerText;
	let position = currentList.indexOf(itemName);
	currentList.splice( position, 1 );
	checkedList.splice( position, 1 );
	//main objective of this function
	element.target.parentElement.remove();
}

function mouseoverEraseBtn( element ){
	element.target.parentElement.children[0].style.boxShadow = "0 0 2px #f00";
}

function mouseoutEraseBtn( element ){
	element.target.parentElement.children[0].style.boxShadow = "none";
}

///////////////////////////////////////////
// MAIN 
/////////////////////////////////////////// 

// GLOBAL CONTROL VARS
var nextID = 0;
var currentList = [];
var checkedList = [];
const NOTCHECKED = "Nchecked"; 
const YESCHECKED = "Ychecked";

// Add a new item in the list 
let menuAddBtn = document.getElementsByClassName("menu-addBtn")[0];
menuAddBtn.addEventListener( "click", addItem );

// Erase all itens of the list
let menuEraseBtn = document.getElementsByClassName("menu-eraseBtn")[0];
menuEraseBtn.addEventListener( "click", eraseList );
