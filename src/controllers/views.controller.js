const { viewsService } = require ('../service')

class ViewsController {
 constructor () {
    this.service = viewsService
 }    

 
getPage =  async (req, res) => {
    try {
        const isLoggedIn = req.cookies.token; // Dependiendo de cómo manejes la autenticación
        let cartId = null;

        if (isLoggedIn) {
            // Si el usuario está logueado, buscar el carrito asociado o crear uno si no existe
            let cart = await this.service.cartService.getCarts();

            if (cart.length === 0) {
                cart = await this.service.cartService.createCart({ userId: req.user._id });  // Crear un carrito para el usuario
                cartId = cart._id;
            } else {
                // Si el carrito ya existe, usar el primer carrito encontrado
                cartId = cart[0]._id;
            }
        } else {
            // Si el usuario no está logueado, no hay carrito
            cartId = null;
        }

        
        const { limit = 10, page = 1, query = "", sort } = req.query;
        const limitInt = parseInt(limit);
        const pageInt = parseInt(page);

        // Filtro de búsqueda (ajustar según sea necesario)
        let filter = {};
        if (query) {
            filter = { type: query }; // Filtra por el tipo de producto
        }

        // Obtener los productos desde la base de datos
        const response = await this.service.productService.getProducts(filter, limitInt, pageInt, sort);
        const { payload: products, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = response;

         
    
        // Renderizar la vista con los productos
        res.render("home", {
            cartId,
            products: products,
            totalPages: totalPages,
            currentPage: pageInt,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevPage: prevPage,
            nextPage: nextPage,
            limit: limitInt,
            query: query,
            sort: sort
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al obtener los productos");
    }
}


getProductDetail =  async (req, res) => {
    try {
        const isLoggedIn = req.cookies.token; // Dependiendo de cómo manejes la autenticación
        let cartId = null;

        const { pid } = req.params
        const product = await this.service.productService.getProduct(pid)

        if (isLoggedIn) {
            // Si el usuario está logueado, buscar el carrito asociado o crear uno si no existe
            let cart = await this.service.cartService.getCarts();

            if (cart.length === 0) {
                cart = await this.service.cartService.createCart({ userId: req.user._id });  // Crear un carrito para el usuario
                cartId = cart._id;
            } else {
                // Si el carrito ya existe, usar el primer carrito encontrado
                cartId = cart[0]._id;
            }
            res.status(200).render("detalles", { product, cartId });
        } else {
            // Si el usuario no está logueado, no hay carrito
            cartId = null;
            return res.status(401).render("detalles", { product, cartId });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos");
    }
}

getCartDetail = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await this.service.cartService.getCart(cid);

        // Calcular subtotales de productos
        const productsSubtotal = cart.products.map(product => ({
            ...product,
            subtotal: product.quantity * product.product.price // Calcula subtotal por producto
        }));

        // Calcular subtotal total
        const subtotalTotal = productsSubtotal.reduce((total, product) => total + product.subtotal, 0);

        // Enviar datos a la vista
        res.render("cart", { products: productsSubtotal, quantity: cart.quantity, cartId: cid, subtotalTotal });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos");
    }
}

}

module.exports = {
    ViewsController
}