const $arena = document.querySelector('.arenas');
function attack(name){
    console.log(name +' Fight...');
}
const $randomButton= document.querySelector('.button');
const player1 ={
    player: 1,
    name: 'Sonya',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon:['axe','knife'],
    attack:function (){attack(this.name)}
};
player1.attack();
const player2 ={
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:['axe','knife'],
    attack:function (){attack(this.name)}
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

function changeHP(player){
    const $playerLife = document.querySelector('.player'+player.player +' .life');
    player.hp -=Math.ceil(Math.random()*20);
    $playerLife.style.width = player.hp+'%';

    if (player.hp<0){
        player.hp =0;
        $playerLife.style.width = player.hp+'%';
        $arena.appendChild(playerLose(player.name));
    }
}

$randomButton.addEventListener('click',function (){
    changeHP(player1);
    changeHP(player2);
})

function playerLose(name){
    const $loseTitle= createElement('div','loseTitle');
    if (name==player1.name){
        $loseTitle.innerText= player2.name+' WIN';
    }else {
        $loseTitle.innerText= player1.name+' WIN';
    }

    $randomButton.disabled = true;
    return $loseTitle;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));