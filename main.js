const $arena = document.querySelector('.arenas');
function attack(){
    console.log(this.name +' Fight...');
}
function getRandom(){
    return Math.ceil(Math.random()*20);
}
const $randomButton= document.querySelector('.button');
const player1 ={
    player: 1,
    name: 'Sonya',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon:['axe','knife'],
    attack:attack,
    changeHP:changeHP,
    elHP:elHP,
    renderHP:renderHP
};
player1.attack();
const player2 ={
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:['axe','knife'],
    attack:attack,
    changeHP:changeHP,
    elHP:elHP,
    renderHP:renderHP
};
player2.attack();

function createElement(tag,className){
    const $tag = document.createElement(tag);

    if (className){
        $tag.classList.add(className);
    }
    return $tag;
}
function createPlayer(player){
    const $player1=createElement('div','player'+player.player);
    const $progressbar=createElement('div','progressbar');
    const $character=createElement('div','character');
    const $name=createElement('div','name');
    const $life=createElement('div','life');
    const $img = createElement('img');
    $life.style.width=player.hp+'%';
    $name.innerText=player.name;
    $img.src=player.img;
    if (player.player=='2'){
        $img.style.transform= 'scaleX(-1)';
    }
    $player1.appendChild($progressbar);
    $player1.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player1;
}

function changeHP(hit){

    this.hp -=hit;
    if (this.hp<0){
        this.hp =0;
    }

}

function elHP(){
    return  document.querySelector('.player'+this.player +' .life');
}

function renderHP(el){
    el.style.width = this.hp+'%';
}

$randomButton.addEventListener('click',function (){
    player1.changeHP(getRandom(20));
    player1.renderHP(player1.elHP());
    player2.changeHP(getRandom(20));
    player2.renderHP(player2.elHP());

    if (player1.hp==0||player2.hp==0){
        $randomButton.disabled=true;
    }

    if (player1.hp==0&&player1.hp<player2.hp){
        $arena.appendChild(playerWins(player2.name));
    }else if (player2.hp==0&&player2.hp<player1.hp){
        $arena.appendChild(playerWins(player1.name));
    }else if (player2.hp==0&&player2.hp==0){
        $arena.appendChild(playerWins());
    }
})

function playerWins(name){
    const $loseTitle= createElement('div','loseTitle');
    if (name){
        $loseTitle.innerText= name+' WIN';
    }else {
        $loseTitle.innerText= 'draw';
    }
    $arena.appendChild(createReloadButton());
    return $loseTitle;
}

function createReloadButton(){
    const $reloadWrap= createElement('div', 'reloadWrap');
    const $buttonRestart= createElement('button', 'button');
    $buttonRestart.innerText = 'Restart';
    $reloadWrap.appendChild($buttonRestart);

    $buttonRestart.addEventListener('click',function (){
        window.location.reload();
    })

    return $reloadWrap;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));