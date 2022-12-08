const Id__URL = `https://jsonplaceholder.typicode.com/todos/`
const LOADER_URL = `https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b761153175487652d75b33373db15a1785921ef1cc6d1&rid=giphy.gif&ct=g`;

const viewToDos = document.getElementById("view__todo")
const bloks = document.getElementById("bloks")
const menu = document.getElementsByClassName("menu")
const input = document.getElementById("text__id")
const search_btn = document.getElementById("search__todo")

window.addEventListener("load", ()=> alert("Welcome to ToDo web app"))

/*Search
============================================*/

search_btn.addEventListener("click", searchIds)

function searchIds(){
    bloks.replaceChildren()
    const loader = createLoader();
    bloks.appendChild(loader);

    getUserIds()
    .then((users) => searchById(users))
    .finally(() => {
        bloks.removeChild(loader);
    })
}

function searchById(users){
    users.forEach((user) => {
        const newDiv = document.createElement("div")
        const{title, completed, userId} = user

        if(completed === true && userId == input.value){
            newDiv.innerHTML = `
        <p title = "Complected">${title}</p>
        `
        bloks.appendChild(newDiv)
        }else if(completed === false && userId == input.value){
            newDiv.innerHTML = `
        <p title = "Not completed">${title}</p>
        `
        bloks.appendChild(newDiv)
        } 
    })
}

/*View All ToDos
============================================*/

viewToDos.addEventListener("click", getUsers)

function getUsers(){
    bloks.replaceChildren()
    const loader = createLoader();
    bloks.appendChild(loader);

    getUserIds()
    .then((users) => UserBloks(users))
    .finally(()=>{
        bloks.removeChild(loader);
    })
}

async function getUserIds() {
    const response = await fetch(Id__URL);
    const data = await response.json();
    return data;
  }

function UserBloks(listUsers){
    listUsers.forEach(user => {
        const newDiv = document.createElement("div")
        const{title, completed} = user
        if(completed === true){
            newDiv.innerHTML = `
        <p title = "Complected">${title}</p>
        `
        }else{
            newDiv.innerHTML = `
        <p title = "Not completed">${title}</p>
        `
        }
        
        bloks.appendChild(newDiv)
    });
}

/*Loader
============================================*/

function createLoader() {
    const loader = document.createElement("img");
    loader.src = LOADER_URL;
    loader.classList.add("loader");
    return loader;
  }