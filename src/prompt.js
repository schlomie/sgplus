
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

    static _getRounds(verify) {
        let r1 = prompt.hide('Rounds: ');

        if (!verify) {
            return r1;
        }

        let r2 = prompt.hide('Repeat Rounds: ');

        if (r1 != r2) {
            throw 'Rounds do not match';
        }

        return r1;
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


    static ask(verify, useSecret, useRounds, callback) {

        try {

            let uri = Prompt._getUri(verify);
            let mp = Prompt._getMasterPass(verify);
            let sec = null;
            let rounds = null;

            if (useSecret) {
                sec = Prompt._getSecret(verify);
            }

            if (useRounds) {
                rounds = Prompt._getRounds(verify);
            }

            callback(null, uri, mp, sec, rounds);

        } catch (err) {
            callback(err);
        }
    }
}

module.exports = Prompt;
