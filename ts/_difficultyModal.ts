export function createDifficultyModal():Element {
    const modalContent:Element = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const labelElement:Element = document.createElement('span');
    labelElement.classList.add('basic-text', 'difficulty');
    labelElement.textContent = 'Выбери сложность:';

    const cardsWrapper:Element = document.createElement('div');
    cardsWrapper.classList.add('difficulty-cards-wrapper');
    [1, 2, 3].forEach((idx) => {
        const cardElement:Element = document.createElement('button');
        cardElement.classList.add('difficulty-card');
        cardElement.setAttribute('id', <string><any>idx);
        cardElement.textContent = <string><any>idx;
        cardElement.addEventListener('click', (event) => {
            window.sessionStorage.setItem('playerDifficulty', <string><any>idx);
            
            clearCardStatus();
            (<Element>event.target!).classList.add('activated');
        })

        cardsWrapper.appendChild(cardElement);
    })

    const difficultyButton:Element = document.createElement('button');
    difficultyButton.classList.add('basic-button', 'difficulty');
    difficultyButton.textContent = 'Старт';
    difficultyButton.addEventListener('click', () => {
        window.application.loadScreen('gameScreen');
    })

    modalContent.appendChild(labelElement);
    modalContent.appendChild(cardsWrapper);
    modalContent.appendChild(difficultyButton);

    return modalContent;
}

function clearCardStatus() {
    document.querySelectorAll('.difficulty-card').forEach((cardElement) => {
        cardElement.classList.remove('activated');
    })
}