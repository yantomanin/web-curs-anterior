//JavaScript de la página web

document.addEventListener('DOMContentLoaded', () => {
    //La primera vez que se abre la web muestra un mensaje
    iniciarBienvenida();

    //Al hacer clic las imágenes de ampliarán
    iniciarVisorImagenes();

    //Evita errores en el contacto
    iniciarValidacionContacto();

    //Evita errores en la contraseña
    iniciarValidacionRegistro();
});

//Función para el mensaje inicial
function iniciarBienvenida() {
    //Esta linea hace que este mensaje solo se enseñe la primera vez que se visita la página
    if (!localStorage.getItem('aplec_visited')) {
        //Y se establece para que se muestre en cualquier ventana, asi como el mensaje que se muestra
        const ventana = document.createElement('div');
        ventana.id = 'welcome-modal';
        ventana.className = 'welcome-modal';
        ventana.innerHTML = `
            <div class="welcome-modal-content">
                <h2>¡Bienvenido al Aplec!</h2>
                <p>Descubre la fiesta gastronómica más importante y sabrosa de Lleida. Nos alegra mucho tenerte por aquí. ¡Explora las fechas, la galería y regístrate para no perderte nada!</p>
                <button id="close-welcome-modal" class="btn">Comenzar</button>
            </div>
        `;
        document.body.appendChild(ventana);

        //Animación sueve para la ventana
        ventana.style.display = 'flex';
        setTimeout(() => {
            ventana.classList.add('show');
        }, 100);

        //Y el código para cerrar el mensaje correctamente
        const botonCerrar = document.getElementById('close-welcome-modal');
        if (botonCerrar) {
            botonCerrar.addEventListener('click', () => {
                ventana.classList.remove('show');
                setTimeout(() => {
                    ventana.style.display = 'none';
                    ventana.remove();
                }, 400);
                localStorage.setItem('aplec_visited', 'true');
            });
        }
    }
}

//Establece las funciones de las imágenes de la galería
function iniciarVisorImagenes() {
    const visor = document.getElementById('lightbox');
    const imagenVisor = document.getElementById('lightbox-img');
    const botonCerrar = document.querySelector('.lightbox-close');
    const imagenesGaleria = document.querySelectorAll('.gallery-img');

    //Al hacer clic en una imagen, esta se amplia en el centro de la pantalla
    imagenesGaleria.forEach(imagen => {
        imagen.addEventListener('click', () => {
            imagenVisor.src = imagen.src;
            imagenVisor.alt = imagen.alt;
            visor.style.display = 'flex';
            setTimeout(() => {
                visor.classList.add('show');
            }, 10);
        });
    });

    //La función con la que sse quita la imagen ampliada
    const cerrarVisor = () => {
        visor.classList.remove('show');
        setTimeout(() => {
            visor.style.display = 'none';
            imagenVisor.src = '';
            imagenVisor.alt = '';
        }, 300);
    };

    //Y las funciones que activan la anterior al hacer clic en la X, en el espacio oscuro o al pulsar escape
    if (botonCerrar) {
        botonCerrar.addEventListener('click', cerrarVisor);
    }

    visor.addEventListener('click', (evento) => {
        if (evento.target === visor) {
            cerrarVisor();
        }
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && visor.classList.contains('show')) {
            cerrarVisor();
        }
    });
}

//Valida el email introducido para que tenga formato nombre@mail.com
function emailValido(email) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
}

//La funcion establece como se valida el email
function iniciarValidacionContacto() {
    const formulario = document.querySelector('.formulario-contacto');
    if (!formulario) return;

    const campoEmail = document.getElementById('email');
    const errorEmail = document.getElementById('email-error');
    if (!campoEmail || !errorEmail) return;

    //Lee el valor introducido para generar un resultado
    const validarEmail = () => {
        const valor = campoEmail.value.trim();
        campoEmail.parentElement.classList.remove('invalid', 'valid');
        //Si esta vacio no muetra nada, si esta bien deja continuar y si esta mal muestra el fallo
        if (valor === '') {
            errorEmail.style.display = 'none';
            return false;
        }
        //Si el formato es incorrecto, lo muestra, si es correcto deja seguir adelante
        if (!emailValido(valor)) {
            campoEmail.parentElement.classList.add('invalid');
            errorEmail.style.display = 'block';
            return false;
        } else {
            campoEmail.parentElement.classList.add('valid');
            errorEmail.style.display = 'none';
            return true;
        }
    };

    campoEmail.addEventListener('input', validarEmail);
    campoEmail.addEventListener('blur', validarEmail);

    //Valida al enviar
    formulario.addEventListener('submit', (evento) => {
        const emailBien = validarEmail();
        if (!emailBien) {
            evento.preventDefault();
            campoEmail.focus();
        }
    });
}

//La función valida el registro si todo es correcto
function iniciarValidacionRegistro() {
    //Busca cada campo con sus mensajes y funciones y si falla algo da error
    const formulario = document.querySelector('.registro');
    if (!formulario) return;

    const campoEmail = document.getElementById('email');
    const errorEmail = document.getElementById('email-error');
    const campoContraseña = document.getElementById('contraseña');
    const campoConfirmar = document.getElementById('confirmar-contraseña');
    const errorContraseña = document.getElementById('password-error');

    if (!campoEmail || !errorEmail || !campoContraseña || !campoConfirmar || !errorContraseña) return;

    //Confirma el campo del mail
    const validarEmail = () => {
        const valor = campoEmail.value.trim();
        campoEmail.parentElement.classList.remove('invalid', 'valid');
        //Si esta vacio no muetra nada, si esta bien deja continuar y si esta mal muestra el fallo
        if (valor === '') {
            errorEmail.style.display = 'none';
            return false;
        }
        
        if (!emailValido(valor)) {
            campoEmail.parentElement.classList.add('invalid');
            errorEmail.style.display = 'block';
            return false;
        } else {
            campoEmail.parentElement.classList.add('valid');
            errorEmail.style.display = 'none';
            return true;
        }
    };

    //Confirma si las contraseñas coinciden
    const validarContraseñas = () => {
        campoConfirmar.parentElement.classList.remove('invalid', 'valid');
        
        if (campoConfirmar.value === '' && campoContraseña.value === '') {
            errorContraseña.style.display = 'none';
            return false;
        }

        if (campoContraseña.value !== campoConfirmar.value) {
            campoConfirmar.parentElement.classList.add('invalid');
            errorContraseña.style.display = 'block';
            return false;
        } else {
            campoConfirmar.parentElement.classList.add('valid');
            errorContraseña.style.display = 'none';
            return true;
        }
    };

    //Muestra la validación de los elementos email y contraseñas
    campoEmail.addEventListener('input', validarEmail);
    campoEmail.addEventListener('blur', validarEmail);

    campoContraseña.addEventListener('input', () => {
        if (campoConfirmar.value !== '') {
            validarContraseñas();
        }
    });
    campoConfirmar.addEventListener('input', validarContraseñas);
    campoConfirmar.addEventListener('blur', validarContraseñas);

    //Permite el envio si todo es correcto
    formulario.addEventListener('submit', (evento) => {
        const emailBien = validarEmail();
        const contraseñasBien = validarContraseñas();

        if (!emailBien || !contraseñasBien) {
            evento.preventDefault();
            if (!emailBien) {
                campoEmail.focus();
            } else if (!contraseñasBien) {
                campoConfirmar.focus();
            }
        }
    });
}