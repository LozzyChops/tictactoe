const gameBoard = (function() {
    'use strict';

    const board = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];

    const getBoard = () => board;

    return { getBoard };
})();

const displayController = (function() {
    'use strict';

    const buttons = document.getElementsByClassName('boardSection');
    const board = gameBoard.getBoard();

    const updateDisplay = () => {
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            button.innerHTML = board[i];
        }
    }

    return { updateDisplay };
})();

const gameController = (function() {
    'use strict';

    return true;
})();

const Player = () => {
};