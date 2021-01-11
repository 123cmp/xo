const FILED_WIDTH = 15;
const FIELD_HEIGHT = 15;

const defaultPriorities = [
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0.5, 1,   0.5, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0,   0,   0,   0, 0, 0, 0, 0, 0 ],
];

const symbols = ["X", "O"];

export default class ExamplePlayer {
    constructor(symbol) {
        this.symbol = symbol;
        this.enemySymbol = symbols.find(sbl => sbl !== symbol);
        this.priorities = defaultPriorities.map(x => x);
        this.patterns = this.initPatterns(symbol, this.enemySymbol);
    }

    initPatterns(s, e) {
        return [
            /// uber patterns
            { match: [null, s, s, s, s], priorities: [999, 0, 0, 0, 0] },
            { match: [s, null, s, s, s], priorities: [0, 999, 0, 0, 0] },
            { match: [s, s, null, s, s], priorities: [0, 0, 999, 0, 0] },
            { match: [s, s, s, null, s], priorities: [0, 0, 0, 999, 0] },
            { match: [s, s, s, s, null], priorities: [0, 0, 0, 0, 999] },
            /// uber counter patterns
            { match: [null, e, e, e, e], priorities: [500, 0, 0, 0, 0] },
            { match: [e, null, e, e, e], priorities: [0, 500, 0, 0, 0] },
            { match: [e, e, null, e, e], priorities: [0, 0, 500, 0, 0] },
            { match: [e, e, e, null, e], priorities: [0, 0, 0, 500, 0] },
            { match: [e, e, e, e, null], priorities: [0, 0, 0, 0, 500] },
            /// mid patterns
            { match: [null, null, s, s, s], priorities: [10, 10, 0, 0, 0] },
            { match: [null, s, null, s, s], priorities: [10, 0, 10, 0, 0] },
            { match: [null, s, s, null, s], priorities: [10, 0, 0, 10, 0] },
            { match: [null, s, s, s, null], priorities: [10, 0, 0, 0, 10] },
            { match: [s, null, null, s, s], priorities: [0, 10, 10, 0, 0] },
            { match: [s, null, s, null, s], priorities: [0, 10, 0, 10, 0] },
            { match: [s, null, s, s, null], priorities: [0, 10, 0, 0, 10] },
            { match: [s, s, null, null, s], priorities: [0, 0, 10, 10, 0] },
            { match: [s, s, null, s, null], priorities: [0, 0, 10, 0, 10] },
            { match: [s, s, s, null, null], priorities: [0, 0, 0, 10, 10] },
            /// mid counter patterns
            { match: [null, null, e, e, e], priorities: [5, 5, 0, 0, 0] },
            { match: [null, e, null, e, e], priorities: [5, 0, 5, 0, 0] },
            { match: [null, e, e, null, e], priorities: [5, 0, 0, 5, 0] },
            { match: [null, e, e, e, null], priorities: [5, 0, 0, 0, 5] },
            { match: [e, null, null, e, e], priorities: [0, 5, 5, 0, 0] },
            { match: [e, null, e, null, e], priorities: [0, 5, 0, 5, 0] },
            { match: [e, null, e, e, null], priorities: [0, 5, 0, 0, 5] },
            { match: [e, e, null, null, e], priorities: [0, 0, 5, 5, 0] },
            { match: [e, e, null, e, null], priorities: [0, 0, 5, 0, 5] },
            { match: [e, e, e, null, null], priorities: [0, 0, 0, 5, 5] },
        ]
    }

    next(matrix) {
        const answer = this.getAnswer(matrix);
        console.log(this.symbol, this.priorities);
        this.priorities = defaultPriorities.map(x => x)
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
                            this.calculatePriorities(matchPoints, priorities)
                        }
                    }
                    matchPoints = [];
                }
                ///by vertical axis
                // for (let i = 0; i < FIELD_HEIGHT; i++) {
                //     for (let j = 0; j < FILED_WIDTH; j++) {
                //         const cell = matrix[j][i];
                //         if (cell === match[matchPoints.length]) {
                //             matchPoints.push([j, i])
                //         } else {
                //             matchPoints = [];
                //             if (cell === match[matchPoints.length]) {
                //                 matchPoints.push([j, i])
                //             }
                //         }
                //
                //         if (matchPoints.length === match.length) {
                //             this.calculatePriorities(matchPoints, priorities)
                //         }
                //     }
                //     matchPoints = [];
                // }
                // ///by diagonal left to right
                // for (let k = 0; k < FIELD_HEIGHT * 2; k++) {
                //     for (let j = 0; j <= k; j++) {
                //         let i = k - j;
                //         if (i < 15 && j < 15) {
                //             const cell = matrix[j][i];
                //             if (cell === match[matchPoints.length]) {
                //                 matchPoints.push([j, i])
                //             } else {
                //                 matchPoints = [];
                //                 if (cell === match[matchPoints.length]) {
                //                     matchPoints.push([j, i])
                //                 }
                //             }
                //
                //             if (matchPoints.length === match.length) {
                //                 this.calculatePriorities(matchPoints, priorities)
                //             }
                //         }
                //     }
                //     matchPoints = [];
                // }
                // ///by diagonal right to left
                // for (let k = 0; k >= -15 * 2; k--) {
                //     for (let j = 0; j < 15 - k; j++) {
                //         let i = k + j;
                //         if (i < 15 && j < 15 && i >= 0 && j >= 0) {
                //             const cell = matrix[j][i];
                //             if (cell === match[matchPoints.length]) {
                //                 matchPoints.push([j, i])
                //             } else {
                //                 matchPoints = [];
                //                 if (cell === match[matchPoints.length]) {
                //                     matchPoints.push([j, i])
                //                 }
                //             }
                //
                //             if (matchPoints.length === match.length) {
                //                 this.calculatePriorities(matchPoints, priorities)
                //             }
                //         }
                //         matchPoints = [];
                //     }
                // }
            }
        );
    }

}
