const fecha = document.querySelector("#date");
const lista = document.querySelector("#list");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = 'far-check-circle';
const uncheck = 'far-circle';
const lineThrough = 'line-through';
let id
let LIST



//creación fecha

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('ES',{weekday: 'long', month: 'short', day:'numeric'})

//funcion para agregar una tarea
function agregarTarea(tarea, id, realizado, eliminado) {

    if(eliminado) {return}

const REALIZADO = realizado ?check :uncheck
const LINE     = realizado ?lineThrough :''

  const elemento = `
  
    <li id="elemento">
    <i class="fa-solid fa-circle-check ${REALIZADO}" data="realizado" id="${id}"></i>
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


botonEnter.addEventListener('click', () => {
  const tarea = input.value
  if (tarea){
    agregarTarea(tarea,id,false,false)
    LIST.push({
        nombre : tarea,
        id : id,
        realizado : false,
        eliminado : false,
    })
  localStorage.setItem('TODO', JSON.stringify(LIST))
  id++
  input.value = ''
}
});

document.addEventListener('keyup', function(event) {
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
            LIST.push({
                nombre : tarea,
                id : id,
                realizado : false,
                eliminado : false,
        })
        localStorage.setItem('TODO', JASON.stringify(LIST))

        input.value =''
        id++
        console.log(LIST)
    }
    }
})


lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData = element.attributes.data.value
    console.log(elementData)

   if(elementData=='realizado'){
    tareaRealizada(element)
   }
   else if (elementData=='eliminado'){
    tareaEliminada(element)
    console.log(eliminado)
   }
   localStorage.setItem('TODO', JSON.stringify(LIST))

})



//local store ge item

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}

//Array para guardar las tareas

function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}
