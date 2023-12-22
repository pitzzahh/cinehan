<script lang="ts">
	import { Button } from './ui/button';
	import * as Command from '$lib/components/ui/command';
	import {
		Home,
		ChatBubble,
		Video,
		ListBullet,
		EnvelopeClosed,
		Gear,
		Person,
		EnvelopeOpen
	} from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import { Icons } from '$lib/config/icons';
	import { goto } from '$app/navigation';
	import { siteConfig } from '$lib/config/site';
	import { Sun, Moon, MagnifyingGlass } from 'radix-icons-svelte';
	import { setMode, resetMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { store, fetchTrendingMovies } from '$lib';
	import User from '$lib/config/icons/user.svelte';

	let open = false;
	let searchQuery: string;
	let loading = false;
	let items: string[] = [];

	$: console.log(`SEARCH: ${searchQuery}`);

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = true;
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

	function runCommand(cmd: () => void) {
		open = false;
		cmd();
	}
</script>

<header
	class="shadown-sm sticky top-0 z-50 flex items-center justify-between bg-opacity-20 mx-4 backdrop-blur"
>
	<div class="flex items-center gap-1">
		<Icons.logo on:click={() => goto('/')} />
		<div class="hidden gap-6 md:flex">
			{#each siteConfig.navLinks as link}
				<button
				class="hover:text-theme"
					on:click={() => {
						goto(link.href);
						siteConfig.navLinks.forEach((e) => {
							e.selected = false;
						});
						link.selected = true;
						if (link.href === '/') {
							$store.trendingMovies = fetchTrendingMovies();
						}
					}}
					class:selectedLink={$page.route && link.href === $page.route.id}>{link.text}</button
				>
			{/each}
		</div>
	</div>
	<div class="flex h-14 items-center justify-between gap-1">
		<Button
			variant="outline"
			class="relative w-full justify-start text-sm text-muted-foreground md:pr-12 lg:w-64"
			on:click={() => (open = true)}
			{...$$restProps}
		>
			<div>
				<MagnifyingGlass class="mr-2 h-4 w-4" />
			</div>
			<span class="hidden md:inline-flex"> Search movies... </span>
			<span class="inline-flex md:hidden">Search...</span>
			<kbd
				class="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex"
			>
				<span class="text-xs">⌘</span>K
			</kbd>
		</Button>

		<Button class="hidden md:flex">
			<User class="h-4 w-4 md:mr-2" />
			<span class="hidden md:flex">Login</span>
		</Button>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} class="w-10" variant="outline">
					<Sun
						class="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>

<Command.Dialog bind:open>
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
			<Command.Item value="Home" onSelect={() => runCommand(() => goto('/'))}>
				<Home class="mr-2 h-4 w-4" />
				<span>Home</span>
			</Command.Item>
			<Command.Item value="Trending" onSelect={() => runCommand(() => goto('/trending'))}>
				<ChatBubble class="mr-2 h-4 w-4" />
				<span>Trending</span>
			</Command.Item>
			<Command.Item value="Movies" onSelect={() => runCommand(() => goto('/movies'))}>
				<Video class="mr-2 h-4 w-4" />
				<span>Movies</span>
			</Command.Item>
			<Command.Item value="Series" onSelect={() => runCommand(() => goto('/series'))}>
				<ListBullet class="mr-2 h-4 w-4" />
				<span>Series</span>
			</Command.Item>
			<Command.Separator />
			<Command.Item>
				<Person class="mr-2 h-4 w-4" />
				<span>Profile</span>
				<Command.Shortcut>⌘P</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<Gear class="mr-2 h-4 w-4" />
				<span>Settings</span>
				<Command.Shortcut>⌘S</Command.Shortcut>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Results">
			{#if searchQuery}
				<Command.Loading>Please wait</Command.Loading>
			{:else}
				{#each items as item}
					<Command.Item>
						{item}
					</Command.Item>
				{/each}
			{/if}
		</Command.Group>
	</Command.List>
</Command.Dialog>
