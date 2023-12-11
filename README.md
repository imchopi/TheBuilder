# Diablo 4 Build Planner

¡Bienvenido a Diablo 4 Build Planner! Esta aplicación te permite crear y gestionar builds personalizadas para tu personaje en Diablo 4. Además, puedes asociar ítems específicos a cada build para planificar tu equipo ideal.

## Características

- **Creación de Builds**: Diseña y personaliza builds para tu personaje con habilidades y atributos específicos.
  
- **Gestión de Ítems**: Añade, edita y elimina ítems para cada build, optimizando tu equipo para diferentes situaciones.

- **Interfaz Intuitiva**: La aplicación cuenta con una interfaz fácil de usar, que facilita la creación y edición de builds e ítems.

## Tecnologías Utilizadas

- **Angular**: Framework para construir la interfaz de usuario y gestionar la lógica de la aplicación.

- **Ionic**: Plataforma de desarrollo de aplicaciones móviles híbridas basada en Angular.

- **TypeScript**: Lenguaje de programación tipado utilizado para el desarrollo de la aplicación.

- **Strapi**: CMS (Sistema de Gestión de Contenidos) utilizado para la gestión de datos y almacenamiento de información.

- **Netlify & Render**: Plataformas de alojamiento y despliegue para garantizar la accesibilidad y disponibilidad de la aplicación.

## Instalación

1. Clona este repositorio: `git clone https://github.com/tu-usuario/diablo4-build-planner.git`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `ionic serve`

## Configuración del Backend (Strapi)

La aplicación utiliza Strapi como CMS para gestionar los datos. Sigue estos pasos para configurar el backend:

1. [Instala Strapi](https://strapi.io/documentation/developer-docs/latest/getting-started/installation.html).
2. Configura la base de datos y define los modelos necesarios.
3. Actualiza la URL del backend en el archivo `src/environments/environment.ts`.

## Despliegue

Esta aplicación está preparada para ser desplegada en plataformas como Netlify o Render. Configura las variables de entorno necesarias y sigue los pasos de despliegue de la plataforma seleccionada.
