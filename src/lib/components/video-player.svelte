<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import Player from '@oplayer/core';
	import OUI, { type Setting } from '@oplayer/ui';
	import { options } from '$lib/config/video-player';
	import OHls from '@oplayer/hls';
	import type { IEpisodeServer, ISource, IVideo } from '@consumet/extensions';
	export let episodeId: string;
	export let mediaId: string;
	export let dataSource: ISource;
	export let servers: IEpisodeServer[];
	export let coverUrl: string | undefined;

	let { sources } = dataSource;
	let player: Player;
	let qualities: Setting<any>[];

	onMount(async () => {
		qualities = sources.map((video) => ({
			name: video.quality,
			value: video.url,
			default: video.quality === 'auto'
		})) as Setting<any>[];
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
							children: qualities,
							onChange({ value }) {
								player.changeQuality({ src: value });
							}
						},
						{
							name: 'Server',
							icon: '',
							type: 'selector',
							key: 'server',
							children: servers.map((server: IEpisodeServer) => ({
								name: server.name,
								value: server.url,
								default: server.name
							})) as Setting<any>[],
							async onChange({ name, value }) {
								try {
									const data = {
										episodeId,
										mediaId,
										name
									};
									const response = await fetch(
										`${$page.url.protocol}//${$page.url.host}/api/mediaInfo`,
										{
											method: 'POST',
											headers: {
												'Content-Type': 'application/json'
											},
											body: JSON.stringify(data)
										}
									);

									if (response.ok) {
										const res = await response.json();
										qualities = res.sources.map((video: IVideo) => ({
											name: video.quality,
											value: video.url,
											default: video.quality === 'auto'
										})) as Setting<any>[];
										const defaultQuality = qualities.find((q) => q.name === 'auto')?.value;
										player.changeSource({ src: value });
										player.changeQuality({ src: defaultQuality });
										console.log(`Source URL changed to ${defaultQuality}`);
									} else {
										console.log(`Error response: ${response.statusText}`);
									}
								} catch (error) {
									console.error('An error occurred during the fetch:', error);
								}
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
