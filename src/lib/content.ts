import { getCollection } from 'astro:content';
export const getThoughts = async () => (await getCollection('thoughts', ({data}) => !data.draft && data.date <= new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' }))).sort((a,b) => b.data.date.localeCompare(a.data.date));
export const dateLabel = (date: string) => new Date(date + 'T12:00:00Z').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Karachi' });
export const excerpt = (body = '') => body.trim().split('\n\n')[0].replace(/[*_]/g, '');
export const readingTime = (body = '') => Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 220));
