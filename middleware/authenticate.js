const isAuthenticated = (req, res, nex) => {
    if (req.session.user == undefined){
        return res.status(401).json('You dont have access to this function.')
    }
    next();
};

module.exports = {
    isAuthenticated
}