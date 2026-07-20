import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer as createHttpServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAllowanceTracker, DomainError } from "./domain.js";

const directory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(directory, "../public");

const staticFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]]
]);

function sendJson(response, status, value) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

async function readJson(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) {
      throw new DomainError("Request body is too large", { code: "BODY_TOO_LARGE", status: 413 });
    }
  }
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    throw new DomainError("Request body must be valid JSON", { code: "INVALID_JSON" });
  }
}

async function serveStatic(response, pathname) {
  const entry = staticFiles.get(pathname);
  if (!entry) return false;
  const [fileName, contentType] = entry;
  const filePath = path.join(publicDirectory, fileName);
  const metadata = await stat(filePath);
  response.writeHead(200, {
    "content-type": contentType,
    "content-length": metadata.size,
    "cache-control": "no-store"
  });
  createReadStream(filePath).pipe(response);
  return true;
}

async function routeApi(request, response, tracker, url) {
  if (request.method === "GET" && url.pathname === "/api/state") {
    return sendJson(response, 200, tracker.stateFor(url.searchParams.get("actor") ?? "guardian-1"));
  }

  const body = await readJson(request);
  if (request.method === "POST" && url.pathname === "/api/children") {
    return sendJson(response, 201, tracker.addChild(body));
  }
  if (request.method === "POST" && url.pathname === "/api/bhores") {
    return sendJson(response, 201, tracker.createBhore(body));
  }
  if (request.method === "PATCH" && url.pathname.startsWith("/api/bhores/")) {
    return sendJson(response, 200, tracker.updateBhore({
      ...body,
      bhoreId: url.pathname.split("/").at(-1)
    }));
  }
  if (request.method === "POST" && /^\/api\/bhores\/[^/]+\/archive$/.test(url.pathname)) {
    return sendJson(response, 200, tracker.archiveBhore({
      ...body,
      bhoreId: url.pathname.split("/")[3]
    }));
  }
  if (request.method === "POST" && url.pathname === "/api/assignments") {
    return sendJson(response, 201, tracker.createAssignment(body));
  }
  if (request.method === "POST" && /^\/api\/assignments\/[^/]+\/submit$/.test(url.pathname)) {
    return sendJson(response, 200, tracker.submitAssignment({
      ...body,
      assignmentId: url.pathname.split("/")[3]
    }));
  }
  if (request.method === "POST" && /^\/api\/assignments\/[^/]+\/approve$/.test(url.pathname)) {
    return sendJson(response, 200, tracker.approveAssignment({
      ...body,
      assignmentId: url.pathname.split("/")[3]
    }));
  }
  if (request.method === "POST" && /^\/api\/assignments\/[^/]+\/reject$/.test(url.pathname)) {
    return sendJson(response, 200, tracker.rejectAssignment({
      ...body,
      assignmentId: url.pathname.split("/")[3]
    }));
  }
  if (request.method === "POST" && url.pathname === "/api/adjustments") {
    return sendJson(response, 201, tracker.adjustBalance(body));
  }
  return sendJson(response, 404, { error: { code: "NOT_FOUND", message: "Route not found" } });
}

export function createAllowanceServer({ tracker = createAllowanceTracker() } = {}) {
  return createHttpServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");
      if (url.pathname === "/health") return sendJson(response, 200, { ok: true });
      if (url.pathname.startsWith("/api/")) return await routeApi(request, response, tracker, url);
      if (request.method === "GET" && await serveStatic(response, url.pathname)) return;
      sendJson(response, 404, { error: { code: "NOT_FOUND", message: "Page not found" } });
    } catch (error) {
      const status = error instanceof DomainError ? error.status : 500;
      sendJson(response, status, {
        error: {
          code: error instanceof DomainError ? error.code : "INTERNAL_ERROR",
          message: error instanceof DomainError ? error.message : "Unexpected server error"
        }
      });
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4173);
  const server = createAllowanceServer();
  server.listen(port, "127.0.0.1", () => {
    console.log(`Allowance Tracker reference app: http://127.0.0.1:${port}`);
  });
}
