const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scrapping = async function scrapping(search, responses, size) {
    search = search.replace(' ', '+')
    const pageContent = await axios.get('https://www.alkosto.com/salesperson/result/?q=' + search);
    const $ = cheerio.load(pageContent.data, {
        normalizeWhitespace: true,
    });
    let i = 0;
    try {
        const presentations = $('.salesperson-products-grid-item').map((_, el) => {
            el = $(el);
            if (i >= size) {
                throw 'FInalize'
            }
            const title = el.find('h2.product-name').text().trim().replace('\n', '').trim();
            const description = el.find('.price').find('.price').text().trim().replace('\n', '').trim();
            const link = el.find('a.product-image').attr('href');
            const image = el.find('a.product-image').find('img').attr('src');
            const price = parseFloat(description.split(' ')[1])
            responses.push({ title, description, link, image, fuente: 'alkosto', price })
            i++;
        }).get();
    } catch (error) {
        console.log('alkosto error', error.message)
        return;
    }
}

