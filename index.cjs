const _ = {

signature: Symbol ( '@faddys/scenarist/signature' ),
story: Symbol ( '@faddys/scenarist/story' ),
setting: Symbol ( '@faddys/scenarist/setting' )

};
const Scenarist = async function Scenarist ( ... order ) {
if ( ! this ?.[ _ .story ] )
if ( [ 'object', 'function' ] .includes ( typeof order [ 0 ] ) ) {
const story = {};
story [ _ .story ] = true;
story .plot = new Map ();
let production = story .production = {};
let scenarist = production .scenarist = Scenarist .bind ( story );
production .scenario = order [ 0 ];
production .stamp = order [ 1 ] ?.stamp || Symbol ( '@faddys/scenarist/stamp' );
production .player = order [ 1 ] ?.player;
production .pilot = order [ 1 ] ?.pilot || scenarist;
production .setting = order [ 1 ] ?.[ _ .setting ];

if ( production .scenario .$_producer )
await scenarist ( Symbol .for ( 'producer' ), production );
return scenarist;
}
let { production, plot } = this;
let { scenarist, stamp, scenario, player, pilot, setting } = production;
let [ direction ] = order;
let conflict, $direction;
if ( direction === stamp )
return production;
else if (

[ 'string', 'number' ] .includes ( typeof direction )
&& direction ?.[ 0 ] !== '_'
&& typeof scenario ?.[ $direction = '$' + direction ] !== 'undefined'

) {

conflict = scenario [ $direction ];

order .shift ();

}
else if (

typeof direction === 'symbol'
&& ( $direction = Symbol .keyFor ( direction ) )
&& typeof scenario ?.[ $direction = '$_' + $direction ] !== 'undefined'

) {

conflict = scenario [ $direction ];

order .shift ();

}
else if ( typeof scenario === 'function' ) {

if ( scenario === scenario ?.prototype ?.constructor )
return await Scenarist ( new scenario ( ... order ), {

stamp,
player: scenarist,
pilot: player === undefined ? undefined : pilot,
[ _ .setting ]: setting

} );

else {

if ( typeof scenario [ Symbol .for ( '@faddys/scenarist' ) ] !== 'function' || ! scenario [ Symbol .for ( '@faddys/scenarist' ) ] ( _ .signature ) )
order .unshift ( ( setting ?.scenarist || player ) || scenarist );

return await scenario .call ( setting ?.scenario || ( await ( typeof player === 'function' ? player : scenarist ) ( stamp ) ) .scenario, ... order );

}

}
else if ( typeof scenario .$_director !== undefined ) {

conflict = scenario .$_director;
direction = Symbol .for ( 'director' );

}
else
throw Object .assign ( Error ( `Unknown direction: [ ${ direction } ]` ), {

direction,
code: Symbol .for ( 'senarist/error/unknown-direction' )

} );
switch ( typeof conflict ) {

case 'object':
case 'function':

if ( ! conflict )
return conflict;

if ( ! plot .get ( conflict ) )
plot .set ( conflict, await Scenarist ( conflict, {

stamp,
player: scenarist,
pilot,
[ _ .setting ]: setting

} ) );

scenarist = plot .get ( conflict );

return scenarist ( ... order );

}
return conflict;
};
module .exports = Scenarist
