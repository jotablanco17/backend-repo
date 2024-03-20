const fs = require('fs')
const crypto = require('crypto')

class UserManager {
    constructor() {
        this.path = './data/fs/files/users.json'
        this.init()
    }

    init() {
        const exist = fs.existsSync(this.path)
        if (!exist) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log('archivo creado');
        } else {
            console.log('archivo ya existe');
        }
    }

    async create(data) {
        try {
            if (!data.email || !data.password) {
                const erro = new Error('ingrese mail y contraseña')
                throw erro
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString('hex'),
                    photo: data.photo || 'url',
                    role: data.role,
                    email: data.email,
                    password: data.password
                }
                let all = await fs.promises.readFile(this.path, 'utf-8')
                all = JSON.parse(all)
                all.push(product)
                all = JSON.stringify(all, null, 2)
                await fs.promises.writeFile(this.path, all)
                console.log('creado');
                return product;
            }
        } catch (error) {
            throw (error);
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


    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            const one = all.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontro el id')
            } else {
                console.log('se encontro el producto correctamente');
                console.log(one);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroyId(id) {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            const one = all.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontro el producto a eliminar')
            } else {
                let filtered = all.filter((el) => el.id !== id)
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered)
                console.log(`usuario : '${id}' eliminado `);
                return one
            }
        } catch (error) {
            console.log(error);
        }
    }

}

const users = new UserManager()

async function mets() {
    await users.create({
        role: 'hex',
        photo: 'hello.png',
        email: 'juan@gmail.com',
        password: 'juan123'
    })
    await users.create({
        role: 'let',
        photo: 'martin.png',
        email: 'martin@gmail.com',
        password: 'martin123'
    })
    await users.create({
        role: 'orl',
        photo: 'chau.png',
        email: 'jaime@gmail.com',
        password: 'jaime23'
    })
    await users.create({
        role: 'cot',
        email: 'coti@gmail.com',
        password: 'coti123'
    })


    await users.read();
    // await users.readOne(1111)                          //no encontrado 
    // await users.readOne("4cd24ce955d04c4a612cfa39")
    
    // await users.destroyId(34131)                      //no encontrado
    // await users.destroyId("c4f58ff5676d6181198d5beb")

}
mets()