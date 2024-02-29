import express from "express";
const app = express();

// rest API=>restfull API=> data is exchanged in json format
//  to make app understand json
app.use(express.json());

let productList = [
  {
    id: 1,
    name: "TV",
    price: 45000,
    category: "electronics",
    description: "This is a nice tv.",
  },
  {
    id: 2,
    name: "Bottle",
    price: 1000,
    category: "kitchen",
    description: "Handy and useful.",
  },
];
// APIS

// add product
app.post("/product/add", (req, res) => {
  const newProduct = req.body;

  productList.push(newProduct);
  return res.status(200).send({ message: "product is sucessfully added" });
});

// get product List
app.get("/product/list", (req, res) => {
  return res.status(200).send(productList);
});

// get product details

app.get("/product/details/:id", (req, res) => {
  const productId = Number(req.params.id);

  const requiredProduct = productList.find((item, index, self) => {
    if (item.id === productId) {
      return item;
    }
  });
  if (!requiredProduct) {
    return res.status(404).send({ message: "product doesnot exit" });
  }
  return res
    .status(200)
    .send({ message: "success", productDetails: requiredProduct });
});

//  delete product by id
app.delete("/product/delete/:id", (req, res) => {
  // extract product id from req.params
  const productId = Number(req.params.id);

  // find product
  const requiredProduct = productList.find((item, index, self) => {
    if (item.id === productId) {
      return item;
    }
  });

  // if not product, throw error
  if (!requiredProduct) {
    return res.status(402).send({ message: "product doesnot exist" });
  }
  // delete product
  const newProductList = productList.filter((item, index, self) => {
    if (item.id !== productId) {
      return item;
    }
  });
  productList = [...newProductList];
  // send response
  return res.status(200).send({ message: "Product is deleted sucessfully ." });
});

// edit product
app.put("/product/edit/:id", (req, res) => {
  // extract product id from req.params
  const productId = Number(req.params.id);

  // find product
  const requiredProduct = productList.find((item, index, self) => {
    if (item.id === productId) {
      return item;
    }
  });

  // if not product , throw error

  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // extract newValues from req.body
  const newValues = req.body;

  // edit product
  const newProductList = productList.map((item, index, self) => {
    if (item.id === productId) {
      const newItem = { id: productId, ...newValues };
      return newItem;
    } else {
      return item;
    }
  });
  productList = structuredClone(newProductList);

  //send response
  return res.status(200).send({ message: "Product  is updated sucessfully" });
});
// server and network port
const port = 4001;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
