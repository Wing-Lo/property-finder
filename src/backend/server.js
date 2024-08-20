const homeRoutes = require('./routes/homeRoutes');
app.use('/', homeRoutes);

app.use(express.static('public'));