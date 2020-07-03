const axios = require('axios');



const cheerio = require('cheerio');
const filters = require('../scraping/filters');

module.exports.scrappingByWeb = async function scrapping(search, responses, size, keywords) {
    try {
        const pageContent = await axios.get(search);
        const $ = cheerio.load(pageContent.data);
        let i = 0

        const encotnrados = $('li.results-item').map((_, el) => {
            console.log('carga')
            if (i >= size) {
                throw 'FInalize'
            }
            el = $(el);
            const title = el.find('div.item__info-container').find('h2.list-view-item-title').text().trim();

            if (!filters.filterByKeyWords(title, keywords)) return;

            const description = el.find('div.price__container').text().trim();
            const link = el.find('div.images-viewer').attr('item-url');
            const image = el.find('div.images-viewer').find('div.image-content').find('a').find('img').attr('data-src');
            const price = parseFloat(description.split(' ')[1])
            if (image == undefined || isNaN(price)) {
                return;
            }
            responses.push({ title, description, link, image, fuente: 'mercadolibre', price })
            i++;
            return
        }).get()
    } catch (error) {
        console.log('mercadolibre', error.message);
        return;
    }
    return;
}


module.exports.scrapping = async function scrapping(search, responses, size) {
    try {
        search = search.normalize().replace(' ', '-')
        search = 'https://listado.mercadolibre.com.co/' + search
        console.log('bsqueda', search)
        const pageContent = await axios.get(search);
        const $ = cheerio.load(pageContent.data);
        let i = 0

        const encotnrados = $('li.results-item').map((_, el) => {
            if (i >= size) {
                throw 'FInalize'
            }
            el = $(el);
            const title = el.find('div.item__info-container').find('h2.list-view-item-title').text().trim();

            if (!filters.filterByName(title, search)) return;

            const description = el.find('div.price__container').text().trim();
            const link = el.find('div.images-viewer').attr('item-url');
            const image = el.find('div.images-viewer').find('div.image-content').find('a').find('img').attr('data-src');
            const price = parseFloat(description.split(' ')[1])
            if (image == undefined || isNaN(price)) {
                return;
            }
            responses.push({ title, description, link, image, fuente: 'mercadolibre', price })
            i++;
            return
        }).get()
    } catch (error) {
        console.log('mercadolibre', error.message);
        return;
    }
    return;
}