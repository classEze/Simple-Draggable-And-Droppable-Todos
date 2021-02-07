let todoArray = []
document.addEventListener('DOMContentLoaded', fire_On_Load)

 //FUNCTION THAT FIRES ON DOMCONTENTLOADED TO DISPLAY TODOS
function fire_On_Load(){
    let localItems = localStorage.getItem('todos')
    todoContainer.innerHTML = ''
    if( !localItems || JSON.parse(localItems).length == 0) {
     todoContainer.innerHTML = "<h2 class='message' style='color:blue'> You have no Todos, Click the icon below to start adding Todos</h2>" +  todoContainer.innerHTML
    }

   else{
    todoArray = JSON.parse(localItems)
    todoArray.forEach(eachTodo => {
    if(eachTodo.completed){
        todoContainer.innerHTML +=
        `<section class='todo_wrapper'
         ondrop="drop(event)" 
         id="todo_wrapper${eachTodo.id}" 
         ondragover="dragover(event)" 
         draggable="true"
          ondragstart="drag(event)">
         <div class="todo_title"> ${eachTodo.title}</div>
         <article class="todo_description"> ${eachTodo.description}</article>
          Done: <input type="checkbox" checked onclick="mark_Todo(${eachTodo.id})" />
         <i onclick="trash_Todo(${eachTodo.id})"
          class='fa fa-trash'
           style='color:rgba(243, 68, 68, 0.8);
            font-size:25px;'></i>
       </section>`

    }
    else{
        todoContainer.innerHTML +=
        `<section class='todo_wrapper'
         ondrop="drop(event)" 
         id="todo_wrapper${eachTodo.id}"
         ondragover="dragover(event)" 
         draggable="true"
          ondragstart="drag(event)">
         <div class="todo_title"> ${eachTodo.title}</div>
         <article class="todo_description"> ${eachTodo.description}</article>
          Done: <input type="checkbox" onclick="mark_Todo(${eachTodo.id})" />
         <i onclick="trash_Todo(${eachTodo.id})"
          class='fa fa-trash'
           style='color:rgba(243, 68, 68, 0.8);
            font-size:25px;'></i>
       </section>`
    }
})
}
const message = document.querySelector("h2[class='message']")
if(message){
    setInterval(()=>{
        message.style.color = message.style.color =="blue" ? "red" : "blue"
     }, 500)     
}

document.querySelectorAll('input:checked').forEach(
    input=>{
        input.parentNode.classList.add('line-through')
    })
   }
   

//DRAGGABLE AND DROPPABLE EVENTS
function drag(event){
event.dataTransfer.setData('text', event.target.id)
}
function dragover(event){
    event.preventDefault()
}
function drop(event){
event.preventDefault();
let data = event.dataTransfer.getData('text')
let nodeToDrop = document.querySelector(`#${data}`)

let whereToDrop = event.target.tagName == "SECTION" ?
event.target : event.target.parentNode
whereToDrop.parentNode.insertBefore(nodeToDrop,whereToDrop)
}

const form = document.querySelector('form.add_form')
const title = form.querySelector('input[name="title"]')
const description = form.querySelector('input[name="description"]')
const veil = document.querySelector('.form_container')
const todoContainer = document.querySelector('section.todo_container')


//ASSIGN EVENTS
document.querySelector('i.fa-plus-circle')
.addEventListener('click' ,
 (e)=>{
     document.querySelector('.form_container').classList.remove('hide')
     title.focus()
 })
 

 //CLOSE MODAL ONCLICK
veil.addEventListener('click', (e)=>{
    if(e.target.classList.contains('form_container'))
    veil.classList.add('hide')
})


 //ADD TODO FUNCTION
function add_Todo(event){
    event.preventDefault();
    todoArray.push({title:title.value , description:description.value, id:Date.now(), completed:false})
    localStorage.setItem('todos', JSON.stringify(todoArray))
    fire_On_Load();
    form.reset();
    veil.classList.add('hide')
}

//DELETE TODO FUNCTION
function trash_Todo(id){
    todoArray = todoArray.filter(eachTodo => eachTodo.id != id)
    localStorage.setItem('todos', JSON.stringify(todoArray))
    fire_On_Load()
}

// MARK TODO AS DONE OR NOT
function mark_Todo(id){
    todoArray = todoArray.map(eachTodo =>{
      return eachTodo.id == id ?
       {...eachTodo, completed:!eachTodo.completed} :
       eachTodo
    })
    localStorage.setItem('todos', JSON.stringify(todoArray))
    fire_On_Load()
}

