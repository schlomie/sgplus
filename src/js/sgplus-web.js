import _ from 'underscore';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue/dist/vue.common.js';
import uuid from 'uuid/v4'

const sgp = require('supergenpass-lib');
window.$ = window.jQuery = require('jquery');

let methods = ['md5', 'sha512'];
let booleans = [true, false];


$(() => {

    let app = new Vue({
        el: '#sgplus-app',
        data: {
            booleans: booleans,

            url: null,
            secret: null,
            password: null,
            methods: methods,
            method: 'sha512',
            length: 24,
            rounds: 10,
            subdomains: false,

            generatedPassword: null,
            generationError: null
        },

        methods: {
            generatePassword: function() {

                if (_.isEmpty(this.password) || _.isEmpty(this.url)) {
                    return; // We cannot generate without one of these
                }

                let rounds = parseInt(this.rounds, 10);
                let length = parseInt(this.length, 10);

                let opts = {
                    secret: (this.secret || ''),
                    method: this.method,
                    length: (length || ''),
                    hashRounds: (rounds || 10),
                    removeSubdomains: true === this.subdomains
                };

                try {

                    this.generationError = null;

                    sgp.generate(this.password, this.url, opts, (pw) => {
                        this.generatedPassword = pw;
                    });

                } catch (err) {
                    this.generationError = err.message;
                }
            },

            copy: function() {
                if (_.isEmpty(this.generatedPassword)) {
                    return alert('No password has been generated yet.');
                }

                this.doCopy();
            },

            reset: function() {
                this.url = null;
                this.secret = null;
                this.password = null;
                this.method = 'sha512';
                this.length = 24;
                this.rounds = 10;
                this.subdomains = false;

                this.clearClipboard();
            },

            clearClipboard: function() {
                this.generatedPassword = uuid();
                this.doCopy();
                this.generatedPassword = null;
            },

            doCopy: function() {

                if (!_.isEmpty(this.generationError)) {
                    return alert(this.generationError);
                }

                let input = $('<input>').val(this.generatedPassword);
                $('body').append(input);
                input.select();

                if (!document.execCommand('copy')) {
                    alert('Failed to copy to clipboard!');
                }

                input.remove();
            }
        }
    });
});
