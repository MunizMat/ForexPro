const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  modularizeImports: {
    'react-bootstrap': {
      transform: 'react-bootstrap/{{member}}',
    },
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
});
