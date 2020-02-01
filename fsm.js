
const fsm = new machina.Fsm({

    namespace: "test",

    initialState: "off",

    states: {
        off: {
            _onEnter: function () {
                console.log('entering off');
            },
            toggle: function (kleur) {
                console.log('toggled when off', kleur)
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

            toggle: function (kleur) {
                console.log('toggled when on', kleur)
                this.transition( "off" );
            },
            
            _onExit: function () {
                console.log('exiting on');
            }
        },
    }
});


setTimeout(() => {
    fsm.handle('toggle', 'pienk');
    setTimeout(() => {
        fsm.handle('toggle', 'blou');
        setTimeout(() => {
            fsm.handle('toggle', 'groen');
        }, 3000);
    }, 3000);
}, 3000);