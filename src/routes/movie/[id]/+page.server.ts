import { movieProvider } from '$lib';
import type { IMovieEpisode, IMovieInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const movieId = `movie/${params.id}`
    console.log(`Params: ${JSON.stringify(movieId)}`)
    const result: IMovieInfo = await movieProvider.fetchMediaInfo(movieId)
    const episodes = result?.episodes as IMovieEpisode[]
    return {
        movieInfo: result,
        episodes,
        sources: (await movieProvider.fetchEpisodeSources(episodes[0].id, movieId))
    };
}) satisfies PageServerLoad;