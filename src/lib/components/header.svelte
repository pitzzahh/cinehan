<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Icons } from '$lib/config/icons';
	import { goto } from '$app/navigation';
	import { siteConfig } from '$lib/config/site';
	import { Sun, Moon, MagnifyingGlass } from 'radix-icons-svelte';
	import { setMode, resetMode } from 'mode-watcher';
	import { page } from '$app/stores';
	import { store, fetchTrendingMovies } from '$lib';
	import User from '$lib/config/icons/user.svelte';
	import SearchDialog from '$lib/components/search-dialog.svelte';

	let isLoggingOut = false;

	const logout = () => {
		isLoggingOut = true;
	};
</script>

<header
	class="shadown-sm sticky top-0 z-50 mx-4 flex items-center justify-between backdrop-blur-[10px]"
>
	<div class="flex items-center gap-1">
		<Icons.logo on:click={() => goto('/')} />
		<div class="hidden gap-2 md:flex">
			{#each siteConfig.navLinks as link}
				<Button
					variant="ghost"
					class={'hover:font-bold hover:text-primary ' + $page.route && link.href === $page.route.id
						? 'bg-primary font-bold transition-all'
						: ''}
					on:click={() => {
						goto(link.href);
						if (link.href === '/') {
							$store.trendingMovies = fetchTrendingMovies();
						}
					}}>{link.text}</Button
				>
			{/each}
		</div>
	</div>
	<div class="flex h-14 items-center justify-between gap-1">
		<Button
			variant="outline"
			class="relative w-full justify-start text-sm text-muted-foreground sm:w-64 md:pr-12"
			on:click={() => ($store.openSearchBar = true)}
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

		{#if $store.isLoggedIn}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" class="h-8 w-8 rounded-full ">
						<Avatar.Root class="h-8 w-8">
							<Avatar.Image src="https://github.com/pitzzahh.png" alt="@pitzzahh" />
							<Avatar.Fallback>User</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Profile</DropdownMenu.Item>
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Item on:click={logout}>Logout</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<Button on:click={() => ($store.isLoggedIn = true)}>
				<User class="h-4 w-4 md:mr-2" />
				<span class="hidden sm:flex">Login</span>
			</Button>
		{/if}
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

<SearchDialog />

<AlertDialog.Root bind:open={isLoggingOut}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure you want to logout?</AlertDialog.Title>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => ($store.isLoggedIn = false)}>Logout</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
