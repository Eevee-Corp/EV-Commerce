const express = require('express');
const app = express();
const port = 3000
const cors = require('cors');
//import controllers here 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const {getProducts} = require('./controllers/itemControllers')

//server our html and css files here 
// app.use(express.static(path.join(__dirname, '')))

//routes

app.get('/products', getProducts)

// app.post('/postItem', 
//   addProducts, 
//   (req, res) => {
//   return res.status(200).json(res.locals.addItem)
// })


// app.delete('/deleteItem',
//   deleteProduct, 
//   (req, res) => {
//   return res.status(200).json(res.locals.deleteItem); 
// })

//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Error in unknown middleware',
        status: 500,
        message: { err: 'An error occired' }
    }
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message); 
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = app; 