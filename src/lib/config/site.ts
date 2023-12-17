type NavItem = {
  text: string,
  to: string,
  selected: boolean | false
}

export const siteConfig = {
  name: "cinehan",
  url: "https://cinehan.vercel.app",
  ogImage: "https://shadcn-svelte.com/og.png",
  description: "Movie streaming site.",
  keywords: `cinehan,sinehan,freemovie,streammovie`,
  navLinks: [
    { text: 'Home', to: '/' },
    { text: 'Trending', to: '/trending' },
    { text: 'Movies', to: '/movies' },
    { text: 'Series', to: '/series' }
  ] as NavItem[]
};

export type SiteConfig = typeof siteConfig;