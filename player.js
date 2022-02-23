import {createElement,getRandom} from './util.js';
import {$formFight} from './main.js';


/**
 * Отрисовка игрока
 * @param player
 * @returns {*}
 */
export const createPlayer = (player) => {
    const $player1 = createElement('div', 'player' + player.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $name = createElement('div', 'name');
    const $life = createElement('div', 'life');
    const $img = createElement('img');
    $life.style.width = player.hp + '%';
    $name.innerText = player.name;
    $img.src = player.img;
    if (player.player == '2') {
        $img.style.transform = 'scaleX(-1)';
    }
    $player1.appendChild($progressbar);
    $player1.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player1;
}

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

/**
 * Атака компьютера
 * @returns {{hit: string, defence: string, value: number}}
 */
export function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

/**
 * Атака игрока
 * @returns {{}}
 */
export const playerAttack = () => {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name == 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name == 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack;
}
