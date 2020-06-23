const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scrapping=async function scrapping(search,responses) {
    search=search.replace(' ','-')
    search='https://listado.mercadolibre.com.co/'+search
    const pageContent = await axios.get(search);
    const $ = cheerio.load(pageContent.data);
    const encotnrados = $('li.results-item').map((_, el) => {
        el = $(el); 
        const title = el.find('div.item__info-container').find('h2.list-view-item-title').text().trim();
        const description = el.find('div.price__container').text().trim();
        const link = el.find('div.images-viewer').attr('item-url');
        const image = el.find('div.images-viewer').find('div.image-content').find('a').find('img').attr('data-src');
        responses.push({ title, description, link,image })
        return { title, description, link,image };
    }).get()
    return encotnrados;
}