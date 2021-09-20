let waitTime = 2000; // 2 seconds -> 2 weeks
let kayoGotScik = Math.round(Math.random()); // 1: got scick or 0: did not get scick

const promise = new Promise(function (resolve, reject) {
    setTimeout(() => kayoGotScik == 1 ? resolve(Math.floor(Math.random() * 10) + 1) : reject(new Error('Kayo got scick')), waitTime);
})

promise
    .then(response => console.log(`Kayo is healthy and made ${response} cakes`))
    .catch(error => console.log(error))
    .finally(response => console.log(`Party!`))
