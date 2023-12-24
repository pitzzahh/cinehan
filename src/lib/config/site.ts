import { Home, Video, ListBullet } from 'radix-icons-svelte';
export const siteConfig = {
  name: "cinehan",
  url: "https://cinehan.vercel.app",
  ogImage: "https://cinehan.vercel.app/og.png",
  description: "Movie streaming site.",
  keywords: `cinehan,sinehan,freemovie,streammovie`,
  navLinks: [
    { text: 'Home', href: '/', icon: Home },
    { text: 'Movies', href: '/movie', icon: Video },
    { text: 'TV Shows', href: '/tv', icon: ListBullet },
  ] as NavItem[],
};

export type SiteConfig = typeof siteConfig;