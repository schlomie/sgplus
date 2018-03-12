import _ from 'underscore';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import Vue from 'vue/dist/vue.common.js';
import VueClipboard from 'vue-clipboard2'
import $ from 'jquery';

const sgp = require('supergenpass-lib');

let methods = ['md5', 'sha512'];
let booleans = [true, false];


$(() => {

    Vue.use(VueClipboard);

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

            clearSeconds: 10,
            clearEntries: 20
        },

        methods: {
            copyToClipboard: function() {
                let opts = {
                    secret: this.secret,
                    method: this.method,
                    length: this.length,
                    hashRounds: this.rounds,
                    remoeSubdomains: true === this.subdomains
                };

                sgp.generate(this.password, this.url, opts, (pw) => {

                    this.$copyText(pw).then(() => {
                        console.log('copied!');
                    })

                    console.log('PW: %s', pw);
                });
            }
        }
    });
});
