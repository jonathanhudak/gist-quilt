import { Octokit } from "https://cdn.skypack.dev/octokit?dts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const { GITHUB_PERSONAL_ACCESS_TOKEN } = config();
const octokit = new Octokit({ auth: GITHUB_PERSONAL_ACCESS_TOKEN });

interface GistFile {
  type: string;
  content: string;
  raw_url: string;
}

export const fetchGist = async (
  id: string,
  options: { raw: boolean; logResponse: boolean } = {
    raw: false,
    logResponse: false,
  }
) => {
  try {
    const { data: gistData } = await octokit.rest.gists.get({
      gist_id: id,
    });
    if (options.logResponse) {
      console.log("gistData", gistData);
    }
    const { files } = gistData;
    const [[, file]] = Object.entries(files as GistFile[]);
    if (options.raw) {
      return file.raw_url;
    }
    switch (file.type) {
      case "application/json":
        console.log("json", file.content);
        return JSON.parse(file.content);
      default:
        return file.content;
    }
  } catch (e) {
    return `error fetching gist: ${e}`;
  }
};
