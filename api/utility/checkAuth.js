module.exports = {
  checkAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/usuario/login');
  },
  checkNotAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('http://localhost:3000/inicio.html');      
  }
};
