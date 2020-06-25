const axios = require('axios');
const cheerio = require('cheerio');
const scrapeIt = require("scrape-it");

async function cheerioExample() {
    const pageContent = await axios.get('https://www.alkosto.com/salesperson/result/?q=go+pro+hero+7');
    const $ = cheerio.load(pageContent.data,{
        normalizeWhitespace: true,
    });
    const presentations = $('.salesperson-products-grid-item').map((_, el) => {
        el = $(el); 
        //console.log(el)
        const title = el.find('h2.product-name').text()
        const description = el.find('.price').find('.price').text()
        const link = el.find('a.product-image').attr('href');
        const image = el.find('a.product-image').find('img').attr('src');
        //console.log(title,description,link,image)
        return { title, description, link,image };
    }).get();
    console.log(presentations);
}


cheerioExample().then((data)=>{

}).catch(error=>{
    console.log('error',error.message,error.stack);
})