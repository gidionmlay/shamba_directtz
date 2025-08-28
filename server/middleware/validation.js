// Validation middleware for registration
const validateRegistration = (req, res, next) => {
  const { email, password } = req.body;
  
  // Email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      code: 'INVALID_EMAIL',
      message: 'Please provide a valid email address.'
    });
  }
  
  // Password validation
  if (!password || password.length < 8) {
    return res.status(400).json({
      code: 'INVALID_PASSWORD',
      message: 'Password must be at least 8 characters long.'
    });
  }
  
  next();
};

// Validation middleware for login
const validateLogin = (req, res, next) => {
  const { emailPhone, password } = req.body;
  
  if (!emailPhone || !password) {
    return res.status(400).json({
      code: 'MISSING_CREDENTIALS',
      message: 'Email/Phone and password are required.'
    });
  }
  
  next();
};

// Validation middleware for product creation/update
const validateProduct = (req, res, next) => {
  const { name, unit, supplierId } = req.body;
  
  if (!name || !unit) {
    return res.status(400).json({
      code: 'MISSING_FIELDS',
      message: 'Product name and unit are required.'
    });
  }
  
  // If supplierId is provided, it should be a valid ObjectId
  if (supplierId && !/^[0-9a-fA-F]{24}$/.test(supplierId)) {
    return res.status(400).json({
      code: 'INVALID_SUPPLIER_ID',
      message: 'Supplier ID must be a valid ObjectId.'
    });
  }
  
  next();
};

// Validation middleware for order creation
const validateOrder = (req, res, next) => {
  const { productName, quantity } = req.body;
  
  if (!productName || !quantity) {
    return res.status(400).json({
      code: 'MISSING_FIELDS',
      message: 'Product name and quantity are required.'
    });
  }
  
  next();
};

// Validation middleware for supplier creation/update
const validateSupplier = (req, res, next) => {
  const { companyName, businessRegNo } = req.body;
  
  if (!companyName || !businessRegNo) {
    return res.status(400).json({
      code: 'MISSING_FIELDS',
      message: 'Company name and business registration number are required.'
    });
  }
  
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProduct,
  validateOrder,
  validateSupplier
};