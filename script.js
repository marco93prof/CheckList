function addTask() {
	let taskName = document.getElementsByClassName("inputTask")[0].value;
	
	if( taskName == "") {
		window.alert("Fill the new task name.");
	}
	else {
		lastID += 1; //GLOBAL
		let taskList = document.getElementsByClassName("taskList")[0];
		taskList.appendChild( createTaskElement( "iten"+lastID, taskName ) );
	}
}

function createTaskElement( idName, taskName ){
	let li = document.createElement("li");
	li.id = idName;
	li.className = "taskIten";

	let label = document.createElement("label");
	label.className = "labelTask";
	label.innerHTML = `${taskName}<input type="checkbox"><span class="checkmark"></span>`
	label.addEventListener( "mouseover", destakLabel );
	label.addEventListener( "mouseout", undestakLabel );

	let divBtn = document.createElement("div");
	divBtn.className = "btnEraseTask";
	divBtn.innerHTML = "-";
	divBtn.addEventListener( "click", eraseTask );
	divBtn.addEventListener( "mouseover", destakErase );
	divBtn.addEventListener( "mouseout", undestakErase );

	li.appendChild(label);
	li.appendChild(divBtn);
	
	return li;
}

function destakLabel(element) {
	element.target.style.boxShadow = "0 0 2px #080";
}

function undestakLabel(element) {
	element.target.style.boxShadow = "none";
}

function destakErase(element) {
	element.target.previousElementSibling.style.boxShadow = "0 0 2px #f00";
}

function undestakErase(element) {
	element.target.previousElementSibling.style.boxShadow = "none";
}

///////////////////////////////////////////
function eraseTask(element) {
	element.target.parentElement.remove();
}

function eraseList(){
	lastID = 0; //GLOBAL
	document.getElementsByClassName("taskList")[0].innerHTML = "";
}


/////////////////////////////////////////// 
//                   MAIN 
/////////////////////////////////////////// 

// GLOBAL
var lastID = 0;

// Add a new task in the list 
let btnAdd = document.getElementsByClassName("btnAdd")[0];
btnAdd.addEventListener( "click", addTask );

// Erase all tasks of the list
let btnEraseList = document.getElementsByClassName("btnEraseList")[0];
btnEraseList.addEventListener( "click", eraseList );
