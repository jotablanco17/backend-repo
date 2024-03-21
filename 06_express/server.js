//npm init -y
//npm i -D nodemon
//npm i nodemon

import express from 'express'  //import "nombre-modulo" from "nombre-Modulo"


const server = express()
//se crea el servidor

const puerto = 8080
//puerto del servidor

const ready = () => console.log(`server listo en ${puerto}`);

server.listen(puerto, ready)
//SE INICIA Y LEVANTA EL SERVER 



//middlewares
server.use(express.urlencoded({extended : true}))  
//obligo a mi server a usar la fn encargada de leer parametros/consultas
//permite leer req.paramas y req.query



//router
server.get('/',async (req, res)=>{
    try {
        return res.status(200).json({
            response : 'coder api conected',
            success : true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: 'coder api ERROR',
            success : false
        })
    }
})



import notes from "./data/fs/NotesManagers.js"

//un parametro
server.get("/api/notes/:text/:category", async (req, res)=> {
    try {
        const { text, category } = req.params
        const data = { text, category }
        const one = await notes.create(data)
        return res.status(201).json({
            response : one ,
            succes : true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response : "ERRORAZO",
            succes : false
        })
    }
})


//leer una
server.get("/api/notes/:nid", async (req, res) => {
    try {
        const { nid } = req.params; // Obtén el ID de la solicitud
        const one = await notes.readOne(nid); // Llama al método readOne de NotesManager con el ID
        return res.status(200).json({
            response: one, // Envía la nota encontrada en la respuesta
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            response: "Nota no encontrada",
            success: false
        });
    }
});


//leer todoss
server.get("/api/notes",async (req, res)=>{
    try {
        const  {category } = req.query                   //consulta
         const all = await notes.read(category)
         if (all) {
                  return res.status(200).json({
            response : all  ,
            category,
            succes   : true
        })
         }else{
                const error = new Error(` ERROR no se encontro la categoria`)
                error.status = 404
                throw error
         }
    } catch (error) {
        console.log(error);
        return res.status(error.status).json({
            response : error.message  ,
            succes   : false
        })
    }
})


