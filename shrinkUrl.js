const { customAlphabet } = require('nanoid');
const characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const shrinkUrl = customAlphabet(characters, 9);

module.exports = shrinkUrl
