class NotesManager {
    static #notes = []

    create(data) {
        try {
            const note = {
                id: (NotesManager.#notes.length === 0) ? 1 : NotesManager.#notes[NotesManager.#notes.length - 1].id + 1,
                type: data.type || 'to do',
                text: data.text,
                date: data.date || new Date()
            }
            if (!data.text) {
                throw new Error('ingrese texto en la ndotaa')
            } else {
                console.log('nota creada');
                NotesManager.#notes.push(note)
            }
        } catch (error) {
            console.log(error);
        }
    }

    read() {
        try {
            if (NotesManager.#notes.length === 0) {
                throw new Error('no hay notas')
            } else {
                return console.log(NotesManager.#notes);
            }
        } catch (error) {
            console.log(error);
        }
    }
    readOne(id) {
        const one = NotesManager.#notes.find((el) => el.id === id)
        try {
            if (!one) {
                throw new Error('no existe el id')
            } else {
                return console.log(one);
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy(id) {
        try {
            this.readOne(id)   //accedo0 a metodo de esta misma clase
            const within = NotesManager.#notes.filter((el) => el.id !== id)
            NotesManager.#notes = within
            console.log('nota eliminada');
        } catch (err) { console.log(err); }
    }
}

const notes = new NotesManager()
notes.read();          //sin try catch / me bloquea el codigo con el error sin seguir la ejecucion
notes.create({ type: 'tupe' })  //erro xq no tiene text
notes.create({ text: 'nota 1' })  //me crea un objeto porque le pase text
notes.create({ text: 'nota 2' })
notes.create({ text: 'nota 3' })
notes.create({ text: 'nota 4' })
notes.create({ text: 'nota 5' })
notes.create({ text: 'nota 6' })
notes.read()  //devuelve la nota ya que el try catch anterior me permite seguir con el codigo

notes.readOne(1)     //me devuelve el objeto del id que paso
notes.readOne(9)     //error, el id no coincide con ninguno

notes.destroy(6)     //elimino el obj del id 6
notes.destroy(10)    //error no se encontro el id
notes.read()         //devuelvo el array nuevo  con el id eliminado anteriormente

