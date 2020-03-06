let win = null;
let ticks = {
    boxes: [null, null, null, null, null, null, null, null, null],
    turn: 'X',
    score_board: {
        x: 0,
        o: 0
    }
};
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

let fromStorage = JSON.parse(localStorage.getItem('boxes'));
let current_turn = document.getElementById("turn");
let reset_btn = document.getElementById("button-play-again");
let X = document.getElementById("scoreboard-x");
let O = document.getElementById("scoreboard-o");
let box = document.getElementsByClassName('game-square');
let Message = document.getElementById('message');
let Message_Container = document.getElementById('message-container');
let Message_Bg = document.getElementById('bg');
let close_btn = document.getElementById('close');
let success_img = document.getElementById('success_img');

window.addEventListener('load', () => {
    if (fromStorage && fromStorage.length !== 0) {
        ticks = fromStorage;
        for (let i = 0; i < fromStorage.boxes.length; i++) {
            box[i].innerHTML = fromStorage.boxes[i] == 'X' ? `<img class='player' src="./close.png" />` : `<img class='player' src="./circle-vol-1circle.png" />`;
        }
    }

    updateScore();
    current_turn.innerText = ticks.turn;

    for (let i = 0; i < box.length; i++) {
        box[i].dataset.id = i;
        box[i].addEventListener('click', play);
    }
    reset_btn.addEventListener('click', reset);
    close_btn.addEventListener('click', close);
})

function saveToLocalStorage(data) {
    localStorage.setItem('boxes', JSON.stringify(data));
}

function updateScore() {
    X.innerText = `${ticks.score_board.x}`;
    O.innerText = `${ticks.score_board.o}`;
}

function reset() {

    ticks.boxes = [];

    for (let i = 0; i < box.length; i++) {
        box[i].innerHTML = '';
        box[i].dataset.id = i;
        box[i].addEventListener('click', play);
    }
    win = null;
    saveToLocalStorage(ticks);
}

function ChangePlayer() {
    ticks.turn = ticks.turn === 'X' ? 'O' : 'X';
    current_turn.innerText = ticks.turn;
}

function play(event) {

    let move = event.target.dataset.id;

    ticks.boxes[move] = ticks.turn;
    event.target.innerHTML = ticks.turn == 'X' ? `<img class='player' src="./close.png" />` : `<img class='player' src="./circle-vol-1circle.png" />`;
    event.target.removeEventListener('click', play)


    // Find The Winner
    FindWinner()

    // we have a winner
    if (win !== null) {
        if (ticks.boxes.indexOf(null) == -1) {
            win = 'draw';
        } else {
            successMessage()
        }
    }

    if (win == null) {
        ChangePlayer();
    }
    if (win == 'draw') {
        Message.innerHTML = `Match Draw!!`;
        Message_Container.style.display = 'block';
        Message_Bg.style.display = 'block';
        success_img.src = "https://www.creativefabrica.com/wp-content/uploads/2019/04/Never-Give-Up-by-Xtragraph.jpg";
        reset();
    }
    updateScore()
    saveToLocalStorage(ticks)

}

function close() {
    Message.innerHTML = '';
    Message_Container.style.display = 'none';
    Message_Bg.style.display = 'none'
}

function FindWinner() {

    let col1_row1 = ticks.boxes[conditions[0][0]];
    let col1_row2 = ticks.boxes[conditions[1][0]];
    let col1_row3 = ticks.boxes[conditions[2][0]];

    let col2_row1 = ticks.boxes[conditions[0][1]];
    let col2_row2 = ticks.boxes[conditions[1][1]];
    let col2_row3 = ticks.boxes[conditions[2][1]];

    let col3_row1 = ticks.boxes[conditions[0][2]];
    let col3_row2 = ticks.boxes[conditions[1][2]];
    let col3_row3 = ticks.boxes[conditions[2][2]];

    // Vertical
    if (col1_row1 == 'X' && col1_row2 == "X" && col1_row3 == 'X') {
        win = 'X'
    } else if (col1_row1 == 'O' && col1_row2 == "O" && col1_row3 == 'O') {
        win = 'O'
    } else

    if (col2_row1 == 'X' && col2_row2 == "X" && col2_row3 == 'X') {
        win = 'X'
    } else if (col2_row1 == 'O' && col2_row2 == "O" && col2_row3 == 'O') {
        win = 'O'
    } else

    if (col3_row1 == 'X' && col3_row2 == "X" && col3_row3 == 'X') {
        win = 'X'
    } else if (col3_row1 == 'O' && col3_row2 == "O" && col3_row3 == 'O') {
        win = 'O'
    } else {
        win = null
    }

    // Horizontal
    if (col1_row1 == 'X' && col2_row1 == "X" && col3_row1 == 'X') {
        win = 'X'
    } else if (col1_row1 == 'O' && col2_row1 == "O" && col3_row1 == 'O') {
        win = 'O'
    } else

    if (col1_row2 == 'X' && col2_row2 == "X" && col3_row2 == 'X') {
        win = 'X'
    } else if (col1_row2 == 'O' && col2_row2 == "O" && col3_row2 == 'O') {
        win = 'O'
    } else

    if (col1_row3 == 'X' && col2_row3 == "X" && col3_row3 == 'X') {
        win = 'X'
    } else if (col1_row3 == 'O' && col2_row3 == "O" && col3_row3 == 'O') {
        win = 'O'
    } else {
        win = null
    }

    // Diagonal
    if (col1_row1 == 'X' && col2_row2 == "X" && col3_row3 == 'X') {
        win = 'X'
    } else if (col1_row1 == 'O' && col2_row2 == "O" && col3_row3 == 'O') {
        win = 'O'
    } else

    if (col3_row1 == 'X' && col2_row2 == "X" && col1_row3 == 'X') {
        win = 'X'
    } else if (col3_row1 == 'O' && col2_row2 == "O" && col3_row3 == 'O') {
        win = 'O'
    } else {
        win = null
    }

}

function successMessage() {
    Message.innerHTML = `Player ${win} has won!!`;
    if (win == 'X') {
        ticks.score_board.x++
    } else
    if (win == 'O') {
        ticks.score_board.o++;
    }
    reset();
    Message_Container.style.display = 'block';
    Message_Bg.style.display = 'block';
}
function hardReset() {
    console.log('reset');
    
    ticks.boxes = []
    ticks.score_board.x = 0;
    ticks.score_board.o = 0;
    X.innerText = ticks.score_board.x;
    O.innerText = ticks.score_board.o;
    localStorage.removeItem('boxes')
}