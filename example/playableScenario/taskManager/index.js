import Scenarist from '@faddys/scenarist';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const cli = createInterface ( { input, output } );
const tasks = [];
const play = Scenarist ( ( play, ... directions ) => {

let task, id;

switch ( directions .shift () ) {

case 'add':
case '+':
case 'new':

console .log (  "Task #%d added", tasks .push ( {

description: directions .join ( ' ' ),
complete: false

} ) );

break;

case 'mark':
case 'x':
case 'complete':

id = parseInt ( directions .shift () );
task = tasks [ id - 1 ];

if ( ! task )
console .log ( "Task #%d not found", id );

task .complete = true;

console .log ( "Task #%d is now complete", id );

break;

case 'list':
case '*':
case 'all':

tasks .forEach ( ( task, index ) => console .log ( `Task #${ index + 1 } (${ task .complete ? 'complete' : 'incomplete' }):
${ task .description || "Task doesn't have a description. Add a description by using the description direction." }` ) );

break;

case 'description':
case '=':
case 'edit':

id = parseInt ( directions .shift () );
task = tasks [ id - 1 ];

if ( ! task )
console .log ( "Task #%d not found", id );

task .description = directions .join ( ' ' );

console .log ( "Task #%d got edited" );

break;

case 'delete':
case '-':
case 'remove':

id = parseInt ( directions .shift () );
task = tasks [ id - 1 ];

if ( ! task )
console .log ( "Task #%d not found", id );

delete tasks [ id - 1 ];

console .log ( "Task #%d deleted" );

break;

default:

console .log ( "Direction not found" );

}

cli .prompt ();

} );

cli .on ( 'line', line => play ( ... line .trim () .split ( /\s+/ ) ) );


console .log ( "Welcome to Faddy's Task Manager" );

cli .prompt ();
