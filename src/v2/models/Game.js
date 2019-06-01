const { Model } = require('objection');

const Season = require('./Season');

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