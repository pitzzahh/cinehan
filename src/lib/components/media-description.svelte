<script lang="ts">
	import type { IMovieInfo } from '@consumet/extensions';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	export let mediaInfo: IMovieInfo;
</script>

{#if mediaInfo}
	<div
		class="light-theme m-4 grid auto-cols-auto auto-rows-auto gap-2 rounded-md p-4 text-primary-foreground dark:text-secondary-foreground"
	>
		<div class="col-start-1">
			<span class="text-2xl font-bold">{mediaInfo.title}</span>
			<p class="text-slate-100">{mediaInfo.description}</p>
		</div>
		<div class="col-start-2">
			<p class="mb-0 font-semibold">Additional Information:</p>
			<ul class="mb-2 list-disc pl-4">
				<li>
					<strong class="mr-1">Casts:</strong>
					<span>
						{#if mediaInfo.casts}
							{#each mediaInfo.casts as cast}
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
						{#if mediaInfo.genres}
							{#each mediaInfo.genres as genre}
								<Badge class="mr-1">{genre}</Badge>
							{/each}
						{:else}
							<Badge variant="destructive">404 not found</Badge>
						{/if}
					</span>
				</li>
				<li>
					<strong class="mr-1">Status:</strong>
					{#if mediaInfo.status}
						<Badge>{mediaInfo.status}</Badge>
					{:else}
						<Badge variant="destructive">404 not found</Badge>
					{/if}
				</li>
				<li><strong class="mr-1">Rating:</strong><Badge>{mediaInfo.rating}</Badge></li>
			</ul>
			<Button class="w-full transition-all hover:bg-theme hover:text-theme-foreground"
				>Download</Button
			>
		</div>
	</div>
{/if}
