module.exports = async(ctx, next) => {
  const adminToken = ctx.request.header.authorization;

  if(adminToken) {
    ctx.cookies.set('admin_token', adminToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  await next();
}
