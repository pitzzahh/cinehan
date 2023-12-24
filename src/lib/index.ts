import { writable } from 'svelte/store';
import { MOVIES, type IMovieResult, type IMovieInfo, StreamingServers } from '@consumet/extensions';
import { error } from '@sveltejs/kit';

export const store = writable({
    trendingMovies: Promise.resolve([] as IMovieInfo[]),
    trendingTvShows: Promise.resolve([] as IMovieInfo[]),
    cannotRate: true,
    openSearchBar: false,
    lastShownSlide: 0,
    isLoggedIn: false,
    cannotDownload: true
})

export let host = 'https://cinehan.vercel.app'
export let movieProvider = new MOVIES.MovieHdWatch()

export const getStreamingServer = (value: string): StreamingServers | undefined => {
    for (const key in StreamingServers) {
        if (StreamingServers[key as keyof typeof StreamingServers] === value) {
            return StreamingServers[key as keyof typeof StreamingServers];
        }
    }
}

export const fetchTrendingMovies = async (): Promise<IMovieInfo[]> => {
    try {
        console.log(`Fetching trending movies`);
        const moviePromises: Promise<IMovieInfo | null>[] = (await movieProvider.fetchTrendingMovies()).map(async (trendingMovie: IMovieResult) => await movieProvider.fetchMediaInfo(trendingMovie.id));
        return (await Promise.all(moviePromises)).filter((movie) => movie !== null) as IMovieInfo[];
    } catch (err: any) {
        console.error('Error fetching trending movies:', err);
        error(err.statusCode, 'Failed to fetch trending movies. Please try again later.');
    }
}

export const formatRuntime = (runtime: number | undefined) => {
    if (runtime === undefined) {
        return '';
    }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};

export const formatDate = (dateString: string | undefined) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : dateString;
};