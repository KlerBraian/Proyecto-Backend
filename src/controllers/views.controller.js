const { viewsService } = require ('../services')

class ViewsController {
 constructor () {
    this.service = viewsService
 }    

 
 getPage = async (req, res) => {
    try {
        // Verificar si req.user existe antes de acceder a sus propiedades
        const isAdmin = req.user?.role === 'admin';
        const cartId = req.user?.cartId || null;
        const isLoggedIn = req.cookies.token || null;
        const user = req.user?.first_name || null;

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
            isAdmin,
            user,
            isLoggedIn,
            cartId,
            products,
            totalPages,
            currentPage: pageInt,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            limit: limitInt,
            query,
            sort
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al obtener los productos");
    }
};



getProductDetail =  async (req, res) => {
    try {
        const isLoggedIn = req.cookies.token; // Dependiendo de cómo manejes la autenticación
        let cartId = req.user.cartId

        const { pid } = req.params
        const product = await this.service.productService.getProduct(pid)

        if (isLoggedIn) {
            // Si el usuario está logueado, buscar el carrito asociado o crear uno si no existe
 
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
        const isLoggedIn = req.cookies.token || null; // Dependiendo de cómo manejes la autenticación
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
        res.render("cart", { products: productsSubtotal, quantity: cart.quantity, cartId: cid, subtotalTotal, isLoggedIn});
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos");
    }
}



getTicket = async (req, res) => {
    try {
        const ticketId = req.session.ticketId;
        const productosNoDisponibles = req.session.prodNoComprados; // Productos no disponibles
        const productosComprados = req.session.prodComprados; // Productos comprados
        const ticket = await this.service.ticketService.getTicket(ticketId)
        // Renderizar la vista `ticket` con los datos
        res.render("ticket", {
            ticket: ticket,
            productosNoDisponibles: productosNoDisponibles,
            productosComprados : productosComprados
        });
        delete req.session.ticketId;
        delete req.session.prodComprados;
        delete req.session.prodNoComprados;
    } catch (error) {
        console.log(error);
    }
};

}
module.exports = {
    ViewsController
}