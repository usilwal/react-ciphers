const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomize_key_helper(keyLength, asciiRange) {
    let newKey = ''
    const chars = new Set();
    while(chars.size < keyLength) {
        chars.add(String.fromCharCode(asciiRange[0] + Math.floor(Math.random() * (asciiRange[1] - asciiRange[0]))))
    }
    chars.forEach((char) => newKey += char)

    return newKey
}

function value_randomizer(type, message) {
    let randomKey = '';
    let keyLength = 0;
    let asciiRange = [0, 0]
    switch(type) {
        case 'caesar':
            randomKey = Math.floor(Math.random() * 25);
            break;
        case 'vigenere':
            keyLength = message.length;
            asciiRange = [65, 90]
            randomKey = randomize_key_helper(keyLength, asciiRange)
            break;
        case 'monoalphabetic':
            keyLength = 26;
            asciiRange = [33, 126]
            randomKey = randomize_key_helper(keyLength, asciiRange)
            break;
        default:
            break;
    }

    return randomKey
}

function run_cipher(mode, cipher, message, key) {
    let modifiedMessage = '';

    switch(cipher) {
        case 'caesar':
            (mode === 'e') ? 
            modifiedMessage = caesar(message, key) : modifiedMessage = caesar_decrypt(message, key);
            break;
        case 'vigenere':
            (mode === 'e') ?
            modifiedMessage = vigenere_encrypt(message.toUpperCase(), key.toUpperCase()) : modifiedMessage = vigenere_decrypt(message.toUpperCase(), key.toUpperCase());
            break;
        case 'monoalphabetic':
            (mode === 'e') ?
            modifiedMessage = monoalphabetic(message.toUpperCase(), key.toUpperCase(), 'e') : modifiedMessage = monoalphabetic(message.toUpperCase(), key.toUpperCase(), 'd');
            break;
        default:
            break;
    }

    return modifiedMessage;
}

function caesar(message, key) {
    console.log(message)
    let newMsg = '';
    let newAscii;
    for(let i = 0; i < message.length; i++) {
        if (message[i].match(/^[A-Z]+$/)) {
            newAscii = ((message[i].charCodeAt() - 65 + parseInt(key)) % 26) + 65;
        }
        else if (message[i].match(/^[a-z]+$/)) {
            newAscii = ((message[i].charCodeAt() - 97 + parseInt(key)) % 26) + 97;
        }
        else if (message[i].match(/^[0-9]+$/)) {
            newAscii = ((message[i].charCodeAt() - 48 + parseInt(key)) % 10) + 48;
        }
        else {
            newAscii = message[i].charCodeAt();
        }
        newMsg += String.fromCharCode(newAscii)
    }
    return newMsg;
}

function caesar_decrypt(message, key) {
    return caesar(message, 26 - parseInt(key))
}

function vigenere_encrypt(message, key) {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        encryptedMessage += caesar(message[i], key[i % key.length].charCodeAt() - 65, 0)
    }
    return encryptedMessage;
}

function vigenere_decrypt(message, key) {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        encryptedMessage += caesar(message[i], 26 - (key[i % key.length].charCodeAt() - 65), 0)
    }
    return encryptedMessage;
}

function monoalphabetic(message, key, mode) {
    let newMessage = '';

    if (key.length !== 26) {
        return "Key must be 26 characters long";
    }
    else if (new Set(key).size !== key.length) {
        return "Key must have all unique characters";
    }

    for (let i = 0; i < message.length; i++) {
        //create  messages
        if (message[i] !== ' ') {
            (mode === 'e') ? newMessage += key[(message[i].charCodeAt() - 65) % 26] : newMessage += alphabet[key.indexOf(message[i])]
        }
        else {
            newMessage += message[i]
        }
    }
    return newMessage;
}

module.exports = {
    value_randomizer,
    run_cipher,
}