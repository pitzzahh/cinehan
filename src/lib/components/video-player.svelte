<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Player from '@oplayer/core';
	import OUI, { type Setting } from '@oplayer/ui';
	import { options } from '$lib/config/video-player';
	import OHls from '@oplayer/hls';
	import type { IEpisodeServer, ISource } from '@consumet/extensions';
	export let dataSource: ISource;
	export let servers: IEpisodeServer[];
	export let coverUrl: string | undefined;

	let { sources } = dataSource;
	let player: Player;

	onMount(async () => {
		player = Player.make('#oplayer', {
			source: {
				src: sources[0].url,
				poster: coverUrl?.replace('1200x600', '1920x1080')
			},
			autoplay: false
		})
			.use([
				OUI({
					...options,
					subtitle: {
						background: true,
						source: dataSource.subtitles?.map((subtitle) => ({
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
						},
						{
							name: 'Server',
							icon: '',
							type: 'selector',
							key: 'server',
							children: servers.map((episode: IEpisodeServer) => ({
								name: episode.name,
								value: episode.url,
								default: episode.name
							})) as Setting<any>[],
							onChange({ value }) {
								player.changeSource({ src: value });
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

<span id="oplayer" class="md:h-[37rem]" />
