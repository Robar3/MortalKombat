import {createElement} from "./util.js";
import {generateLog} from "./log.js";
import {$arena} from "./main.js";
const $randomButton = document.querySelector('.button');

/**
 * Создаем кнопку Restart для перезапуска игры после её окончания
 * @returns {*}
 */
const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $buttonRestart = createElement('button', 'button');
    $buttonRestart.innerText = 'Restart';
    $reloadWrap.appendChild($buttonRestart);

    $buttonRestart.addEventListener('click', function () {
        window.location.reload();
    })

    return $reloadWrap;
}
/**
 * Определение условия победы игрока
 * @param name
 * @returns {*}
 */
const playerWins = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' WIN';
    } else {
        $loseTitle.innerText = 'draw';
    }
    $arena.appendChild(createReloadButton());
    return $loseTitle;
}
/**
 * Вывод информации о результатах боя
 * @param player1
 * @param player2
 */
export const showResult = (player1,player2) => {
    if (player1.hp == 0 || player2.hp == 0) {
        $randomButton.disabled = true;
    }

    if (player1.hp == 0 && player1.hp < player2.hp) {
        $arena.appendChild(playerWins(player2.name));
        generateLog('end', player2, player1);
    } else if (player2.hp == 0 && player2.hp < player1.hp) {
        $arena.appendChild(playerWins(player1.name));
        generateLog('end', player1, player2);
    } else if (player2.hp == 0 && player2.hp == 0) {
        $arena.appendChild(playerWins());
        generateLog('draw');
    }
}

