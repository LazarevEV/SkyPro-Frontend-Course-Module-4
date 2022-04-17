const { it } = require("@jest/globals");
import { createDifficultyModal } from '../ts/_difficultyModal';

it('Difficulty modal element created', () => {
    if (!createDifficultyModal()) {
        throw Error('Difficulty Modal Element is empty!');
    }
})