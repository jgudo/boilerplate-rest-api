const Router = require('express').Router;

module.exports = Router({ mergeParams: true })
  .post('/v1/user', async (req, res, next) => {
    const user = new req.db.User({
      fullname: req.body.fullname,
      email: req.body.email,
      dateJoined: new Date().getTime(),
      password: req.body.password
    });

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send({
        user: {
          id: user._id,
          fullname: user.fullname, 
          email: user.email,
        }, 
        token 
      });
    } catch (e) {
      next(e);
    }
  });
