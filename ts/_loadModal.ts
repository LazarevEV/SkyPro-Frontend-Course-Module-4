import { createDifficultyModal } from './_difficultyModal';
import { createGameResultModal } from './_gameResultModal';


export function createModal(modalName:string, args=[]) {
    const appElement:Element = document.querySelector('.app')!;
    const modalWrapper:Element = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');
    
    appElement.appendChild(modalWrapper);

    switch (modalName) {
        case 'difficulty':
            modalWrapper.appendChild(createDifficultyModal());
            break;
        case 'gameResult':
            modalWrapper.appendChild(createGameResultModal(args[0]));
        default:
            break;
    }
}