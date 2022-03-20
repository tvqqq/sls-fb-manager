const { Router } = require("express");
const router = Router();
const fbRoutes = require("./fb.route");
const configRoutes = require("./config.route");

router.get("/", (req, res) => res.send("Hello World from sls-fb-manager"));

router.use("/fb", fbRoutes);
router.use("/configs", configRoutes);

module.exports = router;
