import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
// Monorepo root (…/hiraki), two levels up from apps/website.
const workspaceRoot = resolve(__dirname, '../..')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['hiraki'],
  turbopack: {
    // Pin the workspace root so Turbopack can resolve `next` and compile the
    // `hiraki` workspace package (which lives outside apps/website).
    root: workspaceRoot,
  },
}

export default nextConfig
