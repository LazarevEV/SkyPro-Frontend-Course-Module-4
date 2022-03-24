// div class="wrapper game-result">
//             <img class="game-result-icon" src="../src/game-result-icons/win_icon.png">
//             <span class="game-result-text">Вы выиграли!</span>
//             <div class="game-time-spent-wrapper">
//                 <span class="game-time-spent-label">Затраченное время:</span>
//                 <span class="game-time-spent-value">01.20</span>
//             </div>
//             <button class="basic-button">Играть снова</button>
//         </div>

import { zeroPad } from './_utils';


export function createGameResultModal(isWin:boolean):Element {
    const modalContent:Element = document.createElement('div');
    modalContent.classList.add('modal-content', 'game-result');

    const gameResultIcon = document.createElement('img');
    gameResultIcon.classList.add('game-result-icon');
    gameResultIcon.setAttribute('src', `../src/game-result-icons/${(isWin) ? 'win_icon' : 'lose_icon'}.png`);

    const gameResultText = document.createElement('span');
    gameResultText.classList.add('game-result-text');
    gameResultText.textContent = (isWin) ? 'Вы выиграли!' : 'Вы проиграли!'

    const spentTimeWrapper = document.createElement('div');
    spentTimeWrapper.classList.add('game-time-spent-wrapper');

    const spentTimeLabel = document.createElement('span');
    spentTimeLabel.classList.add('game-time-spent-label');
    spentTimeLabel.textContent = 'Затраченное время:'

    const spentTimeValue = document.createElement('span');
    spentTimeValue.classList.add('game-time-spent-value');
    spentTimeValue.textContent = getGameSpentTime();

    spentTimeWrapper.appendChild(spentTimeLabel);
    spentTimeWrapper.appendChild(spentTimeValue);

    const playAgainButton = document.createElement('button');
    playAgainButton.classList.add('basic-button');
    playAgainButton.textContent = 'Играть снова';
    playAgainButton.addEventListener('click', () => {
        window.application.loadModal('difficulty');
    })
    
    
    modalContent.appendChild(gameResultIcon);
    modalContent.appendChild(gameResultText);
    modalContent.appendChild(spentTimeWrapper);
    modalContent.appendChild(playAgainButton);

    return modalContent;
}

function getGameSpentTime():string {
    let gameTimeSeconds =  (21 - Math.pow(<number><any>window.sessionStorage.getItem('playerDifficulty'), 2))*60000 - (<number><any>window.sessionStorage.getItem('gameStartTime') - new Date().getTime());
    gameTimeSeconds = (gameTimeSeconds < 0) ? 0 : gameTimeSeconds;

    return <string><any>zeroPad(Math.floor((gameTimeSeconds % (1000 * 60 * 60)) / (1000 * 60)), 2) + '.' + <string><any>zeroPad(Math.floor((gameTimeSeconds % (1000 * 60)) / 1000), 2);
}