<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/Header.svelte';
	injectSpeedInsights();
</script>

<ModeWatcher />
<Header />
<slot />