//encapsulamos todo en 1 objeto juego
let game;

function initGame() {
    game = {
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        jugadas: 0,
        turno: tirarMoneda(),
        puedeSeguir: true
    };
    draw();
}

// tablero:
//   0  |  1 | 2
// 0 ["", "", ""],
// 1 ["", "", ""],
// 2 ["", "", ""]


/* ESTA FUNCION CREA LA TABLA DESDE CERO, LA VACIA Y LA LLENA
function draw() {
    // traigo la tabla
    const table = document.querySelector("table");
    // cada vez que la creo la vacio
    table.innerHTML = null;

    // este for recorre cada una de las filas 
    for(let r = 0; r < board.length ; r++) {
        //genero un tr para cada fila
        const tr = document.createElement("tr");
        for(let c=0; c < board[r].length; c++) {
            const td = document.createElement("td");
            td.appendChild(document.createTextNode(board[r][c]));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
}*/
function draw() {
    //Ocultar o mostrar el cartel
    if (game.puedeSeguir) {
        document.getElementById("cartel").classList.add("nodisp");
    }
    //Turno
    document.getElementById("turno").innerHTML = game.turno;
    //Tablero
    for (let r = 0; r < game.board.length; r++) {
        for (let c = 0; c < game.board[r].length; c++) {
            const cell = document.querySelector("table tr:nth-of-type(" + (r + 1) + ") td:nth-of-type(" + (c + 1) + ") ");
            cell.innerHTML = null;
            cell.appendChild(document.createTextNode(game.board[r][c]));
        }
    }
};

function play(r, c) {
    if (game.puedeSeguir && game.board[r][c] === "") {
        game.jugadas++;
        game.board[r][c] = game.turno;
        if (wonDiagonal(game.turno) || wonHorizontal(game.turno) || wonVertical(game.turno)) {
            won();
        } else if (game.jugadas === 9) {
            deuce();
        } else {
            game.turno = game.turno === "X" ? "O" : "X";
            draw();
        }
    }
};

function wonDiagonal() {
    return (game.board[0][0] === game.turno && game.board[1][1] === game.turno && game.board[2][2] === game.turno) ||
        (game.board[0][2] === game.turno && game.board[1][1] === game.turno && game.board[2][0] === game.turno);
}

function wonVertical() {
    return (game.board[0][0] === game.turno && game.board[1][0] === game.turno && game.board[2][0] === game.turno) ||
        (game.board[0][1] === game.turno && game.board[1][1] === game.turno && game.board[2][1] === game.turno) ||
        (game.board[0][2] === game.turno && game.board[1][2] === game.turno && game.board[2][2] === game.turno)
}

function wonHorizontal() {
    return (game.board[0][0] === game.turno && game.board[0][1] === game.turno && game.board[0][2] === game.turno) ||
        (game.board[1][0] === game.turno && game.board[1][1] === game.turno && game.board[1][2] === game.turno) ||
        (game.board[2][0] === game.turno && game.board[2][1] === game.turno && game.board[2][2] === game.turno)
}


function tirarMoneda() {
    return (Math.random() > 0.5) ? "X" : "O";
}

function won() {
    game.puedeSeguir = false;
    draw();
    document.getElementById("mensaje").innerHTML = "¡El jugador " + game.turno + " gana!";
    document.getElementById("cartel").classList.remove("nodisp");
}

function deuce() {
    game.puedeSeguir = false;
    draw();
    document.getElementById("mensaje").innerHTML = "¡Empate!";
    document.getElementById("cartel").classList.remove("nodisp");
}