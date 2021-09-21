// EJERCICIO #0
// ¿Volver a resolver una promesa?
// ¿Cuál es el resultado del siguiente código?
let promise = new Promise(
    function (resolve, reject) {
        resolve(1);
        setTimeout(() => resolve(2), 1000);
    });

promise.then(console.log);

console.log("The result in console is 1 (first)")


// EJERCICIO #1
// Retrasar con una promesa
// La función incorporada setTimeout usa devoluciones de llamada.
// Crea una alternativa basada en promesas. La función delay (ms) debería devolver una promesa.
// Esa promesa debería resolverse después de ms milisegundos, de modo que podamos agregarle. Then().

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(`execute in ${ms} miliseconds`), ms);
    })
};

delay(3000).then(console.log);


// EJERCICIO #2
// Promesa: luego vs atrapar
// ¿Son estos fragmentos de código iguales? En otras palabras, ¿se comportan de la misma manera
// en cualquier circunstancia, para cualquier función de controlador?

// promise2.then(f1).catch(f2);
// Versus:
// promise2.then(f1, f2);
console.log("They are equivalent")


// Ejercicio #3
// Reescribir usando async / await
// Reescriba este código de ejemplo del capítulo Encadenamiento de promesas usando async /await en lugar de .then / catch:

async function loadJson(url) {
    const response = await fetch(url);
    if (response.status == 200) {
        return response.json();
    } else {
        return response.status
    }
}

// loadJson('no-such-user.json').catch(alert); // Error: 404
let response = loadJson('no-such-user.json');
console.log(response);


// EJERCICIO #4
// Reescribe "rethrow" con async / await
// A continuación puede encontrar el ejemplo de "relanzamiento". Vuelva a escribirlo usando
// async / await en lugar de .then / catch.
// Y deshacerse de la recursividad a favor de un bucle en demoGithubUser: con async / await que
// se vuelve fácil de hacer.

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    const response = await fetch(url);
    if (response.status == 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
}

async function demoGithubUser() {
    while (true) {
        let name = prompt("Enter a name?");
        try {
            let response = await loadJson(`https://api.github.com/users/${name}`);
            alert(`Full name: ${response.name}.`);
            break
        } catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
                alert("No such user, please reenter.");
                continue;
            } else {
                throw err;
            }
        }
    }
}

demoGithubUser();


// EJERCICIO #5
// Llamar a async desde non-async
// We have a “regular” function called f. How can you call the async function wait() and use its
// result inside of f?
// // ... ¿qué deberías escribir aquí? // necesitamos llamar async wait () y esperar para
// obtener 10 // recuerda, no podemos usar "await"
// }
// PD La tarea es técnicamente muy simple, pero la pregunta es bastante común para los
// desarrolladores nuevos en async / await.

async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000)); return 10;
}

function f() {
    wait().then(alert);
}

f();


// EJERCICIO #6
// Error en setTimeout
// ¿Qué piensas? ¿Se activará el .catch? Explica tu respuesta.
new Promise(function (resolve, reject) {
    // throw new Error("Whoops!");
    setTimeout(() => {
        throw new Error("Whoops!");
    }, 1000);
}).catch(alert);

console.log("Not, setTimeout is async, so it will be executed after the catch.")


// EJERCICIO #7
// Salida cada segundo
// Escriba una función printNumbers (from, to) que genere un número cada segundo, comenzando
// desde y terminando con hasta.
// Haz dos variantes de la solución.
// 1. Utilizando setInterval.
// 2. Usando setTimeout anidado.

const printNumbers = (from, to) => {
    const intv = setInterval(() => {
        console.log(from++)
        if (from > to) {
            clearInterval(intv)
        }
    }, 1000);
}

printNumbers(1, 10);