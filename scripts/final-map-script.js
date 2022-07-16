import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {getSentenceWithVariables} from "./utils.js";
import {finalMapDalogs, dialogUtils} from "./constants/maps-dialogs.js";

let actionMessage
let currentPopup
WA.room.onEnterLayer('getSwordZone').subscribe(() => {
    actionMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: "Retirer l'épée"
        }),
        callback: () => {
            currentPopup = WA.ui.openPopup('finalPopup', getSentenceWithVariables(finalMapDalogs.finalPopup, {
                name: WA.player.name
            }), [{
                label: "OK",
                callback: (popup) => {
                    popup.close();
                }
            },
            {
                label: "Rentrer à la maison",
                callback: (popup) => {
                    WA.nav.goToRoom('./map.json')
                    popup.close();
                }
            }]);
        }
    })
})

WA.room.onLeaveLayer('rulesZone').subscribe(() => {
    actionMessage.remove()
    currentPopup.close()
})
