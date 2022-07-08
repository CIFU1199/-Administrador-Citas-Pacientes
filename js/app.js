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


let editando;
class Citas{
    constructor(){
        this.citas =[];
    }

    agregarCita(cita){
        this.citas =[...this.citas, cita];
        //console.log(this.citas)
    }

    eliminarCita(id){
       this.citas = this.citas.filter( cita => cita.id !== id);
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
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
        }, 3000);
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

            //Boton Para elimina esta cita 
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML ='Eliminar <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

            btnEliminar.onclick = () => eliminarCita(id);

            //añade un boton para modificar la cita 
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>';

            btnEditar.onclick = () => cargarEdicion(cita);

            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(FechaParrafo);
            divCita.appendChild(HoraParrafo);
            divCita.appendChild(SintomasParrafo);
            
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
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
    
    if(editando){
        ui.imprimirAlerta('Editado Correctamente');

        // pasar el objeto de la cita a edicion 
        administrarCitas.editarCita({...citaObj});



        //cambia texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //quitar modo edicion 
        editando  = false;
    }else{
        //generar un id Unico
        citaObj.id = Date.now();

        //Creando una nueva cita 
        administrarCitas.agregarCita({...citaObj});

        //Mensaje agregado correctamente 
        ui.imprimirAlerta('Se agrego correctamente');
    }

    

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

function eliminarCita(id){
   //eliminar la cita
    administrarCitas.eliminarCita(id);
   
   //mostrar la cita 
   ui.imprimirAlerta('La cita se eliminó Correctamente ');

   //refrescar la cita  
   ui.imprimirCitas(administrarCitas);


}

//Cargar lod datos y el modo edicion 
function cargarEdicion(cita){
    const {mascota, propietario , telefono, fecha, hora, sintomas, id} = cita;

    //llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar el objeto

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    //cambiar el texto del boton

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editando = true;

}