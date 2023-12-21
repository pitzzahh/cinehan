
export const siteConfig = {
  name: "cinehan",
  url: "https://cinehan.vercel.app",
  ogImage: "https://shadcn-svelte.com/og.png",
  description: "Movie streaming site.",
  keywords: `cinehan,sinehan,freemovie,streammovie`,
  navLinks: [
    { text: 'Home', href: '/' },
    { text: 'Trending', href: '/trending' },
    { text: 'Series', href: '/series' }
  ] as NavItem[]
};

export type SiteConfig = typeof siteConfig;