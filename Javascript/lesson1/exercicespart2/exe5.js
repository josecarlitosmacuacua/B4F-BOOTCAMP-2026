const createCounter =(initialValue=0)=>{
    let value = initialValue 
    return{

        sum: ()=>value+=1
      
    }
}