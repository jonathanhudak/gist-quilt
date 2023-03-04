interface ScriptConfig {
  attributes?: Record<string, string>;
  type: "script";
  src: string;
  value: string;
}

interface StyleConfig {
  type: "style";
  value: string;
}

interface HTMLConfig {
  type: "html";
  value: string;
}

type WebComponentConfig = ScriptConfig | StyleConfig | HTMLConfig;

export function buildWebComponentNode(config: WebComponentConfig) {
  switch (config.type) {
    case "script":
      return `<script ${Object.entries(config.attributes || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")}>${config.value || ""}</script>`;
    case "style":
      return `<style>${config.value}</style>`;
    case "html":
      return config.value;
  }
}

export function buildWebComponentNodeList(list: WebComponentConfig[]) {
  try {
    return list.map(buildWebComponentNode).join("");
  } catch (e) {
    console.error(e);
    return "error building web component";
  }
}
