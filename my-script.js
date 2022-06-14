const rabbitHoleCeilings = [
    'Ceiling-alice-1',
    'Ceiling-alice-2',
    'Ceiling-alice-3',
    'Ceiling-alice-0',
    'Ceiling-alice-01',
]

const cavernCeiling = [
    'Ceiling-cave-2',
    'Ceiling-cave-1',
    'Waterfall'
]


// Rabbit Hole zone
WA.room.onEnterLayer("rabbitHoleZone").subscribe(() => {
    for (let i=0; i<rabbitHoleCeilings.length; i++) {
        WA.room.hideLayer(rabbitHoleCeilings[i])
    }
});

WA.room.onLeaveLayer("rabbitHoleZone").subscribe(() => {
    for (let i=0; i<rabbitHoleCeilings.length; i++) {
        WA.room.showLayer(rabbitHoleCeilings[i])
    }
});

// Cavern zone
WA.room.onEnterLayer("cavernZone").subscribe(() => {
    for (let i=0; i<cavernCeiling.length; i++) {
        WA.room.hideLayer(cavernCeiling[i])
    }
});

WA.room.onLeaveLayer("cavernZone").subscribe(() => {
    for (let i=0; i<cavernCeiling.length; i++) {
        WA.room.showLayer(cavernCeiling[i])
    }
});
