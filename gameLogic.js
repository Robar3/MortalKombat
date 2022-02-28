import {createElement} from "./util.js";
import {generateLog} from "./log.js";
import { Player,pve} from "./player.js";
const $randomButton = document.querySelector('.button');
const $arena = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');

/**
 * Создаем кнопку Restart для перезапуска игры после её окончания
 * @returns {*}
 */
const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $buttonRestart = createElement('button', 'button');
    $buttonRestart.innerText = 'Change hero';
    $reloadWrap.appendChild($buttonRestart);

    $buttonRestart.addEventListener('click', function () {
        window.location.replace('./changeHero/index.html');
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


export class Game{

     gameStart(){
        const player1JSO=JSON.parse(localStorage.getItem('player1'));
        const enemyJSON=JSON.parse(localStorage.getItem('enemy'));
        const player1= new Player({
            player: 1,
            name: player1JSO.name,
            hp: player1JSO.hp,
            img: player1JSO.img,
            weapon: ['axe', 'knife'],
            rootSelector:'arenas'
        });
        const player2=new Player({
            player: 2,
            name: enemyJSON.name,
            hp: enemyJSON.hp,
            img: enemyJSON.img,
            weapon: ['axe', 'knife'],
            rootSelector:'arenas'
        })
        player1.attack();
        player2.attack();
        generateLog('start',player1,player2);

        player1.createPlayer();
        player2.createPlayer();


        /**
         * Добавляем listener на кнопку submit для игры
         */
        $formFight.addEventListener('submit', async function (e) {

            e.preventDefault();
            console.dir($formFight);
            const fight =await pve();
            const enemy = fight.player2;
            const attack =fight.player1;

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
}

}
