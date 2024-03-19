const fs = require('fs')
const crypto = require('crypto')

module.exports =   class NotesManager {
    constructor() {
        this.path = './fs/files/notes.json'
        this.init()
    }

    init() {
        const exist = fs.existsSync(this.path)
        if (!exist) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
        } else{
            console.log('existe');
        }
    }
    async create(data) {
        try {
            if (!data.text) {
                const erro = new Error('ingrese un texto')
                throw erro
            } else {
                const note = {
                    id: crypto.randomBytes(12).toString('hex'),
                    text: data.text,
                    date: data.date || new Date(),
                }
                let all = await fs.promises.readFile(this.path, 'utf-8')
                all = JSON.parse(all)
                all.push(note)
                all = JSON.stringify(all, null, 2)
                await fs.promises.writeFile(this.path, all)
                console.log('creado');
                return note;
            }
        } catch (error) {
            throw (error);
        }
    }


    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            const one = all.find((el)=>el.id===id)
            if (!one) {
                throw new Error('no se encontro el id')
            } else {
                console.log(one);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async read() {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            if (!all) {
                throw new Error('no existe')
            } else {
                console.log(all);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroyid(id){
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            const one = all.find((el)=>el.id===id)
            if (!one) {
                throw new Error('no se encontradoo')
            } else {
                let filtered = all.filter((el)=>el.id !== id)
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered)
                console.log('eliminado');
                return one
            }
        } catch (error) {
            console.log(error);
        }
    }
}

