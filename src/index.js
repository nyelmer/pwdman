const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
mongoose.connect(`${process.env.DB_ADDRESS}${process.env.DB_NAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log("Database connection successful")
);

// Middlewares
app.use(express.json());

// Import Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/password", require("./routes/passwordRoutes"));

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server started running on port ${process.env.PORT}`)
});