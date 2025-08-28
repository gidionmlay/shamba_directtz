const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AdminEvent = require('../models/AdminEvent');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// Utility functions
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, phone, password, role = 'USER' } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { phone: phone }
      ]
    });
    
    if (existingUser) {
      return res.status(409).json({
        code: 'USER_EXISTS',
        message: 'A user with this email or phone number already exists.'
      });
    }
    
    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = new User({
      name,
      email,
      phone,
      passwordHash,
      role: role.toUpperCase()
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user);
    
    res.status(201).json({
      code: 'REGISTRATION_SUCCESS',
      message: 'User registered successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred during registration.'
    });
  }
};

// Register a new farmer
const registerFarmer = async (req, res) => {
  try {
    const {
      fullName, nationalId, dob, gender, phone, email, communicationChannel,
      region, district, village, farmSize, farmSizeUnit, mainCrops, yearsFarming,
      username, password, confirmPassword, terms
    } = req.body;

    // Validation
    if (!fullName || !nationalId || !phone || !region || !district || !village ||
        !farmSize || !password || !confirmPassword || !terms) {
      return res.status(400).json({
        code: 'MISSING_FIELDS',
        message: 'Please fill in all required fields.'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        code: 'PASSWORD_MISMATCH',
        message: 'Passwords do not match.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        code: 'INVALID_PASSWORD',
        message: 'Password must be at least 8 characters long.'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { phone: phone }
      ]
    });

    if (existingUser) {
      return res.status(409).json({
        code: 'USER_EXISTS',
        message: 'A user with this email or phone number already exists.'
      });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create farmer user with PENDING status
    const user = new User({
      name: fullName,
      email: email || null,
      phone: phone,
      passwordHash,
      role: 'FARMER',
      status: 'PENDING',
      farmSize: parseFloat(farmSize),
      location: `${village}, ${district}, ${region}`
    });

    await user.save();

    res.status(201).json({
      code: 'REGISTRATION_SUCCESS',
      message: 'Farmer registration submitted successfully. Your account is pending admin approval.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Farmer registration error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred during registration.'
    });
  }
};

// Register a new supplier
const registerSupplier = async (req, res) => {
  try {
    const {
      companyName, businessRegNo, productType, yearsOperation,
      contactFullName, contactPhone, contactEmail, contactPosition,
      region, district, wardVillage, businessAddress,
      username, password, confirmPassword, terms
    } = req.body;

    // Validation
    if (!companyName || !businessRegNo || !productType || !contactFullName ||
        !contactPhone || !contactEmail || !region || !district || !businessAddress ||
        !password || !confirmPassword || !terms) {
      return res.status(400).json({
        code: 'MISSING_FIELDS',
        message: 'Please fill in all required fields.'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        code: 'PASSWORD_MISMATCH',
        message: 'Passwords do not match.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        code: 'INVALID_PASSWORD',
        message: 'Password must be at least 8 characters long.'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: contactEmail },
        { phone: contactPhone }
      ]
    });

    if (existingUser) {
      return res.status(409).json({
        code: 'USER_EXISTS',
        message: 'A user with this email or phone number already exists.'
      });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create supplier user with PENDING status
    const user = new User({
      name: contactFullName,
      email: contactEmail,
      phone: contactPhone,
      passwordHash,
      role: 'SUPPLIER',
      status: 'PENDING',
      companyName: companyName,
      businessRegNo: businessRegNo,
      location: `${businessAddress}, ${wardVillage || ''}, ${district}, ${region}`
    });

    await user.save();

    res.status(201).json({
      code: 'REGISTRATION_SUCCESS',
      message: 'Supplier registration submitted successfully. Your account is pending admin approval.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Supplier registration error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred during registration.'
    });
  }
};

// Authenticate user
const login = async (req, res) => {
  try {
    const { emailPhone, password, role } = req.body;
    
    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: emailPhone },
        { phone: emailPhone }
      ]
    });
    
    if (!user) {
      return res.status(401).json({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email/phone or password.'
      });
    }
    
    // Check role if provided
    if (role && user.role !== role.toUpperCase()) {
      return res.status(401).json({
        code: 'INVALID_ROLE',
        message: 'User role does not match provided role.'
      });
    }
    
    // Check user status
    if (user.status === 'PENDING') {
      return res.status(401).json({
        code: 'ACCOUNT_PENDING',
        message: 'Your account is under review. Please wait for admin approval.'
      });
    }
    
    if (user.status === 'REJECTED') {
      return res.status(401).json({
        code: 'ACCOUNT_REJECTED',
        message: 'Your registration request was declined. Contact support for assistance.'
      });
    }
    
    // Verify password
    try {
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email/phone or password.'
        });
      }
    } catch (bcryptError) {
      console.error('Bcrypt comparison error:', bcryptError);
      return res.status(500).json({
        code: 'SERVER_ERROR',
        message: 'An error occurred while verifying password.'
      });
    }
    
    // Generate token
    let token;
    try {
      token = generateToken(user);
    } catch (jwtError) {
      console.error('JWT generation error:', jwtError);
      return res.status(500).json({
        code: 'SERVER_ERROR',
        message: 'An error occurred while generating authentication token.'
      });
    }
    
    // Check if this is the user's first login
    const isFirstLogin = user.firstLogin;
    
    // Update firstLogin status if it's their first login
    if (isFirstLogin) {
      try {
        await User.findByIdAndUpdate(user.id, { firstLogin: false });
      } catch (updateError) {
        console.error('Error updating firstLogin status:', updateError);
        // Don't fail the login if we can't update this status
      }
    }
    
    res.json({
      code: 'LOGIN_SUCCESS',
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isFirstLogin
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred during login.',
      error: error.message
    });
  }
};

// Get current user profile
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash -__v');
    
    if (!user) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.'
      });
    }
    
    res.json({
      code: 'SUCCESS',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching user data.'
    });
  }
};

// List users with status filtering (admin only)
const getAllUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    
    const query = {};
    
    // Filter by role
    if (role) {
      query.role = role.toUpperCase();
    }
    
    // Filter by status
    if (status) {
      query.status = status.toUpperCase();
    }
    
    // Filter by search term
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-passwordHash -__v')
      .sort({ createdAt: -1 });
    
    res.json({
      code: 'SUCCESS',
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt
      }))
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while fetching users.'
    });
  }
};

// Approve user (admin only)
const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get current user to log the change
    const currentUser = await User.findById(id);
    
    if (!currentUser) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.'
      });
    }
    
    // Update user status to APPROVED
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: 'APPROVED' },
      { new: true }
    ).select('-passwordHash -__v');
    
    // Log admin event
    const adminEvent = new AdminEvent({
      admin: req.user.id,
      entityType: 'User',
      entityId: id,
      action: 'APPROVE',
      from: currentUser.status,
      to: 'APPROVED'
    });
    
    await adminEvent.save();
    
    res.json({
      code: 'USER_APPROVED',
      message: 'User approved successfully.',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        status: updatedUser.status
      }
    });
  } catch (error) {
    console.error('Approve user error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while approving the user.'
    });
  }
};

// Reject user (admin only)
const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body; // Optional reason for rejection
    
    // Get current user to log the change
    const currentUser = await User.findById(id);
    
    if (!currentUser) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.'
      });
    }
    
    // Update user status to REJECTED
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: 'REJECTED' },
      { new: true }
    ).select('-passwordHash -__v');
    
    // Log admin event
    const adminEvent = new AdminEvent({
      admin: req.user.id,
      entityType: 'User',
      entityId: id,
      action: 'REJECT',
      from: currentUser.status,
      to: 'REJECTED',
      meta: reason ? JSON.stringify({ reason }) : null
    });
    
    await adminEvent.save();
    
    res.json({
      code: 'USER_REJECTED',
      message: 'User rejected successfully.',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        status: updatedUser.status
      }
    });
  } catch (error) {
    console.error('Reject user error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while rejecting the user.'
    });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({
        code: 'MISSING_ROLE',
        message: 'Role is required.'
      });
    }
    
    // Check if role is valid
    const validRoles = ['USER', 'ADMIN'];
    if (!validRoles.includes(role.toUpperCase())) {
      return res.status(400).json({
        code: 'INVALID_ROLE',
        message: 'Invalid role. Must be one of: USER, ADMIN.'
      });
    }
    
    // Get current user to log the change
    const currentUser = await User.findById(id);
    
    if (!currentUser) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.'
      });
    }
    
    // Prevent admins from demoting themselves
    if (currentUser.id === req.user.id && role.toUpperCase() === 'USER') {
      return res.status(400).json({
        code: 'CANNOT_DEMOTE_SELF',
        message: 'You cannot demote yourself.'
      });
    }
    
    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: role.toUpperCase() },
      { new: true }
    ).select('-passwordHash -__v');
    
    // Log admin event
    const adminEvent = new AdminEvent({
      admin: req.user.id,
      entityType: 'User',
      entityId: id,
      action: 'UPDATE_ROLE',
      from: currentUser.role,
      to: role.toUpperCase()
    });
    
    await adminEvent.save();
    
    res.json({
      code: 'USER_ROLE_UPDATED',
      message: 'User role updated successfully.',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while updating the user role.'
    });
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.'
      });
    }
    
    // Prevent admins from deleting themselves
    if (user.id === req.user.id) {
      return res.status(400).json({
        code: 'CANNOT_DELETE_SELF',
        message: 'You cannot delete yourself.'
      });
    }
    
    // Delete user
    await User.findByIdAndDelete(id);
    
    res.json({
      code: 'USER_DELETED',
      message: 'User deleted successfully.'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'An error occurred while deleting the user.'
    });
  }
};

module.exports = {
  register,
  registerFarmer,
  registerSupplier,
  login,
  getCurrentUser,
  getAllUsers,
  approveUser,
  rejectUser,
  updateUserRole,
  deleteUser
};