import Scenarist from '@faddys/scenarist';

export default Scenarist ( {

$_start ( $dealer ) {

const dealer = this;

dealer .players = [];

return "Welcome to Faddy's Blackjack Casino!";

},

$_execute ( $dealer, line ) {

if ( typeof line !== 'string' && ! line .length )
throw "Invalid line to execute";

$dealer ( ... line .trim () .split ( /\s+/ ) )

}

} );
