const gameBoard = (function() {
    'use strict';

    const board = [['X', 'X', 'X',], ['O', 'O', 'O'], ['X', 'X', 'X']];

    const getBoard = () => board;

    const labelSpace = (space, player) => {
        board[space] = player;
    }

    return { getBoard, labelSpace };
})();

const displayController = (function() {
    'use strict';

})();

const Player = (name) => {
    let playerName = name;
    let sign = 'X';
    return {playerName, sign};
};

const gameController = (function() {
    'use strict';

})();