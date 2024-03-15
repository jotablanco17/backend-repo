const fs = require('fs')
const ruta = './04_fs/tickets.json'

const contenido = JSON.stringify([], null, 2)

fs.writeFile(ruta, contenido,  (error) => {
    if (error) {
        console.log(error);
    }else{
        console.log('creado');
    }
})

fs.readFile(ruta, 'utf-8',(error, exito)=>{   //callback, primer parametro es el error siempre
    if (error) {
        console.log(error);
    }else{
        console.log('se han leido peliculas');
        console.log(exito);                     //en exito se guardan los datos del archivo
    }
} )

// fs.unlink(ruta, (error)=>{                  //borra los datos
//     if (error) {
//         console.log(error);
//     }else{
//         console.log('eliminado');
//     }
// })
