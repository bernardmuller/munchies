const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  images: {
    domains: [
      'images.unsplash.com',
      'unsplash.com/',
      'avatars.githubusercontent.com',
      'images.pexels.com'
    ],
    formats: ["image/webp"],
  }
});
