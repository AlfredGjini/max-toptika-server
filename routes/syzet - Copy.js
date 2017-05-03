var syzet = [];
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
pg.defaults.ssl = true;

exports.findAll = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var response;
    console.log(offset);
    pg.connect(connectionStr, function(err, client) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres!');

      client
        .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products limit 20 offset ' + offset)
        .on('row', function(row) {
          syzet.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzet.length);
          if(offset !== 0){
            response = syzet.splice(0,offset);
          }else{
            response = syzet;
          }

          console.log('------------------ ',response.length);
          console.log(response);
          res.send(response);
        });
    });
    console.log('too early');
    //res.send(products);
    console.log('test');
    //console.log(products);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(syzet[id]);
};

exports.getSingleProduct = function(req, res, next){
  var productId = req.body.productId;
  console.log(productId);
  pg.connect(connectionStr, function(err, client) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres!');

      client
        .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products WHERE kodartikulli = $1',[productId])
        .on('row', function(row) {
          console.log('Single item : ', productId);
          res.send(row);
        });
    });
}