const { ObjectId } = require("mongodb");

function validateWorldId(req, res, next) {
    const { worldId } = req.params;

    if (!ObjectId.isValid(worldId)) {
        return res.status(400).json({ message: "Invalid world ID format." });
    }

    next();
}

module.exports = validateWorldId;