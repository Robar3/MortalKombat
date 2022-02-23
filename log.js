import {getRandom} from "./util.js";

const $chat = document.querySelector('.chat')
const time = new Date();
const date = String('[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ']');

const LOGS = {
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
/**
 * Придаем логам нужный нам формат
 * @param logText
 * @param player
 * @param damage
 * @returns {string}
 */
const collectLog = (logText, player, damage) => {
    let log;
    if (damage) {
        log = `${date} ${logText} -${damage}HP ${player.name} ${player.hp}/100HP`;
    } else {
        log = `${date} ${logText} ${player.name} ${player.hp}/100HP`;
    }
    return log;
}
/**
 * Добавляем написанный лог в нашу панельку с логом
 * @param text
 */
const addLog = (text) => {
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('beforeend', el);
}

/**
 * Создание лога в зависимости от произошедших эвентов
 * @param type
 * @param play1
 * @param play2
 * @param damage
 */
export const generateLog = (type, play1, play2, damage) => {
    let text;
    let log;
    switch (type) {
        case 'start':
            log = LOGS.start.replace('[time]', date).replace('[player1]', play1.name).replace('[player2]', play2.name);
            break;
        case 'hit':
            text = LOGS[type][getRandom(LOGS[type].length) - 1].replace('[playerKick]', play1.name).replace('[playerDefence]', play2.name);
            log = collectLog(text, play2, damage);
            break;
        case 'defence':
            text = LOGS[type][getRandom(LOGS[type].length) - 1].replace('[playerKick]', play1.name).replace('[playerDefence]', play2.name);
            log = collectLog(text, play2);
            break;
        case 'end':
            log = LOGS.end[getRandom(3) - 1].replace('[playerWins]', play1.name).replace('[playerLose]', play2.name);
            break;
        case 'draw':
            addLog(LOGS.draw);
    }
    addLog(log);
    $chat.scrollTop = $chat.scrollHeight;
}
