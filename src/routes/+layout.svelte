<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
    import Header from '$lib/components/Header.svelte';
	const links = [

	];
</script>

<Header />

<ModeWatcher />
<slot />
