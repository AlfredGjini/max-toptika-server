var express     = require('express'),
    syzet       = require('./routes/syzet'),
    app         = express(),
    users       = require('./routes/users'),
    wishlist    = require('./routes/wishlist'),
    reservation = require('./routes/rezervim'),
    clinic      = require('./routes/clinic-card');
var bodyParser  = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post('/kreu', syzet.findAll);
app.post('/syze-dielli', syzet.findAllDielli);
app.post('/syze-optike', syzet.findAllOptike);
app.post('/syze-koleksion', syzet.findAllKoleksion);
app.post('/syze-lente', syzet.findAllLente);
app.post('/search-result', syzet.findAllSearch);
app.post('/register', syzet.regjistroUser);
app.post('/login-real', syzet.loginUser);
app.post('/forgot-password', syzet.forgotPassword);
app.post('/pick-up-store', syzet.pickUpStore);
app.post('/pay-on-delivery', syzet.payOnDelivery);


app.get('/kartela-klinike', clinic.getClinicCard);

app.post('/product-single',syzet.getSingleProduct);

app.post('/wishlist', wishlist.find);

app.post('/login', users.getUser);


app.post('/takim',reservation.setReservation);

app.get('/test', function(req, res) {
    res.send("Test");
});
app.get('/test/:id', function(req, res) {
    res.send("Test : " + req.params.id);
});
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
