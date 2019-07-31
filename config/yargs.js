const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de una tarea por hacer'
}

const completado = {
    default: false,
    alias: 'c',
    desc: 'Marca como completado o pendiente una tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion,
    })
    .command('actualizar', 'Actualiza una tarea a completado', {
        descripcion,
        completado
    })
    .command('listar', 'Muestra una lista de las tareas registradas', {})
    .command('listarC', 'Muestra una lista de las tareas registradas según su estado', { completado })
    .command('eliminar', 'Elimina una tarea según su descripción', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}