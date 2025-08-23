import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute,getRecommendedUsers);
router.get("/friends",protectRoute,getMyFriends);
router.post("/friend-request/:id",protectRoute,sendFriendRequest);
router.post("/friend-request/:id/accept",protectRoute,acceptFriendRequest);

export default router;