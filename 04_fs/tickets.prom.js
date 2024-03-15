const fs = require('fs')
const ruta = './04_fs/tickets.json' 

const contenido = JSON.stringify([{title : 'rapidos y furiosos', place : 'hoyts'},{title : 'seleccion', place : 'atlas'}], null, 2)


fs.promises.writeFile(ruta, contenido)
.then((res) => console.log(res))
.catch((err)=> console.log(err))


fs.promises.readFile(ruta, 'utf-8')
.then((respuesta)=>console.log(JSON.parse(respuesta)))
.catch((error)=> console.log(error))

//fs.promises.unlink(ruta)
.then(()=>console.log('se borro'))
.catch((errorazo)=> errorazo)