import type { PageServerLoad } from "./$types";
import { fetchTrendingMovies } from "$lib";

export const prerender = true

export const load: PageServerLoad = async () => {
    return {
        streamed: {
            trendingMovies: fetchTrendingMovies()
        }
    }
};