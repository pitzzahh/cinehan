<script lang="ts">
	import type { PageData } from './$types';
	import TrendingCarousel from '$lib/components/trending-carousel.svelte';
	import { host } from '$lib';
	export let data: PageData;
	export let pageTitle = 'Cinehan: Stream movies and Tv Shows';
	export let pageDescription =
		'Watch movies & tv shows on our platform. Enjoy high-quality videos and more.';
	export let pageUrl = host;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="author" content="Peter John Arao" />
	<meta name="keywords" content="SvelteKit Movie watchlist, movie watch list" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={pageUrl} />
	<meta http-equiv="Content-Language" content="en" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content="og.png" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={pageTitle} />
</svelte:head>

<TrendingCarousel {data} />
