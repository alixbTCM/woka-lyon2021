import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import { toggleLayersVisibility, triggerAnimationWithLayers, getSentenceWithVariables } from './utils.js'
import { principalMapLayers } from './constants/maps-layers.js'
import { principalMapDialogs } from './constants/maps-dialogs.js'
import { oldManName, ladyOfTheLakeName, myselfName, omnipotentCharacter} from './constants/character-names.js';
import { principalMapAnimationLayers } from './constants/maps-animation-layers.js'

const getRandomPlayersListArray = () => {
    return JSON.parse(WA.state['randomPlayersList'])
}

const setRandomPlayerListArray = (array) => {
    WA.state['randomPlayersList'] = JSON.stringify(array)
}

// Fonction de plouf plouf
const ploufPlouf = (dialog) => {
    WA.chat.sendChatMessage(principalMapDialogs.ploufPlouf[dialog].sentence, omnipotentCharacter);
    WA.state['selectRandomPlayer'] = WA.room.id
    setRandomPlayerListArray([])
    setTimeout(() => {
        WA.state['selectRandomPlayer'] = null
        const randomPlayersList = getRandomPlayersListArray()
        const random = Math.floor(Math.random() * randomPlayersList.length)
        WA.chat.sendChatMessage(getSentenceWithVariables(
            principalMapDialogs.ploufPlouf[dialog].selected,
            {
            name: randomPlayersList[random]
        }), omnipotentCharacter)
        setRandomPlayerListArray([])
    }, 1000)
}



// Ecouter le plouf plouf
WA.state.onVariableChange('selectRandomPlayer').subscribe((value) => {
    if (value === WA.room.id) {
        const randomPlayersList = getRandomPlayersListArray()
        randomPlayersList.push(WA.player.name)
        setRandomPlayerListArray(randomPlayersList)
    }
})

let triggerBoatPloufPloufMessage
let triggerPotatoPloufPloufMessage
let triggerMoneyPloufPloufMessage
WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufBoat').subscribe(() => {
    triggerBoatPloufPloufMessage = WA.ui.displayActionMessage({
        message: "[ESPACE] " + principalMapDialogs.ploufPlouf.boat.action,
        callback: () => {
            ploufPlouf('boat')
        }
    })
})

WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufPotato').subscribe(() => {
    triggerPotatoPloufPloufMessage = WA.ui.displayActionMessage({
        message: "[ESPACE] " + principalMapDialogs.ploufPlouf.potato.action,
        callback: () => {
            ploufPlouf('potato')
        }
    })
})

WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufMoney').subscribe(() => {
    triggerMoneyPloufPloufMessage = WA.ui.displayActionMessage({
        message: "[ESPACE] " + principalMapDialogs.ploufPlouf.money.action,
        callback: () => {
            ploufPlouf('money')
        }
    })
})

WA.room.onLeaveLayer('zonesPloufPlouf/ploufPloufBoat').subscribe(() => {
    triggerBoatPloufPloufMessage.remove()
})

WA.room.onLeaveLayer('zonesPloufPlouf/ploufPloufMoney').subscribe(() => {
    triggerMoneyPloufPloufMessage.remove()
})

WA.room.onLeaveLayer('zonesPloufPlouf/ploufPloufPotato').subscribe(() => {
    triggerPotatoPloufPloufMessage.remove()
})


// Old man
let oldManCounter = 0
let triggerOldManMessage;
WA.room.onEnterLayer('OldManZone').subscribe(() => {
    triggerOldManMessage = WA.ui.displayActionMessage({
        message: WA.state['showOldMan'] ? "[ESPACE] Parler au vieux sage" : "[ESPACE] Admirer la statue",
        callback: () => {
            if (WA.state['showOldMan'] ) {
                oldManCounter++
                if (oldManCounter === 1) {
                    WA.chat.sendChatMessage('Luuuuuuke, tu dois restaurer l\'équilibre dans la force !', oldManName)
                    WA.chat.sendChatMessage('Euh non, je me trompe...', oldManName)
                    WA.chat.sendChatMessage('*tousse* *tousse*', oldManName)
                    WA.chat.sendChatMessage('Holà Aventurier ! Alors comme ça tu veux te rendre au royaume d\'Avalon ?', oldManName)
                    WA.chat.sendChatMessage('Une vieille légende raconte que le roi Arthur y aurait été envoyé après avoir sauté au milieu d\' un banc de requins !', oldManName)
                    WA.chat.sendChatMessage('Comment ?! Tu as peur des requins ?!? Du nerf, Aventurier ! Tiens, bois cette potion, elle te donnera du courage. Et maintenant OUSTE ! Js suis occupé.', oldManName)
                    WA.chat.sendChatMessage('Bonne chance, Aventurier !', oldManName)

                    WA.room.setTiles([{x: 27, y: 22, tile: null, layer: 'BlockingSharks'}])
                } else {
                    WA.chat.sendChatMessage(`Ah, ${WA.player.name} ! Y-a-t\'il eu de l\'avancement dans ta quête ?`, oldManName)
                }
            }
            else {
                const random = Math.floor(Math.random() * principalMapDialogs.oldManStoneAdmirations.length)
                WA.chat.sendChatMessage(principalMapDialogs.oldManStoneAdmirations[random], myselfName)
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
        WA.state['showOldMan'] = true
        WA.chat.sendChatMessage('Je viens d\'appeler le gardien d\'Avalon', myselfName);
    }
})

WA.state.onVariableChange('showOldMan').subscribe((value) => {
    if (value) {
        toggleLayersVisibility("OldManStone", false)
        WA.chat.sendChatMessage('Le vieux sage a été appelé, quelqu\'un semble vouloir se rendre à Avalon !', ladyOfTheLakeName);

        triggerAnimationWithLayers(principalMapAnimationLayers.pouf)
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
        toggleLayersVisibility('Canon2Explosion')
    } else {
        toggleLayersVisibility('Canon2Explosion', false)
    }
})

WA.state.onVariableChange('shootingCanon1').subscribe((value) => {
    if (value) {
        toggleLayersVisibility('Canon1Explosion')
    } else {
        toggleLayersVisibility('Canon1Explosion', false)
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
    toggleLayersVisibility(principalMapLayers.rabbitHoleCeilings, false)
});

WA.room.onLeaveLayer("rabbitHoleZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.rabbitHoleCeilings)
});

// Cavern zone
WA.room.onEnterLayer("cavernZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.cavernCeiling, false)
});

WA.room.onLeaveLayer("cavernZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.cavernCeiling)
});

// Lady of the lake
WA.room.onEnterLayer("ladyOfTheLakeZone").subscribe(() => {
    if (LadyCounter === 0) {
        WA.chat.sendChatMessage("Halte-là !", ladyOfTheLakeName)
        WA.chat.sendChatMessage("Vous n'êtes pas dignes d'un tel honneur !", ladyOfTheLakeName)
        WA.chat.sendChatMessage("Seul les preux chevaliers ayant bravé les dangers d'Avalon peuvent prétendre devenir rois en retirant l'épée !", ladyOfTheLakeName)
    }

    if (LadyCounter === 1) {
        WA.chat.sendChatMessage("VOUS ne passerez PAS !", ladyOfTheLakeName)
    }

    if (LadyCounter === 2) {
        WA.chat.sendChatMessage("Je t'ai dit d'aller à AVALON !", ladyOfTheLakeName)
    }

    if (LadyCounter > 2) {
        WA.chat.sendChatMessage("Tu ne vas jamais me laisser tranquille en fait ? ...", ladyOfTheLakeName)
    }

    toggleLayersVisibility(principalMapLayers.ladyOfTheLake)
    LadyCounter ++
})

WA.room.onLeaveLayer("ladyOfTheLakeZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.ladyOfTheLake, false)
})
