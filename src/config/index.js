const  dotenv  = require("dotenv");
const { connect } = require("mongoose");
const { logger } = require("../utils/logger");

dotenv.config();
exports.configObjet = {
    port: process.env.PORT || 8080,
    private_key : process.env.PRIVATE_KEY
}


exports.connectDb = async () => {
    logger.info("Base de datos conectada");
    await connect(process.env.MONGO_URL)
}