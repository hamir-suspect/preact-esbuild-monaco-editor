const esbuild = require('esbuild');
const http = require('http');

const config = {
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
  },
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  minify: !process.argv.includes('--serve'),
  sourcemap: process.argv.includes('--serve'),
  jsxImportSource: 'preact',
  jsx: 'automatic',
  alias: {
    'react': 'preact/compat',
    'react-dom': 'preact/compat'
  }
};

if (process.argv.includes('--serve')) {
  esbuild.context(config).then(ctx => {
    ctx.watch();
    
    // Start server
    const { host, port } = { host: 'localhost', port: 3000 };
    
    http.createServer((req, res) => {
      const { url } = req;
      const file = url === '/' ? '/index.html' : url;
      
      const serve = require('serve-handler');
      return serve(req, res, {
        public: 'dist',
      });
      
    }).listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}`);
    });
  });
} else {
  esbuild.build(config).catch(() => process.exit(1));
}
