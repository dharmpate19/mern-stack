const express = require("express");
const authRouter = require("./routes/contactRoutes");
const errorHanlder = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000

app.use("/api/contacts", authRouter);
app.use(errorHanlder)

app.listen(PORT, () => console.log("Server is running on PORT:3000"))