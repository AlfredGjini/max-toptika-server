var wishes = [];
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
pg.defaults.ssl = true;


exports.find = function(req,res,next){
  
  var wishlist = req.body.wishlist;

  wishlist = JSON.parse(wishlist.split(","));

  var params = [];
  for(var i = 1; i <= wishlist.length; i++) {
    params.push('$' + i);
  }
  // var queryText = 'SELECT distinct on(kodartikulli) kodartikulli, grupi, kodifikimartikulli2, pershkrimartikulli FROM products2 WHERE kodartikulli IN (' + params.join(',') + ') ORDER BY kodartikulli';
  var queryText = 'SELECT distinct on(products2.kodartikulli) products2.kodartikulli, products2.grupi, products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.kodartikulli IN (' + params.join(',') + ') ORDER BY products2.kodartikulli';



      pg.connect(connectionStr, function(err, client) {

        if (err) {
            //console.log();
            throw err;
        }
        console.log('Connected to postgres wishlist!');

        client
            .query(queryText, wishlist)
            .on('row', function(row) {
                 wishes.push(row);
                 
            })
            .on('end', function(result) {
            // console.log(result.rowCount + ' rows were received');

                res.send(wishes);
                wishes=[];
                client.end();
          });
    });
    pg.end(function(err) {
        if (err) throw err;
    });

  
};




