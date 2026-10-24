import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
const port = Number(process.env.PORT ?? 4179);
let items = [];
const send = (res, status, data) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(data));
};
async function body(req) {
  const parts = [];
  for await (const part of req) parts.push(part);
  try { return JSON.parse(Buffer.concat(parts).toString('utf8')); }
  catch { return null; }
}
createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  const method = req.method;
  if (method === 'GET' && url.pathname === '/health') return send(res, 200, { status: 'ok' });
  if (method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
    return res.end(await readFile(new URL('./index.html', import.meta.url)));
  }
  // Local-only deterministic test reset. Never expose this endpoint in production.
  if (method === 'POST' && url.pathname === '/__test/reset') {
    items = [{ id: 'seed-rice', name: 'Rice', quantity: 2 }, { id: 'seed-milk', name: 'Milk', quantity: 1 }];
    return send(res, 200, { ok: true });
  }
  if (method === 'GET' && url.pathname === '/api/items') return send(res, 200, { data: items });
  if (method === 'POST' && url.pathname === '/api/items') {
    const input = await body(req);
    if (!input || typeof input.name !== 'string' || !input.name.trim() || !Number.isInteger(input.quantity) || input.quantity < 0)
      return send(res, 422, { error: 'Invalid item' });
    const item = { id: randomUUID(), name: input.name.trim(), quantity: input.quantity };
    items.push(item);
    return send(res, 201, { data: item });
  }
  const match = url.pathname.match(/^\/api\/items\/([a-zA-Z0-9-]+)$/);
  if (method === 'DELETE' && match) {
    const before = items.length;
    items = items.filter(x => x.id !== match[1]);
    return before === items.length ? send(res, 404, { error: 'Not found' }) : send(res, 200, { ok: true });
  }
  return send(res, 404, { error: 'Not found' });
}).listen(port, '127.0.0.1', () => console.log(`Demo ready at http://127.0.0.1:${port}`));
