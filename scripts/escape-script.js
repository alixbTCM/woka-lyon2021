import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {getSentenceWithVariables} from "./utils.js";
import {dialogUtils} from "./constants/maps-dialogs.js";
import { myselfName } from "./constants/character-names.js"

WA.chat.sendChatMessage('TEST', "TEST")

const searchZones = {
    "SearchingZones1": {
        "bed1": {
            found: "J'ai trouvé {found} sous le matelas",
            nothing: "Il n'y a rien ici... à part des puces de lit.",
            hasBeenSearched: false
        },
        "bed2": {
            found: "J'ai trouvé {found} sous le matelas",
            nothing: "Il n'y a rien ici... à part des puces de lit.",
            hasBeenSearched: false
        },
        "cadre": {
            found: "J'ai trouvé {found} derrière le cadre",
            nothing: "Quelle belle peinture ! L'artiste était très habile... Ceci dit, ça ne m'avance pas à grand chose",
            hasBeenSearched: false
        },
        "hallwayFurniture": {
            found: "J'ai trouvé {found} à l'intérieur de ce meuble",
            nothing: "Ce meuble est vide...",
            hasBeenSearched: false
        },
        "desk1": {
            found: "Il y avait {found} à l'intérieur du bureau",
            nothing: "Que des lettres d'amour à une certaine Élise...",
            hasBeenSearched: false
        },
        "desk2": {
            found: "Il y avait {found} à l'intérieur du bureau",
            nothing: "Rien du tout...",
            hasBeenSearched: false
        }
    },
}

const objectsToFind = [
    {
        "kitchenKey": {name: "la clé de la cuisine", found: false},
        "firstCodeNumber": {name: "le chiffre 0 (zéro) gravé", found: false}
    }
]

const searchZonesKeys = Object.keys(searchZones)
for (let i = 0; i<searchZonesKeys.length; i++) {
    const zoneKeys = Object.keys(searchZones[searchZonesKeys[i]])
    const objectKeys = Object.keys(objectsToFind[i])
    const numberOfObjectsToFind = objectKeys.length
    const zonesIndexes = [...zoneKeys]
    const randoms = []

    for (let j = 0; j<numberOfObjectsToFind; j++) {
        const r = Math.floor(Math.random() * zonesIndexes.length)
        randoms.push(zonesIndexes[r])
        zonesIndexes.splice(r, 1)
        console.log(zonesIndexes)
    }
    
    for (let j = 0; j<zoneKeys.length; j++) {
        let layerTrigger
         WA.room.onEnterLayer(`${searchZonesKeys[i]}/${zoneKeys[j]}`).subscribe(() => {
             if (!searchZones[searchZonesKeys[i]][zoneKeys[j]].hasBeenSearched) {
                 layerTrigger = WA.ui.displayActionMessage({
                     message: getSentenceWithVariables(dialogUtils.executeAction, {
                         action: "Examiner"
                     }),
                     callback: () => {
                         if (randoms.indexOf(zoneKeys[j]) !== -1) {
                             console.log('KEYS', objectKeys[randoms.indexOf(zoneKeys[j])])
                             console.log('OBJECT',  objectsToFind[i][objectKeys[randoms.indexOf(zoneKeys[j])]])
                             WA.chat.sendChatMessage(getSentenceWithVariables(searchZones[searchZonesKeys[i]][zoneKeys[j]].found, {
                                 found: objectsToFind[i][objectKeys[randoms.indexOf(zoneKeys[j])]].name
                             }), myselfName)
                             objectsToFind[i][objectKeys[randoms.indexOf(zoneKeys[j])]].found = true
                         } else {
                             WA.chat.sendChatMessage(searchZones[searchZonesKeys[i]][zoneKeys[j]].nothing, myselfName)
                         }
                         searchZones[searchZonesKeys[i]][zoneKeys[j]].hasBeenSearched = true
                     }
                 })
             }
        })

        WA.room.onLeaveLayer(`${searchZonesKeys[i]}/${zoneKeys[j]}`).subscribe(() => {
            layerTrigger.remove()
        })
    }
}

const openZones = {
    "kitchenKey": {
        isUnlocked: false,
        layer: "OpenZones/openKitchen",
        tiles: [
            {
                x: 7,
                y: 9,
                layer: 'doors',
                tile: null
            },
            {
                x: 7,
                y: 8,
                layer: 'doorsUp',
                tile: null
            },
        ]
    },
    "bedroomKey": {
        isUnlocked: false,
        layer: "OpenZones/openBedroom",
        tiles: []
    }
}
const openZonesKeys = Object.keys(openZones)

for (let i = 0; i<openZonesKeys.length; i++) {
    let layerTrigger
    WA.room.onEnterLayer(openZones[openZonesKeys[i]].layer).subscribe(() => {
        if (!openZones[openZonesKeys[i]].isUnlocked) {
            layerTrigger = WA.ui.displayActionMessage({
                message: getSentenceWithVariables(dialogUtils.executeAction, {
                    action: "Déverrouiller"
                }),
                callback: () => {
                    for (let j = 0; j < objectsToFind.length; j++) {
                        if (objectsToFind[j][openZonesKeys[i]]) {
                            if (objectsToFind[j][openZonesKeys[i]].found) {
                                openZones[openZonesKeys[i]].isUnlocked = true
                                WA.chat.sendChatMessage("La porte est ouverte", myselfName)
                                WA.room.setTiles(openZones[openZonesKeys[i]].tiles)
                            } else {
                                WA.chat.sendChatMessage("Il me faudrait une clé pour ouvrir cette porte", myselfName)
                            }
                        }
                    }
                }
            })
        }
    })

    WA.room.onLeaveLayer(openZones[openZonesKeys[i]].layer).subscribe(() => {
        layerTrigger.remove()
    })
}
