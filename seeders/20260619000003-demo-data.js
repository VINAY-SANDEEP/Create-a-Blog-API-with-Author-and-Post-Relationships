'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert authors first
    await queryInterface.bulkInsert('authors', [
      {
        id: 1,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'John Smith',
        email: 'john.smith@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.j@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Insert posts referencing authors
    await queryInterface.bulkInsert('posts', [
      {
        id: 1,
        title: 'Introduction to Sequelize',
        content: 'Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.',
        author_id: 1,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 2,
        title: 'Building REST APIs with Express',
        content: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
        author_id: 1,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 3,
        title: 'Mastering JavaScript ES6+',
        content: 'ES6 introduced many new syntax and features to modern JavaScript, making development much cleaner and easier.',
        author_id: 2,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 4,
        title: 'Understanding Database Indexing',
        content: 'Indexes are used to quickly retrieve data from databases. In this post, we explore how they work under the hood.',
        author_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.bulkDelete('authors', null, {});
  }
};
