<<<<<<< 5006dd96bb3dc13cf44e63d60e4e72ca4e28917f
var users = [];
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
    pg.defaults.ssl = true;
    pg.connect(connectionStr, function(err, client) {
      if (err) {
        //console.log();
        throw err;
      }
      client
        .query('SELECT * FROM users;')
        .on('row', function(row) {
          //console.log(JSON.stringify(row));
          users.push(row);
          console.log(users);
      });
    });

exports.getUser = function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var token =   "RATUG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E%3DOD31475313194456";
    var found = false;
    var userExists = false;
    for(var index in users){
      if(username == users[index]['username'] && password == users[index]['password']){
        found = true;
        break;
      }else if(username == users[index]['username']){
        userExists = true;
      }
    }

    if(found){
      res.send(JSON.stringify({login:1,username:username,token:token}));
    }else if(userExists){
      res.send(JSON.stringify({login:0}));
    }else{
      res.send(JSON.stringify({login:-1}));
    }
};
=======
>>>>>>> new version
