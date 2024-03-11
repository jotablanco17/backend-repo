const restar = (n1, n2) => n1 - n2;
const sumar = (n1, n2) => n1 + n2;
const multiplicar = (n1, n2) => n1 * n2;


function calcular(n1, n2 , operacion) {
    const resultadoOp =  operacion(n1, n2)
    return resultadoOp
}


function verificarDivisiom(error, exito) {
    if (error) {
        console.log('ocurrio un error');
        return error;
    } else {
        return exito;
    }
}


// con promesa
function dividir(n1, n2) {
    return new Promise((resolve, reject) => {
        if(n2 !== 0){
        return    resolve(n1/n2)
        }else{
            return     reject('N2 ES CERO')
        }
    })
}

calcular(2, 2, sumar)
calcular(4, 2, restar)
calcular(4, 2, multiplicar)

calcular(100, 10, dividir)
.then((res)=>console.log(res))
.catch((err)=> console.log(err))

calcular(20, 0, dividir)
.then((res)=>console.log(res))
.catch((err)=> console.log(err))




