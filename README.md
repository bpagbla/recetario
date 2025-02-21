# Chop Chop - Recetario en Angular

## 📌 Descripción

Chop Chop es una aplicación web creada con Angular que permite a los usuarios añadir, visualizar y gestionar recetas de cocina de manera sencilla e intuitiva.

## Herramientas Usadas

- **Angular**
- **Bootstrap**
- **Angular Material**
- **Firebase (para la base de datos y almacenamiento de recetas)**

---

## Manual de Usuario

### 🏠 Landing Page

La página principal explica brevemente el propósito de la aplicación y cuenta con un **navbar** que facilita la navegación a las diferentes secciones.

### 🍽 Añadir Receta

Para añadir una nueva receta, sigue estos pasos:

1. Haz clic en el botón **"Nueva Receta"** en el navbar.
2. En la nueva página, completa el formulario con los siguientes campos:
   - **Nombre del plato** (Obligatorio)
   - **Seleccionar ingredientes** en el desplegable (Debe seleccionarse al menos uno).
   - Si el ingrediente no está disponible, agrégalo en **"Añadir Ingrediente"**.
   - **Cantidad de cada ingrediente** (Obligatorio).
   - **Instrucciones de preparación** (Obligatorio).
3. Pulsa el botón **"Guardar Receta"**.
4. La receta se guardará en la base de datos y serás redirigido a la página principal.
5. Mientras escribes, puedes visualizar la receta en tiempo real en el lado derecho de la pantalla.

### 🥦 Añadir Ingrediente

Si el ingrediente deseado no está en la base de datos:

- Escribe su nombre en el campo **"Añadir Ingrediente"**.
- Se agregará a la base de datos y quedará disponible en el desplegable.
- Si ya existe, simplemente se seleccionará sin duplicarse.

### 📜 Ver Todas las Recetas

Desde el apartado **"Todas las Recetas"**, puedes visualizar todas las recetas disponibles en la base de datos. Se mostrarán:

- Nombre del plato.
- Lista de ingredientes.
- Un fragmento del texto de preparación.

Para leer la receta completa, haz clic en **"Leer Más"**.

### 🔍 Filtros

Las recetas pueden filtrarse por ingredientes desde el desplegable en la parte superior izquierda.

- Al seleccionar un ingrediente, se mostrarán solo las recetas que lo contengan.
- Si seleccionas varios ingredientes, aparecerán recetas que incluyan al menos uno de ellos.

### 📖 Leer una Receta

- Al hacer clic en **"Leer Más"**, accederás a la receta completa.
- Para volver a la lista de recetas, haz clic en **"Todas las Recetas"**.

---

## Posibles Implementaciones Futuras

- Opción para **borrar recetas e ingredientes**.
- **Autenticación con Firebase**, permitiendo que solo usuarios registrados puedan añadir o eliminar recetas.

---

## 📂 Instalación y Ejecución

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/recetario-angular.git

# Accede al directorio del proyecto
cd recetario-angular

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
ng serve

# Abre el navegador y visita:
http://localhost:4200/
```


