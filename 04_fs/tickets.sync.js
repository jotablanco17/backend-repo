//TODOS LOS METODOS DE FILESYSTEM DEVUELVUEN EN JSON

const fs = require('fs')    //inicializo fs
const path = './04_fs/tickets.json'   //ruta en donde guardo el archivo

if (!fs.existsSync(path) ) { //checkeo si el arch de la ruta existe
    const array =JSON.stringify([])
    fs.writeFileSync(path, array)    //escribir o sobreescribir contenido del archivo
}

const movies =JSON.parse(fs.readFileSync(path, 'utf-8') )     // (ruta, config)
const movie1 = { title: 'hp1', place: 'hoyts' }
movies.push(movie1)
const moviesString = JSON.stringify(movies, null, 2)   //idento el json  (datos, filtro nulo, num de separacion  )
fs.writeFileSync(path, moviesString)       //  (ruta, dato)

//fs.unlinkSync(path)   //borra el archivo

