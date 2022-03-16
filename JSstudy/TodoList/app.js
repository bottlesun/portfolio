
let input = document.querySelector('.input-area input');
let inputButton = document.querySelector('.input-area button');

let taskBox = document.querySelector('.task-box');
let task = document.querySelector('.task');
let taskDate = document.querySelector('.task span');


inputButton.addEventListener('click' , inputClick)


function inputClick(){
    taskDate.innerHTML = input.value;
    task.prepend(taskDate);

    let NewTask = document.createElement('div');
    NewTask.setAttribute('class','task');
    NewTask.innerHTML = `
     <span></span>
    <div>
        <button>Check</button>
        <button>Delete</button>
    </div>`
    taskBox.append(NewTask);
}