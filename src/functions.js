const { mongo } = require('./index.js');
module.exports = {
  /**
   * Checks whether a specified user is a bot admin
   * @param {String} userID User ID to check
   */
  userIsAdmin: async userID => {
    const userData = await mongo.db('main').collection('users').findOne({ _id: userID });
    if (!userData) return false;
    return userData.admin === true;
  },
};