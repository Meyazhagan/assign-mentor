const router = require("express").Router();
const BatchServices = require("../services/batch.services");

router.get("/", BatchServices.get);
router.get("/:id", BatchServices.getOne);
router.post("/", BatchServices.create);
router.put("/:id", BatchServices.update);
router.delete("/:id", BatchServices.remove);

module.exports = router;
