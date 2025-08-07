
//Variables
let toDoList = document.getElementById('toDoList');
const btnPlus = document.getElementById('btnPlus');
const btnSave = document.getElementById('btnSave');
const btnTrash = document.querySelectorAll('.btnTrash');
const btnClose = document.getElementById('btnClose');
let modalNew = document.getElementById('modalNew');
let inputNew = document.getElementById('inputNew');
let containModal = document.getElementById('containModal');
const checkbox = document.querySelectorAll('.checkbox');

/**
 * @description Función que lee el evento keydown al presionar la tecla enter y llama a la función registerNewTask
 * @param {Event} e
 * @returns {void}
*/
inputNew.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    registerNewTask();
  }
});

/**
 * @description Función que lee el evento click al presionar el botón Guardar y llama a la función registerNewTask
 * @param {Event} e
 * @returns {void}
*/
btnSave.addEventListener('click', (e) => {
  e.preventDefault();
  registerNewTask();
});

/**
 * Función que abre el modal para agregar una nueva tarea
 * @param {Event} e
 * @returns {void}
 * @description Abre el modal
 * @changeClassList modalNew @example add flex
 * @changeProperty modalNew.open @example true
*/
btnPlus.addEventListener('click', (e) => {
  e.preventDefault();
  modalNew.classList.add('flex');
  modalNew.open = true;
});

/**
 * Función que cierra el modal para agregar una nueva tarea
 * @param {Event} e
 * @returns {void}
 * @description Cierra el modal
 * @changeClassList modalNew @example remove flex
 * @changeProperty modalNew.open @example false
*/
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  modalNew.classList.remove('flex');
  modalNew.open = false;
});

/**
 * Función que elimina una tarea
 * @param {Event} e
 * @returns {void}
 * @description Elimina una tarea del To-Do List
*/
toDoList.addEventListener('click', (e) => {
  if(e.target.classList.contains('btnTrash')){
    e.target.parentElement.remove();
  }
});

/**
 * Función que marca una tarea como completada
 * @param {Event} e
 * @returns {void}
 * @description Marca una tarea como completada
*/
toDoList.addEventListener('click', (e) => {
  if(e.target.classList.contains('checkbox')){
    e.target.parentElement.classList.toggle('line-through');
    e.target.parentElement.parentElement.classList.toggle('bg-gray-300');
  }
});

/**
 * @param {string} value
 * @returns {boolean}
 * @description Valida si un string contiene solo letras y números
 */
function validateRegex(value) {
  if(value === '') {return false;}
  else{
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚ]{4,120}$/i;
    return regex.test(value);
  }
}

/**
 * Función que agrega una nueva tarea
 * @param {Event} e
 * @returns {void}
 * @description Agrega una nueva tarea al To-Do List
 */
function registerNewTask(){
  if(!validateRegex(inputNew.value)){
    let alert = document.createElement('span');
    alert.classList.add('text-red-500', 'text-sm', 'font-semibold');
    alert.textContent = 'El valor ingresado no cumple con el formato solicitado';
    containModal.insertBefore(alert, containModal.children[1]);
    inputNew.classList.add( 'border-red-500');
    setTimeout(() => {
      alert.remove();
      inputNew.classList.remove('border-red-500');
    }, 2000);
    return;
  }else{
    let li = document.createElement('li');
    li.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'border-b', 'border-gray-200', 'rounded-lg', 'hover:bg-gray-300', 'cursor-pointer');
    li.innerHTML = `
      <div class="flex items-center gap-3">
        <input type="checkbox" class="checkbox cursor-pointer">
        <span class="text-lg">${inputNew.value}</span>
      </div>
      <button class="btnTrash rounded-lg bg-red-400 px-4 py-2 text-gray-100 text-xl hover:bg-red-500 cursor-pointer"><i class="fa-solid fa-trash pointer-events-none"></i></button>
    `;
    toDoList.appendChild(li);
    inputNew.value = '';
  }
}


