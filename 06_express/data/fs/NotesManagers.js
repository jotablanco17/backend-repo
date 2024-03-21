import fs  from 'fs'
import crypto from 'crypto' 



class NotesManager {
    constructor() {
        this.path = './data/fs/files/notes.json'
        this.init()
    }

    init() {
        const exist = fs.existsSync(this.path)
        if (!exist) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
        } else{
            console.log('archivo ya existe . GOOD');
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
                    category : data.category,
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
                return one; // Devuelve la nota encontrada
            }
        } catch (error) {
            throw error; // Lanza el error para manejarlo en el controlador de Express.js
        }
    }
    
    async read(cat = 'to do') {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
    
            if (!cat || cat === 'to do') {
                console.log(all); // Imprime todas las notas en la consola
                return all; // Devuelve todas las notas si no se proporciona ninguna categoría o si la categoría es "to do"
            } else {
                const filtered = all.filter((el) => el.category === cat);
                if (filtered.length === 0) {
                    return null; // Devuelve null si no se encuentran notas para la categoría proporcionada
                } else {
                    console.log(filtered); // Imprime las notas filtradas en la consola
                    return filtered;
                }
            }
        } catch (error) {
            console.log(error);
            return null;
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
const notes = new NotesManager()
export default notes;

// async function test() {
//     try {
//         
//         await notes.create({ text: 'hola', category : 'saludo' })
//         await notes.create({ text: 'chau', category : 'despido' })
//         await notes.create({ text: 'no', category : 'orden' })
       
//         await notes.read()
//         // await notes.readOne(10)
//         notes.destroyid("1b1b6e94c513ad846fe09cfc")
//     } catch (error) {
//         console.log(error);
//     }
// }
// test()
