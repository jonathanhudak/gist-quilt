interface GistFile {
  type: string;
  content: string;
  raw_url: string;
}

export const fetchGist = async (
  id: string,
  options: { raw: boolean } = { raw: false }
) => {
  const res = await fetch(`https://api.github.com/gists/${id}`);
  const gistData = await res.json();
  const { files } = gistData;
  const [[, file]] = Object.entries(files as GistFile[]);
  if (options.raw) {
    return file.raw_url;
  }

  switch (file.type) {
    case "application/json":
      return JSON.parse(file.content);
    default:
      return file.content;
  }
};
