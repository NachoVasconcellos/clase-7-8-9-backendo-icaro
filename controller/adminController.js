const renderPerfil = (req, res) => {
    // res.render("perfil", {usuario:req.session.usuario});
    console.log(req.session);
    res.send("perfil")
};

module.exports = {
    renderPerfil,
}