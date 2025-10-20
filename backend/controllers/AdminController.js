class AdminController {
  async getStats(req, res) {
    res.json({ users: 150, activeChats: 42 });
  }
}
module.exports = new AdminController();
