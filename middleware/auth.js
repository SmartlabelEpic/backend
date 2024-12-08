
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};


// Function to check if the user is authorized based on role
export const authorize = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Retrieve the token from the Authorization header

      // Check if the user's role matches the required role
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' + error?.message });
    }
  };
};
