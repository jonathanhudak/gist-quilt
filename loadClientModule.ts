import { fetchGist } from "./fetchGist.ts";
import { bundle } from "https://deno.land/x/emit@0.16.0/mod.ts";

export async function loadClientTSModule(url: URL) {
  return await bundle(url);
}

export async function loadClientTSModuleFromGist(id: string) {
  const clientModuleAUrl = await fetchGist(id, {
    raw: true,
  });

  return await loadClientTSModule(new URL(clientModuleAUrl));
}
