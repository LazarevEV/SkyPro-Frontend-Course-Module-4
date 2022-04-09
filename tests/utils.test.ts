const { it } = require("@jest/globals");
import { zeroPad } from '../ts/_utils';

const tests: [number, number][] = [
    [124, 6],
    [135, 3],
    [1, 4],
    [0, 10],
    [10, 2]
]

let idx =  0;
tests.forEach(test => {
    it(`Test ${idx} - Leading zeroes added`, () => {
        const funcResult = zeroPad(test[0], test[1]);
        expect(funcResult).toHaveLength(test[1]);
    })
})