import { type Job } from '$lib/types';
import { jobs } from '$lib/jobs.json';
export const load = async ({}) => {
    const response = jobs;

    return {
        jobs: response
    }
}