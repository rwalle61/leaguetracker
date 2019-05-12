const { Model } = require('objection');

const League = require('./League');

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
                    from: 'seasons.seasons_id',
                    to: 'leagues.id',
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
                seasons_id: {
                    type: 'integer',
                },
            },
        };
    }
}

module.exports = Season;