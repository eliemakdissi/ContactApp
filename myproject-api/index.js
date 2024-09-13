import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRoutes from "./routes/users.js";
import mongoose from "mongoose";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  console.log("[TEST]!");
  res.send("Hello from Homepage.");
});

mongoose
  .connect(
    "mongodb+srv://eliemakdissi23:LFeX2XwPjoT5auZN@devtamin-api.cdaa5bq.mongodb.net/myproject-database?retryWrites=true&w=majority&appName=Devtamin-API"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    );
  })

  .catch((error) => {
    console.log(error);
  });
