Tarea2 - API 
Carlos Roberto Osegueda 20212030669

REQUISITOS
Tener instalado node y npm
node install
npm install

INSTRUCCIONES
1-Correr el servidor, ejecutar en la terminal
node index.js 
ó utilizar
npm run dev

Para apagar el servidor usar ctrl y c

2-Entrar a 'http://localhost:3000/tareas'

3-Para manipular la api se debe ejecutar en la consola (Ctrl + Shift + I) del server lo siguiente:

#Obtener todas las Tareas (GET)
fetch('http://localhost:3000/tareas')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error al obtener tareas:', error));

#Obtener Tarea especifica, cambiar el 1 por el id de la tarea deseada (GET/ID)
fetch('http://localhost:3000/tareas/1')
    .then(response => {
        if (!response.ok) {
            throw new Error('Tarea no encontrada');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error al obtener la tarea:', error));


#Crear una Tarea (POST)
fetch('http://localhost:3000/tareas', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'Aquí va el titulo que es obligatorio',
        description: 'Aqui va la descripción que debe tener más de 20 caracteres.'
    })
})
.then(response => response.json())
.then(data => console.log('Tarea agregada:', data))
.catch(error => console.error('Error al agregar la tarea:', error));


#Actualizar Tarea existente, cambiar el 1 por el id de la tarea deseada (PUT)
fetch('http://localhost:3000/tareas/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'Nuevo Título',
        description: 'Nueva Descripción.',
        completada: true
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
    }
    return response.json();
})
.then(data => console.log('Tarea actualizada:', data))
.catch(error => console.error('Error al actualizar la tarea:', error));

#Eliminar Tarea, cambiar el 1 por el id de la tarea deseada (DELETE)
fetch('http://localhost:3000/tareas/1', {
    method: 'DELETE'
})
.then(response => {
    if (response.status === 204) {
        console.log('Tarea eliminada con éxito');
    } else {
        console.error('Error al eliminar la tarea');
    }
})
.catch(error => console.error('Error:', error));


Con la ruta 'http://localhost:3000/tareas/1' podremos observar el objeto que pertenece a ese codigo.
Las Tareas Agregadas se ven reflejadas en el archivo tareas.json.
Las propiedades ID, Completada y Fecha se agregan automaticamente.
