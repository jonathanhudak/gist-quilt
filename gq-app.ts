import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { fetchGist } from "./fetchGist.ts";

const manifestId = "0ac5dd5b9515626f3b93497804ffdc98";

async function handler(req: Request): Promise<Response> {
  const manifest = await fetchGist(manifestId);
  const url = new URL(req.url);
  console.log(manifest);

  const getPage = async (path: string) => {
    const page = manifest.routes[path];
    if (!page) {
      return `<h1>404</h1>`;
    }
    return await fetchGist(page);
  };

  const body = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>gist quilt</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      ${await fetchGist(manifest.nav)}
      ${await getPage(url.pathname)}
      ${await fetchGist(manifest.footer)}
    </body>
    </html>
  `;
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

serve(handler);
