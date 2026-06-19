module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Content is required'
        },
        notEmpty: {
          msg: 'Content is required'
        }
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'authors',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'posts',
    timestamps: true
  });

  Post.associate = (models) => {
    Post.belongsTo(models.Author, {
      foreignKey: 'author_id',
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return Post;
};
