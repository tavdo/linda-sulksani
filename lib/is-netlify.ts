export function isNetlifyRuntime() {
  // Netlify sets NETLIFY=true in most contexts, but depending on framework/runtime
  // it may not be present. These fallbacks reliably indicate Netlify Functions.
  return (
    process.env.NETLIFY === "true" ||
    typeof process.env.NETLIFY_SITE_ID === "string" ||
    typeof process.env.NETLIFY_LOCAL === "string" ||
    typeof process.env.DEPLOY_PRIME_URL === "string" ||
    typeof process.env.SITE_URL === "string"
  );
}
