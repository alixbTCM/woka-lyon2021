const principalMapDialogs = {
    oldManStoneAdmirations:  [ // Phrases admiratives pour la statue du vieux sage
        "Quelle jolie statue !",
        "On reconnaît bien l'influence expressioniste du sculpteur...",
        "Une critique des dérives du capitalisme sans doute.",
        "Le modèle me rappelle quelque chose"
    ]
}

const graalMapDialogs = {
    riddle: [
        {
            question: 'Qu\'est-ce qui est petit et marron ?',
            answers: {
                a: {
                    text: 'Un hamster albinos qui fait partie d\'un cirque itinérant de Pologne',
                    win: false
                },
                b: {
                    text: 'Vous pouvez répéter la question ?',
                    win: false
                },
                c: {
                    text: 'Un marron !',
                    win: true
                },
                d: {
                    text: 'La réponse D',
                    win: false
                }
            }
        },
        {
            question: 'Quelle est ta couleur favorite ?',
            answers: {
                a: {
                    text: 'Les couleurs c\'est subjectif, si ça se trouve, mon vert à moi, ce n\'est pas le même que ton vert à toi donc c\'est vraiment compliqué de répondre... Cela dit, je doute qu\'il s\'agisse d\'une réponse valable.',
                    win: false
                },
                b: {
                    text: 'Bleu de bretagne !',
                    win: true
                },
                c: {
                    text: 'Champignon',
                    win: false
                },
                d: {
                    text: 'Les coccinelles sont des coléoptères.',
                    win: false
                }
            }
        },
        {
            question: 'A quelle vitesse vole une hirondelle non chargée ?',
            answers: {
                a: {
                    text: 'Une hirondelle africaine ou une européenne ?',
                    win: true
                },
                b: {
                    text: '10km/h',
                    win: false
                },
                c: {
                    text: 'vite ?',
                    win: false
                },
                d: {
                    text: 'Oui !',
                    win: false
                }
            }
        },
        {
            question: 'Qu\'est-ce qui marche à quatre patte le matin, à quatre patte le midi, et à quatre pattes le soir ?',
            answers: {
                a: {
                    text: 'Un flamant rose avec une béquille en bambou',
                    win: false
                },
                b: {
                    text: 'Un renard',
                    win: true
                },
                c: {
                    text: 'Une chaise bleu à pois verts sur laquelle repose un coussin à pompoms',
                    win: false
                },
                d: {
                    text: 'Un oeuf qui roule dans le sens des aiguilles d\'une montre mais dont le boeuf n\'amasse pas mousse',
                    win: false
                }
            }
        },
        {
            question: 'Qu\'est-ce que j\'ai dans ma poche ?',
            answers: {
                a: {
                    text: 'Ce n\'est pas du jeu ! C\'est contraire aux règles !',
                    win: true
                },
                b: {
                    text: 'Un anneau',
                    win: true
                },
                c: {
                    text: 'Des arrêtes, des dents de gobelins, des coquillages, des ailes de chauve souris... Nan... UN COUTEAU !! Rhoo tais toi !!',
                    win: false
                },
                d: {
                    text: 'DE LA FICELLE... Ou rien du tout !!',
                    win: false
                }
            }
        },
        {
            question: 'Une boite sans charnière, sans clé, sans couvercle: Pourtant à l’intérieur est caché un trésor doré.',
            answers: {
                a: {
                    text: 'Lousianne !',
                    win: false
                },
                b: {
                    text: 'Coeur de Pirate',
                    win: false
                },
                c: {
                    text: 'Un oeuf',
                    win: true
                },
                d: {
                    text: 'La boîte à bijoux de la reine Elizabeth II',
                    win: false
                }
            }
        },
        {
            question: 'Complétez les paroles de cette chanson de Tragedie : "Est-ce que tu m\'entends, ..."',
            answers: {
                a: {
                    text: 'Hey oh',
                    win: true
                },
                b: {
                    text: 'Ohé du bateau',
                    win: false
                },
                c: {
                    text: 'Sérieusement, qui écoute cette chanson ?',
                    win: true
                },
                d: {
                    text: 'Alexis',
                    win: false
                }
            }
        },
        {
            question: 'A combien est égal 1+1 ?',
            answers: {
                a: {
                    text: '10',
                    win: true
                },
                b: {
                    text: '11',
                    win: true
                },
                c: {
                    text: '2',
                    win: true
                },
                d: {
                    text: '582 + 6 * 3 - 598. Le compte est bon !',
                    win: true
                }
            }
        },
    ]
}

export {
    principalMapDialogs,
    graalMapDialogs
}