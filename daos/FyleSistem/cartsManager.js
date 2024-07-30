const fs = require("fs");
const path = "./db/carts.json"

class CartManager {
    constructor() {
        this.path = path
    }
    
    getCart = async () => {
        try{(fs.existsSync(path))
            const result = await fs.promises.readFile(this.path, "utf-8");
            const cart = JSON.parse(result);
            return cart;
        } catch (error) {
            return [];   
        }
    }

    createCart = async (productos) => {
        try{
        const cart = await this.getCart();
        if (cart.length === 0) {
            newcart.id = 1
            newcart.products = [{...productos}];
        }  else {
            newcart.id = cart[cart.length - 1].id + 1
            newcart.products = [...cart.products]
        }

        cart.push(newcart);
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2), 'utf-8');
        // { id : "" , products : [{prodId: 1, quantity : 1}] }
    } catch (error) {
        console.log(error);
    }
}


    getCartById = async (id_cart)=> {
            try {
                const carts = await this.getCart()
                let cartId = carts.find(cart => Number(cart.id) === Number(id_cart));
                if (!cartId) {
                    console.log("No existe el carrito")
                }
                return cartId;
            } catch (error) {
                console.log(error)
                return null
            }
    }


    createProductToCart = async(product) => {
        try {
            const cart = await this.getCartById()
            cartNewProduct = {...cart, product}
            cart.push(cartNewProduct)
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = CartManager;