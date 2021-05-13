var db_conn = require('./db_connection');
var con = db_conn.getConnection();

exports.searchPlayer = function (req,res) {

    const game = wrapForLikeCaluse(req.query.game);
    const playerName = wrapForLikeCaluse(req.query.playerName);
    const institution = wrapForLikeCaluse(req.query.institution);
    const city = wrapForLikeCaluse(req.query.city);
    const country = wrapForLikeCaluse(req.query.country);
    const page = wrapForLikeCaluse(req.query.page);

    var sql = "SELECT id,name FROM user where selected_games like ? and name like ? and institution like ? and city like ? and country like ?";
    con.query(sql, [game, playerName, institution, city, country], function (err, result) {
        if (err) console.log(err)
        console.log(result);
        res.json(result);
    })
}

function wrapForLikeCaluse(value){
    // % % used to user this values inside mysql like operator
    if (value == undefined || value == "null"){
        value = "";
    }
    console.log(value)
    return "%"+value+"%";
}