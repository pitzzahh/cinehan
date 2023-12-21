import { writable } from 'svelte/store';
import { MOVIES, META, type IMovieResult, type IMovieInfo, type ISearch } from '@consumet/extensions';
import { error } from '@sveltejs/kit';

export const store = writable({
    trendingMovies: Promise.resolve([] as IMovieInfo[]),
    trendingTvShows: Promise.resolve([] as IMovieInfo[])
})

export let movieProvider = new MOVIES.FlixHQ()

// export const fetchTrendingMovies = async (tmdbApiKey: string): Promise<IMovieInfo[]> => {
//     try {
//         console.log(`Fetching trending movies`);
//         const trendingMovies = await movieProvider.fetchTrendingMovies()
//         const trendingTitles = trendingMovies.map((e: IMovieResult) => {
//             return e.id
//         })
//         console.log(`TRENDING MOVIES: ${JSON.stringify(trendingTitles)}`);

//         const tmdb = new META.TMDB();
//         const moviePromises: Promise<IMovieInfo | null>[] = trendingMovies.map(async (trendingMovie: IMovieResult) => {
//             const searchResult = await tmdb.search(trendingMovie.title.toString(), 1) as ISearch<IMovieResult>;
//             const result = searchResult.results[0];
//             return result ? tmdb
//                 .fetchMediaInfo(result.id, 'Movie')
//                 .then((movie) => movie as IMovieInfo)
//                 .catch(() => null) : null
//         });
//         return (await Promise.all(moviePromises)).filter((movie) => movie !== null) as IMovieInfo[];
//     } catch (err: any) {
//         console.error('Error fetching trending movies:', err);
//         error(err.statusCode, 'Failed to fetch trending movies. Please try again later.');
//     }
// }

export const fetchTrendingMovies = async (): Promise<IMovieInfo[]> => {
    try {
        console.log(`Fetching trending movies`);
        const FlixHQTrendingMovies = await new MOVIES.FlixHQ().fetchTrendingMovies();
        const trendingTitles = FlixHQTrendingMovies.map((e) => {
            return e.title
        })
        console.log(`TRENDING MOVIES: ${JSON.stringify(trendingTitles)}`);

        const tmdb = new META.TMDB();
        const moviePromises: Promise<IMovieInfo | null>[] = FlixHQTrendingMovies.map(async (trendingMovie: IMovieResult) => {
            const searchResult = await tmdb.search(trendingMovie.title.toString(), 1) as ISearch<IMovieResult>;
            const result = searchResult.results[0];
            return result ? tmdb
                .fetchMediaInfo(result.id, 'Movie')
                .then((movie) => movie as IMovieInfo)
                .catch(() => null) : null
        });
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