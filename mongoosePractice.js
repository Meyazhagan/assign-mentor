// const mongoose = require("mongoose");

// const connect = () => {
//   mongoose
//     .connect("mongodb://localhost/mentor", {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     })
//     .then(() => {
//       console.log("Connected to mongo db");
//     })
//     .catch((err) =>
//       console.log("Error occurred while connecting to Database", err)
//     );
// };

// const Schema = mongoose.Schema;
// const ObjectId = mongoose.Schema.Types.ObjectId;

// const studentSchema = new Schema({
//   first_name: {
//     type: String,
//     required: true,
//   },
//   last_name: {
//     type: String,
//     required: true,
//   },
// });
// const mentorSchema = new Schema({
//   first_name: {
//     type: String,
//     required: true,
//   },
//   last_name: {
//     type: String,
//     required: true,
//   },
// });

// const batchSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   students: {
//     type: [{ type: ObjectId, ref: "Student" }],
//   },
//   mentors: {
//     type: [{ type: ObjectId, ref: "Mentor" }],
//   },
//   unassignedStudents: {
//     type: [{ type: ObjectId, ref: "Student" }],
//     alias: "unassigned",
//   },
// });

// const Student = mongoose.model("Student", studentSchema);
// const Mentor = mongoose.model("Mentor", mentorSchema);

// const Batch = mongoose.model("Batch", batchSchema);
// connect();

// async function create() {
//   const student = await Student({
//     first_name: "meya2",
//     last_name: "Azhagan2",
//   });

//   await student.save();
//   console.log("created student");
//   const mentor = await Mentor({
//     first_name: "mentor2",
//     last_name: "MentorLast2",
//   });
//   mentor.save();
//   console.log("created mentor");
// }
// // create();

// async function createBatch() {
//   // const batch = await Batch({
//   //   name: "B261",
//   //   students: ["618de6bfef2c2809b0696919", "618de6c0ef2c2809b069691c"],
//   // });
//   // await batch.save();
//   const batches = await Batch.find({}).populate("students");
//   console.log(batches[0].students);
// }
// createBatch();

const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());
