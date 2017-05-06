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
console.log(rezervime);

exports.getReservations = function(req,res,next){

};

exports.setReservation = function(req,res,next){
  var data = req.body.date;
  var ora = req.body.ora;
  var dyqan = req.body.dyqan;
  var shenime = req.body.shenime;
  var aprovuar = "jo";
  var id = req.body.id;
  console.log(id);
  console.log(req.body);
  var id_clienti;
  console.log('Saving data....');
  // var transporter = mailer.createTransport('smtps://tarzanprenga17%40gmail.com:M3tall1ca!@smtp.gmail.com');
    var transporter = mailer.createTransport( {
        host: "smtp.gmail.com", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: "maxoptikasmtp@gmail.com",
            pass: "maxoptika.1A"
        }
    });
  var mailOptions = {
    from: '"MaxOptika App" <tarzanprenga17@gmail.com>', // sender address
    to: 'agjini@dea.com.al', // list of receivers
    subject: 'Rezervim Takimi!', // Subject line
    text: 'Hello world', // plaintext body
    html: 'First Html body!'// html body
  };
  
  pg.connect(connectionStr, function(err, client, done) {
      if (err){ throw err;
        }
        console.log('Saving data 123....');

      client
        .query('SELECT id,emer,mbiemer,celular FROM clients WHERE user_id = $1;',[id])
        .on('end', function(row) {
          mailOptions.html = 'Pershendetje!</b><br>Klienti ' + row.emer + " " + row.mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + data + "<br><b>Ora</b> : "+ ora + "<br>" + "<b>Dyqani</b> : " + dyqan + "<br><b>Shenime</b> : " + shenime + "<br><b>Celular</b> : " + row.celular + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>";// html body
          transporter.sendMail(mailOptions, function(error, info){
              if(error){
                  console.log('1');
                  console.log(error);
                  return console.log(error);
              }
              console.log('Message sent: ' + info.response);
          });
          console.log('inside 123....');
          id_clienti = row.id;
          console.log('Stage one complete...');
          console.log('Initiating stage two...');
          client.query('INSERT INTO reservations(id_klienti,data,ora, dyqani,shenime,aprovuar) VALUES($1,$2,$3,$4,$5,$6)',[id_clienti,data,ora,dyqan,shenime,],
            function(err, result,done) {
              if (err) {
                console.log(err);
              } else {
                console.log('Stage two completed successfully...');
                //done();
                //client.end();
              }
            });
          }).on('error', function(error) {
            //handle the error
            console.log('2');
            console.log(error);

          });
        });
      
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
