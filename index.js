const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Leer el archivo tareas.json al inicio
let tareas = [];

// Función para cargar las tareas desde el archivo JSON
const cargarTareas = () => {
    try {
        const data = fs.readFileSync('tareas.json', 'utf8');
        tareas = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de tareas:', error);
        tareas = []; // Si hay un error, inicializar como arreglo vacío
    }
};

// Middleware para validar tareas
const validarTarea = (req, res, next) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'El título es obligatorio.' });
    }
    if (!description || description.length < 20) {
        return res.status(400).json({ error: 'La descripción debe tener al menos 20 caracteres.' });
    }
    next(); // Continúa con la siguiente función de middleware o ruta
};

// Cargar las tareas desde el archivo JSON al iniciar el servidor
cargarTareas();

// Ruta para obtener todas las tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

// Ruta para obtener una tarea específica por ID
app.get('/tareas/:id', (req, res) => {
    const { id } = req.params;
    const tarea = tareas.find(t => t.id === parseInt(id));
    
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    
    res.json(tarea);
});

// Ruta para crear una nueva tarea (usa el middleware de validación)
app.post('/tareas', validarTarea, (req, res) => {
    const { title, description } = req.body;

    // Crear una nueva tarea
    const nuevaTarea = {
        id: tareas.length + 1, // Asignar un ID único
        title,
        description,
        completada: false,
        fecha_creacion: new Date(),
    };

    // Agregar la nueva tarea al arreglo
    tareas.push(nuevaTarea);

    // Guardar las tareas en el archivo JSON
    fs.writeFileSync('tareas.json', JSON.stringify(tareas, null, 2));

    // Enviar la respuesta
    res.status(201).json(nuevaTarea);
});

// Ruta para actualizar una tarea existente
app.put('/tareas/:id', validarTarea, (req, res) => {
    const { id } = req.params;
    const { title, description, completada } = req.body;
    const tarea = tareas.find(t => t.id === parseInt(id));
    
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    // Actualizar los campos de la tarea
    if (title) tarea.title = title;
    if (description) tarea.description = description;
    if (completada !== undefined) tarea.completada = completada;

    // Guardar las tareas actualizadas en el archivo JSON
    fs.writeFileSync('tareas.json', JSON.stringify(tareas, null, 2));

    res.json(tarea);
});

// Ruta para eliminar una tarea por ID
app.delete('/tareas/:id', (req, res) => {
    const { id } = req.params;
    const index = tareas.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    // Eliminar la tarea del arreglo
    tareas.splice(index, 1);

    // Guardar las tareas actualizadas en el archivo JSON
    fs.writeFileSync('tareas.json', JSON.stringify(tareas, null, 2));

    res.status(204).send(); // Respuesta sin contenido
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
