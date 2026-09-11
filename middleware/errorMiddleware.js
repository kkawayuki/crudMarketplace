

//middleware is a callback function that responds to errors

/* add custom logic, if app is in production mode, show full path error on error,
else, hide the alarm*/
const errorMiddleware = (err, req, res, next) =>
{
    console.log('this is error middleware');
    const statusCode = res.statusCode ? res.statusCode : 500; 
    res.status(statusCode); 
    res.json({message: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : null})
}

module.exports = errorMiddleware;