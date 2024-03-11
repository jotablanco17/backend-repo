class NoteManager {
    static quantity = 0;
    static notes = [];

    create(data) {
        data.id = NoteManager.quantity === 0 ? 1 : NoteManager.notes[NoteManager.quantity - 1].id++;
        NoteManager.quantity++,
        data.type ? data.type : 'to doo';
        data.date || new Date();
        !data.text ? 'ingrese texto' : NoteManager.notes.push(data);
    }
    read() {
        return NoteManager.notes
    } //reading
}

const notes = new NoteManager();
notes.create({text : 'mi primera nota'});
notes.create({text : 'mi segunda nota'});
notes.create({text : 'mi 3cera notaa'});


console.log(notes.read());