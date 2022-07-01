
const router = require("express").Router();

const {
  renderProducForm,
  createNewProduct,
  renderProduct,
  renderEditForm,
  updateProduct,
  deleteProduct
} = require("../Controllers/productos.controller");

//Nuevo Productos
router.get("/productos/add", renderProducForm);
router.post("/productos/newProduct", createNewProduct);

//Obtener todos los productos
router.get("/productos", renderProduct);

//Editar Productos

router.get("/productos/edit/:id", renderEditForm);

//Actualizar
router.put("/productos/edit/:id", updateProduct);

// Delete

router. delete("/productos/delete/:id",deleteProduct);

module.exports =router
