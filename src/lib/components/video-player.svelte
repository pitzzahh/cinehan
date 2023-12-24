<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import Player from '@oplayer/core';
	import OUI, { type Setting } from '@oplayer/ui';
	import { options } from '$lib/config/video-player';
	import OHls from '@oplayer/hls';
	import type { IEpisodeServer, ISource } from '@consumet/extensions';
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
								console.log(`Server changed to ${name} with url ${value}}`);
								const response: Response = await fetch(`${$page.url.host}/api/mediaInfo`, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({ episodeId, mediaId, name })
								});
								console.log(`Response : ${JSON.stringify(response)}`);
								if (response.ok) {
									const res: Setting<any> = await response.json();
									player.changeSource({ src: value });
									player.changeQuality({ src: res.value });
									console.log(`Source url changed to ${res.value}`);
								} else {
									console.log(`Error : ${response.statusText}`);
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
