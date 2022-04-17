const { it } = require("@jest/globals");
import { createGameResultModal } from '../ts/_gameResultModal';

it('Game Result WIN element created', () => {
    if (!createGameResultModal(true)) {
        throw Error('Game Result WIN Element is empty!');
    }
})

it('Game Result LOSS element created', () => {
    if (!createGameResultModal(false)) {
        throw Error('Game Result LOSS Element is empty!');
    }
})