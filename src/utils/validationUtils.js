const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPhoneNumber = (phone_number) => {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone_number);
  };
  
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
  
    if (!/\d/.test(password)) {
      return "Password must contain at least one digit";
    }
  
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
  
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
  
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return "Password must contain at least one special character";
    }
  
    return null;
  };
  
  module.exports = { validatePassword , isValidEmail , isValidPhoneNumber };
  