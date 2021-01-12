const FILED_WIDTH = 15;
const FIELD_HEIGHT = 15;

const defaultPriorities = [
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0.01, 0.01, 0.01, 0.01, 0.01, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0.01, 0.05, 0.05, 0.05, 0.01, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0.01, 0.05, 0.1,  0.05, 0.01, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0.01, 0.05, 0.05, 0.05, 0.01, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0.01, 0.01, 0.01, 0.01, 0.01, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0,    0,    0,    0,    0,    0, 0, 0, 0, 0 ],
];

const symbols = ["X", "O"];

function cloneMatrix(matrix) {
    return matrix.map(
        row => [...row]
    )
}

export default class ExamplePlayer {
    constructor(symbol) {
        this.symbol = symbol;
        this.enemySymbol = symbols.find(sbl => sbl !== symbol);
        this.priorities = cloneMatrix(defaultPriorities)
        this.patterns = this.initPatterns(symbol, this.enemySymbol);
    }

    initPatterns(s, e) {
        return [
            /// uber patterns
            { match: [null, s, s, s, s], priorities: [9999, 0, 0, 0, 0] },
            { match: [s, null, s, s, s], priorities: [0, 9999, 0, 0, 0] },
            { match: [s, s, null, s, s], priorities: [0, 0, 9999, 0, 0] },
            { match: [s, s, s, null, s], priorities: [0, 0, 0, 9999, 0] },
            { match: [s, s, s, s, null], priorities: [0, 0, 0, 0, 9999] },
            /// uber counter patterns
            { match: [null, e, e, e, e], priorities: [500, 0, 0, 0, 0] },
            { match: [e, null, e, e, e], priorities: [0, 500, 0, 0, 0] },
            { match: [e, e, null, e, e], priorities: [0, 0, 500, 0, 0] },
            { match: [e, e, e, null, e], priorities: [0, 0, 0, 500, 0] },
            { match: [e, e, e, e, null], priorities: [0, 0, 0, 0, 500] },
            /// mid patterns
            { match: [null, null, s, s, s], priorities: [8, 12, 0, 0, 0] },
            { match: [null, s, null, s, s], priorities: [8, 0, 12, 0, 0] },
            { match: [null, s, s, null, s], priorities: [8, 0, 0, 12, 0] },
            { match: [null, s, s, s, null], priorities: [10, 0, 0, 0, 10] },
            { match: [s, null, null, s, s], priorities: [0, 10, 10, 0, 0] },
            { match: [s, null, s, null, s], priorities: [0, 10, 0, 10, 0] },
            { match: [s, null, s, s, null], priorities: [0, 12, 0, 0, 8] },
            { match: [s, s, null, null, s], priorities: [0, 0, 10, 10, 0] },
            { match: [s, s, null, s, null], priorities: [0, 0, 12, 0, 8] },
            { match: [s, s, s, null, null], priorities: [0, 0, 0, 12, 8] },
            /// mid counter patterns
            { match: [null, null, e, e, e], priorities: [4, 7, 0, 0, 0] },
            { match: [null, e, null, e, e], priorities: [4, 0, 7, 0, 0] },
            { match: [null, e, e, null, e], priorities: [4, 0, 0, 7, 0] },
            { match: [null, e, e, e, null], priorities: [5, 0, 0, 0, 5] },
            { match: [e, null, null, e, e], priorities: [0, 5, 5, 0, 0] },
            { match: [e, null, e, null, e], priorities: [0, 5, 0, 5, 0] },
            { match: [e, null, e, e, null], priorities: [0, 7, 0, 0, 4] },
            { match: [e, e, null, null, e], priorities: [0, 0, 5, 5, 0] },
            { match: [e, e, null, e, null], priorities: [0, 0, 7, 0, 4] },
            { match: [e, e, e, null, null], priorities: [0, 0, 0, 7, 4] },
            /// low patterns
            { match: [null, null, null, s, s], priorities: [1, 2, 3, 0, 0] },
            { match: [s, s, null, null, null], priorities: [0, 0, 3, 2, 1] },
            { match: [null, null, s, null, s], priorities: [1, 2, 0, 3, 0] },
            { match: [null, null, s, s, null], priorities: [1, 2, 0, 0, 2] },
            { match: [null, s, null, null, s], priorities: [1, 0, 2, 2, 0] },
            { match: [null, s, s, null, null], priorities: [2, 0, 0, 2, 1] },
            { match: [s, null, null, null, s], priorities: [0, 2, 2, 2, 0] },
            { match: [s, null, s, null, null], priorities: [0, 3, 0, 2, 1] },
            /// low counter patterns
            { match: [null, null, null, e, e], priorities: [0.1, 0.3, 0.5, 0, 0] },
            { match: [e, e, null, null, null], priorities: [0, 0, 0.5, 0.3, 0.1] },
            { match: [null, null, e, null, e], priorities: [0.1, 0.3, 0, 0.5, 0] },
            { match: [null, null, e, e, null], priorities: [0.1, 0.3, 0, 0, 0.3] },
            { match: [null, e, null, null, e], priorities: [0.5, 0, 0.3, 0.3, 0] },
            { match: [null, e, e, null, null], priorities: [0.3, 0, 0, 0.5, 0.3] },
            { match: [e, null, null, null, e], priorities: [0, 0.3, 0.3, 0.3, 0] },
            { match: [e, null, e, null, null], priorities: [0, 0.5, 0, 0.3, 0.1] },
        ]
    }

    next(matrix) {
        this.priorities = cloneMatrix(defaultPriorities)
        const answer = this.getAnswer(matrix);
        console.log(this.symbol, this.priorities);
        return answer;
    }

    getAnswer(matrix) {
        this.testPatterns(matrix);

        return this.getRandomPoint(this.findBestPriorities(matrix))
    }

    findBestPriorities(matrix) {
        let best = [];
        for (let i = 0; i < FIELD_HEIGHT; i++) {
            for (let j = 0; j < FILED_WIDTH; j++) {
                if (matrix[i][j]) {
                    continue
                }
                const cell = this.priorities[i][j];
                if (!best.length) {
                    best.push({point: [i, j], value: cell})
                } else {
                    if(cell === best[0].value) {
                        best.push({point: [i, j], value: cell});
                    } else if(cell > best[0].value) {
                        best = [{point: [i, j], value: cell}]
                    }
                }
            }
        }

        return best.map(obj => obj.point);
    }

    getRandomPoint(array) {
        return array.length === 1
            ? array[0]
            : array[
                Math.floor(Math.random() * array.length)
            ]
    }

    calculatePriorities(matchPoints, priorities) {
        matchPoints.forEach(
            ([i, j], index) => {
                this.priorities[i][j] += priorities[index]
            }
        );
    }

    testPatterns(matrix) {
        this.patterns.forEach(
            ({match, priorities}) => {
                ///by horizontal axis
                let matchPoints = [];
                for (let i = 0; i < FIELD_HEIGHT; i++) {
                    for (let j = 0; j < FILED_WIDTH; j++) {
                        const cell = matrix[i][j];
                        if(cell === match[matchPoints.length]) {
                            matchPoints.push([i, j])
                        } else {
                            matchPoints = [];
                            if(cell === match[matchPoints.length]) {
                                matchPoints.push([i, j])
                            }
                        }

                        if(matchPoints.length === match.length) {
                            console.log("Found pattern", "horizontal", match, matchPoints)
                            this.calculatePriorities(matchPoints, priorities)
                        }
                    }
                    matchPoints = [];
                }
                ///by vertical axis
                for (let i = 0; i < FIELD_HEIGHT; i++) {
                    for (let j = 0; j < FILED_WIDTH; j++) {
                        const cell = matrix[j][i];
                        if (cell === match[matchPoints.length]) {
                            matchPoints.push([j, i])
                        } else {
                            matchPoints = [];
                            if (cell === match[matchPoints.length]) {
                                matchPoints.push([j, i])
                            }
                        }

                        if (matchPoints.length === match.length) {
                            console.log("Found pattern", "vertical", match, matchPoints)
                            this.calculatePriorities(matchPoints, priorities)
                        }
                    }
                    matchPoints = [];
                }
                ///by diagonal left to right
                for (let j = -15; j < 15; j++) {
                    for (let i = 0; i < 15; i++) {
                        const k = i + j;
                        if (k > 14 || k < 0 || i < 0 || i > 14) {
                            continue;
                        }
                        const cell = matrix[k][i];
                        if (cell === match[matchPoints.length]) {
                            matchPoints.push([k, i])
                        } else {
                            matchPoints = [];
                            if (cell === match[matchPoints.length]) {
                                matchPoints.push([k, i])
                            }
                        }

                        if (matchPoints.length === match.length) {
                            console.log("Found pattern", "left-to-right", match, matchPoints)
                            this.calculatePriorities(matchPoints, priorities)
                        }
                    }
                    matchPoints = [];
                }
                ///by diagonal right to left
                for (let j = -15; j < 15; j++) {
                    for (let i = 14; i >= 0; i--) {
                        const k = i + j;
                        const x = 14 - i;
                        if (k > 14 || k < 0 || x < 0 || x > 14) {
                            continue;
                        }
                        const cell = matrix[k][x];
                        if (cell === match[matchPoints.length]) {
                            matchPoints.push([k, x])
                        } else {
                            matchPoints = [];
                            if (cell === match[matchPoints.length]) {
                                matchPoints.push([k, x])
                            }
                        }

                        if (matchPoints.length === match.length) {
                            console.log("Found pattern", "right-to-left", match, matchPoints)
                            this.calculatePriorities(matchPoints, priorities)
                        }
                    }
                    matchPoints = [];
                }
            }
        );
    }

}
