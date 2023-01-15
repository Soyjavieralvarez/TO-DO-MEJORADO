const date = document.querySelector("#date");
const lista = document.querySelector("#list");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = 'far-check-circle';
const uncheck = 'far-circle';
const lineThrough = 'line-through';
let id = 0;
const LIST = [];

//funcion para agregar una tarea
function agregarTarea(tarea, id, realizado, eliminado) {

    if(eliminado) {return}

const REALIZADO = realizado ?check :uncheck
const LINE     = realizado ?lineThrough :''

  const elemento = `
  
    <li id="elemento">
    <i class="far fa-circle co ${REALIZADO}" data="realizado" id="${id}"></i>
    <p class="text ${LINE}">${tarea}</p>
    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>

    </li>
    `
  lista.insertAdjacentHTML("beforeend", elemento);
}

//funcion para tareas realizadas

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ? false :true
}


//funcion eliminar tareas

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}


botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea,id,false,false)
    LIST.push({
        nombre:tarea,
        id:id,
        realizado:false,
        eliminado:false,
    })
  }
  input.value = ''
  id++
});

document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            LIST.push({
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false,
        })
    }
        input.value =''
        id++
    }
})


lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;

   if(elementData==='realizado'){
    tareaRealizada(element)
   }
   else if (elementData==='eliminado'){
    tareaEliminada(element)
   }

})
