

const createProduct =({id=0,name="undefined",price=0,descrition="undefined",category=""})=>
    {

    return { id,name,price,descrition,category}
}
 const product = createProduct({id:1,name:"banana",cor:"verde"})
 console.log(product?.cor ?? "red ruby"); 