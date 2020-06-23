const alkosto =require('./scraping/alkosto');
const falabella = require('./scraping/falabella');
const alkomprar = require('./scraping/alkomprar');
const mercadolibre = require('./scraping/mercadolibre');

async function search(search){
    let responses=[];
    let promises=[];
    promises.push(alkomprar.scrapping(search,responses))
    promises.push(alkosto.scrapping(search,responses))
    promises.push(falabella.scrapping(search,responses))
    promises.push(mercadolibre.scrapping(search,responses))
    await Promise.all(promises)
    return responses
}

search('P30 PRO').then(data=>{
    console.log(data)
}).catch(error=>{
    console.log(error.message,error.stack)
})