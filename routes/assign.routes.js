const router = require("express").Router();
const Assign = require("../services/assign.services");

// show all students for given mentor
router.get("/:mentorId", Assign.getAllStudent);
// assign or change one students to one mentor
router.patch("/one", Assign.one);
// assign many students to one mentor
router.patch("/many", Assign.many);

module.exports = router;
