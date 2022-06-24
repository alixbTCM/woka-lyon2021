const getTileCoordinate = (playerPosition)=> {
    return {
        x: Math.floor(playerPosition.x/32),
        y: Math.floor(playerPosition.y/32),
    }
}

WA.room.onEnterLayer('bleedZone').subscribe( async()=> {
    const position = getTileCoordinate(await WA.player.getPosition())
    setTimeout(()=> {
        WA.room.setTiles([
            {
                x: position.x,
                y: position.y,
                tile: "bleed1",
                layer: "bleed"
            },
        ]);
        setTimeout(()=> {
            WA.room.setTiles([
                {
                    x: position.x,
                    y: position.y,
                    tile: "bleed2",
                    layer: "bleed"
                },
            ]);
            setTimeout(()=> {
                WA.room.setTiles([
                    {
                        x: position.x,
                        y: position.y,
                        tile: "bleed3",
                        layer: "bleed"
                    },
                ]);
                setTimeout(()=> {
                    WA.room.setTiles([
                        {
                            x: position.x,
                            y: position.y,
                            tile: "bleed4",
                            layer: "bleed"
                        },
                    ]);
                }, 300)
            }, 300)
        }, 300)
    }, 300)

})


WA.room.onEnterLayer('goodZone1').subscribe( async()=> {
    const position = getTileCoordinate(await WA.player.getPosition())
    setTimeout(()=> {
        WA.room.setTiles([
            {
                x: position.x,
                y: position.y,
                tile: "good1",
                layer: "good"
            },
        ]);
        setTimeout(()=> {
            WA.room.setTiles([
                {
                    x: position.x,
                    y: position.y,
                    tile: "good2",
                    layer: "good"
                },
            ]);
        }, 300)
    }, 300)

})

WA.room.onEnterLayer('goodZone2').subscribe( async()=> {
    const position = getTileCoordinate(await WA.player.getPosition())
    setTimeout(()=> {
        WA.room.setTiles([
            {
                x: position.x,
                y: position.y,
                tile: "good1",
                layer: "good"
            },
        ]);
        setTimeout(()=> {
            WA.room.setTiles([
                {
                    x: position.x,
                    y: position.y,
                    tile: "good2",
                    layer: "good"
                },
            ]);
        }, 300)
    }, 300)

})
