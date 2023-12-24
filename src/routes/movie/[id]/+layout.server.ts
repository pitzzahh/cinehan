import { movieProvider } from '$lib';
import type { IMovieInfo, IMovieEpisode } from '@consumet/extensions';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
    try {
        const movieId = `movie/${params.id}`
        console.log(`Params: ${JSON.stringify(movieId)}`)
        const result: IMovieInfo = await movieProvider.fetchMediaInfo(movieId)
        const episodes = result?.episodes as IMovieEpisode[]
        console.log(`Episodes: ${JSON.stringify(episodes)}`)
        const episodeId = episodes[0].id;
        return {
            movieInfo: result,
            episodes,
            videoPlayerData: Promise.all([
                movieProvider.fetchEpisodeSources(episodeId, movieId),
                movieProvider.fetchEpisodeServers(episodeId, movieId)
            ])
        };
    } catch (err: any) {
        console.error('Error fetching movie info:', err);
        error(err.statusCode, 'Failed to fetch movie info. Please try again later.');
    }
}) satisfies LayoutServerLoad;