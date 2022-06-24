import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";

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

const bleedZone = ['bleed']

const ladyOfTheLake = [
    'Lady-of-the-lake',
    'Lady-of-the-lake-up'
]

const meetings = [
    'caverne',
    'terrier-du-lapin',
    'champ',
    'place',
    'quais',
    'black-pearl'
]

const showLayers = (layers) => {
    if (typeof layers === 'string') {
        WA.room.showLayer(layers)
    } else {
        for (let i=0; i<layers.length; i++) {
            WA.room.showLayer(layers[i])
        }
    }
}

const hideLayers = (layers) => {
    if (typeof layers === 'string') {
        WA.room.hideLayer(layers)
    } else {
        for (let i=0; i<layers.length; i++) {
            WA.room.hideLayer(layers[i])
        }
    }
}

// Old man
let oldManCounter = 0
let triggerOldManMessage;
WA.room.onEnterLayer('OldManZone').subscribe(() => {
    triggerOldManMessage = WA.ui.displayActionMessage({
        message: "[ESPACE] Parler au vieux sage",
        callback: () => {
            if (WA.state['showOldMan'] ) {
                oldManCounter++
                if (oldManCounter === 1) {
                    WA.chat.sendChatMessage('Luuuuuuke, tu dois restaurer l\'équilibre dans la force !', 'Vieux Sage')
                    WA.chat.sendChatMessage('Euh non, je me trompe...', 'Vieux Sage')
                    WA.chat.sendChatMessage('*tousse* *tousse*', 'Vieux Sage')
                    WA.chat.sendChatMessage('Holà Aventurier ! Alors comme ça tu veux te rendre au royaume d\'Avalon ?', 'Vieux Sage')

                    // TODO : Delete this line
                    WA.chat.sendChatMessage('Je ne sais pas du tout comment tu peux y aller, mais je crois en toi !', 'Vieux Sage')

                    // TODO : Uncomment these lines
                    //WA.chat.sendChatMessage('Une vieille légende raconte que le roi Arthur y aurait été envoyé après avoir sauté au milieu d\' un banc de requins !', 'Vieux Sage')
                    //WA.chat.sendChatMessage('Comment ?! Tu as peur des requins ?!? Du nerf, Aventurier ! Tiens, bois cette potion, elle te donnera du courage. Et maintenant OUSTE ! Js suis occupé.', 'Vieux Sage')
                    WA.chat.sendChatMessage('Bonne chance, Aventurier !', 'Vieux Sage')
                } else {
                    WA.chat.sendChatMessage(`Ah, ${WA.player.name} ! Y-a-t\'il eu de l\'avancement dans ta quête ?`, 'Vieux Sage')
                }
            }
            else {
                WA.chat.sendChatMessage('Quelle jolie statue !', 'Ma voix intérieure')
            }
        }
    });
})

WA.room.onLeaveLayer('OldManZone').subscribe(() => {
    triggerOldManMessage.remove()
})

// Listening chat message
WA.chat.onChatMessage((message) => {
    if (message.trim().toLowerCase() === "avalon" && !WA.state['showOldMan']) {
        // TODO : Variable to show old man for all players
        WA.state['showOldMan'] = true
        WA.chat.sendChatMessage('Je viens d\'appeler le gardien d\'Avalon', 'Ma voix intérieure');
    }
})

WA.state.onVariableChange('showOldMan').subscribe((value) => {
    if (value) {
        hideLayers("OldManStone")
        WA.chat.sendChatMessage('Le vieux sage a été appelé, quelqu\'un semble vouloir se rendre à Avalon !', 'Dame du Lac');

        showLayers('Pouf1')
        setTimeout(() => {
            hideLayers('Pouf1')
            showLayers('Pouf2')
            setTimeout(() => {
                hideLayers('Pouf2')
                showLayers('Pouf3')
                setTimeout(() => {
                    hideLayers('Pouf3')
                }, 300)
            }, 300)
        }, 300)
    }
})


// Canons
let triggerCanonAction
WA.room.onEnterLayer('Canon1Zone').subscribe(() => {
    triggerCanonAction = WA.ui.displayActionMessage({
        message: "[ESPACE] Tirer",
        callback: () => {
            WA.state['shootingCanon1'] = true

            setTimeout(() => {
                WA.state['shootingCanon1'] = false
            }, 300)
        }})
})

WA.room.onLeaveLayer('Canon1Zone').subscribe(() => {
    triggerCanonAction.remove()
})

WA.room.onEnterLayer('Canon2Zone').subscribe(() => {
    triggerCanonAction = WA.ui.displayActionMessage({
        message: "[ESPACE] Tirer",
        callback: () => {
            WA.state['shootingCanon2'] = true

            setTimeout(() => {
                WA.state['shootingCanon2'] = false
            }, 300)
        }})
})

WA.room.onLeaveLayer('Canon2Zone').subscribe(() => {
    triggerCanonAction.remove()
})

WA.state.onVariableChange('shootingCanon2').subscribe((value) => {
    if (value) {
        showLayers('Canon2Explosion')
    } else {
        hideLayers('Canon2Explosion')
    }
})

WA.state.onVariableChange('shootingCanon1').subscribe((value) => {
    if (value) {
        showLayers('Canon1Explosion')
    } else {
        hideLayers('Canon1Explosion')
    }
})

// TODO : BUG when user leave from a room :/
/*// Save number of people in meetings
for(let i = 0; i<meetings.length; i++) {
    WA.room.onEnterLayer(meetings[i]).subscribe(() => {
        let nbPeople = WA.state[meetings[i] + '-nb-people']
        nbPeople = !nbPeople ? 1 : nbPeople + 1
        WA.state[meetings[i] + '-nb-people'] = nbPeople
        console.log('VARIABLE', meetings[i] + '-nb-people', WA.state[meetings[i] + '-nb-people'])
        WA.chat.sendChatMessage(WA.state[meetings[i] + '-nb-people'], "ENTERED")
    });

    WA.room.onLeaveLayer(meetings[i]).subscribe(() => {
        let nbPeople = WA.state[meetings[i] + '-nb-people']
        nbPeople = !nbPeople ? 0 : nbPeople - 1
        WA.state[meetings[i] + '-nb-people'] = nbPeople
        WA.chat.sendChatMessage(WA.state[meetings[i] + '-nb-people'], "LEFT")
    });
}

// Show number of people
WA.room.onEnterLayer('DisplayPannelZone').subscribe(() => {
    const triggerMessage = WA.ui.displayActionMessage({
        message: "Appuyez sur 'Espace' pour voir le tableau d'affichage'",
        callback: () => {
            for(let i = 0; i<meetings.length; i++) {
                WA.chat.sendChatMessage('Nombre de personnes dans ' + meetings[i] + ' : ' + WA.state[meetings[i] + '-nb-people'], "Panneau d'affichage")
            }
        }
    });
})*/

let LadyCounter = 0;


// Rabbit Hole zone
WA.room.onEnterLayer("rabbitHoleZone").subscribe(() => {
    hideLayers(rabbitHoleCeilings)
});

WA.room.onLeaveLayer("rabbitHoleZone").subscribe(() => {
    showLayers(rabbitHoleCeilings)
});

// Cavern zone
WA.room.onEnterLayer("cavernZone").subscribe(() => {
    hideLayers(cavernCeiling)
});

WA.room.onLeaveLayer("cavernZone").subscribe(() => {
    showLayers(cavernCeiling)
});

// Lady of the lake
WA.room.onEnterLayer("ladyOfTheLakeZone").subscribe(() => {
    if (LadyCounter === 0) {
        WA.chat.sendChatMessage("Halte-là !", "Dame du lac")
        WA.chat.sendChatMessage("Vous n'êtes pas dignes d'un tel honneur !", "Dame du lac")
        WA.chat.sendChatMessage("Seul les preux chevaliers ayant bravé les dangers d'Avalon peuvent prétendre devenir rois en retirant l'épée !", "Dame du lac")
    }

    if (LadyCounter === 1) {
        WA.chat.sendChatMessage("VOUS ne passerez PAS !", "Dame du lac")
    }

    if (LadyCounter === 2) {
        WA.chat.sendChatMessage("Je t'ai dit d'aller à AVALON !", "Dame du lac")
    }

    if (LadyCounter > 2) {
        WA.chat.sendChatMessage("Tu ne vas jamais me laisser tranquille en fait ? ...", "Dame du lac")
    }

    showLayers(ladyOfTheLake)
    LadyCounter ++
})

WA.room.onLeaveLayer("ladyOfTheLakeZone").subscribe(() => {
    hideLayers(ladyOfTheLake)
})


// WA.room.onEnterLayer("bleed").subscribe(() => {
//     hideLayers(cavernCeiling)
// });




