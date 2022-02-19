const $arena = document.querySelector('.arenas');
const $chat = document.querySelector('.chat')
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const time = new Date();
const date = String('[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ']');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
    player: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['axe', 'knife'],
    attack: attack,
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
    attack: attack,
    changeHP,
    elHP,
    renderHP
};
player2.attack();
generateLog('start');

function attack() {
    console.log(this.name + ' Fight...');
}

function getRandom(random) {
    return Math.ceil(Math.random() * random);
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(player) {
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

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $buttonRestart = createElement('button', 'button');
    $buttonRestart.innerText = 'Restart';
    $reloadWrap.appendChild($buttonRestart);

    $buttonRestart.addEventListener('click', function () {
        window.location.reload();
    })

    return $reloadWrap;
}

function changeHP(hit) {
    this.hp -= hit;
    if (this.hp < 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP(el) {
    el.style.width = this.hp + '%';
}

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' WIN';
    } else {
        $loseTitle.innerText = 'draw';
    }
    $arena.appendChild(createReloadButton());
    return $loseTitle;
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
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



function collectLog(logText, player, damage) {
    let log;
    if (damage) {
        log = `${date} ${logText} -${damage}HP ${player.name} ${player.hp}/100HP`;
    } else {
        log = `${date} ${logText} ${player.name} ${player.hp}/100HP`;
    }
    return log;
}

function addLog(text) {
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

function generateLog(type, play1, play2, damage) {
    let text;
    let log;
    switch (type) {
        case 'start':
            log = logs.start.replace('[time]', date).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'hit':
            text = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', play1.name).replace('[playerDefence]', play2.name);
            log = collectLog(text, play2, damage);
            break;
        case 'defence':
            text = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', play1.name).replace('[playerDefence]', play2.name);
            log = collectLog(text, play2);
            break;
        case 'end':
            log = logs.end[getRandom(3) - 1].replace('[playerWins]', play1.name).replace('[playerLose]', play2.name);
            break;
    }
    addLog(log);
}

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
    showResult();
})

function showResult() {
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
        addLog(logs.draw);
    }
}