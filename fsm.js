
const fsm = new machina.Fsm({

    namespace: "test",

    initialState: "off",

    states: {
        off: {
            _onEnter: function () {
                console.log('entering off');
            },
            toggle: function () {
                console.log('toggled when off')
                this.transition( "on" );
            },
            _onExit: function () {
                console.log('exiting off');
                
            },
        },
        on: {
            _onEnter: function () {
                console.log('entering on')
            },

            toggle: function () {
                console.log('toggled when on')
                this.transition( "off" );
            },
            // _onExit is a special handler that is invoked just before
            // the FSM leaves the current state and transitions to another
            _onExit: function () {
                console.log('exiting on');
            }
        },
    }
});

setTimeout(() => {
    fsm.handle('toggle');
    setTimeout(() => {
        fsm.handle('toggle');
        setTimeout(() => {
            fsm.handle('toggle');
        }, 3000);
    }, 3000);
}, 3000);