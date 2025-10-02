module.exports = async function(db) {
  await db.collection("chats").createIndex({ userId: 1, createdAt: -1 });
};
