import ExamplePlayer from "./ExamplePlayer";
import OxysPlayer from "./OxysPlayer";

const symbols = ["X", "O"];

export default class Manager {
    constructor(field) {
        this.player1Symbol = symbols[Math.floor(Math.random() * 2)];
        this.player2Symbol = symbols.find(symbol => symbol !== this.player1Symbol);
        this.field = field;
        this.current = Math.floor(Math.random() * 2 ) + 1;

        this.player1 = new OxysPlayer(this.player1Symbol);
        this.player2 = new OxysPlayer(this.player2Symbol);
    }

    step() {
        let point, symbol;
        let prev = this.current;
        if (this.current === 1) {
            symbol = this.player1Symbol;
            point = this.player1.next(this.field);
            this.current = 2;
        } else {
            symbol = this.player2Symbol;
            point = this.player2.next(this.field);
            this.current = 1;
        }

        if(!point
            || typeof point !== "object"
            || point.length !== 2
            || this.field[point[0]][point[1]]
        ) {
            throw new Error("Fucking cheater");
        }

        this.field[point[0]][point[1]] = symbol;
        const streak = this.testWin(symbol)
        if (streak) {
            alert(`Player ${prev} (${symbol}) wins`)
            return {
                win: true,
                streak
            };
        }

        if(this.testDraw()) {
            alert(`Draw :(`)
            return {
                win: true
            }
        }

        return this.field
    }


    testWin(symbol) {
        return this.testHorizontal(symbol)
        // || this.testVertical(symbol)
        // || this.testDiagonalLeftToRight(symbol)
        // || this.testDiagonalRightToLeft(symbol)
    }

    testDraw() {
        let isAnyEmptyCell = false;

        this.field.forEach(
            row => row.forEach(
                cell => {
                    if (!cell) {
                        isAnyEmptyCell = true
                    }
                }
            )
        )

        return !isAnyEmptyCell
    }

    testHorizontal(symbol) {
        let streak = [];
        let win = false;

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if(this.field[i][j] === symbol) {
                    streak.push([i, j]);
                } else {
                    streak = []
                }

                if(streak.length > 4) {
                    win = streak;
                }
            }
            streak = [];
        }

        return win;
    }

    testVertical(symbol) {
        let streak = [];
        let win = false;

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if(this.field[j][i] === symbol) {
                    streak.push([j, i]);
                } else {
                    streak = []
                }

                if(streak.length > 4) {
                    win = streak;
                }
            }
            streak = [];
        }

        return win;
    }

    testDiagonalLeftToRight(symbol) {
        let streak = [];
        let win = false;

        for (let k = 0; k < 15 * 2; k++) {
            for (let j = 0; j <= k; j++) {
                let i = k - j;
                if (i < 15 && j < 15) {
                    if(this.field[j][i] === symbol) {
                        streak.push([j, i]);
                    } else {
                        streak = []
                    }

                    if(streak.length > 4) {
                        win = streak;
                    }
                }
            }
            streak = [];
        }

        return win;
    }

    testDiagonalRightToLeft(symbol) {
        let streak = [];
        let win = false;

        for (let k = 0; k >= -15 * 2; k--) {
            for (let j = 0; j < 15 - k; j++) {
                let i = k + j;
                if (i < 15 && j < 15 && i >= 0 && j >= 0) {
                    if(this.field[j][i] === symbol) {
                        streak.push([j, i]);
                    } else {
                        streak = []
                    }

                    if(streak.length > 4) {
                        win = streak;
                    }
                }
            }
            streak = [];
        }

        return win;
    }
}