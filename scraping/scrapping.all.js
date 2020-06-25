const alkosto = require('./alkosto');
const falabella = require('./falabella');
const alkomprar = require('./alkomprar');
const mercadolibre = require('./mercadolibre');
const _ = require('lodash');
async function search(search) {
    let responses = [];
    let promises = [];
    promises.push(alkomprar.scrapping(search, responses))
    promises.push(alkosto.scrapping(search, responses))
    promises.push(falabella.scrapping(search, responses))
    promises.push(mercadolibre.scrapping(search, responses))
    await Promise.all(promises)
    responses = _.sortBy(responses, ['description'])
    return responses
}

module.exports.seachService = async (req, res) => {
    let data = await search(req.body.name_field);
    res.render('productos', { productos: data, title: req.body.name_field })
}
/*
search('P30 PRO').then(data => {
    console.log(data)
}).catch(error => {
    console.log(error.message, error.stack)
})*/