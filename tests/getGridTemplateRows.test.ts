import { getGridTemplateRows } from '../ts/_loadGameScreen';

const tests: [string, number][] = [
    ['1', 6],
    ['2', 8],
    ['3', 9],
    ['4', 9],
    ['', 9],
];

tests.forEach(test => {
    it(`Grid Template Rows established`, () => {
        const functResult = getGridTemplateRows(test[0]);
        if (functResult !== test[1]) {
            throw Error(`Expected: ${test[1]}; Received: ${functResult}`);
        }
    })
})