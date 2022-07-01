const productosController = {};

const Producto = require ('../models/Productos')

productosController.renderProducForm = (req, res) => {
  res.render('productos/newProduct');
};

productosController.createNewProduct = async (req, res) => {
    const {title, description, price, image} = req.body;
    const newProducto=new Producto ({title, description, price, image})
    await newProducto.save()
    req.flash('mensaje_satisfactorio', 'Producto agregado satisfactoriamente')
    res.redirect('/productos');
  };



   productosController.renderProduct = async (req, res) => {
    const productos= await Producto.find();
    res.render('productos/listProduct', {productos})
    
  };

productosController.renderEditForm = async(req, res) => {
   const producto= await Producto.findById(req.params.id)
  res.render('productos/editProduct', {producto})
};

productosController.updateProduct = async (req, res) => {
  const {title, description, price} =req.body 
  await Producto.findByIdAndUpdate(req.params.id, {title, description, price})
  req.flash('mensaje_satisfactorio', 'Producto actualizado satisfactoriamente')
  res.redirect('/productos')
};

productosController.deleteProduct = async(req, res) => {

  await Producto.findByIdAndDelete(req.params.id)
  req.flash('mensaje_satisfactorio', 'Producto eliminado satisfactoriamente')
  res.redirect('/productos')
};

module.exports = productosController;
