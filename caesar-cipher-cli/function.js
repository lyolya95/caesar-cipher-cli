var through2 = require("through2");
const terminalArgs = require('./terminal-command');

const decoder = through2(function(chunk, enc, callback) {
  let shift = +terminalArgs.terminalArgs.shift % 26;
  const alphabetUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphabetLowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const text = chunk.toString();

  if (terminalArgs.terminalArgs.action === 'decode') {
    for (let i in text) {
      if (alphabetUpperCase.indexOf(text[i]) + 1) {
        const idx = alphabetUpperCase.indexOf(text[i]) - shift;

        if (idx >= alphabetUpperCase.length) this.push(alphabetUpperCase.substr(idx - alphabetUpperCase.length, 1));

        this.push(alphabetUpperCase.substr(idx, 1));
      } else if (alphabetLowerCase.indexOf(text[i]) + 1) {
        const idx = alphabetLowerCase.indexOf(text[i]) - shift;

        if (idx >= alphabetLowerCase.length) this.push(alphabetLowerCase.substr(idx - alphabetLowerCase.length, 1));

        this.push(alphabetLowerCase.substr(idx, 1));
      } else {
        this.push(text[i]);
      }
    }
  } else {
    for (let i in text) {
      if (alphabetUpperCase.indexOf(text[i]) + 1) {
        const idx = alphabetUpperCase.indexOf(text[i]) + shift;
        if (idx >= alphabetUpperCase.length) this.push(alphabetUpperCase.substr(idx - alphabetUpperCase.length, 1));

        this.push(alphabetUpperCase.substr(idx, 1));
      } else if (alphabetLowerCase.indexOf(text[i]) + 1) {
        const idx = alphabetLowerCase.indexOf(text[i]) + shift;

        if (idx >= alphabetLowerCase.length) this.push(alphabetLowerCase.substr(idx - alphabetLowerCase.length, 1));

        this.push(alphabetLowerCase.substr(idx, 1));
      } else {
        this.push(text[i]);
      }
    }
  }
  callback()
});

module.exports = {
  decoder
};