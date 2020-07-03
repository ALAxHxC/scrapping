const accent  = require('remove-accents');
class CoincideError extends Error {
    constructor(message) {
      super(message)
    }
  }
class NoCoincideError extends Error{
    constructor(message) {
        super(message)
      }
}

  /**
   * Si la busqueda es de 1 palabra con que coincida en una esta bien
   * @param {*} name 
   * @param {*} search 
   * Si la busqueda tiene mas de 3 palabras, coincidencia del 75%
   */
module.exports.filterByName = (name,search)=>{
    name = name.normalize().toLowerCase().split(' ');
   
    search = search.normalize().toLowerCase();
    search_words = search.normalize().toLowerCase().split(' ');

    try{
        if (search_words.length>3){
           
            let percentaje=parseInt(search.length*0.75)
            let percentajeActual = 0;

            name.forEach(item_name=>{
                //  console.log('compara',item_name,search)
                if (search.includes(item_name)){
                  percentajeActual++;
                }
                if (percentajeActual>=percentaje)   throw new CoincideError('Error');
            })
            return false
        }
        name.forEach(item_name=>{
            //  console.log('compara',item_name,search)
            if (search.includes(item_name)){
               throw new CoincideError('Error')
            }
        })

    
    }catch(e){
        if (e instanceof CoincideError)return true;
        if (e instanceof NoCoincideError ) return false;
    }

    return false;
}



module.exports.filterByKeyWords = (name,words)=>{
  name  = accent.remove(name.trim().toLowerCase().normalize());
 try{
  words.forEach(item_name=>{
     
             console.log('compara',item_name,name,name.includes(item_name))
              if (name.includes(item_name))
              throw new CoincideError();
          })
          return false 
  
  }catch(e){
    
      if (e instanceof CoincideError)return true;
      if (e instanceof NoCoincideError ) return false;
      console.log('error',e.stack)
  }

  return false;
}