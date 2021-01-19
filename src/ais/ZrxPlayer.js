export default class ZrxPlayer {
    constructor(sign) {
        this.sign = sign;
        sign == "X" ? this.enemySign = "O" : this.enemySign = "X";

        this.patternMap = [

            // 4 my at row
            {
                "template": [null,this.sign,this.sign,this.sign,this.sign],
                "solution": [9999,this.sign,this.sign,this.sign,this.sign],
            },
            {
                "template": [this.sign,this.sign,this.sign,this.sign,null],
                "solution": [this.sign,this.sign,this.sign,this.sign,9999]
            },
            // 4 my with holes
            {
                "template": [null,this.sign,this.sign,this.sign,this.sign],
                "solution": [9999,this.sign,this.sign,this.sign,this.sign]
            },
            {
                "template": [this.sign,null,this.sign,this.sign,this.sign],
                "solution": [this.sign,9999,this.sign,this.sign,this.sign]
            },
            {
                "template": [this.sign,this.sign,null,this.sign,this.sign],
                "solution": [this.sign,this.sign,9999,this.sign,this.sign]
            },
            {
                "template": [this.sign,this.sign,this.sign,null,this.sign],
                "solution": [this.sign,this.sign,this.sign,9999,this.sign]
            },
            {
                "template": [this.sign,this.sign,this.sign,this.sign,null],
                "solution": [this.sign,this.sign,this.sign,this.sign,9999]
            },
            // 4 enemy ar row
            {
                "template": [null,this.enemySign,this.enemySign,this.enemySign,this.enemySign],
                "solution": [1000,this.enemySign,this.enemySign,this.enemySign,this.enemySign],
            },
            {
                "template": [this.enemySign,this.enemySign,this.enemySign,this.enemySign,null],
                "solution": [this.enemySign,this.enemySign,this.enemySign,this.enemySign,1000]
            },
            // 4 enemy with holes
            {
                "template": [null,this.enemySign,this.enemySign,this.enemySign,this.enemySign],
                "solution": [1000,this.enemySign,this.enemySign,this.enemySign,this.enemySign]
            },
            {
                "template": [this.enemySign,null,this.enemySign,this.enemySign,this.enemySign],
                "solution": [this.enemySign,1000,this.enemySign,this.enemySign,this.enemySign]
            },
            {
                "template": [this.enemySign,this.enemySign,null,this.enemySign,this.enemySign],
                "solution": [this.enemySign,this.enemySign,1000,this.enemySign,this.enemySign]
            },
            {
                "template": [this.enemySign,this.enemySign,this.enemySign,null,this.enemySign],
                "solution": [this.enemySign,this.enemySign,this.enemySign,1000,this.enemySign]
            },
            {
                "template": [this.enemySign,this.enemySign,this.enemySign,this.enemySign,null],
                "solution": [this.enemySign,this.enemySign,this.enemySign,this.enemySign,1000]
            },
            // 3 my at row with free direction
            {
                "template": [null,null,this.sign,this.sign,this.sign],
                "solution": [170,200,this.sign,this.sign,this.sign]
            },
            {
                "template": [this.sign,this.sign,this.sign,null,null],
                "solution": [this.sign,this.sign,this.sign,200,170]
            },
            // 3 my with holes with free 2 directions
            {
                "template": [null,this.sign,null,this.sign,this.sign,null],
                "solution": [160,this.sign,200,this.sign,this.sign,160]
            },
            {
                "template": [null,this.sign,this.sign,null,this.sign,null],
                "solution": [160,this.sign,this.sign,200,this.sign,160]
            },
            // 3 my at row with free 1 direction
            {
                "template": [null,null,this.sign,this.sign,this.sign],
                "solution": [120,180,this.sign,this.sign,this.sign]
            },
            {
                "template": [this.sign,this.sign,this.sign,null,null],
                "solution": [this.sign,this.sign,this.sign,180,120]
            },
            // 3 my with holes with free 1 direction
            {
                "template": [this.sign,null,this.sign,this.sign,null,null],
                "solution": [this.sign,180,this.sign,this.sign,180,0]
            },
            {
                "template": [null,null,this.sign,null,this.sign,this.sign],
                "solution": [0,180,this.sign,180,this.sign,this.sign]
            },
            {
                "template": [this.sign,this.sign,null,this.sign,null,null],
                "solution": [this.sign,this.sign,180,this.sign,180,0]
            },
            {
                "template": [null,null,this.sign,this.sign,null,this.sign],
                "solution": [0,180,this.sign,this.sign,180,this.sign]
            },
            // 3 enemy at row with free 2 directions
            {
                "template": [null,null,this.enemySign,this.enemySign,this.enemySign],
                "solution": [0,130,this.enemySign,this.enemySign,this.enemySign]
            },
            {
                "template": [this.enemySign,this.enemySign,this.enemySign,null,null],
                "solution": [this.enemySign,this.enemySign,this.enemySign,130,0]
            },
            // 3 enemy with holes with free 2 directions
            {
                "template": [null,this.enemySign,null,this.enemySign,this.enemySign,null],
                "solution": [0,this.enemySign,130,this.enemySign,this.enemySign,0]
            },
            {
                "template": [null,this.enemySign,this.enemySign,null,this.enemySign,null],
                "solution": [0,this.enemySign,this.enemySign,130,this.enemySign,0]
            },
            // 3 enemy at row with free 1 direction
            {
                "template": [null,null,this.enemySign,this.enemySign,this.enemySign],
                "solution": [0,101,this.enemySign,this.enemySign,this.enemySign]
            },
            {
                "template": [this.enemySign,this.enemySign,this.enemySign,null,null],
                "solution": [this.enemySign,this.enemySign,this.enemySign,101,0]
            },
            // 3 enemy with holes with free 1 direction
            {
                "template": [this.enemySign,null,this.enemySign,this.enemySign,null,null],
                "solution": [this.enemySign,100,this.enemySign,this.enemySign,100,0]
            },
            {
                "template": [null,null,this.enemySign,null,this.enemySign,this.enemySign],
                "solution": [0,100,this.enemySign,100,this.enemySign,this.enemySign]
            },
            {
                "template": [this.enemySign,this.enemySign,null,this.enemySign,null,null],
                "solution": [this.enemySign,this.enemySign,100,this.enemySign,100,0]
            },
            {
                "template": [null,null,this.enemySign,this.enemySign,null,this.enemySign],
                "solution": [0,100,this.enemySign,this.enemySign,100,this.enemySign]
            },

            // 2 my at row with free directions (+1 extra)
            {
                "template": [null,null,null,null,this.sign,this.sign],
                "solution": [25,25,25,25,this.sign,this.sign]
            },
            {
                "template": [this.sign,this.sign,null,null,null,null],
                "solution": [this.sign,this.sign,25,25,25,25]
            },
            // 2 my at row with free directions (no extra)
            {
                "template": [null,null,null,this.sign,this.sign],
                "solution": [20,20,20,this.sign,this.sign]
            },
            {
                "template": [null,null,this.sign,this.sign,null],
                "solution": [20,20,this.sign,this.sign,20]
            },
            {
                "template": [this.sign,this.sign,null,null,null],
                "solution": [this.sign,this.sign,20,20,20]
            },
            {
                "template": [null,this.sign,this.sign,null,null],
                "solution": [20,this.sign,this.sign,20,20]
            },
            // 2 my with hole with free directions (+1 extra)
            {
                "template": [null,this.sign,null,this.sign,null,null],
                "solution": [25,this.sign,25,this.sign,0,0]
            },
            {
                "template": [null,null,this.sign,null,this.sign,null],
                "solution": [0,0,this.sign,25,this.sign,25]
            },
            {
                "template": [null,null,null,this.sign,null,this.sign],
                "solution": [0,0,25,this.sign,25,this.sign]
            },
            {
                "template": [this.sign,null,this.sign,null,null,null],
                "solution": [this.sign,25,this.sign,25,0,0]
            },

            // 2 my with hole with free directions (no extra)
            {
                "template": [null,this.sign,null,this.sign,null],
                "solution": [0,this.sign,20,this.sign,0]
            },
            {
                "template": [null,null,this.sign,null,this.sign],
                "solution": [0,0,this.sign,20,this.sign]
            },
            {
                "template": [this.sign,null,this.sign,null,null],
                "solution": [this.sign,20,this.sign,0,0]
            },
            // 2 enemy at row with free directions (+1 extra)
            {
                "template": [null,null,null,null,this.enemySign,this.enemySign],
                "solution": [0,0,15,15,this.enemySign,this.enemySign]
            },
            {
                "template": [this.enemySign,this.enemySign,null,null,null,null],
                "solution": [this.enemySign,this.enemySign,15,15,0,0]
            },
            // 2 enemy at row with free directions (no extra)
            {
                "template": [null,null,null,this.enemySign,this.enemySign],
                "solution": [0,0,12,this.enemySign,this.enemySign]
            },
            {
                "template": [null,null,this.enemySign,this.enemySign,null],
                "solution": [0,12,this.enemySign,this.enemySign,0]
            },
            {
                "template": [this.enemySign,this.enemySign,null,null,null],
                "solution": [this.enemySign,this.enemySign,12,0,0]
            },
            {
                "template": [null,this.enemySign,this.enemySign,null,null],
                "solution": [0,this.enemySign,this.enemySign,12,0]
            },
            // 2 enemy with hole with free directions (+1 extra)
            {
                "template": [null,this.enemySign,null,this.enemySign,null,null],
                "solution": [0,this.enemySign,12,this.enemySign,12,0]
            },
            {
                "template": [null,null,this.enemySign,null,this.enemySign,null],
                "solution": [0,12,this.enemySign,12,this.enemySign,0]
            },
            {
                "template": [null,null,null,this.enemySign,null,this.enemySign],
                "solution": [0,0,12,this.enemySign,12,this.enemySign]
            },
            {
                "template": [this.enemySign,null,this.enemySign,null,null,null],
                "solution": [this.enemySign,12,this.enemySign,12,0,0]
            },

            // 2 enemy with hole with free directions (no extra)
            {
                "template": [null,this.enemySign,null,this.enemySign,null],
                "solution": [10,this.enemySign,10,this.enemySign,10]
            },
            {
                "template": [null,null,this.enemySign,null,this.enemySign],
                "solution": [10,10,this.enemySign,10,this.enemySign]
            },
            {
                "template": [this.enemySign,null,this.enemySign,null,null],
                "solution": [this.enemySign,10,this.enemySign,10,10]
            },


            // Basics
            {
                "template": [this.sign,null],
                "solution": [this.sign,3]
            },
            {
                "template": [null,this.sign],
                "solution": [3,this.sign]
            },
            {
                "template": [this.enemySign,null],
                "solution": [this.sign,1]
            },
            {
                "template": [null,this.enemySign],
                "solution": [1,this.enemySign]
            },
        ];
    }

    next(matrix) {
        let m1 = this.processHorizontals([...matrix]);
        let m2 = this.processVerticals([...matrix]);
        let m3 = this.processDiagonalsUp([...matrix]);
        let m4 = this.processDiagonalsDown([...matrix]);

        let a =  this.matrixAddition(m1,m2,m3,m4);
        console.log(a);

        let res = this.getResult(a);

        console.log(res);
        return res;
    }

    processPattern(argsLine, pattern) {
        let line = [...argsLine],
            completedMatch = 0;

        L: for (let lineElemId = 0; lineElemId < line.length; lineElemId++) {
            P: for (let patternElemId = 0 + completedMatch; patternElemId < pattern.template.length; patternElemId++) {
                if (line[lineElemId] === pattern.template[patternElemId]) {
                    completedMatch++;
                    if (completedMatch === pattern.template.length) {
                        // Replacing here
                        for (let lineReplaceId = lineElemId - completedMatch + 1, patternReplaceId = 0;
                                 patternReplaceId < pattern.template.length;
                                 lineReplaceId++, patternReplaceId++
                        ) {
                                line[lineReplaceId] = pattern.solution[patternReplaceId];
                        }
                        completedMatch = 0;
                        lineElemId = patternElemId = -1;
                        break P;
                    }
                    continue L;
                } else {
                    if (completedMatch === 0) {
                        completedMatch = 0;
                        break P;
                    }
                    completedMatch = 0;
                    patternElemId = -1;
                    continue P;
                }
            }
        }
        return line;
    }

    processLine(line) {
        this.patternMap.forEach(pattern => {
            line = this.processPattern(line, pattern);
        });
        return line;
    };

    processHorizontals(/*Array*/ matrix) {
        let resultMatrix = matrix.map(arr => arr.slice());

        for (let rowNumber = 0; rowNumber < matrix.length; rowNumber++) {
            resultMatrix[rowNumber] = this.processLine(matrix[rowNumber]);
        }

        return resultMatrix;
    }
    processVerticals(/*Array*/ matrix) {
        let resultMatrix = matrix.map(arr => arr.slice());

        for (let colNumber = 0; colNumber < matrix.length; colNumber++) {
            let column = [];
            for (let rowNumber = 0; rowNumber < matrix.length; rowNumber++) {
                column.push(matrix[rowNumber][colNumber]);
            }

            column = this.processLine(column);

            for (let rowNumber = 0; rowNumber < matrix.length; rowNumber++) {
                resultMatrix[rowNumber][colNumber] = column[rowNumber]
            }
        }

        return resultMatrix;
    }

    processDiagonalsUp(/*Array*/ matrix) {
        let resultMatrix = matrix.map(arr => arr.slice());

        for (let bias = -matrix.length + 1; bias < matrix.length; bias++) {
            let diagonale = [];
            for (let y = 0, x = matrix.length-1; y < matrix.length; y++, x--) {
                if (matrix[x][y+bias] !== undefined) {
                    diagonale.push(matrix[x][y+bias]);
                }
            }

            diagonale = this.processLine(diagonale);

            for (let i = 0, y = 0, x = matrix.length-1; y < matrix.length; y++, x--) {
                if (matrix[x][y+bias] !== undefined) {
                    resultMatrix[x][y+bias] = diagonale[i];
                    i++;
                }
            }
        }

        return resultMatrix;
    }


    processDiagonalsDown(/*Array*/ matrix) {
        let resultMatrix = matrix.map(arr => arr.slice());

        for (let bias = -matrix.length; bias < matrix.length; bias++) {
            let diagonale = [];
            for (let xy = 0; xy < matrix.length; xy++) {
                if (matrix[xy][xy+bias] !== undefined) {
                    diagonale.push(matrix[xy][xy+bias]);
                }
            }

            diagonale = this.processLine(diagonale);

            for (let xy = 0, i = 0; xy < matrix.length; xy++) {
                if (matrix[xy][xy+bias] !== undefined) {
                    resultMatrix[xy][xy+bias] = diagonale[i];
                    i++;
                }
            }
        }

        return resultMatrix;
    }

    matrixAddition(...args) {
        let sumMatrix = new Array(args[0].length);

        for (let i = 0; i < sumMatrix.length; i++) {
            sumMatrix[i] = new Array(args[0].length);
            for (let j = 0; j < sumMatrix.length; j++) {
                sumMatrix[i][j] = 0;
            }
        }

        args.forEach(matrix => {
            for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix.length; x++) {
                    if (typeof(matrix[y][x]) == "number") {
                        sumMatrix[y][x] += matrix[y][x];
                    }
                }
            }
        });

        return sumMatrix;
    }

    getResult(/*Array*/ matrix) {
        let randomMaximalNumber,
            maximals = [
            {
                "value": 1,
                "x": Math.floor(matrix.length/2),
                "y": Math.floor(matrix.length/2),
            }
        ];

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {

                if (matrix[y][x] === maximals[0].value && matrix[y][x] > 0) {
                    maximals.push({
                        value: matrix[y][x],
                        x: x,
                        y: y,
                    });
                }

                if (matrix[y][x] > maximals[0].value) {
                    maximals = [];
                    maximals.push({
                        value: matrix[y][x],
                        x: x,
                        y: y,
                    });
                }

            }
        }

        if (maximals.length > 1) {
            randomMaximalNumber = Math.floor(Math.random() * maximals.length);
        } else {
            return [maximals[0].y, maximals[0].x];
        }

        return [maximals[randomMaximalNumber].y, maximals[randomMaximalNumber].x];
    }
}