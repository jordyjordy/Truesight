const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
    try  {
        console.log("VALIDATING")
        const token = req.headers.token
        const decoded = await jwt.verify(token, "secret");
        req.userData = decoded;
        console.log("VALIDATED")
        next()
    } catch (err) {
        console.log("VALIDATION FAILED")
        return res.status(401).json({
            message: "Authentication Failed"
        })
    }
}