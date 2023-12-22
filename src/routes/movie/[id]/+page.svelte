<script lang="ts">
	import VideoPlayer from "$lib/components/video-player.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<section>
	<VideoPlayer {data}/>
</section>
