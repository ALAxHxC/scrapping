const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scrapping = async function scrapping(search, responses) {
    const pageContent = await axios.get('https://www.linio.com.co/search?scroll=&q=' + search);
    const $ = cheerio.load(pageContent.data, {
        normalizeWhitespace: true,
    });
    const presentations = $('div.catalogue-product').map((_, el) => {
        el = $(el);
        const title = el.find('div.detail-container').find('span.title-section').text()
        const description = el.find('div.price-section').find('div.lowest-price').find('span.price-main-md').text().trim()
        const link = 'https://www.linio.com.co' + el.find('a').attr('href');
        const image = el.find('div.image-container').find('figure').find('picture').find('img.image').attr('data-lazy');
        responses.push({ title, description, link, image })
        return { title, description, link, image, fuente: 'lineo' };
    }).get();
    console.log(presentations);
}

