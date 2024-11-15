/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.aceternity.com',
      'images.unsplash.com',
      'drive.google.com',
      'encrypted-tbn3.gstatic.com',
      'res.cloudinary.com',
    ], // Add the external domain here
  },
}

export default nextConfig
