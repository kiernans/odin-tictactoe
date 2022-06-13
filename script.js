const GameBoard = (() => {
    let _board = ["", "", "", "", "", "", "", "", ""];
    
    const getBoard = () => _board;
    
    const setBoard = (index, playerChoice) => {
        if(index < getBoard().length & (playerChoice === 'X' | playerChoice === 'O')) {
            return _board[index] = playerChoice;
        }
    };

    const setChoice = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', () => {
                const index = square.classList.value[7];
                square.textContent = setBoard(index, Game.player1.getPlayerChoice());
            });
        });

    };

    const buildBoard = () => {
        for (let i = 0; i < getBoard().length; i++) {
            const container = document.querySelector('.container');
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add(`${i}`);
            container.appendChild(square);
        }
    };
    return {
         buildBoard,
         getBoard,
         setBoard,
         setChoice,
    };
})();

const Player = (playerChoice) => {
    
    const getPlayerChoice = () => playerChoice;

    return {
        getPlayerChoice,
    };
};

const Game = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let turn = 0;

    const start = () => {
        GameBoard.buildBoard();
        GameBoard.setChoice();
    };

    const choosePlayerTurn = () => {
        if(turn % 2) {
            console.log(`Player 2's turn!`);
            turn++;
        } else {
            console.log(`Player 1's turn!`);
            turn++;
        }
    };

    return {
        start,
        player1,
        player2,
        choosePlayerTurn,
    };
    
})();

window.onload = Game.start();