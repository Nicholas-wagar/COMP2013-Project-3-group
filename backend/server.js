const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("./models/product");
const User = require("./models/user");
require("dotenv").config();
const { DB_URI, SECRET_KEY } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.post("/register", async (request, response) => {
  const { username, password } = request.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    response.status(201).send({ message: "User created!" });
  } catch (error) {
    response.status(500).send({ message: "Error! user cannot be created" });
  }
});

server.post("/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(400).send({ message: "invalid credintials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return response.status(400).send({ message: "Invalid credintials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, isAdmin: user.isAdmin},
      SECRET_KEY
    );

    response
      .status(200)
      .send({ message: "Welcome, you're authenticted", token });
  } catch (error) {
    response.status(500).send({ message: "Error!" });
  }
});
server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const id = crypto.randomUUID();
  const product = new Product({
    productName,
    brand,
    price,
    image,
    id,
  });

  try {
    await product
      .save()
      .then((result) =>
        response.status(201).send(`${productName} added\nwith id: ${id}`)
      );
  } catch (error) {
    console.log(error.message);
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id).then((result) => {
      console.log(result);
      response.status(200).send(result);
    });
  } catch (error) {
    console.log(error.message);
  }
});

server.patch("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  const { productName, brand, image, price, id } = request.body;

  try {
    await Product.findByIdAndUpdate(prodId, {
      productName,
      brand,
      image,
      price,
      id,
    }).then((result) =>
      response.status(200).send(`${productName} edited\nwith id: ${prodId}`)
    );
  } catch (error) {
    console.log(error.message);
  }
});
