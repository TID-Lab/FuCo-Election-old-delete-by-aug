import express, { type Request, type Response, type Router } from "express";

export const apiRouter: Router = (() => {
	const router = express.Router();

	router.get("/", async (_req: Request, res: Response) => {
		// const serviceResponse = await userService.findAll();
		// handleServiceResponse(serviceResponse, res);
	});

	router.get("/:id", async (req: Request, res: Response) => {});

	return router;
})();
