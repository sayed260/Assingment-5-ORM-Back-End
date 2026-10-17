const authRoutes = require('./app/auth/auth.route');
const { config } = require('dotenv');

const userRoutes = require('./app/user/user.route');
const postRoutes = require('./app/post/post.route');
const commentRoutes = require('./app/comment/comment.route');


config();

const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);


// // Handel invalid Router
// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Route not found', "stack" : new Error().stack });
// });

// handle invalid routes
app.use((req, res) => {
    res.status(404).json({message: "invalid route", success: false})
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
        success: false,
        stack: error.stack
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})