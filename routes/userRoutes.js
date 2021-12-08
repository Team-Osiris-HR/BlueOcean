const userController= require('../controllers/userController.js');


app.use(authcontroller.protect);
app.get('/', useController.getAll);
