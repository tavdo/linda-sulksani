export function isNetlifyRuntime() {
  // Netlify Functions run on AWS Lambda (/var/task). Env vars differ between
  // build and runtime, so we check several signals.
  return (
    process.env.NETLIFY === "true" ||
    typeof process.env.NETLIFY_SITE_ID === "string" ||
    typeof process.env.NETLIFY_LOCAL === "string" ||
    typeof process.env.DEPLOY_PRIME_URL === "string" ||
    typeof process.env.SITE_URL === "string" ||
    typeof process.env.AWS_LAMBDA_FUNCTION_NAME === "string" ||
    process.cwd().startsWith("/var/task")
  );
}
