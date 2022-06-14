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

    const checkWinner = (playerChoice) => {
        
        //HORIZONTAL
        if (getBoard()[0] === playerChoice && getBoard()[1] === playerChoice && getBoard()[2] === playerChoice) return playerChoice;
    
        else if (getBoard()[3] === playerChoice && getBoard()[4] === playerChoice && getBoard()[5] === playerChoice) return playerChoice;
    
        else if (getBoard()[6] === playerChoice && getBoard()[7] === playerChoice && getBoard()[8] === playerChoice) return playerChoice;
    
        //VERTICAL
        else if (getBoard()[0] === playerChoice && getBoard()[3] === playerChoice && getBoard()[6] === playerChoice) return playerChoice;
    
        else if (getBoard()[1] === playerChoice && getBoard()[4] === playerChoice && getBoard()[7] === playerChoice) return playerChoice;
    
        else if (getBoard()[2] === playerChoice && getBoard()[5] === playerChoice && getBoard()[8] === playerChoice) return playerChoice;
    
        //DIAGONAL
        else if (getBoard()[0] === playerChoice && getBoard()[4] === playerChoice && getBoard()[8] === playerChoice) return playerChoice;
    
        else if (getBoard()[2] === playerChoice && getBoard()[4] === playerChoice && getBoard()[6] === playerChoice) return playerChoice;

        else return false;
        
    };

    return {
         buildBoard,
         getBoard,
         setBoard,
         checkWinner,
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
                    if(turn > 4) {
                        if(GameBoard.checkWinner(_player1.getPlayerChoice())) console.log(`Winner is ${_player1.getPlayerChoice()}`);
                        if(GameBoard.checkWinner(_player2.getPlayerChoice())) console.log(`Winner is ${_player2.getPlayerChoice()}`); 
                    }
                }
            });
        });
    };

    const displayWinner = (winner) => {
        
    };


    return {
        setup,
        choosePlayerTurn,
    };
    
})();

window.onload = Game.setup();