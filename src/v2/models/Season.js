const { Model } = require('objection');

const League = require('./League');
const Game = require('./Game');

class Season extends Model {
    static get tableName() {
        return 'seasons';
    }
    static get relationMappings() {
        return {
            league: {
                relation: Model.BelongsToOneRelation,
                modelClass: League,
                join: {
                    from: 'seasons.leagues_id',
                    to: 'leagues.id',
                },
            },
            games: {
                relation: Model.HasManyRelation,
                modelClass: Game,
                join: {
                    from: 'seasons.id',
                    to: 'games.seasons_id',
                },
            },
        };
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'description', 'seasons_id'],
            properties: {
                id: {
                    type: 'integer',
                },
                name: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 255,
                },
                description: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 255,
                },
                leagues_id: {
                    type: 'integer',
                },
            },
        };
    }
}

module.exports = Season;