var clinicData = [];
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
pg.defaults.ssl = true;
    

exports.getClinicCard = function(req,res,next){
    var client_id = req.body.client_id;
    var id = req.body.id;
    // var id = req.query.id;
    //var id =12;
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      client
        .query('SELECT * FROM clinic_card WHERE id_client=$1 AND id=$2 ORDER BY data_vizites DESC LIMIT 1',[client_id],[id])
        .on('end', function(end) {
          console.log(end);
            res.send(end.rows[0]);
            done();
            // client.end();
          
        });
    });
      
    
};
