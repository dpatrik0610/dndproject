const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Attach validated data to the request object
    req.body = value;
    next();
  };
};

module.exports = validateRequest;
