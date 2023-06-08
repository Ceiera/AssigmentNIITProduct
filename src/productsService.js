// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  // get all products
  return JSON.stringify(productsList)
}

const getProductsById = (productId, done) => {
  let product = null

  // get a product by ID
  const index = productsList.findIndex((idnya) => idnya.id === productId)
  if (index<0) {
    return done("Requested product doesn't exist..!", null);
  }else{
    product = productsList[index]
    return done(null, JSON.stringify(product));
  }
}

const saveProduct = (newProduct, done) => {
 // save a product
 let filter = productsList.filter((prod) => prod.id === newProduct.id)
 if (filter.length>0) {
  return done("Product already exists..!", null)
 }else{
  productsList.push(newProduct)
  return done(null, JSON.stringify(productsList))
 }
}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  // update the product list
  const index = productsList.findIndex((prod) => prod.id === productId)
  if (index == -1) {
    return done("Requested product doesn't exist..!");
  }
  productsList[index] = {...productsList[index],...updateData}
  updatedProductList = productsList
  done(null, JSON.stringify(updatedProductList));
}

const deleteProduct = (productId, done) => {
  // delete a product
  const index = productsList.findIndex((prod) => prod.id === productId)
  if (index === -1) {
    return done("Requested product doesn't exist..!");
  }
  productsList.splice(index, 1)
  done(null, JSON.stringify(productsList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}