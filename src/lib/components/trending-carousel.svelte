<script lang="ts">
	import { onMount } from 'svelte';
	import { store, formatDate } from '$lib';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { ExclamationTriangle, Play, Star, Clock, Video, Calendar } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from '../../routes/$types';

	export let data: PageData;

	onMount(async () => {
		$store.trendingMovies = data.streamed.trendingMovies;
		console.log(`Slide: ${$store.lastShownSlide}`);
	});

	$: console.log(`Current slide: ${$store.lastShownSlide}`);
</script>

{#await $store.trendingMovies}
	<div class="grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3">
		<div class="hidden h-full w-full md:inline-flex" />
		<div class="row-start-1 mx-4 h-full text-xl text-white sm:row-start-2 md:row-start-3">
			<!-- Title -->
			<Skeleton class="mt-2 h-8 w-1/2 md:h-10" />
			<div class="mt-[1.5rem] flex items-center">
				<Video class="mr-2 h-5 w-5 text-primary" />
				<!-- Media Type -->
				<Skeleton class="h-4 w-10 md:h-5 md:w-14" />
				<Star class="mx-2 h-5 w-5 text-primary" />
				<!-- Rating -->
				<Skeleton class="h-4 w-10 md:h-5 md:w-14" />
				<Clock class="mx-2 h-5 w-5 text-primary" />
				<!-- Runtime -->
				<Skeleton class="h-4 w-10 md:h-5 md:w-14" />
				<Calendar class="mx-2 h-5 w-5 text-primary" />
				<!-- Release Data -->
				<Skeleton class="h-4 w-10 md:h-5 md:w-14" />
			</div>
			<Skeleton class="mt-2 h-10 w-auto" />
			<div class="mt-2 flex space-x-2 pb-1">
				<Skeleton class="mr-1 h-10 w-16" />
				<Skeleton class="mr-1 h-10 w-16" />
			</div>
		</div>
	</div>
{:then trendingMovies}
	<Splide
		on:moved={(e) => ($store.lastShownSlide = e?.detail.index ?? 0)}
		aria-label="Trending Movies"
		aria-live="polite"
		options={{
			type: 'loop',
			start: $store.lastShownSlide,
			pauseOnHover: true,
			pauseOnFocus: true,
			keyboard: 'global',
			autoplay: true,
			pagination: false,
			perPage: 1,
			arrows: false,
			focus: 'center',
			gap: '1rem'
		}}
	>
		{#each [...trendingMovies].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)) as trendingMovie}
			<SplideSlide>
				<div class="relative">
					<img
						class="w-full object-cover object-top md:h-[37rem]"
						src={trendingMovie.cover?.replace('1200x600', '1920x1080')}
						alt={trendingMovie.title.toString()}
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent" />
					<div class="absolute bottom-0 left-0 p-2 text-xl text-white scrollbar-hide md:p-4">
						<h1 class="text-lg font-extrabold md:text-3xl lg:text-4xl">
							{trendingMovie.title}
						</h1>
						<span class="flex items-center scrollbar-hide md:mt-4">
							<Video class="mr-2 h-5 w-5 text-primary" />
							<span class="text-sm md:text-lg">{trendingMovie.type}</span>
							{#if trendingMovie.rating}
								<Star class="mx-2 h-5 w-5 text-primary" />
								<span class="text-sm md:text-lg">{trendingMovie?.rating?.toFixed(1)}</span>
							{/if}
							<Clock class="mx-2 h-5 w-5 text-primary" />
							<span class="text-sm md:text-lg">{trendingMovie.duration}</span>
							<Calendar class="mx-2 h-5 w-5 text-primary" />
							<span class="text-sm md:text-lg">{formatDate(trendingMovie.releaseDate)}</span>
						</span>

						{#if trendingMovie.description}
							<span class="mt-2 line-clamp-2 overflow-hidden text-ellipsis text-sm md:text-lg">
								{trendingMovie.description}
							</span>
						{/if}

						<div class="mt-4 flex space-x-2">
							<a href="/{trendingMovie.id}">
								<Button>
									<Play class="mr-1 h-4 w-4 md:h-5 md:w-5" /> Watch
								</Button>
							</a>
							<a href="/" class={$store.cannotRate ? 'cursor-not-allowed' : ''}>
								<Button variant="outline" disabled={$store.cannotRate}>
									<Star class="mr-1 h-4 w-4 md:h-5 md:w-5" /> Rate
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
