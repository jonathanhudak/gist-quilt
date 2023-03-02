interface GistFile {
  type: string;
  content: string;
}

export const fetchGist = async (id: string) => {
  const res = await fetch(`https://api.github.com/gists/${id}`);
  const gistData = await res.json();
  const { files } = gistData;
  const [[, file]] = Object.entries(files as GistFile[]);
  switch (file.type) {
    case "application/json":
      return JSON.parse(file.content);
    default:
      return file.content;
  }
};
