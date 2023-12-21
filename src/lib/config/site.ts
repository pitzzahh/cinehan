
export const siteConfig = {
  name: "cinehan",
  url: "https://cinehan.vercel.app",
  ogImage: "https://shadcn-svelte.com/og.png",
  description: "Movie streaming site.",
  keywords: `cinehan,sinehan,freemovie,streammovie`,
  navLinks: [
    { text: 'Home', href: '/' },
    { text: 'Movies', href: '/movie' },
    { text: 'TV Shows', href: '/tv' }
  ] as NavItem[]
};

export type SiteConfig = typeof siteConfig;