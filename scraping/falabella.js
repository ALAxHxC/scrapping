const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scrapping = async function cheerioExample(search, array) {
    search = search.replace(' ', '+')
    serach = 'https://www.falabella.com.co/falabella-co/search?Ntt=' + search
    console.log(serach)
    const pageContent = await axios.get(serach);
    const $ = cheerio.load(pageContent.data);
    const encotnrados = $('.search-results--products').find('.pod-4_GRID').map((_, el) => {
        el = $(el);
        const title = el.find('b.pod-subTitle').text();
        const description = el.find('li.price-0').attr('data-undefined-price')
        const link = el.find('a.layout_grid-view').attr('href');
        const image = el.find('a.layout_grid-view').find('img').attr('src');
        array.push({ title, description, link, image })
        return {
            title, description, link, image, fuente: 'fallabela'
        };
    }).get()
    return encotnrados;

}

