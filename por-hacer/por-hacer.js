const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

/* Crea un archivo data.json con la tarea ingresada */
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err => {
        if (err)
            throw new Error('No fue posible generar la tarea');
    }));
}

/* Carga las tareas registradas en el archivo data.json */
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

/* Carga las tareas registradas. En caso de no existir la tarea en el .json, la registra. */
const crear = (descripcion, completado = false) => {

    cargarDB();

    let existeTarea = listadoPorHacer.filter(tarea => tarea.descripcion === descripcion);
    if (existeTarea.length === 0) {
        /* No hay una tarea con la descripcion ingresada */
        let porHacer = {
            descripcion,
            completado
        };

        listadoPorHacer.push(porHacer);
        guardarDB();

        return porHacer;
    } else {
        return 'Ya existe una tarea con la descripción ingresada';
    }


}

/* Imprime en consola, la lista de tareas registradas */
const getListado = () => {
    try {
        listadoPorHacer = require('../db/data.json');
        let cont = 1;

        console.log(`============== Por Hacer ===============`.green);
        for (let tarea of listadoPorHacer) {
            if (tarea.completado === true)
                console.log(`   Tarea-${cont}: ${tarea.descripcion} ${colors.green("Listo")} `);
            else
                console.log(`   Tarea-${cont}: ${tarea.descripcion}  ${colors.red("Pendiente")}`);
            cont++;
        }
        console.log('========================================'.green);
    } catch (error) {
        console.log("No hay tareas registradas");
    }
}

/* Imprime en consola, la lista de tareas registradas, segun el estado ingresado */
const getListadoC = (completado) => {

    if (completado === false) completado = false;
    else {
        if (completado === "true") completado = true;
        else if (completado === "false") completado = false;
        else console.log("Ingrese true o false");
    }

    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === completado);
    //console.log(nuevoListado.length);
    if (nuevoListado.length <= 0) {
        /*No hay coincidencias*/
        if (completado === true)
            console.log("No hay tareas completadas".red);
        else {
            console.log("No hay tareas pendientes".green);
        }
    } else {
        let cont = 1;
        console.log(`============== Por Hacer ===============`.green);
        for (let tarea of nuevoListado) {
            if (tarea.completado === true)
                console.log(`   Tarea-${cont}: ${tarea.descripcion} ${colors.green("Listo")} `);
            else
                console.log(`   Tarea-${cont}: ${tarea.descripcion}  ${colors.red("Pendiente")}`);
            cont++;
        }
        console.log('========================================'.green);
    }
}

/* Actualiza el Estado de la Tarea a "completado", según la Descripcion ingresada. */
const actualizar = (descripcion, completado) => {
    if (completado === false) {
        //console.log(`false por defecto`);
        completado = false;
    } else {
        if (completado === "true") {
            //console.log(`true`);
            completado = true;
        } else if (completado === "false") {
            //console.log(`false`);
            completado = false;
        } else {
            console.log("Ingrese true o false");
        }
    }

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return "Tarea actualizada";
    } else {
        return "Tarea ingresada no existe";
    }
}

// /* CREADA POR MI - Elimina de a 1 tarea con la misma descripcion*/
// const borrar = (descripcion) => {
//     cargarDB();
//     let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

//     if (index >= 0) {
//         listadoPorHacer.splice(index, 1);
//         guardarDB();
//         return true;
//     } else
//         return false;
// }

/* CREADA POR EL CURSO - Elimina mas de una tarea con la misma descripcion */
const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (nuevoListado.length === listadoPorHacer.length)
    /*No hay coincidencias*/
        return "Tarea ingresada no existe";
    else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return "Tarea eliminada";
    }
}

/* Exporta las funciones creadas */
module.exports = {
    crear,
    getListado,
    getListadoC,
    actualizar,
    borrar
}