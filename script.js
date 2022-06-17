const DOMStuff = (() => {
    const buildBoard = () => {
        for (let i = 0; i < GameBoard.getBoard().length; i++) {
            const board = document.querySelector('.board');
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add(`${i}`);
            board.appendChild(square);
        }
    };

    const removeAllChildNodes = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    };

    const resetBoard = () => {
        const board = document.querySelector('.board');
        removeAllChildNodes(board);
    };

    const resetPlayer = () => {
        const left = document.querySelector('.left');
        const right = document.querySelector('.right');
        removeAllChildNodes(left);
        removeAllChildNodes(right);
    };

    const displayWinner = (winner) => {
        const message = document.createElement('h1');
        message.textContent = `${winner} is the winner!`;
        message.classList.add('result');
        document.body.appendChild(message);
    };

    const displayTie = () => {
        const message = document.createElement('h1');
        message.textContent = `It's a tie!`;
        message.classList.add('result');
        document.body.appendChild(message);
    };

    const removeResult = () => {
        const result = document.querySelector('.result');
        result.remove();
    };

    const getInput = (selector) => {
        const player = document.querySelector(`#${selector}`);
        const pv = player.value;
        return pv;
    };

    const displayPlayers = (playerName, side) => {
        const display = document.querySelector(`.${side}`);
        const player = document.createElement('h1');
        const playerInput = getInput(playerName);
        player.textContent = playerInput;
        display.appendChild(player);
    };

    return {
        buildBoard,
        resetBoard,
        displayWinner,
        displayTie,
        removeResult,
        displayPlayers,
        resetPlayer,
        getInput,
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

const Player = (playerChoice, name) => {
    
    const getPlayerChoice = () => playerChoice;
    const getPlayerName = () => name;
    const setPlayerName = (newName) => name = newName;

    return {
        getPlayerChoice,
        getPlayerName,
        setPlayerName,
    };
};

const Game = (() => {
    const _player1 = Player("X", 'Player1');
    const _player2 = Player("O", 'Player2');
    let winner = '';
    let turn = 0;

    const setupGame = () => {
        DOMStuff.buildBoard();
        setChoice();
        resetButton();
        submitButton();
    };

    const resetGame = () => {
        if(document.querySelector('.result')) DOMStuff.removeResult();
        GameBoard.resetBoard();
        DOMStuff.resetBoard();
        DOMStuff.resetPlayer();
        setupGame();
        resetTurn();
        resetWinner();
        resetPlayerNames();
    };

    const resetTurn = () => turn = 0;

    const resetWinner = () => winner = '';

    const resetPlayerNames = () => {
        _player1.setPlayerName = 'Player1';
        _player2.setPlayerName = 'Player2';
    };

    const resetButton = () => {
        const resetBtn = document.querySelector('.reset');
        resetBtn.addEventListener('click', () => {
            resetGame();
        });
    };

    const submitButton = () => {
        const submitBtns = document.querySelectorAll('.submit');
        submitBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                if(e.target.id === 'submit1' && !document.querySelector('.left').hasChildNodes()) {
                    DOMStuff.displayPlayers('player1', 'left');
                    const newName = DOMStuff.getInput('player1');
                    _player1.setPlayerName(newName);
                } 
                if(e.target.id === 'submit2' && !document.querySelector('.right').hasChildNodes()) {
                    DOMStuff.displayPlayers('player2', 'right');
                    const newName = DOMStuff.getInput('player2');
                    _player2.setPlayerName(newName);
                }
            });
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
                if(square.textContent === '' && !winner) {
                    square.textContent = choosePlayerTurn(e);
                    ++turn;

                    if(turn > 4) checkIfWinnerExists();
                    
                    if(turn >= 9 && !winner) {
                        DOMStuff.displayTie();
                    }
                }
            });
        });
    };


    const checkIfWinnerExists = () => {
        if(GameBoard.decideWinner(_player1.getPlayerChoice())) {
            winner = _player1.getPlayerName()
            DOMStuff.displayWinner(winner);
        }
        if(GameBoard.decideWinner(_player2.getPlayerChoice())) {
            winner = _player2.getPlayerName();
            DOMStuff.displayWinner(winner);
        } 
    };


    return {
        setupGame,
        choosePlayerTurn,
    };
    
})();

window.onload = Game.setupGame();