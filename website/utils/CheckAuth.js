const CheckAuth = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }

  request.session.backURL = request.url;
  response.redirect("/api/login");
};

module.exports = CheckAuth;