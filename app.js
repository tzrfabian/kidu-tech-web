const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));
app.use(session({
    secret: 'classified',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}));
app.use(require('./routes'));
app.use('/uploads', express.static('uploads'));
app.use(express.static("style"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});