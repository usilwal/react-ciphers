const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomize_key_helper(keyLength, asciiRange, type) {
    let newKey = ''
    let chars;
    if(type === 'm') {
        chars = new Set();
        while(chars.size < keyLength) {
            chars.add(String.fromCharCode(asciiRange[0] + Math.floor(Math.random() * (asciiRange[1] - asciiRange[0]))))
        }
    }
    else if(type === 'v') {
        chars = [];
        while(chars.length < Math.min(keyLength, 50)) {
            chars.push(String.fromCharCode(asciiRange[0] + Math.floor(Math.random() * (asciiRange[1] - asciiRange[0]))))
        }
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
            randomKey = randomize_key_helper(keyLength, asciiRange, 'v')
            break;
        case 'monoalphabetic':
            keyLength = 26;
            asciiRange = [33, 126]
            randomKey = randomize_key_helper(keyLength, asciiRange, 'm')
            break;
        default:
            break;
    }
    return randomKey
}

function keyGuide(cipher) {
    let text = '';

    switch(cipher) {
        case 'caesar':
            text = '[INPUT: Integer from 1 to 25]'
            break;
        case 'vigenere':
            text = '[INPUT: Any number of uppercase letters]'
            break;
        case 'monoalphabetic':
            text = '[INPUT: Any 26 distinct characters]'
            break;
        default:
            break;
    }
    return text
}

function run_cipher(mode, cipher, message, key) {
    let modifiedMessage = '';

    if(message.length === 0) {
        return 'Please enter a message!'
    }
    else if(key.length === 0) {
        return 'Please enter a key!'
    }

    switch(cipher) {
        case 'caesar':
            (mode === 'e') ? 
            modifiedMessage = caesar(message, key) : modifiedMessage = caesar_decrypt(message, key);
            break;
        case 'vigenere':
            /*if (???) {
                return 'Key must be all uppercase letters'
            }*/
            (mode === 'e') ?
            modifiedMessage = vigenere_encrypt(message.toUpperCase(), key.toUpperCase()) : modifiedMessage = vigenere_decrypt(message.toUpperCase(), key.toUpperCase());
            break;
        case 'monoalphabetic':
            (mode === 'e') ?
            modifiedMessage = monoalphabetic(message.toUpperCase(), key, 'e') : modifiedMessage = monoalphabetic(message, key, 'd');
            break;
        default:
            break;
    }

    return modifiedMessage;
}

function caesar(message, key) {
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
        if (mode === 'e' && message[i] !== ' ' && message[i] !== '\n') {
            newMessage += key[(message[i].charCodeAt() - 65) % 26]
        }
        else if (mode === 'd' && message[i] !== ' ' && message[i] !== '\n') {
            newMessage += alphabet[key.indexOf(message[i])]
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
    keyGuide
}