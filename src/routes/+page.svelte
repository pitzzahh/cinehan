<script lang="ts">
	import type { PageData } from './$types';
	import TrendingCarousel from '$lib/components/trending-carousel.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<!-- <meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
	/> -->
</svelte:head>

<TrendingCarousel {data} />
