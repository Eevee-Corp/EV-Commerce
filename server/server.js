const express = require('express');
const app = express();
const port = 3000
const cors = require('cors');
//import controllers here 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const { login, signup } = require('./controllers/userController')
const {getProducts, addProducts, deleteProducts, updateProducts} = require('./controllers/itemControllers')

//server our html and css files here 
// app.use(express.static(path.join(__dirname, '')))

//routes
app.post('/signup', 
  signup, 
  (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

app.post('/login', 
  login,
  (req, res) => {
    return res.status(200).json(res.locals.login);
  });
  
app.get('/products', getProducts)

app.post('/postItem', 
  addProducts,
  (req, res) => {
  return res.status(200).json(res.locals.addItem)
})

app.delete('/deleteItem/:id', deleteProducts, (req, res) => {
    return res.status(200).json(res.locals.deleteItem);
  });

app.patch('/updateItem/:id', updateProducts, (req, res) => {
    return res.status(200).json(res.locals.updateItem);
  });

//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Error in unknown middleware',
        status: 500,
        message: { err: 'An error occured' }
    }
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message); 
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = app; 