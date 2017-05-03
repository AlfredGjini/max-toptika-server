var clinicData = [];
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
pg.defaults.ssl = true;
    

exports.getClinicCard = function(req,res,next){
    var client_id = 0;
    // var id = req.query.id;
    var id =12;
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      client
        .query('SELECT * FROM clients WHERE user_id=$1;',[id])
        .on('row', function(row) {
          client_id = row.id;
          console.log('Stage one completed successfully....');
          client.query('SELECT * FROM clinic_card WHERE id_client=$1 ORDER BY data_vizites DESC LIMIT 1',[client_id])
            .on('row',function(row){
              console.log('Initiating stage two....');
              clinicData.push(row);
              console.log('Stage two completed!');
              console.log(row.id);
              res.send(clinicData);
              done();
              // client.end();
              
            });
          
        });
    });
      
    
};
