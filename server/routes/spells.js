module.exports = function(app) {
    app.get('/spells', function(req,res) {
        res.end('spells')
    })
}