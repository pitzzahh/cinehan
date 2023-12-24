<script lang="ts">
	import { Download } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Reload } from 'radix-icons-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import type { LayoutData } from '../../routes/movie/[id]/$types';
	import { store } from '$lib';

	export let data: LayoutData;
	let { movieInfo } = data;
	$: isRequestingForDownload = false;

	const download = () => {};
</script>

{#if movieInfo}
	<div
		class="dark:bg-theme-dark_bg m-4 grid auto-cols-auto auto-rows-auto gap-2 rounded-md bg-theme p-4 text-primary-foreground dark:text-primary-foreground"
	>
		<div class="md:col-start-1">
			<span class="mb-2 text-2xl font-bold">{movieInfo.title}</span>
			{#if movieInfo.description}
				<p class="text-slate-100">{movieInfo.description}</p>
			{:else}
				<Badge class="block text-center" variant="secondary">404 description not found</Badge>
			{/if}
		</div>
		<Separator class="my-2 md:mx-2 md:h-full md:w-[1px]" orientation="horizontal" />
		<div class="md:col-start-3">
			<p class="mb-0 font-bold">Additional Information:</p>
			<ul class="mb-2 list-disc pl-4">
				<li>
					<strong class="mr-1">Casts:</strong>
					<span>
						{#if movieInfo.casts}
							{#each movieInfo.casts as cast}
								<Badge class="mr-1">{cast}</Badge>
							{/each}
						{:else}
							<Badge variant="secondary">404 casts not found</Badge>
						{/if}
					</span>
				</li>
				<li>
					<strong class="mr-1">Genres:</strong>
					<span>
						{#if movieInfo.genres}
							{#each movieInfo.genres as genre}
								<Badge class="mr-1">{genre}</Badge>
							{/each}
						{:else}
							<Badge variant="secondary">404 genres not found</Badge>
						{/if}
					</span>
				</li>
				<li>
					<strong class="mr-1">Status:</strong>
					{#if movieInfo.status}
						<Badge>{movieInfo.status}</Badge>
					{:else}
						<Badge variant="secondary">404 movie status not found</Badge>
					{/if}
				</li>
				<li>
					<strong class="mr-1">Rating:</strong>
					{#if movieInfo.rating}
						<Badge>{movieInfo.rating}</Badge>
					{:else}
						<Badge variant="secondary">404 movie rating not found</Badge>
					{/if}
				</li>
			</ul>
			<Separator class="my-2" orientation="horizontal" />
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						disabled={$store.cannotDownload || isRequestingForDownload}
						builders={[builder]}
						variant="outline"
						class="w-full transition-all hover:bg-primary"
						on:click={download}
					>
						{#if isRequestingForDownload}
							<Reload class="mr-2 h-4 w-4 animate-spin" />
						{:else}
							<Download class="mr-2 h-4 w-4" />
						{/if}
						Download</Button
					>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Download {movieInfo.title}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</div>
{/if}
