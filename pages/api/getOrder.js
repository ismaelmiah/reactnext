var fs = require("fs");

export default (req, res) => {
  if (req.method === "POST") {
    let orderData = fs.readFileSync("utils/order.json", "utf8");

    let PrevOrder = JSON.parse(orderData);
    let newOrder = JSON.parse(req.body);

    newOrder.id = PrevOrder.length + 1;
    let total = 0;
    let quantity = 0;
    newOrder.orders.forEach((e) => {
      total += e.price * e.cartquantity;
      quantity += e.cartquantity;
    });
    newOrder.total = total;
    newOrder.date = `${new Date().getDate()}/ ${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}
     -${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`;

    newOrder.quantity = quantity;

    fs.writeFile(
      "utils/order.json",
      JSON.stringify([...PrevOrder, newOrder]),
      (err) => {
        if (err) console.log(err);
      }
    );
    res.status(200).json({ id: newOrder.id });
  } else {
    let data = fs.readFileSync("utils/order.json", "utf8");
    if (req.query.id != null) {
      let item = JSON.parse(data).filter((item) => {
        return item.id == req.query.id;
      });
      if (item.length) res.status(200).json(item[0]);
      else res.status(404).json({ err: `${req.query.id} not found` });
    } else res.status(200).json(JSON.parse(data));
  }
};
