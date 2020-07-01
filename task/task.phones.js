// https://www.alkosto.com/telefonos-celulares
// https://home.mercadolibre.com.co/telefonos/
// https://www.linio.com.co/c/celulares-y-tablets
// https://www.falabella.com.co/falabella-co/category/cat910963/Telefonia
// https://compras.tigo.com.co/celulares
// https://tienda.claro.com.co/claro/celulares
// https://www.movistar.co/tienda/Open-Catalog/Equipos/Celulares/c/celulares

const mercadolibre = require('../scraping/mercadolibre');
const alkosto = require('../scraping/alkosto');
let keywords = ['celular']
let responses = []


/*
alkosto.scrappingByWeb('https://www.alkosto.com/telefonos-celulares',responses,5,keywords).then(data=>{
    console.log('data',responses)
}).catch(error=>{
    throw error;
})
*/
/*
mercadolibre.scrappingByWeb('https://celulares.mercadolibre.com.co/',responses,5,keywords).then(data=>{
    console.log('data',responses)
}).catch(error=>{
    throw error;
})
*/