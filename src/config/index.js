const {connect} = require ("mongoose");

exports.connectDb = async () => {
    console.log("Base de datos conectada");
    await connect("mongodb+srv://braiankler30:A0oYf2hBA8XxOuT5@clustercoder.qfkuo.mongodb.net/products?retryWrites=true&w=majority&appName=ClusterCoder/")
}