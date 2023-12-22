<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Player from '@oplayer/core';
	import OUI, { type Setting } from '@oplayer/ui';
	import { options } from '$lib/config/video-player';
	import OHls from '@oplayer/hls';
	import type { PageData } from '../../routes/movie/[id]/$types';
	export let data: PageData;

	let player: Player;

	onMount(async () => {
		const sources = data.sources.sources;
		player = Player.make('#oplayer', {
			source: {
				src: sources[0].url,
				poster: data.movieInfo.cover?.replace('1200x600', '1920x1080')
			},
			autoplay: false
		})
			.use([
				OUI({
					...options,
					subtitle: {
						background: true,
						source: data.sources.subtitles?.map((subtitle) => ({
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
							children: sources.map((video) => ({
								name: video.quality,
								value: video.url,
								default: video.quality === 'auto'
							})) as Setting<any>[],
							onChange({ value }) {
								player.changeQuality({ src: value });
							}
						}
					]
				})
			])
			.use([OHls()])
			.create();
	});

	onDestroy(async () => {
		if (player) {
			player.destroy();
		}
	});
</script>

<span id="oplayer" class="md:h-[37rem]"/>
