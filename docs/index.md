# Scenarist

The `Scenarist()` function is used for writing playable scenarios.

## Syntax

```js
    const play = Scenarist(Scenario, param0, param1, /* … ,*/ paramN)
```

## Parameters

[`Scenario`](./scenario.md)

- This is the scenario that will be played. A scenario is an object or a function.

`paramN`

- The parameter(s) to pass to the scenario.

## Return Value

- The play function used to play the passed scenario.

## Description

The `Scenarist()` function creates play functions.
Whenever `Scenarist()` is called, a new play function is created. this play function is bound to an object with the following properties.

- this.[$.play]
  - this property returns a boolean value to inform scenarist that this play function is already created.
- this.plot
  - a plot works as a kind of cache
- this.production
  - a [production](./production.md) works as a store for a play.

## Examples

- Creating a play:

    ```js
        const MyScenario = {
            $greeting: function (){
                console.log('hello hamada')
            }
        }

        const play = Scenarist(MyScenario)
        play('greeting') // hello hamada
    ```

- Using a symbol direction in a scenario:

    ```js
        const MyScenario = {
            $greeting: function (){
                console.log('hello hamada')
            },
            $_add: function (play, arg1, arg2){
                return arg1 + arg2
            }
        }

        const play = Scenarist(MyScenario)
        console.log(play(Symbol.for('add')), 1, 2) // 3
    ```

- Using the scenario's director:

    ```js
        const MyScenario = {
            $_director: function (play, arg1){
                console.log('the director says hi to ' + arg1 + ', and ' + arg2)
            },
            $greeting: function (){
                console.log('hello hamada')
            },
            $_add: function (play, arg1, arg2){
                return arg1 + arg2
            },
        }

        const play = Scenarist(MyScenario)
        play('hamada', 'hemdan') // the director says hi to hamada, and hemdan
    ```

- Nesting scenarios:

    ```js
        const MyScenario = {
            $_director: function (play, arg1){
                console.log('the director says hi to ' + arg1 + ', and ' + arg2)
            },
            $greeting: function (){
                console.log('hello hamada')
            },
            $_add: function (play, arg1, arg2){
                return arg1 + arg2
            },
            $string: {
                $lower: function(play, arg1){
                    return arg1.toLowerCase()
                }
            }
        }

        const play = Scenarist(MyScenario)
        console.log(play('string', 'lower', 'HaMaDA')) // hamada
    ```

- Retreiving a production object:

    ```js
        const MyScenario = {
            $_director: function (play, arg1){
                console.log('the director says hi to ' + arg1 + ', and ' + arg2)
            },
            $greeting: function (){
                console.log('hello hamada')
            },
            $_add: function (play, arg1, arg2){
                return arg1 + arg2
            },
            $string: {
                $lower: function(play, arg1){
                    return arg1.toLowerCase()
                }
            }
        }

        const play = Scenarist(MyScenario, {stamp: 'mystamp'})
        const rootProduction = play('mystamp')
        const nestedProduction =  play('string', 'mystamp')
    ```
