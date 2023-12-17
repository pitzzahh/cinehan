<script lang="ts">
	import { Button } from './ui/button';
	import * as Command from '$lib/components/ui/command';
	import { EnvelopeClosed, Gear, Person } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import { Icons } from '$lib/config/icons';
	import { goto } from '$app/navigation';
	import { siteConfig } from '$lib/config/site';
	import { Sun, Moon, MagnifyingGlass } from 'radix-icons-svelte';
	import { setMode, resetMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	let open = false;

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = true;
			}
		}
		document.addEventListener('keydown', handleKeydown);

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
	class="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 items-center justify-between">
		<div class="justify-left flex items-center">
			<Icons.logo on:click={() => goto('/')} />
			<div class="hidden gap-6 md:flex">
				{#each siteConfig.navLinks as link}
					<button 
						on:click={() => {
							goto(link.to);
							link.selected = !link.selected;
						}}
						class:selectedLink={link.selected}>{link.text}</button
					>
				{/each}
			</div>
		</div>
		<div class="flex h-14 items-center justify-between gap-2">
			<Button
				variant="outline"
				class="sm:w-100 relative w-full justify-start text-sm text-muted-foreground md:pr-12 lg:w-64"
				on:click={() => (open = true)}
				{...$$restProps}
			>
				<div>
					<MagnifyingGlass class="mr-2 h-4 w-4" />
				</div>
				<span class="hidden lg:inline-flex"> Search movies... </span>
				<span class="inline-flex lg:hidden">Search...</span>
				<kbd
					class="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex"
				>
					<span class="text-xs">⌘</span>K
				</kbd>
			</Button>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" size="icon">
						<Sun
							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
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
	</div>
</header>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			{#each siteConfig.navLinks as link}
				<Command.Item
					value={link.text}
					onSelect={() =>
						runCommand(() => {
							link.to && goto(link.to);
						})}
				>
					<span>{link.text}</span>
				</Command.Item>
			{/each}
			<Command.Separator />
			<Command.Item>
				<Person class="mr-2 h-4 w-4" />
				<span>Profile</span>
				<Command.Shortcut>⌘P</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<EnvelopeClosed class="mr-2 h-4 w-4" />
				<span>Mail</span>
				<Command.Shortcut>⌘B</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<Gear class="mr-2 h-4 w-4" />
				<span>Settings</span>
				<Command.Shortcut>⌘S</Command.Shortcut>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Results">
			<!-- Add results of search here -->
		</Command.Group>
	</Command.List>
</Command.Dialog>
