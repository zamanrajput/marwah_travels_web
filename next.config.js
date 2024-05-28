/** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export'
// }

// module.exports = nextConfig
// module.exports = {
//   images: {
//     loader: 'akamai',
//     path: '',
//   },
// }

module.exports = {
    compiler:{
        styledComponents:true
    },
    images: {   unoptimized:true,  formats: ['image/avif', 'image/webp'],     domains: ['localhost','images.pexels.com','api.time.com','static.vecteezy.com','cdn.pixabay.com','192.168.0.108'],   },
    // webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
  
}

