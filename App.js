//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case "crear":
        //console.log('Crear por hacer');
        let tarea = porHacer.crear(argv.descripcion.toLocaleLowerCase());
        console.log(tarea);
        break;
    case "listar":
        //console.log('Mostrar todas las tareas por hacer');
        let listar = porHacer.getListado();
        break;
    case "listarC":
        //console.log('Mostrar todas las tareas por hacer');
        let listarC = porHacer.getListadoC(argv.completado);
        break;
    case "actualizar":
        //console.log('Actualiza una tarea por hacer');
        let actualizar = porHacer.actualizar(argv.descripcion.toLocaleLowerCase(), argv.completado);
        console.log(actualizar);
        break;
    case "eliminar":
        let borrar = porHacer.borrar(argv.descripcion.toLocaleLowerCase());
        console.log(borrar);
        break;

    default:
        console.log('Comando no es reconocido');
}