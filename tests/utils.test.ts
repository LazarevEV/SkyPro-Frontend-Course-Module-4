const { it } = require("@jest/globals");
import { zeroPad } from '../ts/_utils';

const test: [number, number][] = [
    [124, 6],
    [135, 3],
    [1, 4],
    [0, 10],
    [10, 2]
]

let idx =  0;
test.forEach(subtest => {
    it(`Test ${idx} - Leading zeroes added`, () => {
        if (zeroPad(subtest[0], subtest[1]).length !== subtest[1]) {
            throw Error(`Leading zeroes test failed!`);
        }
        idx += 1;
    })
})