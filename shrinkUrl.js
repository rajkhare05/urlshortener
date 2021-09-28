const { customAlphabet } = require('nanoid');
const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const shrinkUrl = customAlphabet(alphabet, 7);

module.exports = shrinkUrl
