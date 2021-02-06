var fs = require("fs");

export default (req, res) => {
  if (req.method === "POST") {
    const cartData = JSON.parse(req.body);
    fs.readFile("utils/data.json", "utf8", (err, data) => {
      let products = JSON.parse(data).map((x) => {
        cartData.map((c) => {
          if (c.id == x.id) {
            x.quantity -= c.quantity;
            return x;
          } else return x;
        });
      });
      fs.writeFile("utils/data.json", JSON.stringify(products));
    });
    res.status(201).json({});
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
