const FILED_WIDTH = 15;
const FIELD_HEIGHT = 15;

export default class ExamplePlayer {
    constructor(symbol) {
        this.symbol = symbol
    }

    next(matrix) {
        const arr = new Array(99999);
        arr.fill(1);
        arr.map(el => el + 1);
        return this.getRandomPoint(matrix)
    }

    getRandomPoint(matrix) {
        let x, y;

        while (x === undefined || y === undefined || matrix[x][y]) {
            x = Math.floor(Math.random() * FILED_WIDTH)
            y = Math.floor(Math.random() * FIELD_HEIGHT)
        }
        return  [x, y]
    }
}
