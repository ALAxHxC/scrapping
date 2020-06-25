const axios = require('axios');
const cheerio = require('cheerio');
const scrapeIt = require("scrape-it");

async function cheerioExample() {
    const pageContent = await axios.get('https://listado.mercadolibre.com.co/gopro-hero-7');
    const $ = cheerio.load(pageContent.data);
    const encotnrados = $('li.results-item').map((_, el) => {
        el = $(el); 
        const title = el.find('div.item__info-container').find('h2.list-view-item-title').text();
        const description = el.find('div.price__container').text();
        const link = el.find('div.images-viewer').attr('item-url');
        const image = el.find('div.images-viewer').find('div.image-content').find('a').find('img').attr('data-src');
        return { title, description, link,image };
    }).get()
    return encotnrados;
   
}


cheerioExample().then((data)=>{
    console.log(data)
}).catch(error=>{
    console.log('error',error.message,error.stack);
})