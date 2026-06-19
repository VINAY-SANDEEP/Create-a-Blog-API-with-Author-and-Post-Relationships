const postService = require('../services/postService');
const ResponseHelper = require('../utils/response');

class PostController {
  async createPost(req, res, next) {
    try {
      const post = await postService.createPost(req.body);
      return ResponseHelper.success(res, post, 'Post created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const result = await postService.getAllPosts(req.query);
      return ResponseHelper.paginated(
        res,
        result.posts,
        result.page,
        result.limit,
        result.totalItems,
        'Posts retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postService.getPostById(id);
      return ResponseHelper.success(res, post, 'Post retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postService.updatePost(id, req.body);
      return ResponseHelper.success(res, post, 'Post updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      await postService.deletePost(id);
      return ResponseHelper.success(res, null, 'Post deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
