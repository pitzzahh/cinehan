<script lang="ts">
	import { Home, ChatBubble, Video, ListBullet, Gear, Person } from 'radix-icons-svelte';
	import * as Command from '$lib/components/ui/command';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { store } from '$lib';
	import { siteConfig } from '$lib/config/site';
	let searchQuery: string;
	let loading = false;
	let items: string[] = [];

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				$store.openSearchBar = true;
			}
		}
		document.addEventListener('keydown', handleKeydown);

		loading = true;

		items = ['First Item', 'Second Item'];

		loading = false;

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	const runCommand = (cmd: () => void) => {
		$store.openSearchBar = false;
		cmd();
	};

	onDestroy(() => {
		$store.openSearchBar = false;
	});
</script>

<Command.Dialog bind:open={$store.openSearchBar} on:close={() => ($store.openSearchBar = false)}>
	<Command.Input
		placeholder="Type a command or search..."
		on:change={(e) => {
			console.log(`INPUT`);
			console.log(JSON.stringify(e));
		}}
	/>
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			{#each siteConfig.navLinks as navLink}
				<Command.Item value={navLink.text} onSelect={() => runCommand(() => goto(navLink.href))}>
					{#if navLink.icon}
						<svelte:component this={navLink.icon} class="mr-2 h-4 w-4" />
					{/if}
					<span>{navLink.text}</span>
				</Command.Item>
			{/each}
			<Command.Separator />
			<Command.Item>
				<Person class="mr-2 h-4 w-4" />
				<span>Profile</span>
				<Command.Shortcut class="rounded border bg-muted font-mono font-medium opacity-100"
					>⌘P</Command.Shortcut
				>
			</Command.Item>
			<Command.Item>
				<Gear class="mr-2 h-4 w-4" />
				<span>Settings</span>
				<Command.Shortcut class="rounded border bg-muted font-mono font-medium opacity-100"
					>⌘S</Command.Shortcut
				>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Results">
			{#if searchQuery}
				<Command.Loading>Please wait</Command.Loading>
			{:else}
				{#each items as item}
					<Command.Item value={item}>
						{item}
					</Command.Item>
				{/each}
			{/if}
		</Command.Group>
	</Command.List>
</Command.Dialog>
