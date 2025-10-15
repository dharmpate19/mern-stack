const express = require("express");
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const errorHanlder = require("./middleware/errorHandler");
const dbConnect = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser")


dbConnect();
const app = express();


app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 3000

app.use("/api/contacts", contactRouter);
app.use("/api/user", userRouter);
app.use(errorHanlder)

app.listen(PORT, () => console.log("Server is running on PORT:", PORT))