import {createElement,getRandom} from './util.js';
import {$formFight} from "./gameLogic.js";


export class Player{
    constructor(props) {
        this.name=props.name;
        this.player=props.player;
        this.hp=props.hp;
        this.img=props.img;
        this.weapon=props.weapon;
        this.selector=`player${this.player}`;
        this.rootSelector=props.rootSelector;
    }
    /**
     * Пишем в лог о начале боя игрока
     */
    attack() {
        console.log(this.name + ' Fight...');
    }
    /**
     * Изменение здоровья игрока
     * @param hit
     */
    changeHP(hit) {
        this.hp -= hit;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    /**
     * Находим полоску здоровья в ДОМ
     * @returns {Element}
     */
    elHP() {
        return document.querySelector('.player' + this.player + ' .life');
    }

    /**
     * Изменяем полоску хп в соответсвии с хп игрока
     * @param el
     */
    renderHP(el) {
        el.style.width = this.hp + '%';
    }
    /**
     * Отрисовка игрока
     * @returns {*}
     */
     createPlayer = () => {
        const $player1 = createElement('div', 'player' + this.player);
        const $progressbar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');
        const $name = createElement('div', 'name');
        const $life = createElement('div', 'life');
        const $img = createElement('img');
        $life.style.width = this.hp + '%';
        $name.innerText = this.name;
        $img.src = this.img;
        if (this.player == '2') {
            $img.style.transform = 'scaleX(-1)';
        }
        $player1.appendChild($progressbar);
        $player1.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);
        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player1)
        return $player1;
    }
}

/**
 * Передаем в апи выбранные места удара, и полчаем сколько урона и куда нанесли мы и враг
 * @returns {Promise<Response>}
 */
export async function pve(){
    let hit ;
    let defence;
    for (let item of $formFight) {
        if (item.checked && item.name == 'hit') {
            hit =item.value;
        }
        if (item.checked && item.name == 'defence') {
            defence = item.value;
        }
        item.checked = false;
    }
   const fightResult= await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit,
            defence,
        })
    }).then( function (response){
       if (!response.ok) {
           return Promise.reject(new Error(
               'Response failed: ' + response.status + ' (' + response.statusText + ')'
           ));
       }else {
               const fightRes = response.json();
           return fightRes;
       }
   });
return fightResult;
}

