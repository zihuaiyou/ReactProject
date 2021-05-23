import Deque from './双端对列.js'

function palindromeChecker(aString) {
    if (aString === null || aString === undefined ||
        (aString !== null && aString.length === 0)) {
        return false;
    }

    let deque = new Deque();
    let lowerString = aString.toLowerCase().split(" ").join("");
    let isEqual = true;
    let firstChar, lastChar;

    for (let i = 0; i < lowerString.length; i++) {
        deque.addBack(lowerString.charAt(i))
    }

    while (deque.size() > 1 && isEqual === true) {
        firstChar = deque.removeFont();
        lastChar = deque.removeBack();

        if (firstChar !== lastChar) isEqual = false;
    }

    return isEqual;
}

console.log('abcdef', palindromeChecker("abcdef"));
console.log('qwewq', palindromeChecker("qwewq"));
console.log('上海自来水来自海上', palindromeChecker("上海自来水来自海上"));

