var rezervime = [];
var clientData = [];
var pg = require('pg');
var mailer = require('nodemailer');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
    pg.defaults.ssl = true;
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! Rezervim');

      client
        .query('SELECT * FROM reservations;')
        .on('row', function(row) {
          rezervime.push(row);
          client.end();
          done();
        });
    });
      pg.end(function(err) {
        if (err) throw err;
    });
//console.log(rezervime);



exports.getReservations = function(req, res, next){
  var id = req.body.id;
  console.log(id);
  var rezervations = [];
  console.log(id);
  pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgresss! 9');

      client
        .query('SELECT * FROM reservations INNER JOIN clients ON (reservations.id_klienti=clients.id) WHERE clients.user_id = $1',[id])
         // .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products2 WHERE kodartikulli = $1',[productId])
        
        .on('row', function(row) {
          rezervations.push(row);
          //console.log(row);
          //console.log('Single item : ', productId);
          //res.send(row);
          // client.end();
          done();
        }).on('end', function(result) {
          //rezervations.push(row);
          //console.log(rezervations);
          res.send(rezervations);
          // client.end();
          done();
        });
    });
  pg.end(function(err) {
        if (err) throw err;
    });
}


exports.setReservation = function(req,res,next){
  var data = req.body.date;
  var ora = req.body.ora;
  var dyqan = req.body.dyqan;
  var shenime = req.body.shenime;
  var aprovuar = "jo";
  var id = req.body.id;
  var dataExists = req.body.dataExists;
  var klient_id = req.body.klient_id;
  var emer = req.body.emer;
  var mbiemer = req.body.mbiemer;
  var celular = req.body.celular;
  //console.log(id);
  //console.log(req.body);
  var id_clienti;
  //console.log('Saving data....');
  // var transporter = mailer.createTransport('smtps://tarzanprenga17%40gmail.com:M3tall1ca!@smtp.gmail.com');
    var transporter = mailer.createTransport( {
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: true, // use SSL
        port: 587, // port for secure SMTP
        auth: {
            user: "maxoptikasmtp@outlook.com",
            pass: "maxoptika.1A"
        }
    });
  var mailOptions = {
    from: '"MaxOptika App" <maxoptikasmtp@outlook.com>', // sender address
    to: 'alfred.gjini93@gmail.com', // list of receivers
    subject: 'Rezervim Takimi!', // Subject line
    text: 'Hello world', // plaintext body
    html: 'First Html body!'// html body
  };


  // Insertion into orare2 logic
    if(dataExists=='false'){
      //console.log("jam brenda 1");

      pg.connect(connectionStr, function(err, client, done) {
        if (err) {
           //console.log();
          throw err;
        }
        //console.log('jam brenda 2');

        client
          .query('INSERT INTO oraret2 (data,oraret, klientet) VALUES($1,$2,$3)',[data,ora,klient_id])
          // .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products2 WHERE kodartikulli = $1',[productId])
                
          .on('end', function(row) {
            //console.log("U shtuan tek oraret2");

                client.query('INSERT INTO reservations(id_klienti,data,ora, dyqani,shenime,aprovuar) VALUES($1,$2,$3,$4,$5,$6)',[klient_id,data,ora,dyqan,shenime,aprovuar],
                  function(err, result,done) {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log('Inserted successfully to the reservations table case 1...');
                      //done();
                      // This closes all the connection on single dataexist=false
                      client.end();

                      mailOptions.html = 'Pershendetje!</b><br>Klienti ' + emer + " " + mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + data + "<br><b>Ora</b> : "+ ora + "<br>" + "<b>Dyqani</b> : " + dyqan + "<br><b>Shenime</b> : " + shenime + "<br><b>Celular</b> : " + celular + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>";// html body
                      transporter.sendMail(mailOptions, function(error, info){
                          if(error){
                              console.log('1');
                              console.log(error);
                              return console.log(error);
                          }
                          console.log('Message sent: ' + info.response);
                      });

                    }
                  });
            //console.log('Single item : ', productId);
            //res.send(JSON.stringify({success:1}));
            //res.send(row);
            // client.end();
            //done();
          });
        });
      pg.end(function(err) {
        if (err) throw err;
      });

    } else {
      console.log("dataexist true");
      // Get the row from oraret2 and update it's values

      pg.connect(connectionStr, function(err, client, done) {
        if (err) {
           //console.log();
          throw err;
        }
      client
        .query('SELECT * FROM oraret2 WHERE data = $1;',[data])
        .on('end', function(row) {
          //console.log('inside 123....');
          //console.log(row);
          var pergjigje= row.rows[0];
          var newOra= pergjigje.oraret+','+ora;
          var newKlient= pergjigje.klientet+','+klient_id;
          //console.log(newOra);
          //console.log(newKlient);
          var updateQuery="UPDATE oraret2 set oraret='"+newOra+"',  klientet='"+newKlient+"' WHERE DATA='"+data+"'";
          //console.log(updateQuery);
          client.query(updateQuery,
            function(err, result,done) {
              if (err) {
                console.log(err);
              } else {
                //console.log('Stage two completed successfully...');
                //done();
                //client.end();
                client.query('INSERT INTO reservations(id_klienti,data,ora, dyqani,shenime,aprovuar) VALUES($1,$2,$3,$4,$5,$6)',[klient_id,data,ora,dyqan,shenime,aprovuar],
                  function(err, result,done) {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log('Inserted successfully to the reservations table case 2...');
                      //done();
                      client.end();

                      mailOptions.html = 'Pershendetje!</b><br>Klienti ' + emer + " " + mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + data + "<br><b>Ora</b> : "+ ora + "<br>" + "<b>Dyqani</b> : " + dyqan + "<br><b>Shenime</b> : " + shenime + "<br><b>Celular</b> : " + celular + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>";// html body
                      transporter.sendMail(mailOptions, function(error, info){
                          if(error){
                              console.log('1');
                              console.log(error);
                              return console.log(error);
                          }
                          console.log('Message sent: ' + info.response);
                      });

                    }
                  });




              }
            });
          }).on('error', function(error) {
            //handle the error
            console.log('2');
            console.log(error);

          });


          });
    }

      
  res.send(JSON.stringify({success:1}));
};


exports.getOrariTakim = function(req,res,next){

  pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgresss! get orare');

      client
        .query('SELECT * from oraret where id=1 ')
         // .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products2 WHERE kodartikulli = $1',[productId])
        
        .on('end', function(row) {
          //console.log(row);
          //console.log('Single item : ', productId);
          res.send(row);
          // client.end();
          done();
        });
    });
  pg.end(function(err) {
        if (err) throw err;
    });
};



exports.getOraretZene = function(req,res,next){
  var dataZgjdhur = req.body.dataZgjdhur;

  pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgresss! get orare');

      client
        .query('SELECT * FROM oraret2 WHERE data = $1;',[dataZgjdhur])
         // .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products2 WHERE kodartikulli = $1',[productId])
        
        .on('end', function(row) {
          //console.log(row);
          //console.log('Single item : ', productId);
          res.send(row);
          // client.end();
          done();
        });
    });
  pg.end(function(err) {
        if (err) throw err;
    });
};
