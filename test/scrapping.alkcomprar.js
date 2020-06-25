const axios = require('axios');
const cheerio = require('cheerio');
const scrapeIt = require("scrape-it");

async function cheerioExample() {
    const pageContent = await axios.get('https://www.alkomprar.com/search/?text=p30');
    const $ = cheerio.load(pageContent.data);
    const encotnrados = $('li.product__list--item').map((_, el) => {
        el = $(el); 
        const title = el.find('div.product__information').find('h2.product__information--name').text();
        const description = el.find('div.product__price').find('span.price').text();
        const link = 'https://www.alkomprar.com/'+el.find('div.product__image').find('a.js-product-click-datalayer').attr('href');
        const image = 'https://www.alkomprar.com/'+ el.find('div.product__image').find('a.js-product-click-datalayer').find('div.product__image__container').find('img').attr('data-src');
        //.find('img').attr('src');
        return { title, description, link,image };
    }).get()
    return encotnrados;
   
}


cheerioExample().then((data)=>{
    console.log(data)
}).catch(error=>{
    console.log('error',error.message,error.stack);
})