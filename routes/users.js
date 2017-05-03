var users = [];
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
    pg.defaults.ssl = true;
    pg.connect(connectionStr, function(err, client,done) {
      if (err) {
        //console.log();
        throw err;
      }
      client
        .query('SELECT * FROM users,clients WHERE users.id = clients.user_id;')
        .on('row', function(row) {
          users.push(row);
          done();
          // client.end();
      });
    });

exports.getUser = function(req,res,next){
  console.log('Fetching request....');
    var username = req.body.username;
    var password = req.body.password;
    var token =   "RATUG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E%3DOD31475313194456";
    var id = "";
    var found = false;
    var userExists = false;
    for(var index in users){
      if(username == users[index]['username'] && password == users[index]['password']){
        found = true;
        id = users[index]['user_id'];
        break;
      }else if(username == users[index]['username']){
        userExists = true;
      }
    }

    if(found){
      res.send(JSON.stringify({login:1,username:username,id:id}));
    }else if(userExists){
      res.send(JSON.stringify({login:0}));
    }else{
      res.send(JSON.stringify({login:-1}));
    }
};
