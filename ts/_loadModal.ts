import { createDifficultyModal } from './_difficultyModal';

const appElement:Element = document.querySelector('.app')!;
const modalWrapper:Element = document.createElement('div');
modalWrapper.classList.add('modal-wrapper');

appElement.appendChild(modalWrapper);

export function createModal(modalName:string) {
    switch (modalName) {
        case 'difficulty':
            modalWrapper.appendChild(createDifficultyModal());
            break;
        default:
            break;
    }
}