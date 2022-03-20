const { Router } = require("express");
const router = Router();
const fbRoutes = require("./fb.route");

router.get("/", (req, res) => res.send("Hello World from sls-fb-manager"));

router.use("/fb", fbRoutes);

module.exports = router;
