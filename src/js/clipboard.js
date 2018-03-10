const clipboard = require('clipboardy');
const crypto = require('crypto');

class Clipboard {

    static clearClipboard(numEntries) {

        if (0 == numEntries) {
            Clipboard.copyToClipboard('');
            return;
        }

        crypto.randomBytes(48, (err, buff) => {

            let text = null;

            if (err) {
                console.warn(err);
                text = numEntries + ' oh noes!';
            } else {
                text = buff.toString('hex');
            }

            Clipboard.copyToClipboard(text);
            Clipboard.clearClipboard(numEntries - 1);
        });
    }

    static copyToClipboard(text) {
        clipboard.writeSync(text);
    }
}

module.exports = Clipboard;
