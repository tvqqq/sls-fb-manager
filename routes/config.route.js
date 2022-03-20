const { Router } = require("express");
const router = Router();

const configController = require("../app/controllers/config.controller");

router.get("/fat", configController.getFat);
router.post("/fat", configController.postFat);

module.exports = router;
