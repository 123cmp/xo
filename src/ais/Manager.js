import ExamplePlayer from "./ExamplePlayer";
import OxysPlayer from "./OxysPlayer";

const symbols = ["X", "O"];

export default class Manager {
    constructor(field, humanMode) {
        this.player1Symbol = symbols[Math.floor(Math.random() * 2)]
        this.player2Symbol = symbols.find(symbol => symbol !== this.player1Symbol)
        this.field = field;
        this.current = Math.floor(Math.random() * 2 ) + 1

        this.player1Name = "Первый Бот";
        this.player2Name = "Человек";

        this.player1Time = 0;
        this.player2Time = 0;

        this.player1 = new OxysPlayer(this.player1Symbol);
        this.player2 = new ExamplePlayer(this.player2Symbol);
        this.humanMode = humanMode;
    }

    step() {
        let point, symbol;
        let prev = this.current;
        if (this.current === 1) {
            symbol = this.player1Symbol;
            const from = new Date();
            point = this.player1.next(this.field);
            const to = new Date();
            this.player1Time = this.player1Time
                ? (this.player1Time + to.getTime() - from.getTime()) / 2
                : to.getTime() - from.getTime()
            this.current = 2;
        } else {
            if (this.humanMode) {
                return
            }
            symbol = this.player2Symbol;
            const from = new Date();
            point = this.player2.next(this.field);
            const to = new Date();
            this.player2Time = this.player2Time
                ? (this.player2Time + to.getTime() - from.getTime()) / 2
                : to.getTime() - from.getTime()
            this.current = 1;
        }

        const res = this.calculations(point, prev, symbol);

        return res ? res : this.field
    }

    calculations(point, playerNum, symbol) {
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
            alert(`Player ${playerNum} (${symbol}) wins`)
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
    }

    testWin(symbol) {
        return this.testHorizontal(symbol)
        || this.testVertical(symbol)
        || this.testDiagonalLeftToRight(symbol)
        || this.testDiagonalRightToLeft(symbol)
    }

    humanInput(point) {
        const res = this.calculations(point, 2, this.player2Symbol);
        this.current = 1;
        return res ? res : this.field
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

        for (let j = -15; j < 15; j++) {
            for (let i = 0; i < 15; i++) {
                const k = i + j;
                if (k > 14 || k < 0 || i < 0 || i > 14) {
                    continue;
                }
                if(this.field[k][i] === symbol) {
                    streak.push([k, i]);
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

    testDiagonalRightToLeft(symbol) {
        let streak = [];
        let win = false;

        for (let j = -15; j < 15; j++) {
            for (let i = 14; i >= 0; i--) {
                const k = i + j;
                const x = 14 - i;
                if (k > 14 || k < 0 || x < 0 || x > 14) {
                    continue;
                }
                if(this.field[k][x] === symbol) {
                    streak.push([k, x]);
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
}