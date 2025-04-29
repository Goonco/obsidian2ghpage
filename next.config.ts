import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);

// References
// - https://nextjs.org/docs/app/building-your-application/configuring/mdx
