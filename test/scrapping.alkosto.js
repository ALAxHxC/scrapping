const axios = require('axios');
const cheerio = require('cheerio');
const filters = require('../scraping/filters');

async function cheerioExample(search) {
    console.log('busca',search)
    const pageContent = await axios.get('https://www.alkosto.com/salesperson/result/?q='+search);
    const $ = cheerio.load(pageContent.data,{
        normalizeWhitespace: true,
    });
    const presentations = $('.salesperson-products-grid-item').map((_, el) => {
        el = $(el); 
    
        const title = el.find('h2.product-name').text().trim()
        const description = el.find('.price').find('.price').text().trim()
        const link = el.find('a.product-image').attr('href');
        const image = el.find('a.product-image').find('img').attr('src');
        //console.log(title,description,link,image)
        console.log(title,filters.filterByName(title,search),)
       //return { title, description, link,image,includes: filters.filterByName(title,search) };
    }).get();
    console.log(presentations);
}


cheerioExample('camara gopro').then((data)=>{

}).catch(error=>{
    console.log('error',error.message,error.stack);
})