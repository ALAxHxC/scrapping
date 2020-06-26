const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scrapping = async function scrapping(search, responses, size) {
    //search = search.replace(' ', '+')
    const pageContent = await axios.get('https://www.alkomprar.com/search/?text=' + search);
    const $ = cheerio.load(pageContent.data);
    let i = 0;
    try {
        const encotnrados = $('li.product__list--item').map((_, el) => {

            el = $(el);
            if (i >= size) {
                throw 'FInalize'
            }
            const title = el.find('div.product__information').find('h2.product__information--name').text().trim();
            const description = el.find('div.product__price').find('span.price').text().trim();
            const link = 'https://www.alkomprar.com/' + el.find('div.product__image').find('a.js-product-click-datalayer').attr('href');
            const image = 'https://www.alkomprar.com/' + el.find('div.product__image').find('a.js-product-click-datalayer').find('div.product__image__container').find('img').attr('data-src');
            if (image == undefined || link == undefined) {
                return;
            }
            i++;
            const price = parseFloat(description.split('$')[1])
            responses.push({ title, description, link, image, fuente: 'alkomprar', price })
            return;
        }).get()
    } catch (error) {
        console.log('alkomprar', error.message);
        return;
    }
    return;

}
