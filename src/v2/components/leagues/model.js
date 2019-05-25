const { Model } = require('objection');

const Season = require('../seasons/model');

class League extends Model {
    static get tableName() {
        return 'leagues';
    }
    static get relationMappings() {
        return {
            seasons: {
                relation: Model.HasManyRelation,
                modelClass: Season,
                join: {
                    from: 'leagues.id',
                    to: 'seasons.leagues_id',
                },
            },
        };
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'description'],
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
            },
        };
    }
}

module.exports = League;