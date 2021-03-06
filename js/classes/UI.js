
import {eliminarCita,cargarEdicion} from '../Funciones.js';

import {contenedorCitas} from '../Selectores.js';

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
            <span class="font-weigth-bolder">S??ntomas: </span> ${sintomas}
            `;

            //Boton Para elimina esta cita 
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML ='Eliminar <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

            btnEliminar.onclick = () => eliminarCita(id);

            //a??ade un boton para modificar la cita 
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

export default UI;