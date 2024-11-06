const  dotenv  = require("dotenv");
const { connect } = require("mongoose");

dotenv.config();
exports.configObjet = {
    port: process.env.PORT || 8080,
    private_key : process.env.PRIVATE_KEY
}

exports.connectDb = async () => {
    console.log("Base de datos conectada");
    await connect(process.env.MONGO_URL)
}