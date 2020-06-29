const axios = require('axios');
const cheerio = require('cheerio');
const filters = require('../scraping/filters');

module.exports.scrapping = async function scrapping(search, responses, size) {
    try {
    const pageContent = await axios.get('https://www.linio.com.co/search?scroll=&q=' + search);
    const $ = cheerio.load(pageContent.data, {
        normalizeWhitespace: true,
    });
    let i = 0;
    
        const presentations = $('div.catalogue-product').map((_, el) => {
            el = $(el);
            if (i >= size) {
                throw 'FInalize'
            }
            const title = el.find('div.detail-container').find('span.title-section').text()

            if(!filters.filterByName(title,search)) return;
            

            const description = el.find('div.price-section').find('div.lowest-price').find('span.price-main-md').text().trim()
            const link = 'https://www.linio.com.co' + el.find('a').attr('href');
            const image = el.find('div.image-container').find('figure').find('picture').find('img.image').attr('data-lazy');
            const price = parseFloat(description.split('$')[1])

            if (image == undefined || isNaN(price)) {
                return;
            }

            responses.push({ title, description, link, image, fuente: 'linio', price })
            i++;
            return;
        }).get();
    } catch (error) {
        console.log('error', error.message)
        return error
    }
}

