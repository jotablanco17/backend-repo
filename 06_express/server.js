//npm init -y
//npm i -D nodemon
//npm i nodemon

import express from 'express'  //import "nombre-modulo" from "nombre-Modulo"

import notes from "./data/fs/NotesManagers.js"
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
