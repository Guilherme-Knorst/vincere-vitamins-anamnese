/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
	basePath: '/anamnese',
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
 
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
 
module.exports = nextConfig