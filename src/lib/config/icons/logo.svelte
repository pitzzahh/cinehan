<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { siteConfig } from '../site';
	type $$Props = HTMLAttributes<HTMLElement>;
</script>

<button
	class="space-between mr-4 flex cursor-pointer items-center justify-center"
	{...$$restProps}
	on:click
>
	<span class="mr-1 translate-y-[-0.1rem] text-2xl font-bold text-primary">{siteConfig.name}</span>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-film"
		><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 3v18" /><path
			d="M3 7.5h4"
		/><path d="M3 12h18" /><path d="M3 16.5h4" /><path d="M17 3v18" /><path d="M17 7.5h4" /><path
			d="M17 16.5h4"
		/></svg
	>
</button>
