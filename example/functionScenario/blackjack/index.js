import dealer from './dealer.js';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const $ = Symbol .for;
const cli = createInterface ( { input, output } );

cli .on ( 'line', line => console .log ( dealer ( $ ( 'execute' ), line ) ) );

cli .on ( 'error', error => console .error ( error ) );

console .log ( dealer ( $ ( 'start' ) ) );

cli .prompt ();
