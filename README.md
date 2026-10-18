# Aplec del Caragol · Web del curso anterior

**Web publicada (Firebase Hosting):** [https://webdinamic-c93b2.web.app](https://webdinamic-c93b2.web.app)

## Descripción

Web informativa del *Aplec del Caragol* (Lleida): página de inicio con patrocinadores,
fechas, preguntas frecuentes, galería de fotos con carrusel y visor ampliado, contacto con
mapa, formulario de registro y páginas legales (términos, cookies y privacidad).

## Tecnologías

- HTML5
- CSS3 (`styles.css`)
- JavaScript (`main.js`)
- Imágenes en la carpeta `imagenes/`
- Publicada con Firebase Hosting

## Cómo abrirla en local

1. Descarga o clona el repositorio.
2. Abre el archivo `Inicio.html` con el navegador (doble clic).
   Todas las rutas son relativas, por lo que no hace falta ningún servidor.

Opcionalmente, con Firebase CLI: `firebase serve --only hosting` o `firebase emulators:start --only hosting`.

## Despliegue

```bash
firebase login
firebase deploy --only hosting
```

La configuración está en `firebase.json` (la raíz `/` abre `Inicio.html`) y `.firebaserc`.
