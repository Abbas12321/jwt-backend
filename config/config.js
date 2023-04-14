const config = {
    port: process.env.PORT || 8000,
    db: {
      host: process.env.DB_HOST || '0.0.0.0',
      port: process.env.DB_PORT || 27017,
      name: process.env.DB_NAME || 'mydb',
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'secret_code',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
  };
  
  module.exports = config;
  