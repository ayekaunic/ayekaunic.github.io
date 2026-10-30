import rss from '@astrojs/rss';
import { getThoughts, excerpt } from '../lib/content';
export async function GET() { return rss({title:'aun — shower thoughts',description:'belief. consistency. attention to detail.',site:'https://ayekaunic.com',items:(await getThoughts()).map(p=>({title:p.data.title,pubDate:new Date(p.data.date+'T00:00:00+05:00'),link:`/shower-thoughts/${p.id}/`,description:excerpt(p.body)}))}); }
