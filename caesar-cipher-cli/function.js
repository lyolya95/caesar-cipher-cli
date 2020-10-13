const through2 = require("through2");
const { terminalArgs } = require('./terminal-command');

const decoder = through2(function (chunk, enc, callback) {
    const shift = +terminalArgs.shift % 26;
    const alphabetUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetLowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const text = chunk.toString();

    for (let symbol in text) {
        if (alphabetUpperCase.indexOf(text[symbol]) + 1) {
            const idx = (terminalArgs.action === 'decode') ? alphabetUpperCase.indexOf(text[symbol]) - shift : alphabetUpperCase.indexOf(text[symbol]) + shift;
            if (idx >= alphabetUpperCase.length) this.push(alphabetUpperCase.substr(idx - alphabetUpperCase.length, 1));
            this.push(alphabetUpperCase.substr(idx, 1));
        } else if (alphabetLowerCase.indexOf(text[symbol]) + 1) {
            const idx = (terminalArgs.action === 'decode') ? alphabetLowerCase.indexOf(text[symbol]) - shift : alphabetLowerCase.indexOf(text[symbol]) + shift;

            if (idx >= alphabetLowerCase.length) this.push(alphabetLowerCase.substr(idx - alphabetLowerCase.length, 1));
            this.push(alphabetLowerCase.substr(idx, 1));
        } else {
            this.push(text[symbol]);
        }
    }
    callback()
});

module.exports = {
    decoder
};