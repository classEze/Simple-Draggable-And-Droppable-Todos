let todoArray = [
    {title:"Wash Clothes", description:"I really need to wash these clothes ASAP", id:1},
    {title:"Learn React Table", description:" A really good way to present data while implementing sorting, filtering and searching", id:2},
    {title:"Do a SASS project", description:"SASS is really cool, I need to use it in a project", id:3},
    {title:"Build my Ecommerce Site", description:"I really need to do this soon", id:4},
]


document.addEventListener('DOMContentLoaded', fire_On_Load)

 //FUNCTION THAT FIRES ON DOMCONTENTLOADED TO DISPLAY TODOS
function fire_On_Load(){
    document.querySelector('section.todo_container').innerHTML = ''
    todoArray.forEach(eachTodo => {
    document.querySelector('section.todo_container').innerHTML +=
     `<section class='todo_wrapper'
      ondrop="drop(event)" 
      id="todo_wrapper${eachTodo.id}" 
      ondragover="dragover(event)" 
      draggable="true"
       ondragstart="drag(event)">
      <div class="todo_title"> ${eachTodo.title}</div>
      <article class="todo_description"> ${eachTodo.description}</article>
      <i onclick="trash_Todo(${eachTodo.id})"
       class='fa fa-trash'
        style='color:rgba(243, 68, 68, 0.8);
         font-size:25px;'></i>
    </section>`
})
}

//DRAGGABLE EVENTS
function drag(event){
event.dataTransfer.setData('text', event.target.id)
}

function dragover(event){
    event.preventDefault()
}
function drop(event){
event.preventDefault();
let data = event.dataTransfer.getData('text')
let coming = document.querySelector(`#${data}`)

let whereToDrop = event.target.tagName == "SECTION" ?
event.target : event.target.parentNode
whereToDrop.parentNode.insertBefore(coming,whereToDrop)
}


const form = document.querySelector('form.add_form')
const title = form.querySelector('input[name="title"]')
const description = form.querySelector('input[name="description"]')
const veil = document.querySelector('.form_container')


//ASSIGN EVENTS
document.querySelector('i.fa-plus-circle')
.addEventListener('click' ,
 (e)=>document.querySelector('.form_container').classList.remove('hide'))
 

veil.addEventListener('click', (e)=>{
    if(e.target.classList.contains('form_container'))
    veil.classList.add('hide')
})



 //ADD TODO FUNCTION
function add_Todo(event){
    event.preventDefault();
    todoArray.push({title:title.value , description:description.value, id:Date.now()} )
    fire_On_Load();
    form.reset();
    veil.classList.add('hide')
}

//DELETE TODO FUNCTION
function trash_Todo(id){
    todoArray = todoArray.filter(eachTodo => eachTodo.id != id)
    fire_On_Load()
}