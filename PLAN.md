# Stream Kit Monorepo Setup Plan

This plan outlines the steps to create the `@open-game-system/stream-kit` monorepo, mirroring the structure and tooling (`pnpm`, `turbo`) of the `app-bridge` repository.

## Phase 1: Project Initialization & Root Configuration

- [x] **Initialize Project Root (`/Users/jonathanmumm/src/stream-kit`)**
    - [x] Create root `package.json`
        - Define project name, private status.
        - Add `pnpm` and `turbo` as dev dependencies.
        - Add basic scripts (`build`, `dev`, `test`, `typecheck`) using `turbo`.
    - [x] Create `pnpm-workspace.yaml`
        - Define the `packages/*` path.
    - [x] Create root `tsconfig.json`
        - Set up a base TypeScript configuration (e.g., target ES2018/ESNext, module ESNext, strict mode, composite).
    - [x] Create `turbo.json`
        - Define basic pipeline tasks (`build`, `dev`, `test`, `typecheck`) with dependencies.
    - [x] Create `.gitignore`
        - Add common ignores (node_modules, build outputs, logs, OS files, IDE files, .env, .turbo). Reference `app-bridge`'s `.gitignore`.

## Phase 2: Package Creation

- [x] **Create `packages` Directory**
    - `mkdir packages`
- [x] **Create `stream-kit-types` Package (`packages/stream-kit-types`)**
    - [x] Create `package.json`
        - Name: `@open-game-system/stream-kit-types`.
        - No runtime dependencies.
        - Add build/dev scripts.
        - Mark as public.
    - [x] Create `tsconfig.json` (extends root).
    - [x] Create `tsup.config.ts` (builds CJS/ESM, generates d.ts).
    - [x] Create `src/index.ts` (initial empty export or basic types).
    - [x] Create basic `README.md`.
- [x] **Create `stream-kit-web` Package (`packages/stream-kit-web`)**
    - [x] Create `package.json`
        - Name: `@open-game-system/stream-kit-web`.
        - Add peer dependency for `typescript`.
        - Add necessary types (e.g., `@open-game-system/stream-kit-types`).
        - Add build/dev scripts.
        - Mark as public.
    - [x] Create `tsconfig.json` (extends root).
    - [x] Create `tsup.config.ts` (builds CJS/ESM, generates d.ts).
    - [x] Create `src/index.ts` (initial empty export or basic function).
    - [x] Create basic `README.md`.
- [x] **Create `stream-kit-react` Package (`packages/stream-kit-react`)**
    - [x] Create `package.json`
        - Name: `@open-game-system/stream-kit-react`.
        - Add peer dependencies: `react`, `typescript`.
        - Add dependencies: `@open-game-system/stream-kit-web`, `@open-game-system/stream-kit-types`.
        - Add build/dev scripts.
        - Mark as public.
    - [x] Create `tsconfig.json` (extends root, specify `jsx: "react-jsx"`).
    - [x] Create `tsup.config.ts` (builds CJS/ESM, generates d.ts, handles JSX).
    - [x] Create `src/index.tsx` (initial empty export or basic component).
    - [x] Create `README.md` (Can adapt content from `STREAM_KIT_ROOT_README_DRAFT.md`).
- [x] **Create `stream-kit-server` Package (`packages/stream-kit-server`)**
    - [x] Create `package.json`
        - Name: `@open-game-system/stream-kit-server`.
        - Add peer dependencies: `typescript`, potentially `puppeteer`, `fast-json-patch`.
        - Add dependencies: `@open-game-system/stream-kit-types`.
        - Add build/dev scripts.
        - Mark as public.
    - [x] Create `tsconfig.json` (extends root).
    - [x] Create `tsup.config.ts` (builds CJS/ESM, generates d.ts).
    - [x] Create `src/index.ts` (initial empty export or basic function).
    - [x] Create `README.md` (Can adapt content from `STREAM_KIT_SERVER_README_DRAFT.md`).

## Phase 3: Documentation & Final Setup

- [x] **Create `docs` Directory**
    - `mkdir docs`
    - [x] Add basic `README.md` or placeholder content.
- [x] **Create Root `README.md`**
    - Add initial project description, referencing the packages.
- [x] **Install Dependencies**
    - Run `pnpm install` at the root.
- [x] **Initial Build**
    - Run `pnpm build` (or `turbo build`) to verify the setup.

## Phase 4: Populate with Code (Separate Step)

- [ ] Populate `src` directories of each package with actual code based on the draft READMEs and spec.
- [ ] Refine READMEs for each package.
- [ ] Add example usage (e.g., in an `examples/` directory similar to `app-bridge`).
- [ ] Set up testing infrastructure (e.g., `vitest`).
- [ ] Set up CI/CD (e.g., GitHub Actions workflow). 