var clinicData = [];
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
pg.defaults.ssl = true;


exports.getClinicCard = function(req,res,next){
  var client_id = req.body.client_id;
    var id = req.body.id;

  pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgresss! get clinic card');
      var query="SELECT * FROM clinic_card WHERE id_client='"+client_id+"' AND user_id='"+id+"' ORDER BY data_vizites DESC LIMIT 1";

      client
        .query(query)
         // .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products2 WHERE kodartikulli = $1',[productId])
        
        .on('end', function(end) {
          //console.log(row);
          //console.log('Single item : ', productId);
          //console.log(end);


          if (end.rowCount==0) {
            end.paRezultat=0;
            res.send(end);
          }else{
          end.rows[0].paRezultat=1;
          res.send(end.rows[0]);
          }


          // client.end();
          done();
        });
    });
  pg.end(function(err) {
        if (err) throw err;
    });
};
