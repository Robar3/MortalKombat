/**
 * Создаем элемент с нужным классом
 * @param tag
 * @param className
 * @returns {*}
 */
export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}
/**
 * рандомное число наиная с 1
 * @param random
 * @returns {number}
 */
export const getRandom = (random) => Math.ceil(Math.random() * random);
