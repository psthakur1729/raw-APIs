const express = require('express');
const bodyParser = require('body-parser');
const dayTracker = require(__dirname + '/day-tracker.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let work = [];
let items = [];
app.get('/', function(req, res) {

    res.render("index", { listTitle: dayTracker.weekDay(), listItem: items });
});

app.get('/work', function(req, res) {
    res.render("index", { listTitle: "Work", listItem: work });
});

app.post('/', function(req, res) {
    items.push(req.body.item);
    res.redirect('/');
});
app.post('/work', function(req, res) {
    work.push(req.body.item);
    res.redirect('/work');
});
app.listen(3000, function() {
    console.log("Server running on port 3000...");
});