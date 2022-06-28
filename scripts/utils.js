
const wait = (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

const toggleLayersVisibility = (layers, visible = true) => {
    if (typeof layers === 'string') {
        if (visible) {
            WA.room.showLayer(layers)
        } else {
            WA.room.hideLayer(layers)
        }
    } else {
        if (visible) {
            for (let i=0; i<layers.length; i++) {
                WA.room.showLayer(layers[i])
            }
        } else {
            for (let i=0; i<layers.length; i++) {
                WA.room.hideLayer(layers[i])
            }
        }
    }
}

const triggerAnimationWithLayers = async (layers, time=300) => {
    toggleLayersVisibility(layers[0])
    for (let i = 1; i<layers.length; i++) {
        await wait(time)
        toggleLayersVisibility(layers[i-1], false)
        toggleLayersVisibility(layers[i])
    }
    toggleLayersVisibility(layers[layers.length-1], false)
}

export {
    toggleLayersVisibility,
    triggerAnimationWithLayers
}