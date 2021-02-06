var fs = require("fs");

export default (req, res) => {
  if (req.method === "POST") {
    const cartData = JSON.parse(req.body);

    fs.readFile("utils/data.json", "utf8", (err, data) => {
      const Data = JSON.parse(data);

      let products = Data.map((x) => {
        for (let i = 0; i < cartData.length; i++) {
          if (cartData[i].id === x.id) {
            x.quantity -= cartData[i].cartquantity;
            return x;
          } else return x;
        }
      });

      fs.writeFile("utils/data.json", JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    });
    res.status(200).json({});
  } else {
    const data = fs.readFileSync("utils/data.json", "utf8");
    if (req.query.id != null) {
      const product = JSON.parse(data).filter((item) => {
        return item.id == req.query.id;
      });
      if (product.length) res.status(200).json(product[0]);
      else res.status(404).json({ err: "No Product Found" });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  }
};
