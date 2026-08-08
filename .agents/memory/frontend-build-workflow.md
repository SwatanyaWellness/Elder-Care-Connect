---
name: Frontend build workflow
description: Environment-specific build and preview behavior for the Vite website.
---

Directly running the website's Vite build from the shell does not provide the `PORT` and `BASE_PATH` variables required by its Vite configuration. The build can therefore fail before compiling even when typechecking is clean.

**Why:** The artifact workflow injects routing and service configuration that the local shell command does not have.

**How to apply:** Use the managed website workflow for restart and preview verification. Use the package typecheck independently; if a production bundle is needed from the shell, provide the workflow-equivalent variables explicitly.