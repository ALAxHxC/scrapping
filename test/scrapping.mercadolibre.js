const axios = require('axios');
const cheerio = require('cheerio');

async function cheerioExample(size, array) {
    const pageContent = await axios.get('https://listado.mercadolibre.com.co/gopro hero');
    const $ = cheerio.load(pageContent.data);
    let i = 0;
    try {
        const encotnrados = $('li.results-item').map((_, el) => {
            if (i >= size) {
                throw 'FInalize'
            }
            el = $(el);
            const title = el.find('div.item__info-container').find('h2.list-view-item-title').text();
            const description = el.find('div.price__container').text();
            const link = el.find('div.images-viewer').attr('item-url');
            const image = el.find('div.images-viewer').find('div.image-content').find('a').find('img').attr('data-src');
            if (image == undefined) {
                return;
            }
            array.push({ title, description, link, image })
            i++;

            return { title, description, link, image };
        }).get()
    } catch (error) {
        return array
    }
    return encotnrados;

}


cheerioExample(5, []).then((data) => {
    console.log(data)
}).catch(error => {
    console.log('error', error.message, error.stack);
})