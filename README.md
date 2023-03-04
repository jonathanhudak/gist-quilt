# Gist Quilt

## Prereq

* https://deno.land/manual@v1.31.1/getting_started/installation

## Setup

### Create HTML gists
```
brew install gh

cd gists

gh gist create --public gq-nav.html
gh gist create --public gq-footer.html
gh gist create --public gq-home.html
gh gist create --public gq-about.html
```

### Upload manifest
Update gq-manifest.json with gist ids output from commands above

```
gh gist create --public gq-manifest.json
```

### Run web server

```
deno task dev
```

## References

* https://cli.github.com/manual/gh_gist
* https://deno.land/manual@v1.31.1/runtime/http_server_apis#a-hello-world-server*
* https://deno.land/x/dotenv@v3.2.0
* https://github.com/octokit/octokit.js/
* https://octokit.github.io/rest.js/v19#gists-get