<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '../app.pcss'; // Assuming this file contains your Tailwind CSS imports
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import PageProgress from '$lib/components/page-progress.svelte';

	injectSpeedInsights();
</script>

<PageProgress />
<ModeWatcher />
<div class="flex min-h-screen flex-col">
	<Header />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>
