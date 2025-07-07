const { createTransport } = require("nodemailer");
const { configObjet } = require("../config");

const transport = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: configObjet.gmail_user,
        pass: configObjet.gmail_pass
    }
})

exports.sendEmail = async (user, productos) => {

    const detalle = productos.map(prod => `
        <div style="margin-bottom: 10px;">
            <h3>${prod.title}</h3>
            <p><strong>Categoría:</strong> ${prod.category}</p>
            <p><strong>Cantidad:</strong> ${prod.quantity}</p>
            <p><strong>Precio Unitario:</strong> $${prod.price}</p>
            <p><strong>Subtotal:</strong> $${prod.subtotal}</p>
        </div>
        <hr />
    `).join("");

    const total = productos.reduce((acc, prod) => acc + prod.subtotal, 0);
     const detalleHTML = `
        <h2>Gracias por tu compra</h2>
        <p>A continuación se detallan los productos adquiridos:</p>
        ${detalle}
        <h3>Total de la compra: $${total}</h3>
        <p>Esperamos verte pronto nuevamente.</p>
    `;

    await transport.sendMail({
        from: configObjet.gmail_user,
        to: user,
        subject: "Detalle de compra",
        html: detalleHTML
    })
}