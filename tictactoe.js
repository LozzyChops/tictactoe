'use strict';

const gameBoard = (function () {
    let boardArray = new Array(9);

    const initBoardArray = function () {
        boardArray = ["", "", "", "", "", "", "", "", ""];
    };

    const getBoardArray = () => {
        return boardArray;
    };

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

    const initDOMButtons = function () {
        for (let i = 0; i < DOMButtons.length; i++) {
            DOMButtons[i].innerHTML = "";
            DOMButtons[i].addEventListener("click", gameController.progressGame);
        }
    };

    const getDOMButtons = () => {
        return DOMButtons;
    };

    const updateBoardDisplay = function (event) {
        event.target.innerHTML = gameController.getCurrentPlayer().getSymbol();
    };

    return {
        initDOMButtons,
        getDOMButtons,
        updateBoardDisplay,
    };
})();

const gameController = (function () {
    let currentTurn;
    let currentPlayer;
    let playerOne;
    let playerTwo;
    let boardArray;

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

    const initGame = function () {
        boardArray = gameBoard.initBoardArray();
        playerOne = Player("Player 1", "X");
        playerTwo = Player("Player 2", "O");
        currentTurn = 1;
        currentPlayer = playerOne;
        displayController.initDOMButtons();

        return {
            currentTurn,
            currentPlayer,
            playerOne,
            playerTwo,
            boardArray,
        };
    };

    const progressGame = function (event) {
        if (isInvalidMove(event["target"]["id"])) return;
        else {
            gameBoard.updateBoardArray(event["target"]["id"]);
            displayController.updateBoardDisplay(event);
        };  

        if (isWin()) {
            console.log("someone won! ending game!")
            endGame();
        } else if (isTie()) {
            console.log("tie! ending game!")
            endGame();
        } else {
            updateCurrentTurn();
            updateCurrentPlayer();
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
        initGame();
    };

    let gameController = {
        initGame,
        progressGame,
        getCurrentTurn,
        getCurrentPlayer,
    };

    return gameController;
})();

gameController.initGame();