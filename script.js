function handleControlVars( type, arr ){
	switch( type ) {
		
		case "addTask":
			lastID += 1;
			actualTasksArray.push(arr[0]);
		break;
		
		case "eraseTask":
			//parse task name
			let taskName = "";
			for( let i=0; i < arr[0].length - 2; ++i)
				taskName += arr[0][i];
			//remove task from array
			actualTasksArray.splice( actualTasksArray.indexOf(taskName), 1 );
		break;

		case "eraseList":
			lastID = 0;
			actualTasksArray = [];
		break;

		default:
			console.log("ERROR | function handleGlobalVars(type, arr)");
	}
}

function addTask(element) {
	let taskName = document.getElementsByClassName("inputTask")[0].value;

	if( taskName == "") {
		window.alert("Fill the name of the new task.");
	}	

	// else if( !taskName.match("^[A-Za-z0-9]+$") ) { window.alert("The task name must be alphanumeric."); }

	else if( taskName.length > 64) {
		window.alert("This task name is too long.");
	}	

	else if( actualTasksArray.indexOf(taskName) > -1 ){
		window.alert(`The task "${taskName}" is already on the list.`);
	}

	else {
		handleControlVars("addTask", [taskName]);
		element.target.previousElementSibling.value = "";
		let tasksList = document.getElementsByClassName("tasksList")[0];
		tasksList.appendChild( createTaskElement( "item"+lastID, taskName ) );
	}
}

function createTaskElement( idName, taskName ){
	let li = document.createElement("li");
	li.id = idName;
	li.className = "taskItem";

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

//=========================================
function destakLabel( element ) {
	element.target.style.boxShadow = "0 0 2px #080";
}

function undestakLabel( element ) {
	element.target.style.boxShadow = "none";
}

function destakErase( element ) {
	element.target.previousElementSibling.style.boxShadow = "0 0 2px #f00";
}

function undestakErase( element ) {
	element.target.previousElementSibling.style.boxShadow = "none";
}

//=========================================
function eraseTask( element ) {
	let rmv = element.target.parentElement;
	handleControlVars("eraseTask", [rmv.innerText]);
	rmv.remove();
}

function eraseList(){
	handleControlVars("eraseList", []);
	document.getElementsByClassName("tasksList")[0].innerHTML = "";
	localStorage.clear();
}

//=========================================

function saveList() {
	//erase old saved list
	localStorage.clear();

	//get the raw list (have to parse on "onload" function)
	let raw = document.getElementsByClassName("tasksList")[0].innerText;
	
	//save the actual raw list in ONE key (unique key is to order purpose)
	localStorage.setItem("rawSavedTasksList", raw);
}

/////////////////////////////////////////// 
//                   MAIN 
/////////////////////////////////////////// 

// GLOBAL CONTROL VARS
var lastID = 0;
var actualTasksArray = [];

onload = function() {
	
	//Get the list to fill
	let list = document.getElementsByClassName("tasksList")[0];
	
	//Get the Local Storage *RAW* list
	let raw = localStorage.getItem("rawSavedTasksList");
	
	//Parse the raw list
	for( let i=0; i<raw.length; ) {
		let taskName = "";
		while( raw[i] !== "\n" )
			taskName += raw[i++];
		i += 3;
		
		//Insert the item on list
		console.log(taskName);
		handleControlVars("addTask", [taskName]);
		list.appendChild( createTaskElement( "item"+lastID, taskName ) );
	}

		// tasksList.appendChild( createTaskElement( "item"+lastID, taskName ) );

	console.log(localStorage);
	console.log(raw);
}

// Add a new task in the list 
let btnAdd = document.getElementsByClassName("btnAdd")[0];
btnAdd.addEventListener( "click", addTask );

// Save all tasks of the list
let btnSaveList = document.getElementsByClassName("btnSaveList")[0];
btnSaveList.addEventListener( "click", saveList );

// Erase all tasks of the list
let btnEraseList = document.getElementsByClassName("btnEraseList")[0];
btnEraseList.addEventListener( "click", eraseList );

