const router = require("express").Router();
const UnAssign = require("../services/unassign.services");

// show all students who not assigned
router.get("/students", UnAssign.getAllStudent);
// unassign one students to one mentor
router.patch("/one", UnAssign.one);
// unassign many students to one mentor
router.patch("/many", UnAssign.many);

module.exports = router;
