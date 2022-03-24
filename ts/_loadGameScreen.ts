function getCortesianProduct(arr1:string[], arr2:string[]):string[] {
    const cortesianProduct:string[] = [];
    arr1.forEach((arr1_el) => {
        arr2.forEach((arr2_el) => {
            cortesianProduct.push([arr1_el, arr2_el].join('_'));
        })
    })

    return cortesianProduct;
}

export function loadGameScreen(appWrapper:Element) {
    const gameHeader:Element = document.createElement('div')!;
    gameHeader!.classList.add('game-header');

    const timeBlock:Element = document.createElement('div')!;
    timeBlock!.classList.add('time-block');
    for (let i = 0; i < 6; i++) {
        const spanElement:Element = document.createElement('span');
        spanElement.classList.add('time-label');
        if (i >= 3) {
            spanElement.classList.add('big');
            spanElement.textContent = '00';
        }

        if (i == 0) spanElement.textContent = 'min';
        if (i == 2) spanElement.textContent = 'sec';
        if (i == 3) spanElement.setAttribute('id', 'timeMinutes');
        if (i == 4) spanElement.textContent = '.';
        if (i == 5) spanElement.setAttribute('id', 'timeSeconds');

        timeBlock!.appendChild(spanElement);
    }
    gameHeader!.appendChild(timeBlock);

    const startAgainButton:Element = document.createElement('button');
    startAgainButton.classList.add('basic-button', 'start-again');
    startAgainButton.textContent = 'Начать заново';
    
    gameHeader!.appendChild(startAgainButton);

    const cardsWrapper:Element = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');
    getCortesianProduct(['clubs', 'diamonds', 'hearts', 'spades'], ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6']).forEach(pair => {
        // const cardElement = document.createElement('div');
        const cardElement = document.createElement('img');
        cardElement.classList.add('game-card');
        // cardElement.setAttribute('id', pair.join('_'));
        // cardElement.setAttribute('src', `../src/card-faces/${pair.join('_')}.png`)
        cardElement.setAttribute('id', pair);
        cardElement.setAttribute('src', `../src/card-faces/${pair}.png`)
        
        cardsWrapper.appendChild(cardElement);
    });

    appWrapper.appendChild(gameHeader);
    appWrapper.appendChild(cardsWrapper);
}