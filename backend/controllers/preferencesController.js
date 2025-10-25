exports.getPreferences = async (req, res) => res.json({ theme: "dark" });
exports.updatePreferences = async (req, res) => res.json({ success: true });
