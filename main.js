import {generateLog} from './log.js';
import {createPlayer,enemyAttack,playerAttack} from './player.js';
import {showResult} from './gameLogic.js';
export const $arena = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');
/**
 * Создание игрока
 * @type {{elHP: (function(): Element), weapon: string[], img: string, attack: attack, name: string, hp: number, changeHP: changeHP, player: number, renderHP: renderHP}}
 */
const player1 = {
    player: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['axe', 'knife'],
    attack,
    changeHP,
    elHP,
    renderHP
};
player1.attack();
const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['axe', 'knife'],
    attack,
    changeHP,
    elHP,
    renderHP
};
player2.attack();
generateLog('start',player1,player2);

/**
 * Пишем в лог о начале боя игрока
 */
function attack() {
    console.log(this.name + ' Fight...');
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

/**
 * Изменение здоровья игрока
 * @param hit
 */
function changeHP(hit) {
    this.hp -= hit;
    if (this.hp < 0) {
        this.hp = 0;
    }
}

/**
 * Находим полоску здоровья в ДОМ
 * @returns {Element}
 */
function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

/**
 * Изменяем полоску хп в соответсвии с хп игрока
 * @param el
 */
function renderHP(el) {
    el.style.width = this.hp + '%';
}

/**
 * Добавляем listener на кнопку submit для игры
 */
$formFight.addEventListener('submit', function (e) {

    e.preventDefault();
    console.dir($formFight);
    const enemy = enemyAttack();
    const attack = playerAttack();


    if (enemy.hit != attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP(player1.elHP());
        generateLog('hit', player2, player1, enemy.value);
    } else {
        generateLog('defence', player2, player1);
    }
    if (attack.hit != enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP(player2.elHP());
        generateLog('hit', player1, player2, attack.value);
    } else {
        generateLog('defence', player1, player2)
    }
    showResult(player1,player2);
})


