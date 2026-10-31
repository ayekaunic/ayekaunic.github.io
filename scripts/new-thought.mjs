import { writeFileSync, existsSync } from 'node:fs';
const title = process.argv.slice(2).join(' ').trim();
if (!title) { console.error('Usage: npm run new:thought -- "your thought title"'); process.exit(1); }
const date = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Karachi', year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const slug = title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
if (!slug) { console.error('Please include at least one letter or number in the title.'); process.exit(1); }
const path = `src/content/thoughts/${date}-${slug}.md`;
if (existsSync(path)) { console.error(`Already exists: ${path}`); process.exit(1); }
writeFileSync(path, `---\ntitle: ${JSON.stringify(title)}\ndate: "${date}"\ndraft: true\n---\n\nyour thought goes here.\n`, {flag:'wx'});
console.log(`Created ${path}\nWrite your thought, then set draft: false to include it on the site.`);
