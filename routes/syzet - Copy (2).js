var syzet = [];
var syzetD = [];
var syzetO = [];
var syzetK = [];
var syzetL = [];
var syzetSearch = [];
var mailer = require('nodemailer');
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
      console.log('Connected to postgres! 1');

      client
        .query('SELECT products2.grupi, products2.kodartikulli,products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.grupi=\'Syze Dielli\'  limit 20 offset ' + offset)
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
          client.end();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};
exports.findAllDielli = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseD;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 2');

      client
        .query('SELECT products2.grupi, products2.kodartikulli,products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.grupi=\'Syze Dielli\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetD.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetD.length);
          if(offset !== 0){
            responseD = syzetD.splice(0,offset);
          }else{
            responseD = syzetD;
          }

          console.log('------------------ ',responseD.length);
          console.log(responseD);
          res.send(responseD);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    syzetD = [];
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};
exports.findAllOptike = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseO;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 3');

      client
        .query('SELECT products2.grupi, products2.kodartikulli,products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.grupi=\'Syze Optike\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetO.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetO.length);
          if(offset !== 0){
            responseO = syzetO.splice(0,offset);
          }else{
            responseO = syzetO;
          }

          console.log('------------------ ',responseO.length);
          console.log(responseO);
          res.send(responseO);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};
exports.findAllKoleksion = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseK;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 4');

      client
        .query('SELECT products2.grupi, products2.kodartikulli,products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.grupi=\'Syze Dielli\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetK.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetK.length);
          if(offset !== 0){
            responseK = syzetK.splice(0,offset);
          }else{
            responseK = syzetK;
          }

          console.log('------------------ ',responseK.length);
          console.log(responseK);
          res.send(responseK);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};
exports.findAllLente = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseL;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 5');

      client
        .query('SELECT products2.grupi, products2.kodartikulli,products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.grupi=\'Lente Kontakti\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetL.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetL.length);
          if(offset !== 0){
            responseL = syzetL.splice(0,offset);
          }else{
            responseL = syzetL;
          }

          console.log('------------------ ',responseL.length);
          console.log(responseL);
          res.send(responseL);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};

exports.findAllSearch = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var kerkimiFjala = req.body.kerkimiFjala;
    var responseSearch;
    var offset=20;
    var kerkimiFjala2=[];
    kerkimiFjala2=kerkimiFjala.split(",");

    console.log(kerkimiFjala2);
    console.log(typeof(kerkimiFjala2));

    var params = [];
      for(var i = 0; i < kerkimiFjala2.length; i++) {
        console.log(i);
        if (i!=kerkimiFjala2.length-1) {
        params.push('products2.kodartikulli ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.grupi ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.pershkrimartikulli ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.kodifikimartikulli2 ILIKE \'%' + kerkimiFjala2[i] +'%\' OR ');
        }else {
          // params.push('products2.kodartikulli LIKE \'%' + kerkimiFjala2[i] +'%\'');
          // params.push('products2.kodartikulli LIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.grupi LIKE \'%' + kerkimiFjala2[i] +'%\'');
          params.push('products2.kodartikulli ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.grupi ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.pershkrimartikulli ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.kodifikimartikulli2 ILIKE \'%' + kerkimiFjala2[i] +'%\' ');
        }
      }

    var queryTextS = 'SELECT distinct on(products2.kodartikulli) products2.kodartikulli, products2.grupi, products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE ' + params.join(' ') + ' ORDER BY products2.kodartikulli';

    console.log(queryTextS);
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 6');

      client
        .query(queryTextS)
        .on('row', function(row) {
          syzetSearch.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetSearch.length);
          // if(offset !== 0){
          //   responseSearch = syzetSearch.splice(0,offset);
          // }else{
          //   responseSearch = syzetSearch;
          // }
          responseSearch = syzetSearch;

          console.log('------------------ ',responseSearch.length);
          console.log(responseSearch);
          res.send(responseSearch);
          client.end();
          done();
          syzetSearch=[];
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};

exports.regjistroUser = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;
    var fjalekalimi = req.body.fjalekalimi;
    var date = req.body.date;

    var queryTextRegister = 'insert into users(name,username,password,emailval) values(\''+emer+'\',\''+emer+'.'+mbiemer+'\',\''+fjalekalimi+'\',\''+email+'\')';
    var queryTextEmailCheck = 'SELECT * FROM users WHERE emailval = \''+email+'\'';
    //var queryTextRegisterClients = 'insert into clients(emer,mbiemer,mosha,gjinia,vendlindja,celular,email,user_id) values(\''+emer+'\',\''+emer+'.'+mbiemer+'\',\''+tel+'\',\''+email+'\',\''+fjalekalimi+'\',\''+date+'\')';
    

    // console.log(queryTextRegister);
    console.log(queryTextEmailCheck);
    var emailNjejt = [];
    var emailNjejt2 = [];
    var sukses;
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 7');

      client
        .query(queryTextEmailCheck)
        .on('row', function(row) {
          emailNjejt.push(row);
          // done();
          // client.end();
      }).on('end',function(){
          console.log(emailNjejt);
          if (emailNjejt.length==0) {
            console.log('bosh');

            client.query(queryTextRegister, function(err, result, done) {
              if (err) {
                console.log(err);
              } else {
                console.log("brenda 1");
                    //client.end();
                    //done();
                  //   client.query(queryTextEmailCheck, function(err, result, done) {
                  //     if (err) {
                  //       console.log(err);
                  //     } else {
                  //       //console.log('Regjistrimi perfundoi me sukses');
                  //       //res.send(JSON.stringify({regjistrimi:1}));
                  //       //client.end();
                  //       console.log(result.id);
                  //       console.log("brenda2")
                  //     }

                  // });


                   client
                    .query(queryTextEmailCheck)
                    .on('row', function(row) {
                      emailNjejt2.push(row);
                      // done();
                      // client.end();
                  }).on('end',function(){
                     //console.log(emailNjejt2);
                     //console.log("brenda2");
                     //console.log(emailNjejt2[0].id);

                     var queryTextRegisterClients = 'insert into clients(emer,mbiemer,mosha,gjinia,vendlindja,celular,email,user_id) values(\''+emer+'\',\''+mbiemer+'\',\'0\',\'a\',\'Pa Percaktuar\',\''+tel+'\',\''+email+'\',\''+emailNjejt2[0].id+'\')';



                     client.query(queryTextRegisterClients, function(err, result, done) {
                      if (err) {
                        console.log(err);
                      } else {

                        console.log('u shtuan tek klientet');
                        console.log('Regjistrimi perfundoi me sukses');
                        res.send(JSON.stringify({regjistrimi:1}));
                        // client.end();
                        //done();
                      }
                      });


                  });



                
              }

            });

          }else {
            console.log('jo bosh');
            res.send(JSON.stringify({regjistrimi:0}));
            //client.end();
          }
          //done();
        });

      // done();
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    // res.send(sukses);
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};


exports.loginUser = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var email = req.body.email;
    var fjalekalimi = req.body.fjalekalimi;

    var queryTextEmailAndPassCheck = 'SELECT * FROM users INNER JOIN clients ON (users.id=clients.user_id) WHERE users.emailval = \''+email+'\' AND users.password = \''+fjalekalimi+'\' ';
    // var queryTextEmailAndPassCheck = 'SELECT * FROM users WHERE emailval = \''+email+'\' AND password = \''+fjalekalimi+'\' ';
    // console.log(queryTextRegister);
    console.log(queryTextEmailAndPassCheck);
    var emailNjejtPass = [];
    var sukses;
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 8');

      client
        .query(queryTextEmailAndPassCheck)
        .on('row', function(row) {
          emailNjejtPass.push(row);
          // done();
          // client.end();
      }).on('end',function(){
          // console.log(emailNjejtPass);
          if (emailNjejtPass.length==0) {
            console.log('bosh');
            console.log('Ky user nuk u gjet');
            var login = {login:0};
            emailNjejtPass.push(login);
            // console.log(emailNjejtPass);

            res.send(emailNjejtPass);


          }else {
            console.log('jo bosh');
            // res.send(JSON.stringify({login:1}));
            emailNjejtPass[0].login=1;
            // console.log(emailNjejtPass);
            res.send(emailNjejtPass);
            client.end();
            console.log('Ky user ekziston');
          }
          done();
        });

      // done();
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    // res.send(sukses);
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};


exports.forgotPassword = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var email = req.body.email;


    var queryEmailCheck = 'SELECT * FROM users2 WHERE email = \''+email+'\'';
    // console.log(queryTextRegister);
    console.log(queryEmailCheck);
    var passData = [];
    var sukses;
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
      to: 'agjini@dea.com.al', // list of receivers
      subject: 'Rikthim Fjalekalimi!', // Subject line
      text: 'Hello world', // plaintext body
      html: 'First Html body!'// html body
    };
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 8');

      client
        .query(queryEmailCheck)
        .on('row', function(row) {
          passData.push(row);
          // done();
          // client.end();
      }).on('end',function(){
          // console.log(emailNjejtPass);
          if (passData.length==0) {
            console.log('bosh');
            console.log('Ky user nuk u gjet');
            res.send(JSON.stringify({forgot:0}));


          }else {
            console.log('jo bosh');
            // res.send(JSON.stringify({login:1}));
            passData[0].forgot=1;
            console.log(passData);
            // Send Email
            // mailOptions.to='\''+passData[0].email+'\'';
            mailOptions.to=passData[0].email;
            // mailOptions.html = 'Pershendetje!</b><br>Klienti ' + passData[0].emer + " " + passData[0].mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + passData[0].fjalekalimi + "<br><b>Ora</b> : "+ passData[0].fjalekalimi + "<br>" + "<b>Dyqani</b> : " + passData[0].fjalekalimi + "<br><b>Shenime</b> : " + passData[0].fjalekalimi + "<br><b>Celular</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
            mailOptions.html = 'Pershendetje ' + passData[0].emer + " " + passData[0].mbiemer + " <br>Fjalekalimi juaj eshte si me poshte.<br><br>"+ "<b>Fjalekalimi</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

            res.send(JSON.stringify({forgot:1}));
            client.end();
            console.log('Ky user ekziston');
          }
          done();
        });

      // done();
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    // res.send(sukses);
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};


exports.pickUpStore = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    var shportaElem = req.body.shportaElem;
    console.log(emer+' '+mbiemer+' '+tel+' '+email+' '+emailTo+' '+shportaElem);

    // var transporter = mailer.createTransport('smtps://tarzanprenga17%40gmail.com:M3tall1ca!@smtp.gmail.com');
    //   var transporter = mailer.createTransport( {
    //     host: "smtp.gmail.com", // hostname
    //     secureConnection: true, // use SSL
    //     port: 465, // port for secure SMTP
    //     auth: {
    //         user: "maxoptikasmtp@gmail.com",
    //         pass: "maxoptika.1A"
    //     }
    // });
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
      to: 'a.gjini@live.com', // list of receivers
      subject: 'Pick Up On Store!', // Subject line
      text: 'Hello world', // plaintext body
      html: 'First Html body!'// html body
    };
    
    // mailOptions.to=passData[0].email;
    // mailOptions.html = 'Pershendetje!</b><br>Klienti ' + passData[0].emer + " " + passData[0].mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + passData[0].fjalekalimi + "<br><b>Ora</b> : "+ passData[0].fjalekalimi + "<br>" + "<b>Dyqani</b> : " + passData[0].fjalekalimi + "<br><b>Shenime</b> : " + passData[0].fjalekalimi + "<br><b>Celular</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
    mailOptions.html = 'Pershendetje <br> Klienti ' + emer + " " + mbiemer + " me nr.tel: "+tel +" dhe Email: "+email +" ka zgjedhur per te blere produktet me ID <br><br>" + shportaElem + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
        res.send(JSON.stringify({sentPickUp:0}));
      }
      console.log('Message sent: ' + info.response);
      res.send(JSON.stringify({sentPickUp:1}));
    });

};

exports.payOnDelivery = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    var adresa = req.body.adresa;
    var shportaElem = req.body.shportaElem;
    console.log(emer+' '+mbiemer+' '+tel+' '+email+' '+adresa+' '+shportaElem);

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
      from: '"MaxOptika App" <a.gjini@live.com>', // sender address
      to: 'a.gjini@live.com', // list of receivers
      subject: 'Pay On Delivery!', // Subject line
      text: 'Hello world', // plaintext body
      html: 'First Html body!'// html body
    };
    
    // mailOptions.to=passData[0].email;
    // mailOptions.html = 'Pershendetje!</b><br>Klienti ' + passData[0].emer + " " + passData[0].mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + passData[0].fjalekalimi + "<br><b>Ora</b> : "+ passData[0].fjalekalimi + "<br>" + "<b>Dyqani</b> : " + passData[0].fjalekalimi + "<br><b>Shenime</b> : " + passData[0].fjalekalimi + "<br><b>Celular</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
    mailOptions.html = 'Pershendetje <br> Klienti ' + emer + " " + mbiemer + " me te dhena si me poshte: <br>Tel: "+tel +"<br> Email: "+email +"<br>Adrese: "+adresa +"<br> Ka zgjedhur per te blere produktet me ID: " + shportaElem + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
        res.send(JSON.stringify({sentPayD:0}));
      }
      console.log('Message sent: ' + info.response);
      res.send(JSON.stringify({sentPayD:1}));
    });

};



exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(syzet[id]);
};

exports.getSingleProduct = function(req, res, next){
  var productId = req.body.productId;
  console.log(productId);
  pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgresss! 9');

      client
        .query('SELECT products2.grupi, products2.kodartikulli,products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.kodartikulli = $1',[productId])
         // .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products2 WHERE kodartikulli = $1',[productId])
        
        .on('row', function(row) {
          console.log(row);
          console.log('Single item : ', productId);
          res.send(row);
          // client.end();
          done();
        });
    });
  pg.end(function(err) {
        if (err) throw err;
    });
}