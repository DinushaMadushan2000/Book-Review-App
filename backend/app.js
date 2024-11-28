import Express from "express";
import connectDB from "./config/connection.js";

const app = Express();

app.route('/').get((req, res) => {
    res.send('hello from Coullax');
})
connectDB();

const port = 3000;
app.listen(port, console.log(`server running on ${port}`));

app.listen(port, console.log(`server is running on port ${port}`));
