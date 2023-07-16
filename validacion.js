document.addEventListener('DOMContentLoaded', function(){

    const email = {
        nombre:'',
        email:'',
        asunto:'',
        mensaje:''
    }

    //Elementos de la interfaz
    const inputNombre= document.querySelector('#nombre');
    const inputEmail= document.querySelector('#email');
    const inputAsunto= document.querySelector('#asunto');
    const inputMensaje= document.querySelector('#mensaje');
    const formulario= document.querySelector('#formulario');
    const btnSubmit= document.querySelector('#formulario button[type="submit"]');
    const spinner= document.querySelector('#spinner');

    //Asignacion de eventos

    inputNombre.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    function enviarEmail(e){
        e.preventDefault();
            resetFormulario();
           
        const alertaExito= document.createElement('P');
        alertaExito.classList.add('bg-green');
        alertaExito.style.cssText=('background-color:green; color: white; padding: 2');
        alertaExito.textContent='Mensaje enviado correctamente!';

        formulario.appendChild(alertaExito);

        setTimeout(()=>{
             alertaExito.remove();
            },3000);

    }

    function validar(e){
        if(e.target.value.trim() === ''){
           mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
           email[e.target.id] = '';
           comprobarEmail();
           return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.id] = e.target.value.trim().toLowerCase();

        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        //Generar alerta con HTML
        const error = document.createElement('P');
        error.textContent = mensaje;

        error.classList.add ('bg-red');
        error.style.cssText=('background-color:red; color: white; padding: 2')

        //inyectar el error al form

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta= referencia.querySelector('.bg-red');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado= regex.test(email);
        return resultado;
    }
    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.disabled = true;
            return 
    }   
        btnSubmit.disabled = false;
    }
    function resetFormulario(){
        email.nombre='';
        email.email='';
        email.asunto='';
        email.mensaje='';

        formulario.reset();
        comprobarEmail();
    }
    } );
