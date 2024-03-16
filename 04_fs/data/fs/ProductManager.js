const fs = require('fs')
const crypto = require('crypto')

class ProductManager {
    constructor() {
        this.path = './data/fs/files/products.json'
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
            if (!data.title) {
                const erro = new Error(' NO CREADO : ingrese un titulo al producto')
                throw erro
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString('hex'),
                    photo: data.photo || '',
                    title: data.title,
                    category: data.category,
                    price: data.price,
                    stock: data.stock || 'sin stock'
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
                console.log(one);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroyid(id) {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            const one = all.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontradoo')
            } else {
                let filtered = all.filter((el) => el.id !== id)
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered)
                console.log(`producto : '${id}' eliminado `);
                return one
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const products = new ProductManager()

async function mets() {
    await products.create({
        title: 'neumaticos',
        photo: 'hneumatico.png',
        category: 'autos',
        price: 250,
        stock: 38
    })
    await products.create({
        title: 'motor',
        photo: 'motor.png',
        category: 'autos',
        price: 500,
        stock: 10
    })
    await products.create({
        title: 'caja',
        photo: 'caja.png',
        category: 'cajas',
        price: 300,
        stock: 20
    })
    await products.create({
        title: 'silla',
        category: 'muebles',
        price: 200,
        stock: 38
    })
    await products.create({
        title: 'sillon',
        photo: 'sillon.png',
        category: 'Muebles',
        price: 150,
        stock: 15
    })
    await products.create({
        title: 'remera',
        photo: 'remer.png',
        category: 'ropa',
        price: 70,
        stock: 38
    })
    await products.create({
        title: 'media',
        photo: 'medias.png',
        category: 'ropa',
        price: 20,
        stock: 18
    })
    await products.create({
        title: 'abrigo',
        category: 'ropa',
        price: 40,
        stock: 50
    })
    await products.create({
        title: 'gitarra',
        photo: 'guitarra.png',
        category: 'instrumento',
        price: 30,
        stock: 12
    })
    await products.create({
        title: 'celular',
        category: 'electronicos',
        price: 1200,
        stock: 10
    })
    await products.read();

    // await products.readOne('3232')                 //no encontrado
    // await products.readOne("395a75486d1cc41286ed354f")

    // await products.destroyid('232323')            //no encontrado
    // await products.destroyid("1eb7de17d51ea290a8dd4abd")

}
mets()