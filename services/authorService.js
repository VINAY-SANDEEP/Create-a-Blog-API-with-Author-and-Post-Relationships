const { Author, Post } = require('../models');

class AuthorService {
  async createAuthor(data) {
    const { name, email } = data;
    
    // Check if email already exists
    const existing = await Author.findOne({ where: { email } });
    if (existing) {
      const error = new Error('Email must be unique');
      error.status = 400;
      throw error;
    }
    
    return await Author.create({ name, email });
  }

  async getAllAuthors() {
    return await Author.findAll();
  }

  async getAuthorById(id) {
    const author = await Author.findByPk(id);
    if (!author) {
      const error = new Error('Author not found');
      error.status = 404;
      throw error;
    }
    return author;
  }

  async updateAuthor(id, data) {
    const author = await this.getAuthorById(id);
    const { name, email } = data;
    
    if (email && email !== author.email) {
      const existing = await Author.findOne({ where: { email } });
      if (existing) {
        const error = new Error('Email must be unique');
        error.status = 400;
        throw error;
      }
    }

    return await author.update({ name, email });
  }

  async deleteAuthor(id) {
    const author = await this.getAuthorById(id);
    await author.destroy();
    return true;
  }

  async getAuthorPosts(authorId) {
    // Check if author exists (will throw 404 if not found)
    await this.getAuthorById(authorId);
    
    return await Post.findAll({
      where: { author_id: authorId }
    });
  }
}

module.exports = new AuthorService();
