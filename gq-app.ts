import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
import { fetchGist } from "./fetchGist.ts";
import { buildWebComponentNodeList } from "./buildWebComponentHTML.ts";
const manifestId = "0ac5dd5b9515626f3b93497804ffdc98";
async function home(ctx: Context) {
  const manifest = await fetchGist(manifestId);
  const url = new URL(ctx.request.url);
  const clientModule = await fetchGist("f4917f23434b8f8b6bf0e55c9c3333b2");
  const webComponents = await fetchGist(manifest.webComponents, {
    logResponse: true,
    raw: false,
  });
  const lume3dWebComponent = buildWebComponentNodeList(webComponents.lume3d);

  const getPage = async (path: string) => {
    const page = manifest.routes[path];
    if (!page) {
      return `<h1>404</h1>`;
    }
    return await fetchGist(page);
  };

  ctx.response.body = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>gist quilt</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      ${await fetchGist(manifest.nav)}
      ${await getPage(url.pathname)}

      <hr/>
      <h2>Client Module</h2>
      <a href="https://gist.github.com/jonathanhudak/f4917f23434b8f8b6bf0e55c9c3333b2">Loaded from this gist</a>
      <script>
      ${clientModule}
      </script>

      <hr/>

      ${String(lume3dWebComponent)}
      <hr />

      ${await fetchGist(manifest.footer)}

      <hr />
    </body>
    </html>
  `;
}

const router = new Router();
router.get("/", home);
router.get("/about", home);
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
