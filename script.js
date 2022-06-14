const GameBoard = (() => {
    let _board = ["", "", "", "", "", "", "", "", ""];
    
    const getBoard = () => _board;
    
    const setBoard = (index, playerChoice) => {
        if(index < getBoard().length & (playerChoice === 'X' | playerChoice === 'O')) {
            return _board[index] = playerChoice;
        }
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

    const checkWinner = () => {
        //if(getBoard()[0] === getBoard()[])
    };

    return {
         buildBoard,
         getBoard,
         setBoard,
    };
})();

const Player = (playerChoice) => {
    
    const getPlayerChoice = () => playerChoice;

    return {
        getPlayerChoice,
    };
};

const Game = (() => {
    const _player1 = Player("X");
    const _player2 = Player("O");
    let turn = 0;

    const setup = () => {
        GameBoard.buildBoard();
        setChoice();

    };

    const choosePlayerTurn = (event) => {
        if(turn % 2) {
            const index = event.target.classList.value[7];
            return GameBoard.setBoard(index, _player2.getPlayerChoice());
        } else {
            const index = event.target.classList.value[7];
            return GameBoard.setBoard(index, _player1.getPlayerChoice());
        }
    };

    const setChoice = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', (e) => {
                if(square.textContent === '') {
                    square.textContent = choosePlayerTurn(e);
                    ++turn;
                }
            });
        });
    };


    return {
        setup,
        choosePlayerTurn,
    };
    
})();

window.onload = Game.setup();