import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";
import {getSentenceWithVariables} from "./utils.js";
import {dialogUtils} from "./constants/maps-dialogs.js";
import { graalMapGameRules } from './constants/maps-game-rules.js'

let actionMessage
let currentPopup
WA.room.onEnterLayer('rulesZone').subscribe(() => {
    actionMessage = WA.ui.displayActionMessage({
        message: getSentenceWithVariables(dialogUtils.executeAction, {
            action: dialogUtils.see
        }),
        callback: () => {
            currentPopup = WA.ui.openPopup('rulesDisplaying', graalMapGameRules.join(' '), [{
                label: "OK",
                callback: (popup) => {
                    // Close the popup when the "Close" button is pressed.
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