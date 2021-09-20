function throwTheDice() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 6) + 1);
        }, 1000);
    });
}

async function doTask(attempts) {
    for (let i = 0; i < attempts; i++) {
        const dice = await throwTheDice();
        if (dice == 6) {
            console.log(`got a ${dice}, exit`)
            break;
        }
        console.log(`got a ${dice}`)
    }
};

const attempts = 10
doTask(attempts);