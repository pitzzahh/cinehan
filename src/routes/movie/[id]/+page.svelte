<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Player from '@oplayer/core';
	import ui from '@oplayer/ui';
	let player: Player;

	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { movieProvider } from '$lib';
	import { options } from '$lib/config/video-player';
	export let data: PageData;

	onMount(async () => {
		const episodeSources = await movieProvider.fetchEpisodeSources(
			data.episodes[0].id,
			data.movieInfo.id
		);

		const { sources } = data;

		player = Player.make('#oplayer', {
			source: {
				src: sources[0].url
			},
			autoplay: true
		})
			.use([
				ui({
					...options,
					subtitle: {
						background: true,
						source: episodeSources.subtitles?.map((subtitle) => ({
							src: subtitle.url,
							name: subtitle.lang
						}))
					},
					settings: [
						{
							name: 'Quality',
							icon: '',
							type: 'selector',
							key: 'quality',
							// children: sources.map((video) => ({
							// 	name: video.quality,
							// 	value: video.url,
							// 	default: video.quality === 'auto'
							// })),
							onChange({ value }) {
								player.changeQuality({ src: value });
							}
						}
					]
				})
			])
			.create();
	});

	$: poster = data.movieInfo.image?.replaceAll('250x400', '3840x2160');
</script>

<section class="mx-4">
	<div class="relative h-screen overflow-hidden rounded-md">
		<img
			class="absolute inset-0 h-full w-full blur-sm filter"
			src={poster}
			alt={data.movieInfo.title.toString()}
		/>

		<AspectRatio ratio={16 / 9} class="bg-muted">
			<div id="oplayer" class="h-full w-full rounded-md object-cover" />
		</AspectRatio>
	</div>
</section>
