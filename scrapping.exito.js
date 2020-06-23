const axios = require('axios');
const cheerio = require('cheerio');
const scrapeIt = require("scrape-it");

async function cheerioExample() {
    const pageContent = await axios.get('https://www.exito.com/search?_query=p30');
    const $ = cheerio.load(pageContent.data);
    const encotnrados = $('div.render-container').find('div.render-provider').html()
    /*.map((_, el) => {
        console.log('itera',$(el).text())

    });
    /*.find('section').map((_, el) => {
        el = $(el); 
        return el.html();
        const title = el.find('search-result-exito-product-summary-name-product').text();
        const description = el.find('li.price-0').attr('data-undefined-price')
        const link = el.find('a').attr('href');
        const image = el.find('a').find('img').attr('src');
        console.log(title,description,link,image)
        return { title, description, link,image };
    }).get()
    return encotnrados;*/
    console.log(encotnrados)
   
}


cheerioExample().then((data)=>{
    console.log(data)
}).catch(error=>{
    console.log('error',error.message,error.stack);
})