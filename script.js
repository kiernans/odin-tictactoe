const DOMStuff = (() => {
    const buildBoard = () => {
        for (let i = 0; i < GameBoard.getBoard().length; i++) {
            const container = document.querySelector('.container');
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add(`${i}`);
            container.appendChild(square);
        }
    };

    const removeAllChildNodes = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    };

    const resetDOM = () => {
        const container = document.querySelector('.container');
        removeAllChildNodes(container);
    };

    const displayWinner = (winner) => {
        const message = document.createElement('h1');
        message.textContent = `${winner} is the winner!`;
        document.body.appendChild(message);
    };

    const displayTie = () => {
        const message = document.createElement('h1');
        message.textContent = `It's a tie!`;
        document.body.appendChild(message);
    };

    const removeResult = () => document.body.removeChild(document.body.lastChild);

    return {
        buildBoard,
        resetDOM,
        displayWinner,
        displayTie,
        removeResult,
    };
})();

const GameBoard = (() => {
    let _board = ["", "", "", "", "", "", "", "", ""];
    
    const getBoard = () => _board;
    
    const setBoard = (index, playerChoice) => {
        if(index < getBoard().length & (playerChoice === 'X' | playerChoice === 'O')) {
            return _board[index] = playerChoice;
        }
    };

    const resetBoard = () => {
        return _board = _board.map(x => '');
    };

    const decideWinner = (playerChoice) => {
        
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
         getBoard,
         setBoard,
         decideWinner,
         resetBoard,
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
    let winner = '';
    let turn = 0;

    const setupGame = () => {
        DOMStuff.buildBoard();
        setChoice();
        resetButton();
    };

    const resetGame = () => {
        resetTurn();
        resetWinner();
        resetButton();
        GameBoard.resetBoard();
        DOMStuff.resetDOM();
        setupGame();
        DOMStuff.removeResult();
    };

    const resetTurn = () => turn = 0;

    const resetWinner = () => winner = '';

    const resetButton = () => {
        const resetBtn = document.querySelector('button');
        resetBtn.addEventListener('click', () => {
            resetGame();
        });
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
                if(square.textContent === '' && !(checkIfWinnerExists())) {
                    square.textContent = choosePlayerTurn(e);
                    ++turn;

                    if(turn > 4 && !winner) checkIfWinnerExists();
                    
                    if(turn >= 9 && !winner) {
                        DOMStuff.displayTie();
                    }
                }
            });
        });
    };


    const checkIfWinnerExists = () => {
        if(GameBoard.decideWinner(_player1.getPlayerChoice())) {
            winner = _player1.getPlayerChoice()
            DOMStuff.displayWinner(winner);
        }
        if(GameBoard.decideWinner(_player2.getPlayerChoice())) {
            winner = _player2.getPlayerChoice();
            DOMStuff.displayWinner(winner);
        } 
    };


    return {
        setupGame,
        choosePlayerTurn,
    };
    
})();

window.onload = Game.setupGame();