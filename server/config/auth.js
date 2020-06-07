const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
    try  {
        const token = req.headers.token
        const decoded = await jwt.verify(token, "secret");
        req.userData = decoded;
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Authentication Failed"
        })
    }
}