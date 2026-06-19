const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { authorValidationRules, validate } = require('../middlewares/validator');

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create an Author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Validation error or Email already exists
 *   get:
 *     summary: Get All Authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 */
router.post('/', authorValidationRules, validate, authorController.createAuthor);
router.get('/', authorController.getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get Author By ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author details
 *       404:
 *         description: Author not found
 *   put:
 *     summary: Update Author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Smith
 *               email:
 *                 type: string
 *                 example: jane.smith@example.com
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Validation error or Email already exists
 *       404:
 *         description: Author not found
 *   delete:
 *     summary: Delete Author
 *     description: Deletes an author and all their associated posts (Cascade Delete).
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author and associated posts deleted successfully
 *       404:
 *         description: Author not found
 */
router.get('/:id', authorController.getAuthorById);
router.put('/:id', authorValidationRules, validate, authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

/**
 * @openapi
 * /authors/{id}/posts:
 *   get:
 *     summary: Get All Posts of Specific Author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author ID
 *     responses:
 *       200:
 *         description: List of posts for the author
 *       404:
 *         description: Author not found
 */
router.get('/:id/posts', authorController.getAuthorPosts);

module.exports = router;
