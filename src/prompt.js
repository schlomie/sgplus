
const prompt = require('prompt-sync')();

class Prompt {

    static _getUri(verify) {
        let uri1 = prompt.hide('URI: ');

        if (!verify) {
            return uri1;
        }

        let uri2 = prompt.hide('Repeat URI: ');

        if (uri1 != uri2) {
            throw 'URIs do not match';
        }

        return uri1;
    }

    static _getMasterPass(verify) {
        let mp1 = prompt.hide('Master Password: ');

        if (!verify) {
            return mp1;
        }

        let mp2 = prompt.hide('Repeat Master Password: ');

        if (mp1 != mp2) {
            throw 'Master Passwords do not match';
        }

        return mp1;
    }

    static _getSecret(verify) {
        let s1 = prompt.hide('Secret: ');

        if (!verify) {
            return s1;
        }

        let s2 = prompt.hide('Repeat Secret: ');

        if (s1 != s2) {
            throw 'Secrets do not match';
        }

        return s1;
    }


    static ask(verify, useSecret, callback) {

        try {

            let uri = Prompt._getUri(verify);
            let mp = Prompt._getMasterPass(verify);
            let sec = null;

            if (useSecret) {
                sec = Prompt._getSecret(verify);
            }

            callback(null, uri, mp, null == sec ? undefined : sec);

        } catch (err) {
            callback(err);
        }
    }
}

module.exports = Prompt;
