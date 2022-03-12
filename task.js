let btnAddTask = document.querySelector('button')
let taskName = document.querySelector('#content')
let taskDescription = document.querySelector('#description')
let taskDate = document.querySelector('#date')
let taskPriority = document.querySelector('#priority')

let tasks = getTaskFromLocalStorage()

renderTasks(tasks)

btnAddTask.addEventListener('click', function(){
    if(!taskName.value){
        alert('input new task')
        return false;
    }
    else if(!taskDescription.value){
        alert('input note')
        return false;
    }
    else if(!taskDate.value){
        alert('input date')
        return false;
    }
    
    else if(!taskPriority.value){
        alert('input Priority')
        return false;
    }
    
    let taskID = this.getAttribute('id')
    let tasks = getTaskFromLocalStorage()
    let task = { name: taskName.value}

    if (taskID == 0 || taskID){
        tasks[taskID] = task
        this.removeAttribute('id')
    }else{
        tasks.push({name : taskName.value})
    }

    taskName.value = ''
    taskDescription.value = ''
    taskDate.value = ''
    taskPriority.value = ''
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(tasks)

})

function editTask(id){
    let tasks = getTaskFromLocalStorage() 

    if(tasks.length > 0 ){
        taskName.value = tasks[id].name 
        btnAddTask.setAttribute('id', id)
    }
}
function deleteTask(id){
    if (confirm('Delete Task?')){
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))

        renderTasks(getTaskFromLocalStorage())
    }
}
function renderTasks(tasks = []){
    let content = '<ul>'

    tasks.forEach(( task, index) => {
        content += `<li>
                <div class="task-name">${task.name}</div>
                <a href="#" onclick = "editTask(${index})" >Detail</a>
                <a href="#" onclick = "deleteTask(${index})">Delete</a>
            </li>`
    })

    content += '</ul>'

    document.querySelector('#result').innerHTML = content
}
    function getTaskFromLocalStorage(){
        return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
    }