import { createModal } from './_loadModal';
import { loadGameScreen } from './_loadGameScreen';

(<any>window).application = {
    modals: {
        'difficulty':'difficulty.html',
        'gameResult':'gameResultPopUp.html'
    },
    screens: {
        'index':'index.html',
        'gameScreen': () => {
            loadGameScreen(document.querySelector('.app')!);
        }
    },
    loadModal: (modalName:string) => {
        createModal(modalName);
    },
    loadScreen: (screenName:string) => {
        window.application.clearScreen();
        window.application.screens[screenName]();
    },
    clearScreen: () => {
        document.querySelector('.app')!.innerHTML = '';
    }
}