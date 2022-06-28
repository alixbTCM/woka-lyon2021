import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";

WA.room.onEnterLayer('startRacing').subscribe( async()=> {
    const startTime = new Date
    WA.player.state.startTime = startTime.getTime()
})

WA.room.onEnterLayer('stopRacing').subscribe( async()=> {
    const stopTime = new Date
    WA.player.state.stopTime = stopTime.getTime()

    const msg =  new Date(WA.player.state.stopTime - WA.player.state.startTime)

    if(msg > 90000){
        WA.chat.sendChatMessage('Bouuuuuh t\'es nul, Try Again !', "Maitre du temps")
        WA.nav.goToRoom('./racing-test.json');
    } else{
        WA.chat.sendChatMessage('Oooh? BRAVO ! T\'es finalement pas si nul', "Maitre du temps")
    }
    const formatMsgSec = msg.getUTCHours()+
        "h "+msg.getMinutes()+
        "min "+msg.getSeconds() +
        ","+msg.getMilliseconds()+ "s";
    WA.chat.sendChatMessage(`${formatMsgSec}`, "Maitre du temps")
})

WA.room.onEnterLayer('stop').subscribe(() => {
    WA.controls.disablePlayerControls()

    setTimeout(()=> {
        WA.controls.restorePlayerControls()

    }, 500)

});

WA.room.onEnterLayer('tuto').subscribe(() => {
    WA.chat.sendChatMessage('Bienvenu dans l\'épreuve de rapidité ! Vous devez finir la course le plus ' +
        'rapidement possible, si vous n\'y arrivez pas, vous devrez recommencer pour continuer votre quête. ' +
        'Aller on se bouge les fesses !', 'Maître du temps')
});




