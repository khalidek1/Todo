
let input=document.getElementById("input");
let submitTask=document.getElementById("add");
let taskDiv=document.querySelector(".mytask");
let deleteAll=document.getElementById("all");
let saerchTask=document.getElementById("search_task");

let myTasks=[];

if(localStorage.getItem("tasks")){
    myTasks=JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage();

submitTask.onclick=()=>{
    if(input.value!==""){
        addTasks(input.value);
        input.value="";
    }else alert("please write your task");
}

function addTasks(taskText){
    const task={
        id:Date.now(),
        title:taskText,
        completd:false
    };
    myTasks.push(task);
    addTaskToPage(myTasks);
    addTaskToLocalStorage(myTasks);
}

function addTaskToPage(myTasks){
    taskDiv.innerHTML= "";
    myTasks.forEach((task) => {
        let div=document.createElement("div");
        div.className="task";
        div.setAttribute("data_id",task.id);
        div.appendChild(document.createTextNode(task.title));
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("x"));
        let input=document.createElement("input");
        input.type="checkbox";
        input.checked=task.completd;
        input.className="check";
        div.appendChild(input);
        div.appendChild(span);
        taskDiv.appendChild(div);
    });
}

function addTaskToLocalStorage(myTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(myTasks))
}

document.forms[0].onsubmit=(e)=>{
    console.log(e);
    e.preventDefault();
}

taskDiv.addEventListener("click",(e)=> { 
    if(e.target.classList.contains("del")){
        deleteTask(e.target.parentElement.getAttribute("data_id"));
        // if(window.confirm("you want to delete this task"))
        e.target.parentElement.remove();
    }

    if(e.target.classList.contains("check")){
        taskUpdate(e.target.parentElement.getAttribute("data_id"))
    }
})

function deleteTask(TaskId){
    myTasks = myTasks.filter((task)=>task.id != TaskId )
    addTaskToLocalStorage(myTasks);
}

function taskUpdate(TaskId){
    for(let i=0;i<myTasks.length;i++){
        if(myTasks[i].id==TaskId){
            if(myTasks[i].completd==false){
            myTasks[i].completd=true
            }
            else(myTasks[i].completd=false);
        }
    }
    addTaskToLocalStorage(myTasks);
}

function getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks");
    if(data){
       let tasks=JSON.parse(data);
       addTaskToPage(tasks)
    }
}

deleteAll.onclick=()=>{
    if(window.confirm("you want to delete all the task")){
        taskDiv.remove();
        deleteAllInLocal();  
    }
}

function deleteAllInLocal(){
    for(i=0 ; i < myTasks.length ;i++){
        localStorage.clear();
    }
}

saerchTask.onkeyup=()=>{
    var searchbox=saerchTask.value.toUpperCase();
    const mytasklist=document.querySelectorAll(".task");
    const tname=taskDiv.getElementsByTagName("div")

    for( var i=0 ; i < tname.length ; i++ ){
        let match=mytasklist[i].childNodes[0];
        let textvalue= match.textContent || match.innerHTML;
        (textvalue.toUpperCase().indexOf(searchbox) > -1) ? mytasklist[i].style.display="" : mytasklist[i].style.display="none";
    }
}
