const game1 = {
    id: 1,
    seasons_id: 1,
};
const game2 = {
    id: 2,
    seasons_id: 1,
};
const game3 = {
    id: 3,
    seasons_id: 2,
};
const game4 = {
    id: 4,
    seasons_id: 3,
};
const updatableGame = {
    id: 1,
    seasons_id: 2,
};
const game1WithPlayersRelations = {
    id: 1,
    seasons_id: 1,
    players: [
        {
            id: 1,
            name: 'player 1',
            won: true,
        },
        {
            id: 2,
            name: 'player 2',
            won: false,
        },
    ],
};

const game4WithPlayersRelations = {
    id: 4,
    seasons_id: 3,
    players: [],
};

const updatableGameWithPlayersRelations = {
    id: 1,
    seasons_id: 2,
    players: [
        {
            id: 1,
            name: 'player 1',
            won: true,
        },
        {
            id: 2,
            name: 'player 2',
            won: false,
        },
    ],
};

const seedGamesWithPlayerRelations = [
    {
        id: 1,
        seasons_id: 1,
        players: [
            {
                id: 1,
                name: 'player 1',
                won: true,
            },
            {
                id: 2,
                name: 'player 2',
                won: false,
            },
        ],
    },
    {
        id: 2,
        seasons_id: 1,
        players: [
            {
                id: 1,
                name: 'player 1',
                won: true,
            },
            {
                id: 2,
                name: 'player 2',
                won: true,
            },
            {
                id: 3,
                name: 'player 3',
                won: false,
            },
        ],
    },
    {
        id: 3,
        seasons_id: 2,
        players: [],
    },
];

module.exports = {
    seed: [game1, game2, game3],
    existingGame: game1,
    insertableGame: game4,
    updatableGame,
    game1WithPlayersRelations,
    updatableGameWithPlayersRelations,
    game4WithPlayersRelations,
    seedGamesWithPlayerRelations,
};