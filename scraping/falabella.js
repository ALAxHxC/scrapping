const axios = require('axios');
const cheerio = require('cheerio');
const filters = require('../scraping/filters');

module.exports.scrapping = async function cheerioExample(search, array, size) {
    //search = search.replace(' ', '+')
    serach = 'https://www.falabella.com.co/falabella-co/search?Ntt=' + search
    const pageContent = await axios.get(serach);
    const $ = cheerio.load(pageContent.data);
    let i = 0;
    try {
        const encotnrados = $('.search-results--products').find('.pod-4_GRID').map((_, el) => {
            el = $(el);
            if (i >= size) {
                throw 'FInalize'
            }
            const title = el.find('b.pod-subTitle').text().trim();

            if(!filters.filterByName(title,search)) return;

            const description = el.find('li.price-0').attr('data-undefined-price').trim();
            const link = el.find('a.layout_grid-view').attr('href');
            const image = el.find('a.layout_grid-view').find('img').attr('src');
            const price = parseFloat(description)
            i++;
            array.push({ title, description, link, image, fuente: 'falabella', price })
            return
        }).get()
    } catch (error) {
        console.log('falabella', error.message)
        return;
    }
    return;

}

