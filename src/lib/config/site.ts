import { Home, ChatBubble, Video, ListBullet } from 'radix-icons-svelte';
import Logo from './icons/logo.svelte';
type NavItem = {
  text: string,
  to: string,
  selected: boolean | false,
  icon: any
}

export const siteConfig = {
  name: "cinehan",
  logo: Logo,
  url: "https://cinehan.vercel.app",
  ogImage: "https://shadcn-svelte.com/og.png",
  description: "Movie streaming site.",
  keywords: `cinehan,sinehan,freemovie,streammovie`,
  navLinks: [
    { text: 'Home', to: '/', icon: Home },
    { text: 'Trending', to: '/trending', icon: ChatBubble },
    { text: 'Movies', to: '/movies', icon: Video },
    { text: 'Series', to: '/series', icon: ListBullet }
  ] as NavItem[]
};

export type SiteConfig = typeof siteConfig;