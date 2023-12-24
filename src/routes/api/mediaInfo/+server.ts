import { getStreamingServer, movieProvider } from '$lib';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { episodeId, mediaId, server } = await request.json()
    console.log(`Info params: ${JSON.stringify(episodeId, mediaId)}`)
    const result = await movieProvider.fetchEpisodeSources(episodeId, mediaId, getStreamingServer(server));
    const qualities = result.sources.map((source) => ({
        name: source.quality,
        value: source.url,
        default: source.quality === 'auto'
    }));
    return new Response(JSON.stringify(qualities), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        }
    });
};