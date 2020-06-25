const axios = require('axios');
const cheerio = require('cheerio');
const scrapeIt = require("scrape-it");

async function cheerioExample() {
    const pageContent = await axios.get('https://slides.com/carboleda');
    const $ = cheerio.load(pageContent.data);
    const presentations = $('li.deck.public').map((_, el) => {
        el = $(el);
        const title = el.find('span.deck-title-value').text();
        const description = el.find('span.deck-description-value').text();
        const link = el.find('a.deck-link').attr('href');
        console.log(title,description)
        return { title, description, link };
    }).get();
    //console.log(presentations);
}


async function scrapeItExample() {
    const scrapeResult = await scrapeIt('https://slides.com/carboleda', {
        presentations: {
            listItem: 'li.deck.public',
            data: {
                title: 'span.deck-title-value',
                description: 'span.deck-description-value',
                link: {
                    selector: 'a.deck-link',
                    attr: 'href'
                }
            }
        }
    });
    console.log(scrapeResult);
}

cheerioExample().then((data)=>{

}).catch(error=>{
    console.log('error',error.message,error.stack);
})