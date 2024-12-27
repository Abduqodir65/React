import { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'abduqodiir.netlify.app',
        port: '',
        pathname: '/public/images/**',
        search: '',
      },
    ],
  },
}

export default config