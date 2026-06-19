const { Post, Author, Sequelize } = require('../models');
const { Op } = Sequelize;

class PostService {
  async createPost(data) {
    const { title, content, author_id } = data;

    // Check if author exists
    const author = await Author.findByPk(author_id);
    if (!author) {
      const error = new Error('Author does not exist');
      error.status = 400;
      throw error;
    }

    const post = await Post.create({ title, content, author_id });
    
    // Return post with nested author details
    return await Post.findByPk(post.id, {
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
  }

  async getAllPosts(queryParams) {
    const { author_id, search, sort = 'createdAt', order = 'DESC', page = 1, limit = 10 } = queryParams;

    const whereClause = {};

    if (author_id) {
      whereClause.author_id = author_id;
    }

    if (search) {
      whereClause.title = {
        [Op.like]: `%${search}%`
      };
    }

    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 10;
    const offset = (parsedPage - 1) * parsedLimit;

    // Validate sorting parameters
    const allowedSortFields = ['id', 'title', 'createdAt', 'updatedAt'];
    const finalSort = allowedSortFields.includes(sort) ? sort : 'createdAt';
    const finalOrder = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC';

    const { count, rows } = await Post.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [[finalSort, finalOrder]],
      limit: parsedLimit,
      offset: offset
    });

    return {
      posts: rows,
      totalItems: count,
      page: parsedPage,
      limit: parsedLimit
    };
  }

  async getPostById(id) {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!post) {
      const error = new Error('Post not found');
      error.status = 404;
      throw error;
    }

    return post;
  }

  async updatePost(id, data) {
    const post = await this.getPostById(id);
    const { title, content, author_id } = data;

    if (author_id && author_id !== post.author_id) {
      const author = await Author.findByPk(author_id);
      if (!author) {
        const error = new Error('Author does not exist');
        error.status = 400;
        throw error;
      }
    }

    await post.update({ title, content, author_id });

    // Retrieve updated post with nested author info
    return await this.getPostById(post.id);
  }

  async deletePost(id) {
    const post = await this.getPostById(id);
    await post.destroy();
    return true;
  }
}

module.exports = new PostService();
