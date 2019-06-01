const { Model } = require('objection');

const Season = require('./Season');
const Player = require('./Player');

class Game extends Model {
    static get tableName() {
        return 'games';
    }
    static get relationMappings() {
        return {
            season: {
                relation: Model.BelongsToOneRelation,
                modelClass: Season,
                join: {
                    from: 'games.seasons_id',
                    to: 'seasons.id',
                },
            },
            players: {
                relation: Model.ManyToManyRelation,
                modelClass: Player,
                join: {
                    from: 'games.id',
                    through: {
                        from: 'players_games.games_id',
                        to: 'players_games.players_id',
                        extra: ['won'],
                    },
                    to: 'players.id',
                },
            },
        };
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['seasons_id'],
            properties: {
                id: {
                    type: 'integer',
                },
                seasons_id: {
                    type: 'integer',
                },
            },
        };
    }
}

module.exports = Game;