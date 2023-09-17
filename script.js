"use strict"

const taskValue = document.querySelector(".input");
const taskList = document.querySelector(".task-list__items");
const emptyTaskTxt = document.querySelector(".empty-task");
const addTaskBtn = document.querySelector(".fa-plus");
const deleteTaskBtns = document.querySelectorAll(".fa-x");
const themeBtn = document.querySelector(".fa-moon")

const errorPanel = document.querySelector(".error-panel")

let taskText;
let counter = 0;
const maxWidth = 30;


//* change theme button event
themeBtn.addEventListener("click",() => {
    themeBtn.classList.toggle("fa-moon")
    themeBtn.classList.toggle("fa-sun")
    const 
    toBgWhite = "#F5F5F5", 
    toBgWhite2 ="#E8E2E2", 
    toBgDark ="#18122B", 
    toBgDark2 ="#393053";

    document.documentElement.style.setProperty("--bg-dark",toBgWhite)
    document.documentElement.style.setProperty("--dark",toBgWhite2);
    document.documentElement.style.setProperty("--bg-white",toBgDark)
    document.documentElement.style.setProperty("--white",toBgDark2);

    if(themeBtn.classList.contains("fa-moon")){
        document.documentElement.style.setProperty("--bg-dark",toBgDark)
        document.documentElement.style.setProperty("--dark",toBgDark2);
        document.documentElement.style.setProperty("--bg-white",toBgWhite)
        document.documentElement.style.setProperty("--white",toBgWhite2);
    }
})


const addTask = () =>{
    if(taskValue.value !== ""){
        if(taskValue.value.length > maxWidth){
            setTimeout(() =>{
                errorPanel.classList.add("scale-to-one")        
            }, 100);
            setTimeout(() => {
                errorPanel.classList.remove("scale-to-one")
            }, 2500)
        }else{
            console.log("else çalıştı")
            counter++;
            emptyTaskTxt.classList.add("hidden");
            taskText = taskValue.value;
            taskValue.value = "";
            
            const checkboxWrapper__round = document.createElement("div");
            checkboxWrapper__round.className = "round";
            checkboxWrapper__round.innerHTML =`<input type="checkbox" id="checkbox-${counter}" /><label for="checkbox-${counter}"></label`;
            
            const listItem__checkboxWrapper = document.createElement("div");
            listItem__checkboxWrapper.className = "checkbox-wrapper";
            listItem__checkboxWrapper.classList.add("check");
            listItem__checkboxWrapper.appendChild(checkboxWrapper__round);
            
            const listItem__Text = document.createElement("h2");
            listItem__Text.classList.add(`text-${counter}`)
            listItem__Text.textContent = taskText;
            
            const listItem__Btn = document.createElement("i");
            listItem__Btn.classList.add("fa-solid","fa-x");
            
            listItem__Btn.addEventListener("click",() => {
                const parent = listItem__Btn.parentElement;
                parent.classList.add("animate__animated","animate__flipOutX");
                setTimeout(() => {
                    counter--;
                    parent.remove()

                    if(counter == 0){
                        emptyTaskTxt.classList.remove("hidden");
                    }
                },500)
            })
            
            const listItem = document.createElement("li");
            listItem.appendChild(listItem__checkboxWrapper);
            listItem.appendChild(listItem__Text);
            listItem.appendChild(listItem__Btn);
            listItem.classList.add("task-list__item","animate__flipInX","animate__animated");
            
            taskList.appendChild(listItem)

            const checkboxes = document.querySelectorAll(`input[id="checkbox-${counter}"]`);

            checkboxes.forEach(checkbox => {            
                checkbox.addEventListener("click",() => {
                    listItem__Text.classList.toggle("overline")
                })
            });
        }
    }
}

addTaskBtn.addEventListener("click", addTask)
document.addEventListener("keydown", (event) => {
    if(event.key == "Enter" && taskValue.value !== ""){
        addTask();
    }
})

