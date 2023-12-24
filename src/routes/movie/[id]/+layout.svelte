<script lang="ts">
	import MediaDescription from '$lib/components/media-description.svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<section>
	<slot />
	<MediaDescription {data} />
</section>
