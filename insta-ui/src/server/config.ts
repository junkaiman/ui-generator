import OpenAI from 'openai';
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('UPSTASH related keys are not defined in environment variables');
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(20, "3600 s"),
});