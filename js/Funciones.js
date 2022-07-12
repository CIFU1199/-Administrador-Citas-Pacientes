import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { mascotaInput, 
        propietarioInput,
        telefonoInput,
        fechaInput,
        horaInput,
        sintomasInput,
        formulario} from './Selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);


let editando = false;

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
export function datosCita(e){
    citaObj[e.target.name]= e.target.value;
    //console.log(citaObj);
}



//valida y agrega uba nueva cita a la clase de cita 
export function nuevaCita(e){
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


export function reiniciarObjeto(){
    citaObj.mascota='';
    citaObj.propietario='';
    citaObj.telefono='';
    citaObj.fecha='';
    citaObj.hora='';
    citaObj.sintomas='';
}

export function eliminarCita(id){
   //eliminar la cita
    administrarCitas.eliminarCita(id);
   
   //mostrar la cita 
   ui.imprimirAlerta('La cita se eliminó Correctamente ');

   //refrescar la cita  
   ui.imprimirCitas(administrarCitas);


}

//Cargar lod datos y el modo edicion 
export function cargarEdicion(cita){
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