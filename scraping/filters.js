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
   */
module.exports.filterByName = (name,search)=>{
    name = name.normalize().toLowerCase().split(' ');
    search = search.normalize().toLowerCase();
    try{
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