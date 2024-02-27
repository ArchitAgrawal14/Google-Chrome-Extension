document.addEventListener("DOMContentLoaded",function(){
    var taskInput=document.getElementById("inputGiven");
    var addTaskButton=document.getElementById("Add_Task_button");
    var addedTask=document.getElementById("Task_List");
    chrome.storage.sync.get(["tasks"] ,function(result){
            if(result.tasks){
                result.tasks.forEach(task=>{
                    addTask(task);
                });
            }
    });
    addTaskButton.addEventListener("click" ,function(){
        const taskTest=taskInput.value.trim();
        if(taskTest !== ""){
            addTask(taskTest);
        }
    });
    function addTask(text){
        const li=document.createElement("li");
        li.textContent=text;
        const removeButton=document.createElement("button");
        removeButton.textContent="X";
        removeButton.addEventListener("click" , function(){
            removeTask(li);
        });
        li.appendChild(removeButton);
        addedTask.appendChild(li);
        saveTask();
    }

    function removeTask(taskElement){
        addedTask.removeChild(taskElement);
        saveTask();
    }
    function saveTask(){
        const tasks=Array.from(addedTask.children).map(li=>li.textContent);
        chrome.storage.sync.set({tasks:tasks});
    }
})