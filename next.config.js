/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    URL: 'http://localhost:3000',
    CLOUDNAME: 'david1',
    CLOUDFOLDER: 'votify',
    DB_URL:
      'mongodb+srv://votify:893QiDMjrdx5fnpx@cluster0.tjbdmhk.mongodb.net/?retryWrites=true&w=majority',
    DBNAME: 'votify',
    HOST: 'http://localhost:3000',
    DROPBOX: '1dsf42dl1i2',
    INSTAGRAM: 'd7aadf962m',
  },
};
module.exports = nextConfig;
