const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { postValidationRules, postUpdateValidationRules, validate } = require('../middlewares/validator');

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a Post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: Understanding Express.js
 *               content:
 *                 type: string
 *                 example: Detailed guide to building Node web applications.
 *               author_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error or Author does not exist
 *   get:
 *     summary: Get All Posts
 *     description: Retrieve posts with nested Author details. Supports filtering, sorting, pagination, and search.
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: author_id
 *         schema:
 *           type: integer
 *         description: Filter posts by Author ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search posts by title (partial match)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [id, title, createdAt, updatedAt]
 *           default: createdAt
 *         description: Field to sort posts by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Order of sorting
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: Paginated posts list with author details
 */
router.post('/', postValidationRules, validate, postController.createPost);
router.get('/', postController.getAllPosts);

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get Single Post By ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post details with nested Author information
 *       404:
 *         description: Post not found
 *   put:
 *     summary: Update Post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Understanding Express.js (Updated)
 *               content:
 *                 type: string
 *                 example: Updated guide description.
 *               author_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Validation error or Author does not exist
 *       404:
 *         description: Post not found
 *   delete:
 *     summary: Delete Post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.get('/:id', postController.getPostById);
router.put('/:id', postUpdateValidationRules, validate, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
