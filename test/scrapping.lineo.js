const axios = require('axios');
const cheerio = require('cheerio');

async function cheerioExample() {
    const pageContent = await axios.get('https://www.linio.com.co/search?scroll=&q=p30');
    const $ = cheerio.load(pageContent.data, {
        normalizeWhitespace: true,
    });
    const presentations = $('div.catalogue-product').map((_, el) => {
        el = $(el);
        //console.log(el)
        const title = el.find('div.detail-container').find('span.title-section').text()
        const description = el.find('div.price-section').find('div.lowest-price').find('span.price-main-md').text().trim()
        const link = 'https://www.linio.com.co' + el.find('a').attr('href');
        //console.log(el.find('div.image-container').find('figure').find('picture').html())
        const image = el.find('div.image-container').find('figure').find('picture').find('img.image').attr('data-lazy');
        //console.log(title,description,link,image)
        return { title, description, link, image };
    }).get();
    console.log(presentations);
}


cheerioExample().then((data) => {

}).catch(error => {
    console.log('error', error.message, error.stack);
})