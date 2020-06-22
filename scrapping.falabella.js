const axios = require('axios');
const cheerio = require('cheerio');
const scrapeIt = require("scrape-it");

async function cheerioExample() {
    const pageContent = await axios.get('https://www.falabella.com.co/falabella-co/search?Ntt=gopro+hero');
    const $ = cheerio.load(pageContent.data);
    const encotnrados = $('.search-results--products').find('.pod-4_GRID').map((_, el) => {
        el = $(el); 
        const title = el.find('b.pod-subTitle').text();
        const description = el.find('li.price-0').attr('data-undefined-price')
        const link = el.find('a.layout_grid-view').attr('href');
        const image = el.find('a.layout_grid-view').find('img').attr('src');
        console.log(title,description,link,image)
        return { title, description, link,image };
    }).get()
    return encotnrados;
   
}


cheerioExample().then((data)=>{
    console.log(data)
}).catch(error=>{
    console.log('error',error.message,error.stack);
})