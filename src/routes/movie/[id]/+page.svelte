<script lang="ts">
	import { Reload, ExclamationTriangle } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import VideoPlayer from '$lib/components/video-player.svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<svelte:head>
	<title>{`Watching ${data.movieInfo.title}`}</title>
	<meta
		name="description"
		content={`Watch ${data.movieInfo.title} on our platform. Enjoy high-quality videos and more.`}
	/>
	<meta
		name="keywords"
		content={`watch, ${data.movieInfo.title}, video, streaming, entertainment`}
	/>
</svelte:head>

{#await data.videoPlayerData}
	<div class="relative md:h-[37rem]">
		<Skeleton class="h-[18rem] w-full md:h-[37rem]" />
		<div
			class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center"
		>
			<Reload class="mr-2 h-4 w-4 animate-spin" />
			<span class="text-xl font-bold">Please Wait...</span>
		</div>
	</div>
{:then result}
	<VideoPlayer
		episodeId={result[0]}
		mediaId={result[1]}
		dataSource={result[2]}
		servers={result[3]}
		coverUrl={data.movieInfo.cover}
	/>
{:catch error}
	<div class="relative md:h-[37rem]">
		<Skeleton class="h-[18rem] w-full md:h-[37rem]" />
		<div
			class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center"
		>
			<ExclamationTriangle class="mr-2 h-4 w-4 " />
			<span class="text-xl font-bold">{error.message}</span>
			<Button href={$page.url?.toString() ?? '/'} on:click={() => location.reload()}
				>Dashboard</Button
			>
		</div>
	</div>
{/await}
