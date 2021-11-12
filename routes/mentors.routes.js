const router = require("express").Router();
const MentorServices = require("../services/mentor.services");

router.get("/", MentorServices.get);
router.get("/:id", MentorServices.getOne);
router.post("/", MentorServices.create);
router.put("/:id", MentorServices.update);
router.delete("/:id", MentorServices.remove);

module.exports = router;
