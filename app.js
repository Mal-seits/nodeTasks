const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const tasksRoutes = require('./Routes/tasks');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/tasks', tasksRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(5000, () => console.log('server started'));