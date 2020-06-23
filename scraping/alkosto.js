const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scrapping=async function scrapping(search,responses) {
    search = search.replace(' ','+')
    const pageContent = await axios.get('https://www.alkosto.com/salesperson/result/?q='+search);
    const $ = cheerio.load(pageContent.data,{
        normalizeWhitespace: true,
    });
    const presentations = $('.salesperson-products-grid-item').map((_, el) => {
        el = $(el); 
        //console.log(el)
        const title = el.find('h2.product-name').text().trim().replace('\n','');
        const description = el.find('.price').find('.price').text().trim().replace('\n','');
        const link = el.find('a.product-image').attr('href');
        const image = el.find('a.product-image').find('img').attr('src');
        //console.log(title,description,link,image)
        responses.push( { title, description, link,image })
        return { title, description, link,image };
    }).get();
    console.log(presentations);
}

