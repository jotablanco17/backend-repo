const NotesManager = require('./fs/NotesManager.js')
const notes = new NotesManager()

async function router(req, res) {
    const url = req.url
    const options = { 'Content-Type': 'text/plain' }
    switch (url) {
        case '/home':
            const all = await notes.read()
            res.writeHead(200, options).end(JSON.stringify(all))
            console.log('mi json');
            break;
    }
}

module.exports = router;