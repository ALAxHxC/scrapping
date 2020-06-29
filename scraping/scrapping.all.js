const alkosto = require('./alkosto');
const falabella = require('./falabella');
const alkomprar = require('./alkomprar');
const mercadolibre = require('./mercadolibre');
const lineo = require('./lineo');
const _ = require('lodash');
const size = parseInt(process.env.SIZE) || 5;
const accent  = require('remove-accents');
const searchMongo = require('../model/search');

async function saveSearch(search,responses){
    try{
   responses= responses.map(item=>{
    item.price = item.price +0;
        return {
            search:search,  
            title:item.title,
            description:item.description, 
            link:item.link, 
            image:item.image, 
            fuente: 'mercadolibre', 
            price:item.price
        }
    })
    await searchMongo.searchModel.insertMany(responses)
}catch(error){
    console.log(error.message,error.stack);
}
}

async function search(search) {
    search = accent.remove(search.trim().normalize());
    let responses = [];
    let promises = [];
    promises.push(alkomprar.scrapping(search, responses, size))
    promises.push(alkosto.scrapping(search, responses, size))
    promises.push(falabella.scrapping(search, responses, size))
    promises.push(mercadolibre.scrapping(search, responses, size))
    promises.push(lineo.scrapping(search, responses, size))
    await Promise.all(promises)
    responses = responses.sort(function (a, b) {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    });
    return responses
}

module.exports.seachService = async (req, res) => {
    let data = await search(req.body.name_field);
    res.render('productos', { productos: data, title: req.body.name_field })
    return await saveSearch(req.body.name_field,data)
};
module.exports.seachServiceApi = async (req, res) => {
    let data = await search(req.body.name_field);
    res.status(200).json(data);
};
