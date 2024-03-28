import express from "express"


//server
const server = express()
const port = 8080
const ready = () => console.log(`server ready in ${port}`);
server.listen(port, ready)


//middlewares 
server.use(express.urlencoded({extended:true}))
server.use(express.json())


//router

//get
server.get("/",async (req, res)=>{
    try {
        res.json({
            statusCode : 200,
            message : 'coder api ok'
        })
    } catch (error) {
        return res.json({
            statusCode : 500,
            message : 'error'
        })
    }
})

import notes from './data/fs/NotesManagers.js'


//post
const create = async (req,res) =>{
try {
    const data = req.body
    const one = await notes.create(data)
    res.json({
        statuscode : 201,
        message : `created id : ${one.id}`
    })
} catch (error) {
    return res.json({
        statusCode  :error.statusCode ||  500,
        message : error.message || 'error'
    })
}
}
server.post("/api/notes", create)





//put
const update = async (req,res) =>{
    try {
        const data = req.body
        const { nid }  = req.params
        const one = await notes.update(nid, data)
        res.json({
            statuscode : 201,
            message : `UPDATED id : ${one.id}}`,
            response : one
        })
    } catch (error) {
        return res.json({
            statusCode  :error.statusCode ||  500,
            message : error.message || 'errorazo de lapagina'
        })
    }
    }
server.put("/api/notes/:nid", update)




//delete
const destroy = async (req, res)=>{
    try {
        const { nid } = req.params
        const one = await notes.destroyid(nid)
        if (one) {
                return res.json({
                statusCode : 200,
                response : one
            })
        }else{
            const error = new Error('not found')
            error.statusCode = 404
            throw error
        }
        
    } catch (error) {
        return res.json({
            statusCode  :error.statusCode ||  500,
            message : error.message || 'errorazo de lapagina'
        })
    }
}
server.delete("/api/notes/:nid", destroy)


