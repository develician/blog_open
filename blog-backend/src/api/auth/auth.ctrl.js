const { ADMIN_ID: adminId, ADMIN_PASS: adminPass } = process.env;

exports.login = async ctx => {
  const { username, password } = ctx.request.body;
  if (username === adminId && password === adminPass) {
    ctx.body = {
      success: true
    };
    ctx.session.logged = true;
  } else {
    ctx.body = {
      success: false
    };
    ctx.status = 401;
  }
};

exports.check = async ctx => {
  const logged = !!ctx.session.logged;
  if (!logged) {
    ctx.status = 401;
    ctx.body = {
      logged
    };
    return;
  }
  ctx.status = 200;
  ctx.body = {
    logged
  };
};

exports.logout = async ctx => {
  ctx.session = null;
  ctx.status = 204;
};
