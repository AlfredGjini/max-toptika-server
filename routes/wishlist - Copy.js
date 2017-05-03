var wishes = [];
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
pg.defaults.ssl = true;

pg.connect(connectionStr, function(err, client) {
    if (err) {
        //console.log();
        throw err;
    }
    console.log('Connected to postgresss wishlist!');

    client
        .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products;')
        .on('row', function(row) {
            wishes.push(row);
        });
});
pg.end(function(err) {
    if (err) throw err;
});

exports.find = function(req,res,next){
  var wishlist = req.body.wishlist;
  
  //if()
  wishlist = JSON.parse(wishlist.split(","));
  
  console.log(wishes[0]);
  var data = [];
  for(var i in wishlist){
      data[i] = wishes[wishlist[i]-1];
  }
  res.send(data);
};
