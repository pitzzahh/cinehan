<script lang="ts">
	import { onMount } from 'svelte';
	import { store, formatRuntime } from '$lib';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { ExclamationTriangle, Play, Star, Clock } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import type { PageData } from './$types';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import Tv from '$lib/config/icons/tv.svelte';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;

	onMount(async () => ($store.trendingMovies = data.streamed.trendingMovies));
</script>

{#await $store.trendingMovies}
	<div class="h-full md:h-[74%]">
		<div class="relative overflow-hidden md:h-[74%]">
			<div class="h-full w-full rounded object-cover" />
			<!-- Image -->
			<div class="absolute bottom-0 left-0 mx-4 h-full w-full p-4 text-xl text-white">
				<!-- Title -->
				<Skeleton class="mt-2 h-10 w-20 " />
				<div class="mt-4 flex items-center">
					<Tv class="mr-2 h-5 w-5 text-theme" />
					<!-- Media Type -->
					<Skeleton class="h-5 w-14" />
					<Star class="mx-2 h-5 w-5 text-theme" />
					<!-- Rating -->
					<Skeleton class="h-5 w-14" />
					<Clock class="mx-2 h-5 w-5 text-theme" />
					<!-- Runtime -->
					<Skeleton class="h-5 w-14" />
				</div>
				<Skeleton class="mt-2  h-8 w-full" />
				<div class="mt-4 flex space-x-2">
					<Skeleton class="mr-1 h-10 w-16" />
					<Skeleton class="mr-1 h-10 w-16" />
				</div>
			</div>
		</div>
	</div>
{:then trendingMovies}
	<Splide
		class="h-full md:h-[74%]"
		aria-label="Trending Movies"
		options={{
			type: 'loop',
			autoplay: true,
			pagination: false,
			perPage: 1,
			arrows: false,
			focus: 'center',
			gap: '1rem'
		}}
	>
		{#each trendingMovies as trendingMovie}
			<SplideSlide class="h-full md:h-[74%]">
				<div class="relative h-full w-full object-cover md:h-[74%]">
					<img
						class="h-full w-full rounded object-cover"
						src={trendingMovie.cover}
						alt={trendingMovie.title.toString()}
					/>
					<div class="absolute inset-0 bg-black opacity-60" />
					<div class="absolute bottom-0 left-0 mx-4 p-4 text-xl text-white">
						<h1 class="mt-2 text-lg font-extrabold md:text-3xl lg:text-3xl">
							{trendingMovie.title}
						</h1>
						<span class="mt-4 flex items-center">
							<Tv class="mr-2 h-5 w-5 text-primary" />
							<span class="text-sm md:text-lg">{trendingMovie.type}</span>
							<Star class="mx-2 h-5 w-5 text-theme" />
							<span class="text-sm md:text-lg">{trendingMovie?.rating?.toFixed(1)}</span>
							<Clock class="mx-2 h-5 w-5 text-primary" />
							<span class="text-sm md:text-lg">{formatRuntime(Number(trendingMovie.duration))}</span
							>
						</span>
						<span class="text-sm italic md:text-lg">
							{(trendingMovie.tags && trendingMovie.tags[0]) || ''}
						</span>
						<span
							class="mt-2 line-clamp-2 overflow-hidden text-ellipsis text-sm md:text-lg"
							title={trendingMovie.description}>{trendingMovie.description}</span
						>
						<div class="mt-4 flex space-x-2">
							<a href="/movies/{trendingMovie.id}">
								<Button class="transition-all hover:bg-theme hover:text-theme-foreground">
									<Play class="mr-1 h-5 w-5" /> Watch
								</Button>
							</a>
							<a href="/">
								<Button class="transition-all hover:bg-theme hover:text-theme-foreground">
									<Star class="mr-1 h-5 w-5" /> Rate
								</Button>
							</a>
						</div>
					</div>
				</div>
			</SplideSlide>
		{/each}
	</Splide>
{:catch err}
	<div class="container mt-4">
		<Alert.Root variant="destructive">
			<ExclamationTriangle class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{err.message}</Alert.Description>
		</Alert.Root>
	</div>
{/await}
