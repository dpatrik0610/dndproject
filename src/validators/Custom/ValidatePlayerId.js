const { ObjectId } = require("mongodb");

function validateWorldId(req, res, next) {
    const { playerId } = req.params;

    if (!ObjectId.isValid(playerId)) {
        return res.status(400).json({ message: "Invalid player ID format." });
    }

    next();
}

module.exports = validateWorldId;