//campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas{
    constructor(){
        this.Citas =[];
    }
}

class UI{
    imprimirAlerta(mensaje , tipo){
        //creamos el div 
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert' , 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta despued de 5 segundos 

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
}

const ui = new UI();
const administrarCitas = new Citas();



//Registrar eventos 
eventListeners();

function eventListeners(){
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

//Objeto de la informacion de la cita 
const citaObj={
    mascota :'',
    propietario :'',
    telefono: '',
    fecha:'',
    hora:'',
    sintoma:''
}


//agrega datos al objeto de la cita 
function datosCita(e){
    citaObj[e.target.name]= e.target.value;
    console.log(citaObj);
}


//valida y agrega uba nueva cita a la clase de cita 
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto cita 
    const {mascota, propietario , telefono, fecha, hora, sintoma} = citaObj;

    //validar 
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintoma === '' ){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return ;
    }

}