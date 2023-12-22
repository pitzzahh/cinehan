<script lang="ts">
	import { Download } from 'radix-icons-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from '../../routes/movie/[id]/$types';
	import { goto } from '$app/navigation';
	export let data: PageData;
	let { movieInfo, sources } = data;
</script>

{#if movieInfo}
	<div
		class="light-theme m-4 grid auto-cols-auto auto-rows-auto gap-2 rounded-md p-4 text-primary-foreground dark:text-secondary-foreground"
	>
		<div class="md:col-start-1">
			<span class="text-2xl font-bold">{movieInfo.title}</span>
			<p class="text-slate-100">{movieInfo.description}</p>
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
							<Badge variant="destructive">404 not found</Badge>
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
							<Badge variant="destructive">404 not found</Badge>
						{/if}
					</span>
				</li>
				<li>
					<strong class="mr-1">Status:</strong>
					{#if movieInfo.status}
						<Badge>{movieInfo.status}</Badge>
					{:else}
						<Badge variant="destructive">404 not found</Badge>
					{/if}
				</li>
				<li><strong class="mr-1">Rating:</strong><Badge>{movieInfo.rating}</Badge></li>
			</ul>
			<Separator class="my-2" orientation="horizontal" />
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						class="w-full transition-all hover:bg-primary"
						on:click={() => {
							goto(`/${movieInfo.id}/download`);
						}}
					>
						<Download class="mr-2 h-4 w-4" />
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
