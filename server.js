const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("./shared/mongoose.connect");

const noEndpoint = require("./middleware/noEndpoint");
// const Logging = require("./middleware/logging.middleware");
const verifyBatch = require("./middleware/verifyBatch");

const batch = require("./routes/batch.routes");
const mentors = require("./routes/mentors.routes");
const students = require("./routes/students.routes");
const assign = require("./routes/assign.routes");
const unassign = require("./routes/unassign.routes");

mongoose.connect();

const app = express();

app.use(express.json());

// app.use(Logging);
app.use((req, res, next) => next());

app.use("/batch", batch);
app.use(verifyBatch);

app.use("/mentors", mentors);
app.use("/students", students);

app.use("/assign", assign);
app.use("/unassign", unassign);

app.use(noEndpoint);

const port = 3000;

app.listen(port, () => console.log(`Listening to Port ${port}...`));
