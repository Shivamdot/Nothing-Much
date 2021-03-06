const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('year', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('request.log', log + '\n');
    next();
});


// For Maintenance Page
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h1 style="color: lightblue " >Hello express !</h1>');
    // res.send({
    //     name: 'shivam',
    //     age: 19,
    //     motive: 'Code everyday',
    // });
    res.render('home.hbs', {
        title: 'Home Page',
        welcome: 'Welcome to our website',
    });
});

app.get('/about', (req, res) => {
    // res.send('ABOUT   PAGE');
    res.render('about.hbs', {
        title: 'ABOUT',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'My Projects',
    })
});

app.get('/bad', (req, res) => {
    res.send('<h3 style="color: red">Unable to load the page.... try again later</h3>')
});

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);  
}); 