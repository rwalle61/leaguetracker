const { Model } = require('objection');

const Season = require('./Season');
const Game = require('./Game');

class Player extends Model {
    static get tableName() {
        return 'players';
    }
    static get relationMappings() {
        return {
            seasons: {
                relation: Model.ManyToManyRelation,
                modelClass: Season,
                join: {
                    from: 'players.id',
                    through: {
                        from: 'players_seasons.player_id',
                        to: 'players_seasons.season_id',
                    },
                    to: 'seasons.id',
                },
            },
            games: {
                relation: Model.ManyToManyRelation,
                modelClass: Game,
                join: {
                    from: 'players.id',
                    through: {
                        from: 'players_games.players_id',
                        to: 'players_games.games_id',
                    },
                    to: 'games.id',
                },
            },
        };
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: {
                    type: 'integer',
                },
                name: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 255,
                },
            },
        };
    }
}

module.exports = Player;