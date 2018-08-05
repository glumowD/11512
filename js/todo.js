var count = 0;
var toggle = hideOrShow();
var toDo = {};
var doneCount = 1;
var save = {
  todo: [],
  count: '',
  done: [],
}; 

var stored = localStorage.getItem('todoList');
if (stored){
  save = JSON.parse(stored);
}
var bar = document.getElementById('bar');
var conainDone = document.getElementById('container-closed-tasks');
var tasks = document.getElementById('container-tasks');
var user = document.getElementsByClassName('user')[0];
var inputValue = document.getElementsByClassName('add-task-input')[0];
// Включает выключает панель навигации
toDo.togglePanel = function(){
	var aside = document.getElementsByTagName('aside')[0];
	var displayEl = document.querySelectorAll('#search form, #icon-search, \
	 .user-name, .user-arrow, .stream-count, #lists-section header a:not([data-value="sign"]) i,\
	 #lists-section header a span, #add-list');
	var center = document.querySelector('#lists-section header');
	var showing = toggle();
	for(var i = 0; i<displayEl.length; i++){
			if(showing == 'hide'){
				displayEl[i].classList.add('hide-element');
			}else if(showing == 'show'){
				displayEl[i].classList.remove('hide-element');
			}
		}
}
	function hideOrShow() {
			return function() {
				if(count == 0){
					count = 1;
					return 'hide';
				}else{
					count = 0;
					return 'show';
				}
			}
		}
bar.addEventListener('click', toDo.togglePanel, false);

function newTask(name,parent, icone) {
	var div = document.createElement('div');
	div.className = 'newTask';
	var newTask = parent.appendChild(div);
	newTask.innerHTML += '<a href="#" class="closeTask" title="Отметить как завершенную">'+ icone +'</a>';
	newTask.innerHTML += '<div class="name-Task">'+ name +'</div>';
	newTask.innerHTML += '<a href="#" class="marker-Task" title="Выделить задачу"><i class="fa fa-thumb-tack" aria-hidden="true"></i></a>';
	return newTask;
}

toDo.addTasks = function(e) {
	if(e.keyCode == 13 && inputValue.value!= ''){
	var value = inputValue.value;
	save.todo.push(value);
	save.count = save.todo.length;
	localStorage.setItem('todoList', JSON.stringify(save));
	inputValue.value = '';
  	newTask(value,tasks, '<i class="fa fa-check" aria-hidden="true"></i>');
}
}
inputValue.addEventListener('keydown', toDo.addTasks, false);

for(var i = 0; i<save.todo.length; i++){
  		newTask(save.todo[i],tasks,'<i class="fa fa-check" aria-hidden="true"></i>');
  }

toDo.deletTask = function() {
	var delTask = document.querySelectorAll('#container-tasks .closeTask');
	for(var i = 0; i<delTask.length; i++){
		delTask[i].addEventListener('click', closeTask, false);
	}
}
setInterval(function() {
	toDo.deletTask();
	toDo.returnTasks();
},1);
function closeTask(e) {
	var main_block = e.currentTarget.parentNode;
	var nameTask = e.currentTarget.nextSibling;
	var nameId = save.todo.indexOf(nameTask.innerHTML);
	var done = save.todo.splice(nameId,1)[0];
	save.done.push(done);
	localStorage.setItem('todoList', JSON.stringify(save));
	main_block.parentNode.removeChild(main_block);
	newTask(done, conainDone, '<i class="fa fa-times" aria-hidden="true"></i>');
	misucClose();
}

toDo.showDoneTasks = function() {
		var closed = document.getElementById('closed-tasks');
		closed.addEventListener('click', doneTasks, false);
			for(var i = 0; i<save.done.length; i++){
				newTask(save.done[i], conainDone, '<i class="fa fa-times" aria-hidden="true"></i>');
			}
	}
toDo.showDoneTasks();
function doneTasks() {
		var showing = toggle();
		if(showing == 'hide'){
		conainDone.classList.remove('hidden');
	}else{
		conainDone.classList.add('hidden');
	}
}

function misucClose() {
	var audio = new Audio();
	audio.src = 'audio/ring.mp3';
	audio.play()
}
toDo.returnTasks = function() {
	var containerRetTask =  document.querySelectorAll('#container-closed-tasks .closeTask');
	for(var i = 0; i<containerRetTask.length; i++){
		containerRetTask[i].addEventListener('click', returnTasksAtChecked, false);
	}
}
function returnTasksAtChecked(e) {
	var main_block = e.currentTarget.parentNode;
	var nameTask = e.currentTarget.nextSibling;
	var nameId = save.done.indexOf(nameTask.innerHTML);
	var todo = save.done.splice(nameId,1)[0];
	save.todo.push(todo);
	localStorage.setItem('todoList', JSON.stringify(save));
	main_block.parentNode.removeChild(main_block);
	newTask(todo, tasks, '<i class="fa fa-check" aria-hidden="true"></i>');
}