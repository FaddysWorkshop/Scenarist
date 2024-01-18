import Scenarist from '@faddys/scenarist';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const play = await Scenarist ( async ( play, selections, order = {}, cli = createInterface ( { input, output } ) ) => {

const selection = selections .shift ();

if ( ! selection ) {

console .log ( "Here;s your order!" );

for ( const item in order )
console .log ( item + ':', order [ item ] );

return cli .close ();

}

const answer = parseInt (

await cli .question ( `${ selection .question }

${ selection .answers .map ( ( answer, index ) => `${ index + 1 }. ${ answer }` ) .join ( '\n' ) }

Your answer: ` )

);

console .log ( 'answer:', typeof answer, answer > 0 && answer <= selection .answers .length, answer === NaN );

if ( answer > 0 && answer <= selection .answers .length )
order [ selection .label ] = selection .answers [ answer - 1 ];

else if ( ! isNaN ( answer ) || answer === NaN )
selections .unshift ( selection );

return play ( selections, order, cli );

} );

await play ( [

{

label: 'drink',
question: "Would you like to have Coffee or Tea?",
answers: [ 'Coffee', 'Tea' ]

}, {

label: 'milk',
question: "Would you like to add milk?",
answers: [ 'Yes', 'No' ]

}, {

label: 'Sugar',
question: "How about sugar?",
answers: [ 'No', 'lightly sweet', 'regular', 'sweet' ]

}

] );
