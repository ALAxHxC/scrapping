const alkosto = require('./alkosto');
const falabella = require('./falabella');
const alkomprar = require('./alkomprar');
const mercadolibre = require('./mercadolibre');
const lineo = require('./lineo');
const _ = require('lodash');
const size = parseInt(process.env.SIZE) || 5
async function search(search) {
    let responses = [];
    let promises = [];
    promises.push(alkomprar.scrapping(search, responses, size))
    promises.push(alkosto.scrapping(search, responses, size))
    promises.push(falabella.scrapping(search, responses, size))
    promises.push(mercadolibre.scrapping(search, responses, size))
    promises.push(lineo.scrapping(search, responses, size))
    await Promise.all(promises)
    responses = _.sortBy(responses, ['price'])
    return responses
}

module.exports.seachService = async (req, res) => {
    let data = await search(req.body.name_field);
    res.render('productos', { productos: data, title: req.body.name_field })
};
module.exports.seachServiceApi = async (req, res) => {
    let data = await search(req.body.name_field);
    res.status(200).json(data);
};
