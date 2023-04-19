'use strict';

const gameBoard = (function () {
    let boardArray = new Array(9);

    //the way to initialize the board array for a new game
    const initBoardArray = function () {
        boardArray = ["", "", "", "", "", "", "", "", ""];
    };

    const getBoardArray = () => {
        return boardArray;
    };

    //the way to add the current player symbol to a button in the board array, using the ID in the HTML to supply the array index
    const updateBoardArray = (buttonId) => {
        boardArray[buttonId] = gameController.getCurrentPlayer().getSymbol();
    };
    
    return {
        initBoardArray,
        getBoardArray,
        updateBoardArray,
    };
})();

const displayController = (function () {
    const DOMButtons = document.getElementsByClassName("game-button");
    const instructions = document.getElementById("game-instructions");
    const restartOptions = document.getElementById("restart-options");

    //the way to initialize the buttons in the HTML so that they each have the necessary event listener and have empty innerHTML
    const initDOMButtons = function () {
        for (let i = 0; i < DOMButtons.length; i++) {
            DOMButtons[i].innerHTML = "";
            DOMButtons[i].addEventListener("click", gameController.progressGame);
        }
    };

    //the way to add the current player symbol to the innerHTML of the button that was clicked
    const updateBoardDisplay = function (event) {
        event.target.innerHTML = gameController.getCurrentPlayer().getSymbol();
    };

    const updateInstructions = (message) => {
        instructions.innerHTML = message;
    };

    const showRestartOptions = () => {
        restartOptions.addEventListener("click", gameController.endGame);
        restartOptions.style.visibility = "visible";
    }

    const hideRestartOptions = () => {
        restartOptions.style.visibility = "hidden";
    }

    return {
        initDOMButtons,
        updateBoardDisplay,
        updateInstructions,
        showRestartOptions,
        hideRestartOptions,
    };
})();

const gameController = (function () {
    let currentTurn;
    let currentPlayer;
    let playerOne;
    let playerTwo;

    const Player = (name, symbol) => {
        const getName = () => name;
        const getSymbol = () => symbol;

        return {
            getName,
            getSymbol,
        };
    };

    const getCurrentTurn = () => {
        return currentTurn;
    };

    const getCurrentPlayer = () => {
        return currentPlayer;
    };

    const updateCurrentTurn = () => {
        currentTurn++;

        return currentTurn;
    };

    const updateCurrentPlayer = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
            
        } else {
            currentPlayer = playerOne;
        };

        return currentPlayer;
    };

    //the way to initialize everything for a fresh round of the game, including the way to track turns and current player, and initializing the board and display
    const initGame = function () {
        playerOne = Player("Player 1", "X");
        playerTwo = Player("Player 2", "O");
        currentTurn = 1;
        currentPlayer = playerOne;
        gameBoard.initBoardArray();
        displayController.initDOMButtons();
        displayController.updateInstructions("New game! Player 1, take your turn.");        

        return {
            currentTurn,
            currentPlayer,
            playerOne,
            playerTwo,
        };
    };

    //when a board button is clicked, this is triggered
    const progressGame = function (event) {
        if (isInvalidMove(event["target"]["id"])) return;
        else {
            gameBoard.updateBoardArray(event["target"]["id"]);
            displayController.updateBoardDisplay(event);
        };  

        if (isWin()) {
            displayController.updateInstructions(`${getCurrentPlayer().getName()}, you win!`);
            displayController.showRestartOptions();
        } else if (isTie()) {
            displayController.updateInstructions("It's a tie.");
            displayController.showRestartOptions();
        } else {
            updateCurrentTurn();
            updateCurrentPlayer();
            displayController.updateInstructions(`${getCurrentPlayer().getName()}, take your turn.`);   
        };
    };

    const isInvalidMove = (id) => (gameBoard.getBoardArray()[id] !== "");
    
    const isWin = () => {
        switch (true) {
            case (gameBoard.getBoardArray()[0] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[1] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[2] === currentPlayer.getSymbol()): {
            return true;
            };
            case (gameBoard.getBoardArray()[3] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[4] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[5] === currentPlayer.getSymbol()): {
            return true;
            };
            case (gameBoard.getBoardArray()[6] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[7] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[8] === currentPlayer.getSymbol()): {
            return true;
            };
            case (gameBoard.getBoardArray()[0] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[3] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[6] === currentPlayer.getSymbol()): {
            return true;
            };
            case (gameBoard.getBoardArray()[1] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[4] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[7] === currentPlayer.getSymbol()): {
            return true;
            };
            case (gameBoard.getBoardArray()[2] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[5] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[8] === currentPlayer.getSymbol()): {
            return true;
            };
            case (gameBoard.getBoardArray()[0] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[4] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[8] === currentPlayer.getSymbol()): {
            return true;
            };
            case (gameBoard.getBoardArray()[2] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[4] === currentPlayer.getSymbol() &&
                gameBoard.getBoardArray()[6] === currentPlayer.getSymbol()): {
            return true;
            };
        };
    };


    const isTie = () => (getCurrentTurn() > 8);

    const endGame = function () {
        displayController.hideRestartOptions();
        initGame();
    };

    let gameController = {
        initGame,
        progressGame,
        getCurrentPlayer,
        endGame,
    };

    return gameController;
})();

gameController.initGame();