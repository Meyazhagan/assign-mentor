const router = require("express").Router();
const StudentServices = require("../services/student.services");

router.get("/", StudentServices.get);
router.get("/:id", StudentServices.getOne);
router.post("/", StudentServices.create);
router.put("/:id", StudentServices.update);
router.delete("/:id", StudentServices.remove);

module.exports = router;
