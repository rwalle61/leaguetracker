const leaguesService = require('../services/leagues.service');

const getLeagues = () => leaguesService.getLeagues();

const getLeague = async function(req, res, next) {
    try {
        const id = req.params.id;
        const league = await leaguesService.getLeague(id);
        if (!league) {
            res.status(404).send(`league ${id} not found`);
        } else {
            res.status(200).send(league);
        }
    } catch(err) {
        next(err);
    }
};

const postLeague = async function(req, res, next) {
    try {
        const league = req.body;
        await leaguesService.postLeague(league);
        res.status(201).send();
    } catch(err) {
        next(err);
    }
};

const deleteLeague = async function(req, res, next) {
    try {
        const id = req.params.id;
        await leaguesService.deleteLeague(id);
        res.status(204).send();
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getLeagues,
    getLeague,
    postLeague,
    deleteLeague,
};
