const path = "./carts.json"

class cartManager {
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
    createCart = async () => {}
    getCartById = async ()=> {}
    createProductToCart = async() => {}


}