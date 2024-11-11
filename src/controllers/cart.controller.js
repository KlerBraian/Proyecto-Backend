const { cartService, ticketService, productService } = require("../services");


class CartController {
    constructor() {
        this.service = cartService
    }

getCarts = async (req, res) => {
    try {
        const cartsDb = await this.service.getCarts()
        console.log(JSON.stringify(cartsDb, null, 2))
        res.send({ status: "success", payload: cartsDb })
    } catch (error) {
        console.log(error)
    }
}

getCart = async (req, res) => {
    try {
        const { cid } = req.params
        const cartDb = await this.service.getCart(cid)
        res.send({ status: "success", payload: cartDb, cartId: cid })
    } catch (error) {
        console.log(error)
    }
}

createCart =  async (req, res) => {
    try {
        const { product, quantity  } = req.body; // Asegúrate de que `quantity` sea un número
        const userId = req.user.cartId

        let cart = await this.service.getCart(userId);

        if (!cart) {
            // Crear un nuevo carrito con el producto
            cart = await this.service.createCart({_id: userId, products: [{ product, quantity: parseInt(quantity) }] });
        } else {
            // Actualizar el carrito con el producto
            cart = await this.service.updateProductCart(cart._id, product, parseInt(quantity));
        }
        req.user.cartId = cart._id

        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al manejar el carrito");
    }
}

updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { body } = req
        const carritoModificado = await this.service.updateCart(cid, body)
        res.send({ status: "success", carritoModificado })

    } catch (error) {
        console.log(error)
    }
}

updateProductCart =  async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body
        const response = await this.service.updateProductCart(cid, pid, quantity, true);
        res.send({ status: "success", data: response })
    }
    catch (error) {
        console.log(error)
    }
}

deleteCart =  async (req, res) => {
    try {
        const { cid } = req.params
        const carritoEliminado = await this.service.deleteCart(cid)
        res.send(carritoEliminado)
    } catch (error) {
        console.log(error)
    }
}
 

deleteProductCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const productoEliminado = await this.service.deleteProductCart(cid, pid)
        console.log(productoEliminado)
        res.send({ status: "success", productoEliminado })
    } catch (error) {
        console.log(error)
    }
}

purchaseCart = async (req,res) => {
    try {
        const {cid} = req.params
        const user = req.user.email
    
        const cart = await this.service.getCart(cid)
        const disponibles = [];
        const noDisponibles= []

        cart.products.forEach((cartProduct) => {
            const { product, quantity } = cartProduct;
            // Verificamos si hay suficiente stock
            if (quantity <= product.stock) {
                disponibles.push(cartProduct); // Si hay stock suficiente
                productService.updateProduct(product._id,{stock: product.stock - quantity});
                this.service.deleteProductCart(cid,product._id)
            } else {
                noDisponibles.push(cartProduct); // Si no hay stock suficiente
            }
        });
 
        const productsSubtotal = disponibles.map(product => ({
            ...product,
            subtotal: product.quantity * product.product.price // Calcula subtotal por producto
        }));

        // Calcular subtotal total
        const amount = productsSubtotal.reduce((total, product) => total + product.subtotal, 0);
        
         const newTicket = {
                purchaser :user,
                amount : amount
            }
            const prodComprados =  disponibles.map(cartProduct => {
                const {product, quantity} = cartProduct
                return {
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    quantity : `${quantity} unidades`,
                    subtotal:  quantity * product.price
                };
            });

            const prodNoComprados = noDisponibles.map(cartProduct => {
                const {product, quantity} = cartProduct
                return {
                    razon: "Denegado por falta de stock",
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    stock: product.stock,
                    quantity : `${quantity} unidades`
                };
            });

            req.session.prodComprados = prodComprados;
            req.session.prodNoComprados = prodNoComprados;
         
        const ticket = await ticketService.createTicket(newTicket)
        req.session.ticketId = ticket._id;

        res.redirect(`/api/carts/${cid}/purchase`);
    } catch (error) {
        console.log(error)
    }
}


}

module.exports = {
    CartController
}