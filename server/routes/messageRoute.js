import express from "express";
import protectRoute from "../middleware/auth.js";
import { getMessages, getUserForSidebar, markMessageAsSeen } from "../controller/messageController.js";

const messageRouter = express.Router();
messageRouter.get("/user", protectRoute, getUserForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("mark/:id", protectRoute, markMessageAsSeen);

export default messageRouter;



