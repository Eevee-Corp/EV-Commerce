const supabase = require('../models/model');


exports.signup = async (req, res, next) => {
  const {userid, email, username, password} = req.body;

  if (!username || !password) {
    return next({
      log: 'invalid inputs on createUser method',
      message: {err: 'invalid inputs for creating user'}
    })
  }

  const {data, error} = await supabase
    .from('evusers')
    .insert({
      userid,
      email,
      username,
      password
    })
  
  if (error) {
      console.error('Error adding product:', error);
      return next({ error: error.message });
    }
    return next();
  }


exports.login = async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
    const {data, error} = await supabase
      .from('evusers')
      .select()
      .eq('username', username);
    
    if (error || data.length === 0) {
      return next({
        log: 'problem in getting user for verification',
        message: {err: 'cannot get user for verification'}
      });
    } 
  
    if (password !== data[0].password) {
        return next({
          log: 'pw does not match',
          message: { err: 'incorrect pw' }
        });
      }
  
    res.locals.user = { message: 'Successful Login' };
    return next();

  } catch (error) {
    console.error('Error logging in user:', error);
    return next({ error: error.message });
  }
}