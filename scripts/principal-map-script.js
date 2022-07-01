import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {
    toggleLayersVisibility,
    triggerAnimationWithLayers,
    getSentenceWithVariables,
    monologue,
    selectRandomItemInArray
} from './utils.js'
import { principalMapLayers } from './constants/maps-layers.js'
import { principalMapDialogs, dialogUtils } from './constants/maps-dialogs.js'
import { oldManName, ladyOfTheLakeName, myselfName, omnipotentCharacter} from './constants/character-names.js';
import { principalMapAnimationLayers } from './constants/maps-animation-layers.js'
import { principalMapChatCommands } from './constants/chat-commands.js'

// TODO : Mettre tous les dialogues dans les variables

WA.state['receiveChatMessage'] = false
const sendMessageToAllPlayers = (message, author) => {
    WA.state['chatMessageContent'] = message
    WA.state['chatMessageAuthor'] = author
    WA.state['receiveChatMessage'] = true

    setTimeout(() => {
        WA.state['receiveChatMessage'] = false
    }, 100)
}

// Ecouter le nouveau message
WA.state.onVariableChange('receiveChatMessage').subscribe((value) => {
    if (value) {
        WA.chat.sendChatMessage(WA.state['chatMessageContent'], WA.state['chatMessageAuthor'])
    }
})

let randomPlayersList = []
let waitingForPloufPlouf = false
// Fonction de plouf plouf
const ploufPlouf = (dialog) => {
    randomPlayersList = [] // Reset players list
    waitingForPloufPlouf = true
    sendMessageToAllPlayers(principalMapDialogs.ploufPlouf[dialog].sentence, omnipotentCharacter);
    WA.state['selectRandomPlayer'] = true
    setTimeout(() => {
        randomPlayersList.push(WA.player.name)
        WA.state['selectRandomPlayer'] = false
        sendMessageToAllPlayers(getSentenceWithVariables(
            principalMapDialogs.ploufPlouf[dialog].selected,
            {
            name: selectRandomItemInArray(randomPlayersList)
        }), omnipotentCharacter)
        WA.state['addNameToRandomPlayerList'] = ''
        waitingForPloufPlouf = false
        randomPlayersList = []
    }, 3000)
}


// Ecouter le plouf plouf
WA.state.onVariableChange('selectRandomPlayer').subscribe((value) => {
    if (value && !waitingForPloufPlouf) {
        WA.state['addNameToRandomPlayerList'] = WA.player.name
    }
})

// Ajouter des joueurs à la variable locale randomPlayersList
WA.state.onVariableChange('addNameToRandomPlayerList').subscribe((value) => {
    if (waitingForPloufPlouf && value !== '') {
        randomPlayersList.push(value)
    }
})

let triggerBoatPloufPloufMessage
let triggerPotatoPloufPloufMessage
let triggerMoneyPloufPloufMessage
WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufBoat').subscribe(() => {
    triggerBoatPloufPloufMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.ploufPlouf.boat.action
        }),
        callback: () => {
            ploufPlouf('boat')
        }
    })
})

WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufPotato').subscribe(() => {
    triggerPotatoPloufPloufMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.ploufPlouf.potato.action
        }),
        callback: () => {
            ploufPlouf('potato')
        }
    })
})

WA.room.onEnterLayer('zonesPloufPlouf/ploufPloufMoney').subscribe(() => {
    triggerMoneyPloufPloufMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.ploufPlouf.money.action
        }),
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
        message: WA.state['showOldMan'] ? getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.oldMan.actions.ghost
        }) : getSentenceWithVariables(dialogUtils.executeAction, {
            action: principalMapDialogs.oldMan.actions.stone
        }),
        callback: () => {
            if (WA.state['showOldMan'] ) {
                oldManCounter++
                if (oldManCounter === 1) {
                    monologue(principalMapDialogs.oldMan.firstTalk, oldManName)
                    WA.room.setTiles([{x: 27, y: 22, tile: null, layer: 'BlockingSharks'}])
                } else {
                    WA.chat.sendChatMessage(
                        getSentenceWithVariables(
                            principalMapDialogs.oldMan.secondTalk,
                            {name: WA.player.name}
                        ),
                        oldManName
                    )
                }
            }
            else {
                WA.chat.sendChatMessage(selectRandomItemInArray(principalMapDialogs.oldMan.admirations), myselfName)
            }
        }
    });
})

WA.room.onLeaveLayer('OldManZone').subscribe(() => {
    triggerOldManMessage.remove()
})

// Listening chat message
WA.chat.onChatMessage((message) => {
    if (message.trim().toLowerCase() === principalMapChatCommands.avalonUnlockingCommand && !WA.state['showOldMan']) {
        WA.state['showOldMan'] = true
    }
})

WA.state.onVariableChange('showOldMan').subscribe((value) => {
    if (value) {
        toggleLayersVisibility("OldManStone", false)
        WA.chat.sendChatMessage(principalMapDialogs.oldMan.appearing, ladyOfTheLakeName);

        triggerAnimationWithLayers(principalMapAnimationLayers.pouf)
    }
})


// Canons
let triggerCanonAction
WA.room.onEnterLayer('Canon1Zone').subscribe(() => {
    triggerCanonAction = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: dialogUtils.shoot
        }),
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
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: dialogUtils.shoot
        }),
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
        monologue(principalMapDialogs.ladyOfTheLake.firstTalk, ladyOfTheLakeName)
    } else {
        WA.chat.sendChatMessage(
            getSentenceWithVariables(
                selectRandomItemInArray(principalMapDialogs.ladyOfTheLake.randomSentence), {name: WA.player.name}
            ), ladyOfTheLakeName
        )
    }
    toggleLayersVisibility(principalMapLayers.ladyOfTheLake)
    LadyCounter ++
})

WA.room.onLeaveLayer("ladyOfTheLakeZone").subscribe(() => {
    toggleLayersVisibility(principalMapLayers.ladyOfTheLake, false)
})
