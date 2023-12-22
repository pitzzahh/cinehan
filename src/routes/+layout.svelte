<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/Header.svelte';
	import PageProgress from '$lib/components/page-progress.svelte';
	injectSpeedInsights();
</script>

<PageProgress />
<ModeWatcher />
<Header />
<slot />
