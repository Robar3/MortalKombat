function attack(name){
    console.log(name +' Fight...');
}
const player1 ={
    name: 'Sonya',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon:['axe','knife'],
    attack:function (){attack(this.name)}
};
player1.attack();
const player2 ={
    name: 'Scorpion',
    hp: 100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon:['axe','knife'],
    attack:function (){attack(this.name)}
};
player2.attack();
function createPlayer(numberPlayer,player){
    const $player1=document.createElement('div');
    $player1.classList.add('player1');
    const $progressbar=document.createElement('div');
    $progressbar.classList.add('progressbar');
    const $character=document.createElement('div');
    $character.classList.add('character');
    const $life=document.createElement('div');
    $life.classList.add('life');
    $life.style.width='100%';
    $life.innerText= player.hp;
    $life.style.color = 'white';
    const $name=document.createElement('div');
    $name.innerText=player.name;
    const $img = document.createElement('img');
    $img.src=player.img;
    if (numberPlayer=='player2'){
        $img.style.transform= 'scaleX(-1)';
    }
    $name.classList.add('player1');
    $player1.appendChild($progressbar);
    $player1.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    const $arena = document.querySelector('.arenas');
    $arena.appendChild($player1);
}
createPlayer('player1',player1);
createPlayer('player2',player2);