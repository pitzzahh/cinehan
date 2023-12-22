<script lang="ts">
	import MediaDescription from '$lib/components/media-description.svelte';
	import VideoPlayer from '$lib/components/video-player.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
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

<section>
	<VideoPlayer {data} />
	<MediaDescription {data} />
</section>
