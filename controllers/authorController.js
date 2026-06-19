const authorService = require('../services/authorService');
const ResponseHelper = require('../utils/response');

class AuthorController {
  async createAuthor(req, res, next) {
    try {
      const author = await authorService.createAuthor(req.body);
      return ResponseHelper.success(res, author, 'Author created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getAllAuthors(req, res, next) {
    try {
      const authors = await authorService.getAllAuthors();
      return ResponseHelper.success(res, authors, 'Authors retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getAuthorById(req, res, next) {
    try {
      const { id } = req.params;
      const author = await authorService.getAuthorById(id);
      return ResponseHelper.success(res, author, 'Author retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const author = await authorService.updateAuthor(id, req.body);
      return ResponseHelper.success(res, author, 'Author updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteAuthor(req, res, next) {
    try {
      const { id } = req.params;
      await authorService.deleteAuthor(id);
      return ResponseHelper.success(res, null, 'Author and associated posts deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async getAuthorPosts(req, res, next) {
    try {
      const { id } = req.params;
      const posts = await authorService.getAuthorPosts(id);
      return ResponseHelper.success(res, posts, 'Posts retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthorController();
