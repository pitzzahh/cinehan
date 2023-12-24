import type { RequestHandler } from './$types';
import { movieProvider, getStreamingServer } from '$lib';

export const POST: RequestHandler = async ({ request }) => {
    const requestBody = await request.json()
    console.log(`Request body: ${JSON.stringify(requestBody)}`)
    const result = await movieProvider.fetchEpisodeSources(requestBody.episodeId, requestBody.mediaId, getStreamingServer(requestBody.name));
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