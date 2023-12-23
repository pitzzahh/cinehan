import { movieProvider } from '$lib';
import type { IMovieEpisode, IMovieInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    try {
        const movieId = `movie/${params.id}`
        console.log(`Params: ${JSON.stringify(movieId)}`)
        const result: IMovieInfo = await movieProvider.fetchMediaInfo(movieId)
        const episodes = result?.episodes as IMovieEpisode[]
        return {
            movieInfo: result,
            episodes,
            sources: (await movieProvider.fetchEpisodeSources(episodes[0].id, movieId))
        };
    } catch (err: any) {
        console.error('Error fetching movie info:', err);
        error(err.statusCode, 'Failed to fetch movie info. Please try again later.');
    }
}) satisfies PageServerLoad;