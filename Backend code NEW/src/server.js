const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
// const HttpException = require('./utils/HttpException.utils');
// const errorMiddleware = require('./middleware/error.middleware');
const routes = require('./routes');

// Init express
const app = express();
// Init environment / dotenv
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());

//PORT 
const port = process.env.PORT || 4200;
console.log(port);

//Routes
app.use('/',routes);


// // 404 error
// app.all('*', (req, res, next) => {
//     const err = new HttpException(404, 'Endpoint Not Found');
//     next(err);
// });

// // Error middleware
// app.use(errorMiddleware);

// starting the server
app.listen(port, () =>{
    console.log(`🚀 Server running on port ${port}!`);
});