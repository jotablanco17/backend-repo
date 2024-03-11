class Persona {
    static cantidadDePersonas = 0
    constructor(nombre, ciudad, edad, vida ){
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.edad = edad;
        this.vida = vida || 120
        Persona.cantidadDePersonas++
    }
    comer(cantidad){                             //metodo de clasess
        if (this.vida > 200) {
            console.log(`${this.nombre} no puede comer mas`);
        }else{
            this.vida = this.vida +cantidad
        }
    }
    entrenar(cantidad){
        this.vida = this.vida - cantidad
    }
    mudarse(lugar){
        this.ciudad = lugar;
        this.vida = this.vida - 20
    }
}

const p1 = new Persona('jota', 'bs', 19, 100)
p1.comer(100)
p1.entrenar(20)
p1.mudarse('españa')
console.log(p1);

const p2 =  new Persona('coti', 'mendoza', 18)
p2.comer(80)
p2.entrenar(30)
p2.mudarse('new york')
console.log(p2);


const p3 =  new Persona('macho', 'mendoza', 18, 980)
p3.comer(20)
p3.entrenar(200)
p3.mudarse('villa luzuriaga')
console.log(p3);



console.log(Persona.cantidadDePersonas);




// algo a cambiarr