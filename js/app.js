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
        this.citas =[];
    }

    agregarCita(cita){
        this.citas =[...this.citas, cita];
        console.log(this.citas)
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
    imprimirCitas({citas}){
        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario , telefono, fecha, hora, sintomas , id} = cita;
            const divCita= document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            //scripting de los elementos de la cita 
            //mascotaParrafo
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            //propietarioParrafo
            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class="font-weigth-bolder">Propietario: </span> ${propietario}
            `;
            
            //telefonoParrafo
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weigth-bolder">Telefono: </span> ${telefono}
            `;

            //FechaParrafo
            const FechaParrafo = document.createElement('p');
            FechaParrafo.innerHTML = `
            <span class="font-weigth-bolder">Fecha: </span> ${fecha}
            `;

            //HoraParrafo
            const HoraParrafo = document.createElement('p');
            HoraParrafo.innerHTML = `
            <span class="font-weigth-bolder">Hora: </span> ${hora}
            `;

            //SintomasParrafo
            const SintomasParrafo = document.createElement('p');
            SintomasParrafo.innerHTML = `
            <span class="font-weigth-bolder">Síntomas: </span> ${sintomas}
            `;

            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(FechaParrafo);
            divCita.appendChild(HoraParrafo);
            divCita.appendChild(SintomasParrafo);

            //agreagr las citas al html 
            contenedorCitas.appendChild(divCita);

        });
    }
    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
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
    sintomas:''
}


//agrega datos al objeto de la cita 
function datosCita(e){
    citaObj[e.target.name]= e.target.value;
    //console.log(citaObj);
}


//valida y agrega uba nueva cita a la clase de cita 
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto cita 
    const {mascota, propietario , telefono, fecha, hora, sintomas} = citaObj;

    //validar 
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return ;
    }
    
    //generar un id Unico
    citaObj.id = Date.now();

    //Creando una nueva cita 
    administrarCitas.agregarCita({...citaObj});

    //Reinicia el objeto para la validacion
    reiniciarObjeto();

    //reinicia el formulario
    formulario.reset();


    //mostar el html de las citas 
    ui.imprimirCitas(administrarCitas);
}


function reiniciarObjeto(){
    citaObj.mascota='';
    citaObj.propietario='';
    citaObj.telefono='';
    citaObj.fecha='';
    citaObj.hora='';
    citaObj.sintomas='';
}