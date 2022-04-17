const _ = require("lodash");
import { zeroPad } from './_utils';


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
    startAgainButton.addEventListener('click', () => {
        window.application.loadScreen('gameScreen');
    })
    
    gameHeader!.appendChild(startAgainButton);

    const cardsWrapper:Element = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');
    (<HTMLElement>cardsWrapper)!.style.gridTemplateColumns = `repeat(${getGridTemplateRows(window.sessionStorage.getItem('playerDifficulty')!)}, 95px)`;
    (<HTMLElement>cardsWrapper)!.style.gridTemplateRows = `repeat(4, 1fr)`;

    let cards:string[] = generateCards();
    let cardId = 0;
    while (cards.length != 0) {
        const cardElement = document.createElement('img');
        cardElement.classList.add('game-card');

        const pair:string = cards.splice(randomIntFromInterval(0, cards.length - 1), 1)[0]!;
        cardElement.setAttribute('data-value', pair);
        cardElement.setAttribute('src', `../src/card-faces/card-back.png`);
        cardElement.setAttribute('id', <string><any>cardId);
        cardId += 1;

        cardElement.addEventListener('click', (event) => {
            const currentElement = <Element>event.target!;
            if (!currentElement.classList.contains('chosen')) {
                currentElement.classList.add('chosen');
                currentElement.setAttribute('src', `../src/card-faces/${cardElement!.getAttribute('data-value')}.png`);
                
                window.application.timeouts.push(setTimeout(
                    () => {
                        checkCards(currentElement); 
                    },
                    500
                ))
            }
        })
        
        cardsWrapper.appendChild(cardElement);
    }

    appWrapper.appendChild(gameHeader);
    appWrapper.appendChild(cardsWrapper);

    window.sessionStorage.setItem('gameStartTime', (new Date().getTime() + (21 - Math.pow(<number><any>window.sessionStorage.getItem('playerDifficulty'), 2))*60000).toString());
    updateGameTime();
    window.application.timers.push(setInterval(
        updateGameTime,
        1000,
    ))

    window.application.timers.push(setInterval(
        checkGameStatus,
        1000,
    ))
}

function getGameTimeSeconds():number {
    // return (new Date().getTime()) - <number><any>window.sessionStorage.getItem('gameStartTime');
    return (<number><any>window.sessionStorage.getItem('gameStartTime') - new Date().getTime());
}

function updateGameTime() {
    let gameTimeSeconds = getGameTimeSeconds();
    gameTimeSeconds = (gameTimeSeconds < 0) ? 0 : gameTimeSeconds;

    document.getElementById('timeMinutes')!.textContent = <string><any>zeroPad(Math.floor((gameTimeSeconds % (1000 * 60 * 60)) / (1000 * 60)), 2);
    document.getElementById('timeSeconds')!.textContent = <string><any>zeroPad(Math.floor((gameTimeSeconds % (1000 * 60)) / 1000), 2);
}

function checkCards(chosenCardElement:Element) {
    if (sessionStorage.getItem('selectedCard') === null) {
        sessionStorage.setItem('selectedCard', chosenCardElement!.id);
    } else {
        const selectedCardElement = document.getElementById(sessionStorage.getItem('selectedCard')!);
        if ((selectedCardElement!.getAttribute('data-value') === chosenCardElement!.getAttribute('data-value')) && (selectedCardElement!.id != chosenCardElement!.id)) {
            [selectedCardElement, chosenCardElement].forEach((cardElement) => {
                cardElement!.classList.add('hidden');
            })
        } else {
            [selectedCardElement, chosenCardElement].forEach((cardElement) => {
                cardElement!.classList.remove('chosen');
                cardElement!.setAttribute('src', `../src/card-faces/card-back.png`);
            })
        }
        sessionStorage.removeItem('selectedCard');
        window.application.timeouts.forEach((timeout:ReturnType<typeof setTimeout>) => {
            clearTimeout(timeout);
        })
        checkGameStatus();
    }
}

function checkGameStatus() {
    // const timeLimit = 20 - 5*<number><any>window.sessionStorage.getItem('playerDifficulty');
    if (document.querySelectorAll('.game-card').length == document.querySelectorAll('.hidden').length) {
        window.application.modals['gameResult'](true);

    // } else if (Math.floor((getGameTimeSeconds() % (1000 * 60 * 60)) / (1000 * 60)) >= timeLimit) {
    } else if (getGameTimeSeconds() <= 0) {
        window.application.modals['gameResult'](false);
    }
}

export function getGridTemplateRows(playerDifficulty:string) {
    switch (playerDifficulty) {
        case '1':
            return 6;
        case '2':
            return 8;
        case '3':
            return 9;
        default:
            return 9;
    }
}

function randomIntFromInterval(min:number, max:number):number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateCards():string[] {
    const allCombinations:string[] = getCortesianProduct(['clubs', 'diamonds', 'hearts', 'spades'], ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6']);
    let selectedPairs:string[] = _.sampleSize(allCombinations, <number><any>window.sessionStorage.getItem('playerDifficulty')*6);
    selectedPairs = selectedPairs.flatMap(i => [i, i]);

    return selectedPairs;
}

function getCortesianProduct(arr1:string[], arr2:string[]):string[] {
    const cortesianProduct:string[] = [];
    arr1.forEach((arr1_el) => {
        arr2.forEach((arr2_el) => {
            cortesianProduct.push([arr1_el, arr2_el].join('_'));
        })
    })

    return cortesianProduct;
}