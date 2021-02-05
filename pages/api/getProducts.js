var fs = require('fs'); 

export default (req, res) => {

  if (req.method === 'POST') {
    let newData = JSON.parse(req.body)
    fs.readFile("Data/products.json",'utf8',(err,data)=>{
      let products = JSON.parse(data).map(product=>{
          for(let i=0;i<newData.length;i++){
              if(newData[i].id===product.id){
                product.quantity -= newData[i].cart_qty
                return product
              } 
              else return product
          }
      })
      fs.writeFile("Data/products.json",JSON.stringify(products),(err)=>{if(err)console.log(err)})
    })
    res.status(201).json({})
  }

  else{
    const data = fs.readFileSync("utils/data.json",'utf8')
    if(req.query.id!=null){
      const product =  JSON.parse(data).filter(item=>{
          return item.id == req.query.id
      })
      if(product.length) 
          res.status(200).json(product[0])
      else res.status(404).json({err:'No Product Found'})
    }
    else{
      res.status(200).json(JSON.parse(data))
    }
  }
}
