const list=document.querySelector('ul');
const new_task=document.querySelector('#task');
const form=document.querySelector('#form');
const clear_btn=document.querySelector('.clear-task');
const filter=document.querySelector('#filter');
loadEventListerner();
function loadEventListerner(){
    document.addEventListener('DOMContentLoaded',restoreTasks)
    form.addEventListener('submit',addTask);
    list.addEventListener('click',removeTask);
    clear_btn.addEventListener('click',clearAllTask);
    filter.addEventListener('keyup',filterTask);    
}
function addTask(e){
    if(new_task.value===''){
        alert('Add task');
    }
        const li=document.createElement('li');
        li.appendChild(document.createTextNode(new_task.value));
        li.className='collection-item';
        const link=document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        list.appendChild(li);
        storeTask(new_task.value);
        new_task.value='';
    e.preventDefault();
}

function storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function restoreTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task)=>{
        const li=document.createElement('li');
        li.appendChild(document.createTextNode(task));
        li.className='collection-item';
        const link=document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        list.appendChild(li);
    });
}

function removeTask(e){
    if(e.target.classList.contains('fa-remove')){
        if(confirm('Are You sure?')){
            e.target.parentElement.parentElement.remove();
        }

        //Delete from Local Storage
        let tasks;
        const delete_task=e.target.parentElement.parentElement.textContent;
        tasks=JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach((task,index)=>{
            if(task===delete_task){
                tasks.splice(index,1);
            }
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
}

function clearAllTask(e){
    //list.innerHTML='';

    while(list.firstChild){
        list.firstChild.remove();
    }

    //Clear from localStorage
    localStorage.clear();
}

function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task)=>{
        if(task.firstChild.textContent.toLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    });
}