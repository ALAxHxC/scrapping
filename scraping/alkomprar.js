const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scrapping = async function scrapping(search, responses) {
    search = search.replace(' ', '+')
    const pageContent = await axios.get('https://www.alkomprar.com/search/?text=' + search);
    const $ = cheerio.load(pageContent.data);
    const encotnrados = $('li.product__list--item').map((_, el) => {
        el = $(el);
        const title = el.find('div.product__information').find('h2.product__information--name').text().trim();

        search.split(' ').forEach(text => {
            if (!title.includes(text)) {
                return 'false'
            }
        })

        const description = el.find('div.product__price').find('span.price').text().trim();
        const link = 'https://www.alkomprar.com/' + el.find('div.product__image').find('a.js-product-click-datalayer').attr('href');
        const image = 'https://www.alkomprar.com/' + el.find('div.product__image').find('a.js-product-click-datalayer').find('div.product__image__container').find('img').attr('data-src');
        //.find('img').attr('src');
        responses.push({ title, description, link, image, fuente: 'alkomprar' })
        return { title, description, link, image };
    }).get()
    return encotnrados;

}
