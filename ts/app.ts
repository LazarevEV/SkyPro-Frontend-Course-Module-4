import { createModal } from './_loadModal';
import { loadGameScreen } from './_loadGameScreen';

// Уровень сложности - это кол-во карточек

(<any>window).application = {
    modals: {
        'difficulty':() => {
            window.application.loadModal('difficulty');
        },
        'gameResult':(isWin:boolean) => {
            window.application.loadModal('gameResult', [isWin]);
        }
    },
    screens: {
        'gameScreen': () => {
            loadGameScreen(document.querySelector('.app')!);
        }
    },
    timers: [],
    timeouts: [],
    loadModal: (modalName:string, args:[]) => {
        window.application.clearTimers();
        createModal(modalName, args);
    },
    loadScreen: (screenName:string) => {
        window.application.clearScreen();
        window.application.clearTimers();
        window.application.screens[screenName]();
    },
    clearScreen: () => {
        document.querySelector('.app')!.innerHTML = '';
    },
    clearTimers: () => {
        window.application.timers.forEach((timer:ReturnType<typeof setInterval>) => {
            clearInterval(timer);
        })
    }
}