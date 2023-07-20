import { Router } from "express";
import PostController from "./Controllers/PostController";
import FileController from "./Controllers/FileController";

const router = Router();



/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the post
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.get("/posts/:id", PostController.getOne);
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a paginated list of all posts.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/posts", PostController.getAll);
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       description: Post object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               description:
 *                 type: string
 *               picture_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/posts", PostController.create);

router.post("/upload", FileController.upload);

export default router;