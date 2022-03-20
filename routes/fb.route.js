const { Router } = require("express");
const router = Router();

const fbController = require("../app/controllers/fb.controller");

router.get("/friends", fbController.friendList);
router.get("/friends/unf", fbController.unfriendList);
router.get("/friends/fetch", fbController.fetchList);

module.exports = router;
