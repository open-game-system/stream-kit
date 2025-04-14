├── .github
    └── workflows
    │   └── ci.yml
├── .gitignore
├── CONTRIBUTING.md
├── README.md
├── docs
    ├── ARCHITECTURE.md
    ├── CONCEPTS.md
    └── TESTING_STRATEGIES.md
├── examples
    ├── expo-app
    │   ├── .gitignore
    │   ├── App.tsx
    │   ├── README.md
    │   ├── __mocks__
    │   │   ├── @open-game-system
    │   │   │   └── app-bridge-native.js
    │   │   ├── expo-status-bar.js
    │   │   └── react-native-webview.js
    │   ├── __tests__
    │   │   └── App-test.tsx
    │   ├── app.json
    │   ├── assets
    │   │   ├── adaptive-icon.png
    │   │   ├── favicon.png
    │   │   ├── icon.png
    │   │   ├── splash-icon.png
    │   │   └── splash.png
    │   ├── babel.config.js
    │   ├── globals.d.ts
    │   ├── index.ts
    │   ├── jest.config.js
    │   ├── jest.setup.js
    │   ├── package.json
    │   └── tsconfig.json
    ├── react-app
    │   ├── README.md
    │   ├── index.html
    │   ├── package.json
    │   ├── src
    │   │   ├── App.tsx
    │   │   ├── Counter.test.tsx
    │   │   ├── Counter.tsx
    │   │   ├── bridge.ts
    │   │   ├── index.css
    │   │   ├── main.tsx
    │   │   ├── test
    │   │   │   └── setup.ts
    │   │   └── types.ts
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   ├── vite.config.ts
    │   └── vitest.config.ts
    └── shared
    │   └── types.ts
├── package.json
├── packages
    ├── app-bridge-native
    │   ├── README.md
    │   ├── package.json
    │   ├── src
    │   │   ├── __tests__
    │   │   │   └── createStore.test.ts
    │   │   ├── index.test.ts
    │   │   └── index.ts
    │   ├── tsconfig.json
    │   ├── tsup.config.ts
    │   └── vitest.config.ts
    ├── app-bridge-react-native
    │   ├── README.md
    │   ├── babel.config.js
    │   ├── jest.config.js
    │   ├── package.json
    │   ├── src
    │   │   ├── __mocks__
    │   │   │   └── react-native-webview.js
    │   │   ├── components
    │   │   │   ├── BridgedWebView.tsx
    │   │   │   └── __tests__
    │   │   │   │   └── BridgedWebView.test.tsx
    │   │   ├── context
    │   │   │   ├── __tests__
    │   │   │   │   └── createNativeBridgeContext.test.tsx
    │   │   │   └── createNativeBridgeContext.tsx
    │   │   ├── index.ts
    │   │   └── test
    │   │   │   └── setup.ts
    │   ├── tsconfig.json
    │   └── tsup.config.ts
    ├── app-bridge-react
    │   ├── README.md
    │   ├── package.json
    │   ├── src
    │   │   ├── index.test.tsx
    │   │   ├── index.tsx
    │   │   └── test
    │   │   │   └── setup.ts
    │   ├── tsconfig.json
    │   ├── tsup.config.ts
    │   └── vitest.config.ts
    ├── app-bridge-testing
    │   ├── README.md
    │   ├── __tests__
    │   │   ├── mock-bridge.test.ts
    │   │   └── setup.ts
    │   ├── package.json
    │   ├── src
    │   │   ├── index.test.ts
    │   │   └── index.ts
    │   ├── tsconfig.json
    │   ├── tsup.config.ts
    │   └── vitest.config.ts
    ├── app-bridge-types
    │   ├── README.md
    │   ├── package.json
    │   ├── src
    │   │   ├── globals.d.ts
    │   │   └── index.ts
    │   └── tsconfig.json
    └── app-bridge-web
    │   ├── README.md
    │   ├── package.json
    │   ├── src
    │       ├── index.test.ts
    │       └── index.ts
    │   ├── tsconfig.json
    │   ├── tsup.config.ts
    │   └── vitest.config.ts
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
└── turbo.json


/.gitignore:
--------------------------------------------------------------------------------
 1 | # Dependency directories
 2 | node_modules/
 3 | .pnpm-store/
 4 | 
 5 | # Build outputs
 6 | dist/
 7 | lib/
 8 | build/
 9 | 
10 | # TypeScript cache
11 | *.tsbuildinfo
12 | 
13 | # IDE specific files
14 | .vscode/
15 | .idea/
16 | *.sublime-workspace
17 | *.sublime-project
18 | 
19 | # Environment variables
20 | .env
21 | .env.local
22 | .env.development.local
23 | .env.test.local
24 | .env.production.local
25 | 
26 | # Debug logs
27 | npm-debug.log*
28 | yarn-debug.log*
29 | yarn-error.log*
30 | pnpm-debug.log*
31 | 
32 | # OS specific
33 | .DS_Store
34 | Thumbs.db
35 | 
36 | # Coverage directory
37 | coverage/
38 | 
39 | # Temp directories
40 | .temp/
41 | .tmp/
42 | tmp/
43 | temp/
44 | 
45 | # Expo
46 | .expo/
47 | .expo-shared/
48 | web-build/
49 | 
50 | # Native
51 | *.jks
52 | *.p8
53 | *.p12
54 | *.key
55 | *.mobileprovision
56 | *.orig.*
57 | 
58 | # Temporary files created by Metro
59 | .metro-health-check*
60 | 
61 | # Dependencies
62 | .pnp
63 | .pnp.js
64 | 
65 | # Testing
66 | coverage
67 | 
68 | # Production
69 | build
70 | dist
71 | lib
72 | 
73 | # Misc
74 | .DS_Store
75 | .env.local
76 | .env.development.local
77 | .env.test.local
78 | .env.production.local
79 | 
80 | # Logs
81 | npm-debug.log*
82 | yarn-debug.log*
83 | yarn-error.log*
84 | pnpm-debug.log*
85 | 
86 | # Editor directories and files
87 | .idea
88 | .vscode/*
89 | !.vscode/extensions.json
90 | !.vscode/settings.json
91 | !.vscode/tasks.json
92 | !.vscode/launch.json
93 | !.vscode/workspace.code-workspace
94 | 
95 | # Turbo
96 | .turbo 


--------------------------------------------------------------------------------
/CONTRIBUTING.md:
--------------------------------------------------------------------------------
  1 | # Contributing to App Bridge
  2 | 
  3 | We love your input! We want to make contributing to App Bridge as easy and transparent as possible, whether it's:
  4 | 
  5 | - Reporting a bug
  6 | - Discussing the current state of the code
  7 | - Submitting a fix
  8 | - Proposing new features
  9 | - Becoming a maintainer
 10 | 
 11 | ## Development Process
 12 | 
 13 | We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.
 14 | 
 15 | 1. Fork the repo and create your branch from `main`.
 16 | 2. If you've added code that should be tested, add tests.
 17 | 3. If you've changed APIs, update the documentation.
 18 | 4. Ensure the test suite passes.
 19 | 5. Make sure your code lints.
 20 | 6. Issue that pull request!
 21 | 
 22 | ## Project Setup
 23 | 
 24 | 1. Clone the repository:
 25 |    ```bash
 26 |    git clone https://github.com/your-username/app-bridge.git
 27 |    cd app-bridge
 28 |    ```
 29 | 
 30 | 2. Install dependencies:
 31 |    ```bash
 32 |    pnpm install
 33 |    ```
 34 | 
 35 | 3. Build all packages:
 36 |    ```bash
 37 |    pnpm build
 38 |    ```
 39 | 
 40 | 4. Run tests:
 41 |    ```bash
 42 |    pnpm test
 43 |    ```
 44 | 
 45 | ## Package Structure
 46 | 
 47 | The project is organized as a monorepo with the following packages:
 48 | 
 49 | - `@open-game-system/app-bridge-types`: Core type definitions
 50 | - `@open-game-system/app-bridge-web`: Web-specific implementation
 51 | - `@open-game-system/app-bridge-native`: React Native specific code
 52 | - `@open-game-system/app-bridge-react`: React hooks and components
 53 | - `@open-game-system/app-bridge-testing`: Testing utilities
 54 | 
 55 | ## Development Workflow
 56 | 
 57 | 1. Make changes in the appropriate package(s)
 58 | 2. Run tests for affected packages:
 59 |    ```bash
 60 |    pnpm test --filter "./packages/app-bridge-*"
 61 |    ```
 62 | 3. Build affected packages:
 63 |    ```bash
 64 |    pnpm build --filter "./packages/app-bridge-*"
 65 |    ```
 66 | 4. Test changes in example apps:
 67 |    ```bash
 68 |    cd examples/react-app
 69 |    pnpm dev
 70 |    ```
 71 | 
 72 | ## Pull Request Process
 73 | 
 74 | 1. Update the README.md with details of changes to the interface, if applicable.
 75 | 2. Update the documentation in the `docs/` directory.
 76 | 3. The PR may be merged once you have the sign-off of at least one other developer.
 77 | 
 78 | ## Any contributions you make will be under the MIT Software License
 79 | 
 80 | In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.
 81 | 
 82 | ## Report bugs using GitHub's [issue tracker](https://github.com/open-game-system/app-bridge/issues)
 83 | 
 84 | We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/open-game-system/app-bridge/issues/new).
 85 | 
 86 | ## Write bug reports with detail, background, and sample code
 87 | 
 88 | **Great Bug Reports** tend to have:
 89 | 
 90 | - A quick summary and/or background
 91 | - Steps to reproduce
 92 |   - Be specific!
 93 |   - Give sample code if you can.
 94 | - What you expected would happen
 95 | - What actually happens
 96 | - Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)
 97 | 
 98 | ## License
 99 | 
100 | By contributing, you agree that your contributions will be licensed under its MIT License. 


--------------------------------------------------------------------------------
/README.md:
--------------------------------------------------------------------------------
  1 | # 🌉 @open-game-system/app-bridge
  2 | 
  3 | A universal bridge that connects web games and the OpenGame App through a shared state store.
  4 | 
  5 | [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
  6 | [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  7 | 
  8 | ## 📚 Quick Links
  9 | 
 10 | - [🏗️ Architecture](docs/ARCHITECTURE.md) - System design and patterns
 11 | - [🎯 Core Concepts](docs/CONCEPTS.md) - Key concepts and usage patterns
 12 | - [🧪 Testing](docs/TESTING_STRATEGIES.md) - Testing utilities and patterns
 13 | 
 14 | ## 🔄 Overview
 15 | 
 16 | The app-bridge provides a unified way to manage state between web games and the OpenGame App:
 17 | 
 18 | - **Web Side**: Runs in a WebView, sending events to native and receiving state updates
 19 | - **Native Side**: Manages WebView communication and state updates
 20 | - **React Integration**: First-class React support with hooks and context providers
 21 | 
 22 | ## 📦 Packages
 23 | 
 24 | The app-bridge is split into several packages for better modularity:
 25 | 
 26 | - `@open-game-system/app-bridge-types`: Core type definitions
 27 | - `@open-game-system/app-bridge-web`: Web-specific implementation
 28 | - `@open-game-system/app-bridge-native`: React Native specific code
 29 | - `@open-game-system/app-bridge-react`: React hooks and components for web apps
 30 | - `@open-game-system/app-bridge-react-native`: React hooks and components for React Native apps
 31 | - `@open-game-system/app-bridge-testing`: Testing utilities
 32 | 
 33 | ## 📥 Installation
 34 | 
 35 | Choose the packages you need based on your use case:
 36 | 
 37 | ### For Web Apps
 38 | 
 39 | ```bash
 40 | # Required packages for web apps
 41 | pnpm add @open-game-system/app-bridge-web @open-game-system/app-bridge-react @open-game-system/app-bridge-types
 42 | ```
 43 | 
 44 | ### For React Native Apps
 45 | 
 46 | ```bash
 47 | # Required packages for React Native apps
 48 | pnpm add @open-game-system/app-bridge-native @open-game-system/app-bridge-react-native @open-game-system/app-bridge-types
 49 | ```
 50 | 
 51 | ### For Testing
 52 | 
 53 | ```bash
 54 | # Add testing utilities as a dev dependency
 55 | pnpm add -D @open-game-system/app-bridge-testing
 56 | ```
 57 | 
 58 | ## 🚀 Quick Start
 59 | 
 60 | ### Shared Types
 61 | 
 62 | First, create a shared types file that both web and native sides can use:
 63 | 
 64 | ```typescript
 65 | // shared/types.ts
 66 | export interface CounterState {
 67 |   value: number;
 68 | }
 69 | 
 70 | export type CounterEvents =
 71 |   | { type: "INCREMENT" }
 72 |   | { type: "DECREMENT" }
 73 |   | { type: "SET"; value: number };
 74 | 
 75 | export type AppStores = {
 76 |   counter: {
 77 |     state: CounterState;
 78 |     events: CounterEvents;
 79 |   };
 80 | };
 81 | ```
 82 | 
 83 | ### Web Side (React)
 84 | 
 85 | ```typescript
 86 | // 1. Import from the appropriate packages
 87 | import type { AppStores } from "./shared/types";
 88 | import { createWebBridge } from "@open-game-system/app-bridge-web";
 89 | import { createBridgeContext } from "@open-game-system/app-bridge-react";
 90 | 
 91 | // 2. Create the bridge with your type
 92 | const bridge = createWebBridge<AppStores>();
 93 | 
 94 | // 3. Create the bridge context with your type
 95 | const BridgeContext = createBridgeContext<AppStores>();
 96 | 
 97 | // 4. Create store contexts for each store you need
 98 | const CounterContext = BridgeContext.createStoreContext("counter");
 99 | 
100 | // 5. Use in components
101 | function Counter() {
102 |   // Using store context hooks
103 |   const value = CounterContext.useSelector((state) => state.value);
104 |   const store = CounterContext.useStore();
105 | 
106 |   return (
107 |     <div>
108 |       <p>Count: {value}</p>
109 |       <button onClick={() => store.dispatch({ type: "INCREMENT" })}>+</button>
110 |     </div>
111 |   );
112 | }
113 | 
114 | // 6. Wrap your app
115 | function App() {
116 |   return (
117 |     <BridgeContext.Provider bridge={bridge}>
118 |       <BridgeContext.Supported>
119 |         <CounterContext.Provider>
120 |           <Counter />
121 |         </CounterContext.Provider>
122 |         <CounterContext.Loading>
123 |           <div>Waiting for counter data...</div>
124 |         </CounterContext.Loading>
125 |       </BridgeContext.Supported>
126 |       <BridgeContext.Unsupported>
127 |         <div>Bridge not supported in this environment</div>
128 |       </BridgeContext.Unsupported>
129 |     </BridgeContext.Provider>
130 |   );
131 | }
132 | ```
133 | 
134 | ### Native Side (React Native)
135 | 
136 | ```typescript
137 | // 1. Import from the appropriate packages
138 | import type { AppStores, CounterState, CounterEvents } from "./shared/types"; // Ensure types are defined
139 | import {
140 |   createNativeBridge,
141 |   createStore,
142 | } from "@open-game-system/app-bridge-native";
143 | import { WebView } from "react-native-webview";
144 | import { useRef, useEffect, useSyncExternalStore, Text, Button } from "react"; // Add Button/Text imports
145 | 
146 | // 2. Create the native bridge
147 | const bridge = createNativeBridge<AppStores>();
148 | 
149 | // 3. Create and configure the counter store
150 | const counterStore = createStore<CounterState, CounterEvents>({
151 |   initialState: { value: 0 },
152 |   producer: (draft, event) => {
153 |     switch (event.type) {
154 |       case "INCREMENT":
155 |         draft.value += 1;
156 |         break;
157 |       case "DECREMENT":
158 |          if (draft.value > 0) draft.value -= 1;
159 |         break;
160 |       case "SET":
161 |         draft.value = event.value;
162 |         break;
163 |     }
164 |   },
165 |   // Add optional declarative listener
166 |   on: {
167 |       INCREMENT: (event, store) => {
168 |           console.log(`[Store Config] Incremented. New value: ${store.getSnapshot().value}`);
169 |       }
170 |   }
171 | });
172 | 
173 | // 4. Register the store with the bridge
174 | bridge.setStore("counter", counterStore);
175 | 
176 | // 5. Create a WebView wrapper component
177 | function GameWebView() {
178 |   const webViewRef = useRef<WebView>(null);
179 | 
180 |   useEffect(() => {
181 |     // Register WebView and get cleanup function
182 |     const unregister = bridge.registerWebView(webViewRef.current);
183 | 
184 |     // Optional: Add dynamic listener example
185 |     const unsubscribeSet = counterStore.on('SET', (event) => {
186 |         console.log(`[Dynamic Listener] Counter set to: ${event.value}`);
187 |     });
188 | 
189 |     // Cleanup on unmount
190 |     return () => {
191 |         unregister();
192 |         unsubscribeSet();
193 |     };
194 |   }, [webViewRef]); // Dependency on ref is correct
195 | 
196 |   return (
197 |     <>
198 |       <WebView
199 |         ref={webViewRef}
200 |         source={{ uri: "https://your-game-url.com" }} // Replace with actual URL/local server
201 |         onMessage={(event) => bridge.handleWebMessage(event.nativeEvent.data)} // Pass event.nativeEvent.data
202 |       />
203 |       {/* Add Example UI to interact with the store */}
204 |       <CounterControls />
205 |       <Status webViewRef={webViewRef} />
206 |     </>
207 |   );
208 | }
209 | 
210 | // Example controls to dispatch events to the store
211 | const CounterControls = () => {
212 |     const handleInc = () => counterStore.dispatch({ type: 'INCREMENT'});
213 |     const handleDec = () => counterStore.dispatch({ type: 'DECREMENT'});
214 |     const handleSet = () => counterStore.dispatch({ type: 'SET', value: 10 });
215 | 
216 |     return (
217 |         <>
218 |             <Button title="Increment Native" onPress={handleInc} />
219 |             <Button title="Decrement Native" onPress={handleDec} />
220 |             <Button title="Set Native to 10" onPress={handleSet} />
221 |         </>
222 |     )
223 | }
224 | 
225 | // Status component remains similar, but pass ref
226 | const Status = ({ webViewRef }: { webViewRef: React.RefObject<WebView> }) => {
227 |   // Hook requires webView instance, not just the ref object directly
228 |   const isReady = useSyncExternalStore(
229 |     (callback) => bridge.subscribeToReadyState(webViewRef.current, callback),
230 |     () => bridge.getReadyState(webViewRef.current),
231 |     () => bridge.getReadyState(webViewRef.current) // Server snapshot
232 |   );
233 | 
234 |   return <Text>Bridge Status: {isReady ? "Ready" : "Connecting..."}</Text>;
235 | };
236 | ```
237 | 
238 | ### Testing with Mock Bridge
239 | 
240 | ```typescript
241 | import { createMockBridge } from "@open-game-system/app-bridge-testing";
242 | import { createBridgeContext } from "@open-game-system/app-bridge-react";
243 | import type { AppStores } from "./shared/types";
244 | 
245 | describe("Counter Component", () => {
246 |   const mockBridge = createMockBridge<AppStores>({
247 |     initialState: {
248 |       counter: { value: 0 },
249 |     },
250 |   });
251 | 
252 |   const TestBridgeContext = createBridgeContext<AppStores>();
253 |   const TestCounterContext = TestBridgeContext.createStoreContext("counter");
254 | 
255 |   it("renders and updates correctly", () => {
256 |     render(
257 |       <TestBridgeContext.Provider bridge={mockBridge}>
258 |         <TestCounterContext.Provider>
259 |           <Counter />
260 |         </TestCounterContext.Provider>
261 |       </TestBridgeContext.Provider>
262 |     );
263 | 
264 |     expect(screen.getByText("Count: 0")).toBeInTheDocument();
265 | 
266 |     fireEvent.click(screen.getByText("+"));
267 |     expect(mockBridge.getHistory("counter")).toContainEqual({
268 |       type: "INCREMENT",
269 |     });
270 |   });
271 | });
272 | ```
273 | 
274 | ## 📚 Examples
275 | 
276 | Check out our example apps:
277 | 
278 | - [React Web Example](examples/react-app) - Shows web integration
279 | - [React Native Example](examples/expo-app) - Shows native integration
280 | 
281 | ## 🤝 Contributing
282 | 
283 | See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.
284 | 
285 | ## 📄 License
286 | 
287 | MIT © OpenGame System
288 | 
289 | <!-- NPM_TOKEN test - Updated token on April 11, 2025 -->
290 | 


--------------------------------------------------------------------------------
/docs/ARCHITECTURE.md:
--------------------------------------------------------------------------------
  1 | # 🏗️ Architecture
  2 | 
  3 | ## Overview
  4 | 
  5 | The app-bridge package provides a type-safe bridge between web games and the OpenGame App. It manages state and events across the bridge boundary, ensuring type safety and proper initialization.
  6 | 
  7 | ## System Design
  8 | 
  9 | ### Core Components
 10 | 
 11 | ```mermaid
 12 | graph TD
 13 |     subgraph Web App
 14 |         RC[React Components]
 15 |         SC[Store Contexts]
 16 |         WB[Web Bridge]
 17 |     end
 18 | 
 19 |     subgraph Native App
 20 |         WV1[WebView 1]
 21 |         WV2[WebView 2]
 22 |         NB[Native Bridge]
 23 |         NS[Native Stores]
 24 |     end
 25 | 
 26 |     RC --> SC
 27 |     SC --> WB
 28 |     WB --> WV1
 29 |     WB --> WV2
 30 |     WV1 --> NB
 31 |     WV2 --> NB
 32 |     NB --> NS
 33 |     NS --> NB
 34 |     NB --> WV1
 35 |     NB --> WV2
 36 |     WV1 --> WB
 37 |     WV2 --> WB
 38 | ```
 39 | 
 40 | ### Communication Protocol
 41 | 
 42 | ```mermaid
 43 | sequenceDiagram
 44 |     participant RC as React Component
 45 |     participant SC as Store Context
 46 |     participant WB as Web Bridge
 47 |     participant WV as WebView
 48 |     participant NB as Native Bridge
 49 |     participant NS as Native Store
 50 | 
 51 |     Note over WV: WebView Registration
 52 |     WV->>NB: registerWebView
 53 |     NB->>WV: injectJavaScript
 54 |     NB->>NS: Get Initial State
 55 |     NS-->>NB: Initial State
 56 |     NB-->>WV: Send Initial State
 57 | 
 58 |     Note over RC,WV: State Updates
 59 |     RC->>SC: Dispatch Event
 60 |     SC->>WB: dispatch
 61 |     WB->>WV: postMessage
 62 |     WV->>NB: onMessage
 63 |     NB->>NS: Update State
 64 |     NS-->>NB: State Updated
 65 |     NB-->>WV: injectJavaScript
 66 |     WV-->>WB: State Update
 67 |     WB-->>SC: State Update
 68 |     SC-->>RC: Re-render
 69 | ```
 70 | 
 71 | ### Store Initialization Flow
 72 | 
 73 | ```mermaid
 74 | sequenceDiagram
 75 |     participant App as App
 76 |     participant WV as WebView
 77 |     participant NB as Native Bridge
 78 |     participant NS as Native Store
 79 | 
 80 |     App->>WV: Create WebView
 81 |     WV->>NB: registerWebView
 82 |     NB->>WV: Inject JavaScript
 83 |     NB->>NS: Initialize Stores
 84 |     NS-->>NB: Initial State
 85 |     NB-->>WV: Send Initial State
 86 |     WV-->>App: Ready
 87 | ```
 88 | 
 89 | ## Implementation Details
 90 | 
 91 | ### Bridge Implementation
 92 | 
 93 | The bridge is implemented as a state management system that:
 94 | 
 95 | 1. Manages store initialization
 96 | 2. Handles bi-directional communication through WebView
 97 | 3. Provides type-safe event dispatch
 98 | 4. Maintains store state consistency
 99 | 
100 | ### WebView Integration
101 | 
102 | The WebView integration provides:
103 | 
104 | 1. **Registration**
105 |    - Native app registers WebView with bridge
106 |    - Bridge injects necessary JavaScript
107 |    - Bridge sets up message handlers
108 | 
109 | 2. **Message Passing**
110 |    - Web side sends events via `postMessage`
111 |    - Native side receives events via `onMessage`
112 |    - Native side sends state updates via `injectJavaScript`
113 | 
114 | 3. **State Synchronization**
115 |    - Native side maintains source of truth
116 |    - State updates are sent to web via WebView
117 |    - Web side reflects state changes in UI
118 | 
119 | ### React Integration
120 | 
121 | The React integration provides:
122 | 
123 | 1. Context-based store access
124 | 2. Type-safe hooks for state and events
125 | 3. Initialization state handling
126 | 4. Support state management
127 | 
128 | ### Error Handling
129 | 
130 | The system implements a layered error handling approach:
131 | 
132 | 1. **Bridge Level**
133 |    - Connection errors
134 |    - Communication failures
135 |    - State synchronization errors
136 | 
137 | 2. **Store Level**
138 |    - Initialization errors
139 |    - State update failures
140 |    - Event processing errors
141 | 
142 | 3. **React Level**
143 |    - Hook usage errors (when hooks are used outside of providers)
144 |    - Context errors
145 |    - Component rendering errors
146 | 
147 | ## Testing Architecture
148 | 
149 | ```mermaid
150 | graph TD
151 |     subgraph Test Environment
152 |         TC[Test Component]
153 |         MB[Mock Bridge]
154 |         MS1[Mock Store 1]
155 |         MS2[Mock Store 2]
156 |         EH[Event History]
157 |     end
158 | 
159 |     TC --> MB
160 |     MB --> MS1
161 |     MB --> MS2
162 |     MS1 --> MB
163 |     MS2 --> MB
164 |     MB --> EH
165 |     MB --> TC
166 | ```
167 | 
168 | The testing architecture provides:
169 | 
170 | 1. Mock bridge implementation that mimics the real bridge behavior
171 | 2. Individual mock stores with direct state manipulation
172 | 3. Event tracking for verifying dispatched events
173 | 4. State reset capabilities for test isolation
174 | 5. Support for testing initialization and error scenarios 
175 | 
176 | // Add example if any component name issues are found 


--------------------------------------------------------------------------------
/docs/CONCEPTS.md:
--------------------------------------------------------------------------------
  1 | # 🎯 Core Concepts
  2 | 
  3 | ## Bridge Pattern
  4 | 
  5 | The app-bridge package implements a bridge pattern to manage state and events between web games and the OpenGame App. This pattern provides:
  6 | 
  7 | 1. Type-safe communication
  8 | 2. State synchronization
  9 | 3. Event handling
 10 | 4. Initialization management
 11 | 
 12 | ```mermaid
 13 | graph LR
 14 |     subgraph Web App
 15 |         W[Web Components]
 16 |         WB[Web Bridge]
 17 |     end
 18 | 
 19 |     subgraph Native App
 20 |         WV[WebView]
 21 |         NB[Native Bridge]
 22 |         N[Native Components]
 23 |     end
 24 | 
 25 |     W --> WB
 26 |     WB --> WV
 27 |     WV --> NB
 28 |     NB --> N
 29 |     NB --> WV
 30 |     WV --> WB
 31 | ```
 32 | 
 33 | ## Type System
 34 | 
 35 | The type system ensures type safety across the bridge:
 36 | 
 37 | ```typescript
 38 | // shared/types.ts
 39 | export interface CounterState {
 40 |   value: number;
 41 | }
 42 | 
 43 | export type CounterEvents = 
 44 |   | { type: "INCREMENT" }
 45 |   | { type: "DECREMENT" }
 46 |   | { type: "SET"; value: number };
 47 | 
 48 | export type AppStores = {
 49 |   counter: {
 50 |     state: CounterState;
 51 |     events: CounterEvents;
 52 |   };
 53 | };
 54 | ```
 55 | 
 56 | ## WebView Integration
 57 | 
 58 | The bridge uses React Native's WebView for communication between web and native:
 59 | 
 60 | ```typescript
 61 | // In React Native app
 62 | function GameWebView() {
 63 |   const webViewRef = useRef<WebView>(null);
 64 | 
 65 |   useEffect(() => {
 66 |     // Register the WebView with the bridge
 67 |     bridge.registerWebView(webViewRef.current);
 68 |   }, []);
 69 | 
 70 |   return (
 71 |     <WebView
 72 |       ref={webViewRef}
 73 |       source={{ uri: 'https://your-game-url.com' }}
 74 |       onMessage={(event) => {
 75 |         // Handle messages from the web side
 76 |         bridge.handleWebMessage(event.nativeEvent.data);
 77 |       }}
 78 |       // You might still need injectedJavaScript for other purposes
 79 |       // injectedJavaScript={bridge.getInjectedJavaScript()}
 80 |     />
 81 |   );
 82 | }
 83 | ```
 84 | 
 85 | The integration works in three steps:
 86 | 
 87 | 1. **WebView Registration**
 88 |    - Native app registers the WebView with the bridge
 89 |    - Bridge injects necessary JavaScript into the WebView
 90 |    | Bridge sets up message handlers
 91 | 
 92 | 2. **Message Passing**
 93 |    - Web side sends events via `postMessage`
 94 |    - Native side receives events via `onMessage`
 95 |    - Native side sends state updates via `injectJavaScript`
 96 | 
 97 | 3. **State Synchronization**
 98 |    - Native side maintains source of truth
 99 |    - State updates are sent to web via WebView
100 |    - Web side reflects state changes in UI
101 | 
102 | ## Store Management
103 | 
104 | Stores are the core building blocks for state management. Each store has two states:
105 | 
106 | 1. **Uninitialized**: Store is not yet ready (state is null)
107 | 2. **Initialized**: Store is ready for use (state has a value)
108 | 
109 | ```mermaid
110 | stateDiagram-v2
111 |     [*] --> Uninitialized
112 |     Uninitialized --> Initialized: setState(value)
113 |     Initialized --> Initialized: Update State
114 |     Initialized --> Uninitialized: setState(null)
115 |     Initialized --> Initialized: setState(value)
116 | ```
117 | 
118 | ### Store Initialization
119 | 
120 | Store initialization is handled by the React Native host application:
121 | 
122 | ```typescript
123 | // In React Native app
124 | const bridge = createNativeBridge<AppStores>({
125 |   initialState: {
126 |     counter: { value: 0 }
127 |   }
128 | });
129 | 
130 | // Initialize stores when ready
131 | bridge.setState('counter', { value: 0 }); // Initialize store
132 | bridge.setState('counter', null); // Uninitialize store
133 | ```
134 | 
135 | ## State Updates
136 | 
137 | State updates can happen in two ways:
138 | 
139 | 1. **From Native Side**
140 |    ```typescript
141 |    // Direct state updates in native app
142 |    bridge.produce('counter', draft => {
143 |      draft.value += 1;
144 |    });
145 | 
146 |    // Set state directly
147 |    bridge.setState('counter', { value: 42 });
148 | 
149 |    // ⚠️ Warning: produce will throw in development if store is not initialized
150 |    bridge.produce('uninitializedStore', draft => {
151 |      draft.value += 1; // Throws in dev, warns in prod
152 |    });
153 |    ```
154 | 
155 | 2. **From Web Side**
156 |    ```typescript
157 |    // In web app (WebView)
158 |    
159 |    // First get a reference to the store
160 |    const webBridge = createWebBridge<AppStores>();
161 |    
162 |    // Wait for store to be initialized by native side
163 |    // Then get the store and dispatch events to it
164 |    const counterStore = webBridge.getStore('counter');
165 |    if (counterStore) {
166 |      counterStore.dispatch({ type: 'INCREMENT' });
167 |    }
168 |    
169 |    // Subscribe to state changes
170 |    if (counterStore) {
171 |      counterStore.subscribe(state => {
172 |        console.log('Counter value:', state.value);
173 |      });
174 |    }
175 |    
176 |    // You can also listen for store availability changes
177 |    webBridge.subscribe(() => {
178 |      console.log('Store availability changed');
179 |      const counterStore = webBridge.getStore('counter');
180 |      if (counterStore) {
181 |        console.log('Counter store is now available');
182 |      }
183 |    });
184 |    ```
185 | 
186 | ## Event Producers
187 | 
188 | Events sent from the web side to the native side are handled by producer functions. These producers are defined when creating the native bridge and are responsible for updating the state in response to events.
189 | 
190 | ### Producer Definition
191 | 
192 | Producers are defined as an object with keys that match your store keys:
193 | 
194 | ```typescript
195 | const bridge = createNativeBridge<AppStores>({
196 |   initialState: {
197 |     counter: { value: 0 },
198 |     user: { name: '', loggedIn: false }
199 |   },
200 |   producers: {
201 |     // Counter store producer
202 |     counter: (draft, event) => {
203 |       // Handle counter events
204 |       switch (event.type) {
205 |         case 'INCREMENT':
206 |           draft.value += 1;
207 |           break;
208 |           
209 |         case 'DECREMENT':
210 |           draft.value -= 1;
211 |           break;
212 |       }
213 |     },
214 |     
215 |     // User store producer
216 |     user: (draft, event) => {
217 |       // Handle user events
218 |       switch (event.type) {
219 |         case 'LOGIN':
220 |           draft.loggedIn = true;
221 |           break;
222 |           
223 |         case 'LOGOUT':
224 |           draft.loggedIn = false;
225 |           break;
226 |       }
227 |     }
228 |   }
229 | });
230 | ```
231 | 
232 | ### Producer Usage
233 | 
234 | When the web side dispatches an event, the bridge:
235 | 1. Identifies which store the event is for
236 | 2. Finds the producer for that store
237 | 3. If a producer exists, calls it with a draft state and the event
238 | 4. If no producer exists, logs the event and notifies listeners (without state change)
239 | 
240 | ```mermaid
241 | flowchart TD
242 |     WebView[WebView] -->|dispatch event| Bridge[Native Bridge]
243 |     Bridge -->|find producer| Producer{Producer exists?}
244 |     Producer -->|Yes| UpdateState[Update state with producer]
245 |     Producer -->|No| LogEvent[Log event and notify listeners]
246 |     UpdateState --> NotifyListeners[Notify listeners]
247 |     LogEvent --> End[End]
248 |     NotifyListeners --> End
249 | ```
250 | 
251 | ### Benefits of Producers
252 | 
253 | 1. **Type Safety**: Each producer receives correctly typed state and events for its store
254 | 2. **Separation of Concerns**: Each store has its own producer function
255 | 3. **Immer Integration**: Use Immer's draft objects for intuitive state updates
256 | 4. **Event Handling**: Centralized, clean switch statements for handling different event types
257 | 
258 | ### Type Safety in Producers
259 | 
260 | When defining your event types as discriminated unions with TypeScript, you get excellent type checking in your producers:
261 | 
262 | ```typescript
263 | // Define event types as discriminated unions
264 | type CounterEvents = 
265 |   | { type: 'INCREMENT' }
266 |   | { type: 'DECREMENT' }
267 |   | { type: 'SET'; value: number };  // value is required
268 | 
269 | // In your producer
270 | counter: (draft, event) => {
271 |   switch (event.type) {
272 |     case 'INCREMENT':
273 |       draft.value += 1;
274 |       break;
275 |     case 'SET':
276 |       // TypeScript knows 'value' exists and is a number
277 |       // No need for extra type guards
278 |       draft.value = event.value;
279 |       break;
280 |   }
281 | }
282 | ```
283 | 
284 | However, if you have optional properties in your event types, you will need type guards:
285 | 
286 | ```typescript
287 | // Event with optional property
288 | type CounterEvents = 
289 |   | { type: 'INCREMENT' }
290 |   | { type: 'DECREMENT' }
291 |   | { type: 'SET'; value?: number };  // value is optional
292 | 
293 | // In your producer
294 | counter: (draft, event) => {
295 |   switch (event.type) {
296 |     case 'INCREMENT':
297 |       draft.value += 1;
298 |       break;
299 |     case 'SET':
300 |       // Type guard needed because value is optional
301 |       if (event.value !== undefined) {
302 |         draft.value = event.value;
303 |       }
304 |       break;
305 |   }
306 | }
307 | ```
308 | 
309 | Key points about type safety:
310 | - TypeScript narrows the event type based on the `type` property when you use a switch statement
311 | - Make sure your properties are required (not optional with `?`) to avoid needing extra type guards
312 | - If you do have optional properties, use proper nullish checks (e.g., `if (event.value !== undefined)`)
313 | - For complete type safety, consider making all event properties required wherever possible
314 | 
315 | ## React Integration
316 | 
317 | The React integration provides hooks and context for easy state management:
318 | 
319 | ```typescript
320 | // Create store context
321 | const CounterContext = BridgeContext.createStoreContext('counter');
322 | 
323 | // Use in components
324 | function Counter() {
325 |   const value = CounterContext.useSelector(state => state.value);
326 |   const dispatch = CounterContext.useDispatch();
327 | 
328 |   return (
329 |     <div>
330 |       <p>Count: {value}</p>
331 |       <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
332 |     </div>
333 |   );
334 | }
335 | 
336 | // Handle initialization states
337 | function App() {
338 |   return (
339 |     <BridgeContext.Supported>
340 |       <CounterContext.Loading>
341 |         <div>Loading...</div>
342 |       </CounterContext.Loading>
343 |       <CounterContext.Provider>
344 |         <Counter />
345 |       </CounterContext.Provider>
346 |     </BridgeContext.Supported>
347 |   );
348 | }
349 | ```
350 | 
351 | ## Component Testing
352 | 
353 | The following example demonstrates how to test a component using the BridgeContext.Provider:
354 | 
355 | ```typescript
356 | // Test component
357 | test('Counter updates correctly', () => {
358 |   render(
359 |     <BridgeContext.Provider bridge={mockBridge}>
360 |       <CounterContext.Provider>
361 |         <CounterComponent />
362 |       </CounterContext.Provider>
363 |     </BridgeContext.Provider>
364 |   );
365 | 
366 |   fireEvent.click(screen.getByText('+'));
367 |   expect(mockBridge.getHistory("counter")).toContainEqual({ type: "INCREMENT" });
368 | });
369 | ```


--------------------------------------------------------------------------------
/examples/expo-app/.gitignore:
--------------------------------------------------------------------------------
 1 | # Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files
 2 | 
 3 | # dependencies
 4 | node_modules/
 5 | 
 6 | # Expo
 7 | .expo/
 8 | dist/
 9 | web-build/
10 | 
11 | # Native
12 | *.orig.*
13 | *.jks
14 | *.p8
15 | *.p12
16 | *.key
17 | *.mobileprovision
18 | 
19 | # Metro
20 | .metro-health-check*
21 | 
22 | # debug
23 | npm-debug.*
24 | yarn-debug.*
25 | yarn-error.*
26 | 
27 | # macOS
28 | .DS_Store
29 | *.pem
30 | 
31 | # local env files
32 | .env*.local
33 | 
34 | # typescript
35 | *.tsbuildinfo
36 | 


--------------------------------------------------------------------------------
/examples/expo-app/App.tsx:
--------------------------------------------------------------------------------
  1 | import {
  2 |   BridgedWebView,
  3 |   createNativeBridgeContext,
  4 |   createNativeBridge,
  5 |   createStore,
  6 |   NativeBridge,
  7 |   BridgeStores
  8 | } from "@open-game-system/app-bridge-react-native";
  9 | import { StatusBar } from "expo-status-bar";
 10 | import React, { useEffect, useMemo } from "react";
 11 | import {
 12 |   Button,
 13 |   Platform,
 14 |   SafeAreaView,
 15 |   StyleSheet,
 16 |   Text,
 17 |   View,
 18 | } from "react-native";
 19 | import { CounterEvents, CounterState } from "../shared/types";
 20 | 
 21 | // Local type definition for AppStores
 22 | type AppStores = {
 23 |   counter: {
 24 |     state: CounterState;
 25 |     events: CounterEvents;
 26 |   };
 27 | };
 28 | 
 29 | // Create the bridge instance (outside the component is fine)
 30 | const bridge = createNativeBridge<AppStores>();
 31 | 
 32 | // Create and register the counter store (outside the component is fine)
 33 | const counterStore = createStore({
 34 |   initialState: { value: 0 },
 35 |   producer: (draft: CounterState, event: CounterEvents) => {
 36 |     switch (event.type) {
 37 |       case "INCREMENT":
 38 |         draft.value += 1;
 39 |         break;
 40 |       case "DECREMENT":
 41 |         draft.value -= 1;
 42 |         break;
 43 |       case "SET":
 44 |         draft.value = event.value;
 45 |         break;
 46 |     }
 47 |   },
 48 | });
 49 | bridge.setStore('counter', counterStore);
 50 | 
 51 | // Create context using the new package
 52 | const BridgeContext = createNativeBridgeContext<AppStores>();
 53 | const CounterContext = BridgeContext.createNativeStoreContext('counter');
 54 | 
 55 | // Counter display and controls component
 56 | const Counter = () => {
 57 |   // Use the specific store hooks
 58 |   const counterValue = CounterContext.useSelector((state) => state.value);
 59 |   const store = CounterContext.useStore(); // Gets the store instance
 60 | 
 61 |   const incrementCounter = () => store.dispatch({ type: "INCREMENT" });
 62 |   const decrementCounter = () => store.dispatch({ type: "DECREMENT" });
 63 |   const resetCounter = () => store.reset();
 64 |   const setCounter = () => store.dispatch({ type: "SET", value: 100 });
 65 | 
 66 |   return (
 67 |     <View style={styles.counterContainer}>
 68 |       <Text style={styles.counterValue}>Native Counter: {counterValue}</Text>
 69 |       <View style={styles.buttonRow}>
 70 |         <Button title="-" onPress={decrementCounter} />
 71 |         <View style={styles.buttonSpacing} />
 72 |         <Button title="Reset" onPress={resetCounter} />
 73 |         <View style={styles.buttonSpacing} />
 74 |         <Button title="Set 100" onPress={setCounter} />
 75 |         <View style={styles.buttonSpacing} />
 76 |         <Button title="+" onPress={incrementCounter} />
 77 |       </View>
 78 |       <Text style={styles.counterHelp}>
 79 |         Changes from web will sync to native and vice versa
 80 |       </Text>
 81 |     </View>
 82 |   );
 83 | };
 84 | 
 85 | // Main App component
 86 | const App = () => {
 87 |   // Platform-specific WebView source
 88 |   const webviewSource = useMemo(() => Platform.select({
 89 |     ios: { uri: "http://localhost:5173/" }, // Ensure your dev server port matches
 90 |     android: { uri: "http://10.0.2.2:5173/" },
 91 |     default: { uri: "http://localhost:5173/" }
 92 |   }), []);
 93 | 
 94 |   return (
 95 |     <BridgeContext.BridgeProvider bridge={bridge}>
 96 |       <SafeAreaView style={styles.container}>
 97 |         <Text style={styles.title}>OpenGame App Bridge Example</Text>
 98 |         <CounterContext.StoreProvider>
 99 |           <Counter />
100 |         </CounterContext.StoreProvider>
101 |         <View style={styles.webviewContainer}>
102 |           <BridgedWebView
103 |             bridge={bridge}
104 |             source={webviewSource}
105 |             style={styles.webview}
106 |           />
107 |         </View>
108 |         <StatusBar style="auto" />
109 |       </SafeAreaView>
110 |     </BridgeContext.BridgeProvider>
111 |   );
112 | };
113 | 
114 | const styles = StyleSheet.create({
115 |   container: {
116 |     flex: 1,
117 |     backgroundColor: "#fff",
118 |     padding: 16,
119 |   },
120 |   title: {
121 |     fontSize: 18,
122 |     fontWeight: "bold",
123 |     marginVertical: 20,
124 |     textAlign: "center",
125 |   },
126 |   counterContainer: {
127 |     padding: 16,
128 |     backgroundColor: "#f9f9f9",
129 |     borderRadius: 8,
130 |     marginBottom: 16,
131 |     alignItems: "center",
132 |   },
133 |   counterValue: {
134 |     fontSize: 24,
135 |     fontWeight: "bold",
136 |     marginBottom: 16,
137 |   },
138 |   buttonRow: {
139 |     flexDirection: "row",
140 |     justifyContent: "center",
141 |     alignItems: "center",
142 |   },
143 |   buttonSpacing: {
144 |     width: 16,
145 |   },
146 |   counterHelp: {
147 |     marginTop: 16,
148 |     fontSize: 12,
149 |     color: "#666",
150 |     textAlign: "center",
151 |   },
152 |   webviewContainer: {
153 |     flex: 1,
154 |     borderWidth: 1,
155 |     borderColor: "#ddd",
156 |     borderRadius: 8,
157 |     overflow: "hidden",
158 |   },
159 |   webview: {
160 |     flex: 1,
161 |   },
162 | });
163 | 
164 | export default App;
165 | 


--------------------------------------------------------------------------------
/examples/expo-app/README.md:
--------------------------------------------------------------------------------
 1 | # Expo App Example
 2 | 
 3 | This example demonstrates using the `@open-game-system/app-bridge` in a React Native app with Expo.
 4 | 
 5 | ## Overview
 6 | 
 7 | The app consists of a native counter component and a WebView displaying a web counter. The state is synchronized between the two using the app-bridge.
 8 | 
 9 | ## Running the App
10 | 
11 | 1. Install dependencies:
12 | ```bash
13 | npm install
14 | ```
15 | 
16 | 2. Start the Expo app:
17 | ```bash
18 | npm start
19 | ```
20 | 
21 | 3. Make sure you also start the web example from the `examples/react-app` directory to serve the web part:
22 | ```bash
23 | cd ../react-app
24 | npm install
25 | npm start
26 | ```
27 | 
28 | ## Testing Approach
29 | 
30 | This example includes straightforward testing that focuses on the actual user experience:
31 | 
32 | 1. **Visible Components**: Tests verify that all UI elements are rendered correctly
33 | 2. **User Interactions**: Tests verify that buttons respond to presses as expected
34 | 3. **State Changes**: Tests verify that the counter state updates correctly
35 | 4. **WebView Rendering**: Tests verify that the WebView is rendered with proper properties
36 | 
37 | We deliberately avoid testing implementation details like message passing between native and web. Instead, we focus on testing the app from a user's perspective.
38 | 
39 | ### Running Tests
40 | 
41 | ```bash
42 | npm test
43 | ```
44 | 
45 | ### Example Test
46 | 
47 | ```typescript
48 | // Simple test that verifies user-visible functionality
49 | it('displays the counter and responds to button presses', () => {
50 |   const { getByText } = render(<App />);
51 |   
52 |   // Verify the counter and buttons are displayed
53 |   expect(getByText('Native Counter: 0')).toBeTruthy();
54 |   expect(getByText('+')).toBeTruthy();
55 |   
56 |   // Click the increment button
57 |   fireEvent.press(getByText('+'));
58 |   
59 |   // Verify the counter updates
60 |   expect(getByText('Native Counter: 1')).toBeTruthy();
61 |   
62 |   // Click the reset button
63 |   fireEvent.press(getByText('Reset'));
64 |   
65 |   // Verify the counter resets
66 |   expect(getByText('Native Counter: 0')).toBeTruthy();
67 | });
68 | ```
69 | 
70 | ## Structure
71 | 
72 | - `App.tsx`: Main application component with WebView and counter
73 | - `__tests__/AppBridge-test.tsx`: Tests for the app functionality 


--------------------------------------------------------------------------------
/examples/expo-app/__mocks__/@open-game-system/app-bridge-native.js:
--------------------------------------------------------------------------------
1 | export const createNativeBridge = jest.fn(() => ({
2 |   registerWebView: jest.fn(() => jest.fn()),
3 |   onWebViewReady: jest.fn(() => jest.fn()),
4 |   produce: jest.fn(),
5 |   setState: jest.fn(),
6 |   isWebViewReady: jest.fn(() => false),
7 |   _getState: jest.fn(() => ({ counter: { value: 0 } }))
8 | })); 


--------------------------------------------------------------------------------
/examples/expo-app/__mocks__/expo-status-bar.js:
--------------------------------------------------------------------------------
1 | import React from 'react';
2 | import { View } from 'react-native';
3 | 
4 | export const StatusBar = () => <View />; 


--------------------------------------------------------------------------------
/examples/expo-app/__mocks__/react-native-webview.js:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import { View } from 'react-native';
 3 | 
 4 | const MockWebView = (props) => {
 5 |   return <View {...props} />;
 6 | };
 7 | 
 8 | MockWebView.prototype.postMessage = () => {};
 9 | 
10 | export const WebView = MockWebView; 


--------------------------------------------------------------------------------
/examples/expo-app/__tests__/App-test.tsx:
--------------------------------------------------------------------------------
 1 | /**
 2 |  * @jest-environment jsdom
 3 |  */
 4 | import React from 'react';
 5 | import { render } from '@testing-library/react-native';
 6 | import App from '../App';
 7 | import type { StoreConfig, State, Event } from '@open-game-system/app-bridge-types';
 8 | 
 9 | // Mock the dependencies
10 | jest.mock('@open-game-system/app-bridge-react-native', () => ({
11 |   createNativeBridge: () => ({
12 |     sendMessage: () => {},
13 |     onMessage: () => {},
14 |     onError: () => {},
15 |     destroy: () => {},
16 |     setStore: () => {},
17 |     getStore: () => undefined,
18 |     subscribe: () => () => {},
19 |     handleWebMessage: () => {},
20 |     registerWebView: () => () => {},
21 |     unregisterWebView: () => {},
22 |     subscribeToReadyState: () => () => {},
23 |     getReadyState: () => true,
24 |     isSupported: () => true
25 |   }),
26 |   createStore: <S extends State, E extends Event>(config: StoreConfig<S, E>) => ({
27 |     getState: () => config.initialState,
28 |     setState: () => {},
29 |     subscribe: () => () => {},
30 |     dispatch: () => {},
31 |     reset: () => {}
32 |   }),
33 |   createNativeBridgeContext: () => ({
34 |     BridgeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
35 |     createNativeStoreContext: () => {
36 |       // Simulate the initial state for the counter store
37 |       const initialState = { value: 0 }; 
38 |       return {
39 |         StoreProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
40 |         useSelector: (selectorFn: (state: typeof initialState) => any) => {
41 |           // Apply the selector to the simulated initial state
42 |           return selectorFn(initialState);
43 |         },
44 |         useStore: () => ({
45 |           dispatch: () => {},
46 |           reset: () => {}
47 |         })
48 |       };
49 |     }
50 |   }),
51 |   BridgedWebView: () => null
52 | }));
53 | 
54 | describe('App', () => {
55 |   it('renders correctly', () => {
56 |     const { getByText } = render(<App />);
57 |     expect(getByText('OpenGame App Bridge Example')).toBeTruthy();
58 |   });
59 | }); 


--------------------------------------------------------------------------------
/examples/expo-app/app.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "expo": {
 3 |     "name": "App Bridge Example",
 4 |     "slug": "app-bridge-example",
 5 |     "newArchEnabled": true,
 6 |     "version": "1.0.0",
 7 |     "orientation": "portrait",
 8 |     "icon": "./assets/icon.png",
 9 |     "userInterfaceStyle": "light",
10 |     "splash": {
11 |       "image": "./assets/splash.png",
12 |       "resizeMode": "contain",
13 |       "backgroundColor": "#ffffff"
14 |     },
15 |     "assetBundlePatterns": [
16 |       "**/*"
17 |     ],
18 |     "ios": {
19 |       "supportsTablet": true,
20 |       "bundleIdentifier": "com.opengamesystem.appbridgeexample"
21 |     },
22 |     "android": {
23 |       "adaptiveIcon": {
24 |         "foregroundImage": "./assets/adaptive-icon.png",
25 |         "backgroundColor": "#ffffff"
26 |       },
27 |       "package": "com.opengamesystem.appbridgeexample"
28 |     },
29 |     "web": {
30 |       "favicon": "./assets/favicon.png"
31 |     }
32 |   }
33 | }
34 | 


--------------------------------------------------------------------------------
/examples/expo-app/assets/adaptive-icon.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/open-game-system/app-bridge/95f953e230128e4f59665c386d7017bac0a0f36d/examples/expo-app/assets/adaptive-icon.png


--------------------------------------------------------------------------------
/examples/expo-app/assets/favicon.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/open-game-system/app-bridge/95f953e230128e4f59665c386d7017bac0a0f36d/examples/expo-app/assets/favicon.png


--------------------------------------------------------------------------------
/examples/expo-app/assets/icon.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/open-game-system/app-bridge/95f953e230128e4f59665c386d7017bac0a0f36d/examples/expo-app/assets/icon.png


--------------------------------------------------------------------------------
/examples/expo-app/assets/splash-icon.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/open-game-system/app-bridge/95f953e230128e4f59665c386d7017bac0a0f36d/examples/expo-app/assets/splash-icon.png


--------------------------------------------------------------------------------
/examples/expo-app/assets/splash.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/open-game-system/app-bridge/95f953e230128e4f59665c386d7017bac0a0f36d/examples/expo-app/assets/splash.png


--------------------------------------------------------------------------------
/examples/expo-app/babel.config.js:
--------------------------------------------------------------------------------
1 | module.exports = function(api) {
2 |   api.cache(true);
3 |   return {
4 |     presets: ['babel-preset-expo'],
5 |   };
6 | }; 


--------------------------------------------------------------------------------
/examples/expo-app/globals.d.ts:
--------------------------------------------------------------------------------
1 | declare namespace jest {
2 |   function mock(moduleName: string, factory?: () => any): void;
3 |   function fn<T extends (...args: any[]) => any>(implementation?: T): jest.Mock<T>;
4 | }
5 | 
6 | declare const describe: (name: string, fn: () => void) => void;
7 | declare const it: (name: string, fn: () => void) => void;
8 | declare const expect: any; 


--------------------------------------------------------------------------------
/examples/expo-app/index.ts:
--------------------------------------------------------------------------------
1 | import { registerRootComponent } from 'expo';
2 | import App from './App';
3 | 
4 | // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
5 | // It also ensures that whether you load the app in Expo Go or in a native build,
6 | // the environment is set up appropriately
7 | registerRootComponent(App);


--------------------------------------------------------------------------------
/examples/expo-app/jest.config.js:
--------------------------------------------------------------------------------
 1 | module.exports = {
 2 |   preset: 'jest-expo',
 3 |   transform: {
 4 |     '^.+\\.(js|jsx|ts|tsx)
#39;: ['babel-jest', { configFile: './babel.config.js' }]
 5 |   },
 6 |   transformIgnorePatterns: [
 7 |     'node_modules/(?!(.pnpm|@react-native/js-polyfills|@react-native|react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@open-game-system/.*))'
 8 |   ],
 9 |   setupFiles: [
10 |     './jest.setup.js'
11 |   ],
12 |   moduleDirectories: ['node_modules', '.pnpm'],
13 |   moduleNameMapper: {
14 |     '^@open-game-system/(.*)
#39;: '<rootDir>/../../packages/$1/src'
15 |   },
16 |   collectCoverageFrom: [
17 |     '**/*.{ts,tsx}',
18 |     '!**/coverage/**',
19 |     '!**/node_modules/**',
20 |     '!**/babel.config.js',
21 |     '!**/jest.setup.js'
22 |   ],
23 |   snapshotSerializers: []
24 | }; 


--------------------------------------------------------------------------------
/examples/expo-app/jest.setup.js:
--------------------------------------------------------------------------------
 1 | // Mock for @react-native/js-polyfills/error-guard
 2 | jest.mock('@react-native/js-polyfills/error-guard', () => ({
 3 |   ErrorUtils: {
 4 |     setGlobalHandler: jest.fn(),
 5 |     reportError: jest.fn(),
 6 |   }
 7 | }));
 8 | 
 9 | // Mock WebView implementation
10 | jest.mock('react-native-webview', () => {
11 |   const { View } = require('react-native');
12 |   const MockWebView = (props) => {
13 |     return <View {...props} />;
14 |   };
15 |   MockWebView.displayName = 'WebView';
16 |   
17 |   return {
18 |     __esModule: true,
19 |     default: MockWebView,
20 |   };
21 | });
22 | 
23 | // Mock the react-native Platform
24 | jest.mock('react-native/Libraries/Utilities/Platform', () => ({
25 |   OS: 'ios',
26 |   select: jest.fn(obj => obj.ios)
27 | }));
28 | 
29 | // Mock additional React Native modules that might cause issues
30 | jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
31 | 
32 | // Mock the NativeModules
33 | jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => ({
34 |   UIManager: {
35 |     RCTView: () => {},
36 |   },
37 |   PlatformConstants: {
38 |     getConstants: () => ({
39 |       isTesting: true
40 |     })
41 |   },
42 |   StatusBarManager: {
43 |     getHeight: jest.fn(),
44 |   },
45 | }));
46 | 
47 | // Mock console methods to reduce noise in tests
48 | global.console = {
49 |   ...console,
50 |   log: jest.fn(),
51 |   warn: jest.fn(),
52 |   error: jest.fn()
53 | }; 


--------------------------------------------------------------------------------
/examples/expo-app/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@open-game-system/app-bridge-example-expo",
 3 |   "version": "1.0.0",
 4 |   "main": "index.ts",
 5 |   "scripts": {
 6 |     "start": "expo start",
 7 |     "android": "expo start --android",
 8 |     "ios": "expo start --ios",
 9 |     "web": "expo start --web",
10 |     "test": "jest",
11 |     "test:watch": "jest --watch",
12 |     "test:coverage": "jest --coverage"
13 |   },
14 |   "dependencies": {
15 |     "@open-game-system/app-bridge-native": "workspace:*",
16 |     "@open-game-system/app-bridge-react-native": "workspace:*",
17 |     "@open-game-system/app-bridge-types": "workspace:*",
18 |     "expo": "~52.0.43",
19 |     "expo-status-bar": "~2.0.1",
20 |     "react": "18.3.1",
21 |     "react-native": "0.76.9",
22 |     "react-native-webview": "13.12.5"
23 |   },
24 |   "devDependencies": {
25 |     "@babel/core": "^7.25.2",
26 |     "@testing-library/react-native": "^13.2.0",
27 |     "@types/jest": "^29.5.14",
28 |     "@types/node": "^22.14.0",
29 |     "@types/react": "~18.3.12",
30 |     "@types/react-native": "^0.72.0",
31 |     "jest": "^29.7.0",
32 |     "jest-expo": "~52.0.6",
33 |     "react-test-renderer": "18.3.1",
34 |     "typescript": "^5.3.3"
35 |   },
36 |   "private": true
37 | }
38 | 


--------------------------------------------------------------------------------
/examples/expo-app/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "expo/tsconfig.base",
 3 |   "compilerOptions": {
 4 |     "strict": true,
 5 |     "moduleResolution": "node",
 6 |     "allowImportingTsExtensions": true,
 7 |     "resolveJsonModule": true,
 8 |     "isolatedModules": true,
 9 |     "noEmit": true,
10 |     "jsx": "react-native",
11 |     "baseUrl": ".",
12 |     "paths": {
13 |       "*": ["node_modules/*"],
14 |       "@open-game-system/app-bridge": ["../../packages/app-bridge/src"],
15 |       "@open-game-system/app-bridge/native": ["../../packages/app-bridge/src/native"],
16 |       "@open-game-system/app-bridge/react": ["../../packages/app-bridge/src/react"]
17 |     },
18 |     "types": ["jest", "react-native", "@testing-library/react-native"],
19 |     "allowJs": true,
20 |     "esModuleInterop": true,
21 |     "skipLibCheck": true,
22 |     "target": "esnext",
23 |     "lib": ["esnext", "dom"]
24 |   },
25 |   "include": ["App.tsx", "index.js", "globals.d.ts", "__tests__/**/*.tsx"],
26 |   "exclude": ["node_modules"]
27 | }
28 | 


--------------------------------------------------------------------------------
/examples/react-app/README.md:
--------------------------------------------------------------------------------
  1 | # React Web Example
  2 | 
  3 | This example demonstrates using the `@open-game-system/app-bridge` in a web application that communicates with a React Native app through a WebView.
  4 | 
  5 | ## Overview
  6 | 
  7 | The app implements a counter that synchronizes its state between:
  8 | - The web app (this example)
  9 | - The native app (see `examples/expo-app`)
 10 | 
 11 | Key features:
 12 | - Real-time state synchronization
 13 | - Type-safe event dispatching
 14 | - Bridge status indicator
 15 | - Error handling and fallback UI
 16 | 
 17 | ## Quick Start
 18 | 
 19 | 1. Install dependencies:
 20 | ```bash
 21 | pnpm install
 22 | ```
 23 | 
 24 | 2. Start the development server:
 25 | ```bash
 26 | pnpm dev
 27 | ```
 28 | 
 29 | The app will be available at `http://localhost:5173`.
 30 | 
 31 | ## Development Scripts
 32 | 
 33 | - `pnpm dev` - Start development server
 34 | - `pnpm build` - Build for production
 35 | - `pnpm preview` - Preview production build
 36 | - `pnpm test` - Run tests
 37 | - `pnpm test:coverage` - Run tests with coverage
 38 | - `pnpm typecheck` - Check TypeScript types
 39 | 
 40 | ## Project Structure
 41 | 
 42 | ```
 43 | src/
 44 | ├── App.tsx           # Main application component
 45 | ├── Counter.tsx       # Counter component with bridge integration
 46 | ├── bridge.ts         # Bridge setup and configuration
 47 | ├── types.ts          # Shared type definitions
 48 | └── __tests__/       # Test files
 49 | ```
 50 | 
 51 | ### Key Files
 52 | 
 53 | - `App.tsx`: Sets up the bridge provider and displays bridge status
 54 | - `Counter.tsx`: Implements the counter UI and bridge integration
 55 | - `bridge.ts`: Configures the web bridge instance
 56 | - `types.ts`: Defines shared types for state and events
 57 | 
 58 | ## Integration with Expo App
 59 | 
 60 | This web app is designed to run inside a WebView in the Expo app example. The integration works as follows:
 61 | 
 62 | 1. **URL Configuration**
 63 |    - Development:
 64 |      - iOS: `http://localhost:5173`
 65 |      - Android: `http://10.0.2.2:5173`
 66 |    - Production: Configure your production URL in the Expo app
 67 | 
 68 | 2. **Bridge Status**
 69 |    - Green indicator: Bridge is connected and working
 70 |    - Red indicator: Bridge is not available (running in standalone browser)
 71 | 
 72 | 3. **State Synchronization**
 73 |    - Counter state is shared between web and native
 74 |    - Changes in either environment update both UIs
 75 |    - State persists across WebView reloads
 76 | 
 77 | ## Testing
 78 | 
 79 | The example includes comprehensive tests focusing on user-visible functionality:
 80 | 
 81 | ```typescript
 82 | import { render, fireEvent } from '@testing-library/react';
 83 | import { Counter } from '../Counter';
 84 | 
 85 | test('counter updates when buttons are clicked', () => {
 86 |   const { getByText } = render(<Counter />);
 87 |   
 88 |   // Initial state
 89 |   expect(getByText('Web Bridge Counter:')).toBeInTheDocument();
 90 |   expect(getByText('0')).toBeInTheDocument();
 91 |   
 92 |   // Increment
 93 |   fireEvent.click(getByText('+'));
 94 |   expect(getByText('1')).toBeInTheDocument();
 95 |   
 96 |   // Decrement
 97 |   fireEvent.click(getByText('-'));
 98 |   expect(getByText('0')).toBeInTheDocument();
 99 | });
100 | ```
101 | 
102 | Run tests with:
103 | ```bash
104 | pnpm test
105 | ```
106 | 
107 | ## Troubleshooting
108 | 
109 | ### Common Issues
110 | 
111 | 1. **Bridge Not Connecting**
112 |    - Verify you're running inside the Expo app WebView
113 |    - Check the URL configuration in the Expo app
114 |    - Look for console errors in the browser dev tools
115 | 
116 | 2. **State Not Syncing**
117 |    - Ensure both apps are running (web and Expo)
118 |    - Check the bridge status indicator
119 |    - Verify WebView message handling in the native app
120 | 
121 | 3. **Hot Reloading**
122 |    - State resets on hot reload (expected behavior)
123 |    - Bridge automatically reconnects
124 |    - WebView may need manual reload in some cases
125 | 
126 | ### Development vs Production
127 | 
128 | 1. **Development Mode**
129 |    - Includes detailed console logging
130 |    - Shows bridge status indicator
131 |    - Enables React DevTools integration
132 | 
133 | 2. **Production Mode**
134 |    - Minimal console output
135 |    - Optimized bundle size
136 |    - Stricter error handling
137 | 
138 | ## Environment Configuration
139 | 
140 | The app supports different environments through Vite's environment variables:
141 | 
142 | ```env
143 | # .env.development
144 | VITE_API_URL=http://localhost:5173
145 | 
146 | # .env.production
147 | VITE_API_URL=https://your-production-url.com
148 | ```
149 | 
150 | ## Type Safety
151 | 
152 | The example demonstrates full type safety with the bridge:
153 | 
154 | ```typescript
155 | // types.ts
156 | export interface CounterState {
157 |   value: number;
158 | }
159 | 
160 | export type CounterEvents =
161 |   | { type: "INCREMENT" }
162 |   | { type: "DECREMENT" }
163 |   | { type: "SET"; value: number };
164 | 
165 | export type AppStores = {
166 |   counter: {
167 |     state: CounterState;
168 |     events: CounterEvents;
169 |   };
170 | };
171 | ```
172 | 
173 | ## Performance Considerations
174 | 
175 | 1. **State Updates**
176 |    - Use selectors to prevent unnecessary re-renders
177 |    - Memoize complex computations
178 |    - Batch updates when possible
179 | 
180 | 2. **Event Handling**
181 |    - Debounce rapid events if needed
182 |    - Use event delegation for multiple controls
183 |    - Avoid synchronous state updates in loops


--------------------------------------------------------------------------------
/examples/react-app/index.html:
--------------------------------------------------------------------------------
 1 | <!DOCTYPE html>
 2 | <html lang="en">
 3 |   <head>
 4 |     <meta charset="UTF-8" />
 5 |     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
 6 |     <title>App Bridge React Example</title>
 7 |   </head>
 8 |   <body>
 9 |     <div id="root"></div>
10 |     <script type="module" src="/src/main.tsx"></script>
11 |   </body>
12 | </html> 


--------------------------------------------------------------------------------
/examples/react-app/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@open-game-system/app-bridge-example-react",
 3 |   "private": true,
 4 |   "version": "0.0.0",
 5 |   "type": "module",
 6 |   "scripts": {
 7 |     "dev": "vite",
 8 |     "build": "tsc && vite build",
 9 |     "typecheck": "tsc --noEmit",
10 |     "preview": "vite preview",
11 |     "test": "vitest run",
12 |     "test:coverage": "vitest run --coverage"
13 |   },
14 |   "dependencies": {
15 |     "@open-game-system/app-bridge-web": "workspace:*",
16 |     "@open-game-system/app-bridge-react": "workspace:*",
17 |     "@open-game-system/app-bridge-types": "workspace:*",
18 |     "react": "^18.2.0",
19 |     "react-dom": "^18.2.0"
20 |   },
21 |   "devDependencies": {
22 |     "@open-game-system/app-bridge-testing": "workspace:*",
23 |     "@testing-library/react": "^14.2.1",
24 |     "@testing-library/jest-dom": "^6.1.5",
25 |     "chalk": "^5.3.0",
26 |     "@types/react": "^18.2.55",
27 |     "@types/react-dom": "^18.2.19",
28 |     "@vitejs/plugin-react": "^4.2.1",
29 |     "@vitest/coverage-v8": "^1.2.2",
30 |     "jsdom": "^24.0.0",
31 |     "typescript": "^5.8.3",
32 |     "vite": "^5.1.0",
33 |     "vite-tsconfig-paths": "^4.3.1",
34 |     "vitest": "^1.2.2"
35 |   }
36 | } 


--------------------------------------------------------------------------------
/examples/react-app/src/App.tsx:
--------------------------------------------------------------------------------
 1 | import { Counter } from "./Counter";
 2 | import { BridgeProvider, webBridge } from "./bridge";
 3 | 
 4 | function App() {
 5 |   return (
 6 |     <BridgeProvider bridge={webBridge}>
 7 |       <div
 8 |         style={{
 9 |           position: "fixed",
10 |           top: 0,
11 |           left: 0,
12 |           right: 0,
13 |           padding: "4px",
14 |           background: webBridge.isSupported() ? "green" : "red",
15 |           color: "white",
16 |           textAlign: "center",
17 |           zIndex: 9999,
18 |         }}
19 |       >
20 |         Bridge Status:{" "}
21 |         {webBridge.isSupported()
22 |           ? "Detected (Running in WebView)"
23 |           : "Not Detected (Running in Browser)"}
24 |       </div>
25 |       <Counter />
26 |     </BridgeProvider>
27 |   );
28 | }
29 | 
30 | export default App;
31 | 


--------------------------------------------------------------------------------
/examples/react-app/src/Counter.test.tsx:
--------------------------------------------------------------------------------
  1 | import { describe, it, expect, beforeEach } from 'vitest';
  2 | import { render, screen, fireEvent, act } from '@testing-library/react';
  3 | import { Counter } from './Counter';
  4 | import { createMockBridge, type MockBridge } from '@open-game-system/app-bridge-testing';
  5 | import { createBridgeContext } from '@open-game-system/app-bridge-react';
  6 | import type { AppStores } from './types';
  7 | import type { Bridge } from '@open-game-system/app-bridge-types';
  8 | 
  9 | // Create test-specific contexts
 10 | const TestBridgeContext = createBridgeContext<AppStores>();
 11 | const TestCounterContext = TestBridgeContext.createStoreContext('counter');
 12 | 
 13 | describe('Counter', () => {
 14 |   let mockBridge: MockBridge<AppStores>;
 15 | 
 16 |   beforeEach(() => {
 17 |     // Use createMockBridge directly
 18 |     mockBridge = createMockBridge<AppStores>({
 19 |       initialState: {
 20 |         counter: { value: 0 }
 21 |       }
 22 |     });
 23 |   });
 24 | 
 25 |   it('renders initial counter value', () => {
 26 |     render(
 27 |       // Cast to Bridge<AppStores> where the Provider expects it
 28 |       <TestBridgeContext.Provider bridge={mockBridge as Bridge<AppStores>}>
 29 |         <TestCounterContext.Provider>
 30 |           <Counter BridgeContext={TestBridgeContext} CounterContext={TestCounterContext} />
 31 |         </TestCounterContext.Provider>
 32 |       </TestBridgeContext.Provider>
 33 |     );
 34 | 
 35 |     expect(screen.getByText('Web Bridge Counter:')).toBeInTheDocument();
 36 |     expect(screen.getByText('0')).toBeInTheDocument();
 37 |   });
 38 | 
 39 |   it('increments counter when + button is clicked', async () => {
 40 |     render(
 41 |       <TestBridgeContext.Provider bridge={mockBridge as Bridge<AppStores>}>
 42 |         <TestCounterContext.Provider>
 43 |           <Counter BridgeContext={TestBridgeContext} CounterContext={TestCounterContext} />
 44 |         </TestCounterContext.Provider>
 45 |       </TestBridgeContext.Provider>
 46 |     );
 47 | 
 48 |     fireEvent.click(screen.getByText('+'));
 49 | 
 50 |     const history = mockBridge.getHistory('counter');
 51 |     expect(history).toContainEqual({ type: 'INCREMENT' });
 52 | 
 53 |     await act(async () => {
 54 |       const store = mockBridge.getStore('counter');
 55 |       if(store) {
 56 |         store.setState({ value: 1 });
 57 |       }
 58 |     });
 59 | 
 60 |     expect(screen.getByText('1')).toBeInTheDocument();
 61 |   });
 62 | 
 63 |   it('decrements counter when - button is clicked', async () => {
 64 |     render(
 65 |       <TestBridgeContext.Provider bridge={mockBridge as Bridge<AppStores>}>
 66 |         <TestCounterContext.Provider>
 67 |           <Counter BridgeContext={TestBridgeContext} CounterContext={TestCounterContext} />
 68 |         </TestCounterContext.Provider>
 69 |       </TestBridgeContext.Provider>
 70 |     );
 71 | 
 72 |     fireEvent.click(screen.getByText('-'));
 73 | 
 74 |     const history = mockBridge.getHistory('counter');
 75 |     expect(history).toContainEqual({ type: 'DECREMENT' });
 76 | 
 77 |     await act(async () => {
 78 |       const store = mockBridge.getStore('counter');
 79 |       if(store) {
 80 |         store.setState({ value: -1 });
 81 |       }
 82 |     });
 83 | 
 84 |     expect(screen.getByText('-1')).toBeInTheDocument();
 85 |   });
 86 | 
 87 |   it('sets counter value when Set Value button is clicked', async () => {
 88 |     render(
 89 |       <TestBridgeContext.Provider bridge={mockBridge as Bridge<AppStores>}>
 90 |         <TestCounterContext.Provider>
 91 |           <Counter BridgeContext={TestBridgeContext} CounterContext={TestCounterContext} />
 92 |         </TestCounterContext.Provider>
 93 |       </TestBridgeContext.Provider>
 94 |     );
 95 | 
 96 |     const input = screen.getByRole('spinbutton');
 97 |     fireEvent.change(input, { target: { value: '42' } });
 98 | 
 99 |     fireEvent.click(screen.getByText('Set Value'));
100 | 
101 |     const history = mockBridge.getHistory('counter');
102 |     expect(history).toContainEqual({ type: 'SET', value: 42 });
103 | 
104 |     await act(async () => {
105 |       const store = mockBridge.getStore('counter');
106 |       if(store) {
107 |         store.setState({ value: 42 });
108 |       }
109 |     });
110 | 
111 |     expect(screen.getByText('42')).toBeInTheDocument();
112 |   });
113 | 
114 |   it('shows loading state when store is not available', () => {
115 |     const emptyBridge = createMockBridge<AppStores>({ isSupported: true });
116 | 
117 |     render(
118 |       // Cast to Bridge<AppStores> where the Provider expects it
119 |       <TestBridgeContext.Provider bridge={emptyBridge as Bridge<AppStores>}>
120 |         <TestCounterContext.Provider>
121 |           <Counter BridgeContext={TestBridgeContext} CounterContext={TestCounterContext} />
122 |         </TestCounterContext.Provider>
123 |         <TestCounterContext.Loading>
124 |           <div>Waiting for counter data from native app...</div>
125 |         </TestCounterContext.Loading>
126 |       </TestBridgeContext.Provider>
127 |     );
128 | 
129 |     expect(screen.getByText('Waiting for counter data from native app...')).toBeInTheDocument();
130 |   });
131 | 
132 |   it('shows unsupported message when bridge is not supported', () => {
133 |     const unsupportedBridge = createMockBridge<AppStores>({
134 |       isSupported: false,
135 |       initialState: {
136 |         counter: { value: 0 }
137 |       }
138 |     });
139 | 
140 |     render(
141 |       // Cast to Bridge<AppStores> where the Provider expects it
142 |       <TestBridgeContext.Provider bridge={unsupportedBridge as Bridge<AppStores>}>
143 |         <Counter BridgeContext={TestBridgeContext} CounterContext={TestCounterContext} />
144 |       </TestBridgeContext.Provider>
145 |     );
146 | 
147 |     expect(screen.getByText('Bridge reports as unsupported')).toBeInTheDocument();
148 |   });
149 | });
150 | 


--------------------------------------------------------------------------------
/examples/react-app/src/Counter.tsx:
--------------------------------------------------------------------------------
  1 | import { createBridgeContext } from "@open-game-system/app-bridge-react";
  2 | import { useEffect, useState } from "react";
  3 | import {
  4 |   BridgeContext as DefaultBridgeContext,
  5 |   CounterContext as DefaultCounterContext,
  6 | } from "./bridge";
  7 | import { AppStores } from "./types";
  8 | 
  9 | type BridgeContextType = ReturnType<typeof createBridgeContext<AppStores>>;
 10 | type StoreContextType = ReturnType<
 11 |   typeof DefaultBridgeContext.createStoreContext<"counter">
 12 | >;
 13 | 
 14 | type CounterProps = {
 15 |   BridgeContext?: BridgeContextType;
 16 |   CounterContext?: StoreContextType;
 17 | };
 18 | 
 19 | function CounterDisplay({
 20 |   CounterContext,
 21 | }: {
 22 |   CounterContext: StoreContextType;
 23 | }) {
 24 |   const value = CounterContext.useSelector((state) => state?.value);
 25 | 
 26 |   useEffect(() => {
 27 |     console.log("Counter value in web app:", value);
 28 |   }, [value]);
 29 | 
 30 |   return (
 31 |     <div
 32 |       style={{
 33 |         textAlign: "center",
 34 |         padding: "20px",
 35 |         margin: "20px 0",
 36 |         backgroundColor: "#f0f8ff",
 37 |         borderRadius: "8px",
 38 |         border: "1px solid #ccc",
 39 |         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
 40 |       }}
 41 |     >
 42 |       <div
 43 |         style={{
 44 |           fontSize: "18px",
 45 |           color: "#555",
 46 |           marginBottom: "8px",
 47 |           fontWeight: "bold",
 48 |         }}
 49 |       >
 50 |         Web Bridge Counter:
 51 |       </div>
 52 |       <div
 53 |         style={{
 54 |           fontSize: "60px",
 55 |           fontWeight: "bold",
 56 |           color: "#1a73e8",
 57 |           padding: "10px 0",
 58 |         }}
 59 |       >
 60 |         {value}
 61 |       </div>
 62 |       <div
 63 |         style={{
 64 |           fontSize: "14px",
 65 |           fontStyle: "italic",
 66 |           color: "#666",
 67 |         }}
 68 |       >
 69 |         This value is synchronized with the native counter above
 70 |       </div>
 71 |     </div>
 72 |   );
 73 | }
 74 | 
 75 | function CounterControls({
 76 |   CounterContext,
 77 | }: {
 78 |   CounterContext: StoreContextType;
 79 | }) {
 80 |   const store = CounterContext.useStore();
 81 |   const [inputValue, setInputValue] = useState("0");
 82 | 
 83 |   return (
 84 |     <div
 85 |       style={{
 86 |         display: "flex",
 87 |         flexDirection: "column",
 88 |         gap: "12px",
 89 |         alignItems: "center",
 90 |         margin: "20px 0",
 91 |       }}
 92 |     >
 93 |       <div
 94 |         style={{
 95 |           display: "flex",
 96 |           gap: "10px",
 97 |           justifyContent: "center",
 98 |         }}
 99 |       >
100 |         <button
101 |           style={{
102 |             fontSize: "24px",
103 |             padding: "10px 20px",
104 |             borderRadius: "4px",
105 |             backgroundColor: "#eee",
106 |             cursor: "pointer",
107 |             height: "50px",
108 |             width: "50px",
109 |             display: "flex",
110 |             justifyContent: "center",
111 |             alignItems: "center",
112 |           }}
113 |           onClick={() => {
114 |             console.log("Dispatching DECREMENT event");
115 |             store.dispatch({ type: "DECREMENT" });
116 |           }}
117 |         >
118 |           -
119 |         </button>
120 |         <button
121 |           style={{
122 |             fontSize: "24px",
123 |             padding: "10px 20px",
124 |             borderRadius: "4px",
125 |             backgroundColor: "#eee",
126 |             cursor: "pointer",
127 |             height: "50px",
128 |             width: "50px",
129 |             display: "flex",
130 |             justifyContent: "center",
131 |             alignItems: "center",
132 |           }}
133 |           onClick={() => {
134 |             console.log("Dispatching INCREMENT event");
135 |             store.dispatch({ type: "INCREMENT" });
136 |           }}
137 |         >
138 |           +
139 |         </button>
140 |       </div>
141 | 
142 |       <div
143 |         style={{
144 |           display: "flex",
145 |           alignItems: "center",
146 |           gap: "8px",
147 |           border: "1px solid #ddd",
148 |           padding: "8px",
149 |           borderRadius: "4px",
150 |           backgroundColor: "#f5f5f5",
151 |           width: "100%",
152 |         }}
153 |       >
154 |         <input
155 |           type="number"
156 |           value={inputValue}
157 |           onChange={(e) => setInputValue(e.target.value)}
158 |           style={{
159 |             padding: "8px 12px",
160 |             borderRadius: "4px",
161 |             border: "1px solid #ddd",
162 |             width: "100px",
163 |             fontSize: "16px",
164 |           }}
165 |         />
166 |         <button
167 |           onClick={() => {
168 |             console.log("Dispatching SET event with value:", inputValue);
169 |             store.dispatch({
170 |               type: "SET",
171 |               value: parseInt(inputValue, 10) || 0,
172 |             });
173 |           }}
174 |           style={{
175 |             padding: "4px 12px",
176 |             borderRadius: "4px",
177 |             backgroundColor: "#eee",
178 |             border: "1px solid #ddd",
179 |             cursor: "pointer",
180 |           }}
181 |         >
182 |           Set Value
183 |         </button>
184 |       </div>
185 |     </div>
186 |   );
187 | }
188 | 
189 | export function Counter({
190 |   BridgeContext = DefaultBridgeContext,
191 |   CounterContext = DefaultCounterContext,
192 | }: CounterProps = {}) {
193 |   return (
194 |     <div className="card">
195 |       <h2>Counter Example</h2>
196 |       <BridgeContext.Supported>
197 |         <CounterContext.Provider>
198 |           <CounterControls CounterContext={CounterContext} />
199 |           <CounterDisplay CounterContext={CounterContext} />
200 |         </CounterContext.Provider>
201 |         <CounterContext.Loading>
202 |           <div>Waiting for counter data from native app...</div>
203 |         </CounterContext.Loading>
204 |       </BridgeContext.Supported>
205 |       <BridgeContext.Unsupported>
206 |         <div
207 |           style={{
208 |             background: "#ffdddd",
209 |             border: "2px solid #ff6666",
210 |             borderRadius: "8px",
211 |             padding: "12px",
212 |             margin: "15px 0",
213 |             color: "#cc0000",
214 |             fontWeight: "bold",
215 |             textAlign: "center",
216 |             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
217 |           }}
218 |         >
219 |           Bridge reports as unsupported
220 |         </div>
221 |       </BridgeContext.Unsupported>
222 |     </div>
223 |   );
224 | }
225 | 


--------------------------------------------------------------------------------
/examples/react-app/src/bridge.ts:
--------------------------------------------------------------------------------
 1 | import { createWebBridge } from "@open-game-system/app-bridge-web";
 2 | import { createBridgeContext } from "@open-game-system/app-bridge-react";
 3 | import type { AppStores } from "./types";
 4 | 
 5 | // Create the web bridge
 6 | const webBridge = createWebBridge<AppStores>();
 7 | 
 8 | // Create the bridge context
 9 | export const BridgeContext = createBridgeContext<AppStores>();
10 | export const BridgeProvider = BridgeContext.Provider;
11 | 
12 | // Create the counter store context
13 | export const CounterContext = BridgeContext.createStoreContext("counter");
14 | 
15 | // Export the bridge for direct access
16 | export { webBridge };
17 | 


--------------------------------------------------------------------------------
/examples/react-app/src/index.css:
--------------------------------------------------------------------------------
 1 | :root {
 2 |   font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
 3 |   line-height: 1.5;
 4 |   font-weight: 400;
 5 | 
 6 |   color-scheme: light dark;
 7 |   color: rgba(255, 255, 255, 0.87);
 8 |   background-color: #242424;
 9 | 
10 |   font-synthesis: none;
11 |   text-rendering: optimizeLegibility;
12 |   -webkit-font-smoothing: antialiased;
13 |   -moz-osx-font-smoothing: grayscale;
14 | }
15 | 
16 | body {
17 |   margin: 0;
18 |   display: flex;
19 |   place-items: center;
20 |   min-width: 320px;
21 |   min-height: 100vh;
22 | }
23 | 
24 | #root {
25 |   max-width: 1280px;
26 |   margin: 0 auto;
27 |   padding: 2rem;
28 |   text-align: center;
29 | }
30 | 
31 | .card {
32 |   padding: 2em;
33 | }
34 | 
35 | button {
36 |   border-radius: 8px;
37 |   border: 1px solid transparent;
38 |   padding: 0.6em 1.2em;
39 |   font-size: 1em;
40 |   font-weight: 500;
41 |   font-family: inherit;
42 |   background-color: #1a1a1a;
43 |   cursor: pointer;
44 |   transition: border-color 0.25s;
45 | }
46 | 
47 | button:hover {
48 |   border-color: #646cff;
49 | }
50 | 
51 | button:focus,
52 | button:focus-visible {
53 |   outline: 4px auto -webkit-focus-ring-color;
54 | } 


--------------------------------------------------------------------------------
/examples/react-app/src/main.tsx:
--------------------------------------------------------------------------------
 1 | import React from "react";
 2 | import ReactDOM from "react-dom/client";
 3 | import App from "./App";
 4 | import "./index.css";
 5 | 
 6 | // Do not create any shim - the bridge should only work in an actual WebView
 7 | if (!window.ReactNativeWebView) {
 8 |   console.log("Running in standalone browser - bridge should be unsupported");
 9 | }
10 | 
11 | ReactDOM.createRoot(document.getElementById("root")!).render(
12 |   <React.StrictMode>
13 |     <App />
14 |   </React.StrictMode>
15 | );
16 | 


--------------------------------------------------------------------------------
/examples/react-app/src/test/setup.ts:
--------------------------------------------------------------------------------
1 | import '@testing-library/jest-dom/vitest';
2 | import { cleanup } from '@testing-library/react';
3 | import { afterEach } from 'vitest';
4 | 
5 | afterEach(() => {
6 |   cleanup();
7 | }); 


--------------------------------------------------------------------------------
/examples/react-app/src/types.ts:
--------------------------------------------------------------------------------
 1 | // Basic state type for the counter
 2 | export interface CounterState {
 3 |   value: number;
 4 | }
 5 | 
 6 | // Events that can be dispatched to the counter store
 7 | export type CounterEvents =
 8 |   | { type: "INCREMENT" }
 9 |   | { type: "DECREMENT" }
10 |   | { type: "SET"; value: number };
11 | 
12 | // Store type that would be used with a bridge
13 | export type AppStores = {
14 |   counter: {
15 |     state: CounterState;
16 |     events: CounterEvents;
17 |   };
18 | }; 


--------------------------------------------------------------------------------
/examples/react-app/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "../../tsconfig.json",
 3 |   "compilerOptions": {
 4 |     "target": "ES2020",
 5 |     "useDefineForClassFields": true,
 6 |     "lib": ["ES2020", "DOM", "DOM.Iterable"],
 7 |     "module": "ESNext",
 8 |     "skipLibCheck": true,
 9 | 
10 |     /* Bundler mode */
11 |     "moduleResolution": "bundler",
12 |     "allowImportingTsExtensions": true,
13 |     "resolveJsonModule": true,
14 |     "isolatedModules": true,
15 |     "noEmit": true,
16 |     "jsx": "react-jsx",
17 | 
18 |     /* Linting */
19 |     "strict": true,
20 |     "noUnusedLocals": true,
21 |     "noUnusedParameters": true,
22 |     "noFallthroughCasesInSwitch": true,
23 | 
24 |     /* Paths */
25 |     "baseUrl": ".",
26 |     "paths": {
27 |       "@open-game-system/app-bridge-types": ["../../packages/app-bridge-types/src"],
28 |       "@open-game-system/app-bridge-web": ["../../packages/app-bridge-web/src"],
29 |       "@open-game-system/app-bridge-react": ["../../packages/app-bridge-react/src"],
30 |       "@open-game-system/app-bridge-testing": ["../../packages/app-bridge-testing/src"]
31 |     }
32 |   },
33 |   "include": [
34 |     "src",
35 |     "../shared/**/*",
36 |     "../../packages/app-bridge-types/src/**/*",
37 |     "../../packages/app-bridge-web/src/**/*",
38 |     "../../packages/app-bridge-react/src/**/*",
39 |     "../../packages/app-bridge-testing/src/**/*"
40 |   ],
41 |   "references": [
42 |     { "path": "./tsconfig.node.json" }
43 |   ]
44 | }
45 | 


--------------------------------------------------------------------------------
/examples/react-app/tsconfig.node.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "compilerOptions": {
 3 |     "composite": true,
 4 |     "skipLibCheck": true,
 5 |     "module": "ESNext",
 6 |     "moduleResolution": "bundler",
 7 |     "allowSyntheticDefaultImports": true
 8 |   },
 9 |   "include": ["vite.config.ts"]
10 | } 


--------------------------------------------------------------------------------
/examples/react-app/vite.config.ts:
--------------------------------------------------------------------------------
 1 | /// <reference types="vitest" />
 2 | import { defineConfig } from 'vite';
 3 | import react from '@vitejs/plugin-react';
 4 | import tsconfigPaths from 'vite-tsconfig-paths';
 5 | import { resolve } from 'path';
 6 | 
 7 | // https://vitejs.dev/config/
 8 | export default defineConfig({
 9 |   plugins: [
10 |     react(),
11 |     tsconfigPaths({
12 |       projects: [resolve(__dirname, '../../tsconfig.json')]
13 |     })
14 |   ],
15 |   test: {
16 |     environment: 'jsdom',
17 |     globals: true,
18 |     setupFiles: ['./src/test/setup.ts'],
19 |     deps: {
20 |       optimizer: {
21 |         web: {
22 |           include: [
23 |             '@open-game-system/app-bridge-types',
24 |             '@open-game-system/app-bridge-web',
25 |             '@open-game-system/app-bridge-react',
26 |             '@open-game-system/app-bridge-testing'
27 |           ]
28 |         }
29 |       }
30 |     }
31 |   },
32 |   resolve: {
33 |     alias: [
34 |       {
35 |         find: '@open-game-system/app-bridge-types',
36 |         replacement: resolve(__dirname, '../../packages/app-bridge-types/src')
37 |       },
38 |       {
39 |         find: '@open-game-system/app-bridge-web',
40 |         replacement: resolve(__dirname, '../../packages/app-bridge-web/src')
41 |       },
42 |       {
43 |         find: '@open-game-system/app-bridge-react',
44 |         replacement: resolve(__dirname, '../../packages/app-bridge-react/src')
45 |       },
46 |       {
47 |         find: '@open-game-system/app-bridge-testing',
48 |         replacement: resolve(__dirname, '../../packages/app-bridge-testing/src')
49 |       }
50 |     ]
51 |   },
52 |   optimizeDeps: {
53 |     include: [
54 |       '@open-game-system/app-bridge-types',
55 |       '@open-game-system/app-bridge-web',
56 |       '@open-game-system/app-bridge-react',
57 |       '@open-game-system/app-bridge-testing'
58 |     ]
59 |   }
60 | }); 


--------------------------------------------------------------------------------
/examples/react-app/vitest.config.ts:
--------------------------------------------------------------------------------
 1 | /// <reference types="vitest" />
 2 | import { defineConfig } from 'vite';
 3 | import react from '@vitejs/plugin-react';
 4 | import { resolve } from 'path';
 5 | 
 6 | export default defineConfig({
 7 |   plugins: [react()],
 8 |   resolve: {
 9 |     alias: {
10 |       '@open-game-system/app-bridge': resolve(__dirname, '../../packages/app-bridge/dist')
11 |     }
12 |   },
13 |   test: {
14 |     globals: true,
15 |     environment: 'jsdom',
16 |     setupFiles: ['./src/test/setup.ts'],
17 |     coverage: {
18 |       provider: 'v8',
19 |       reporter: ['text', 'html'],
20 |       exclude: [
21 |         'node_modules/',
22 |         'src/test/',
23 |       ],
24 |     },
25 |     deps: {
26 |       inline: ['@testing-library/jest-dom'],
27 |     }
28 |   },
29 | }); 


--------------------------------------------------------------------------------
/examples/shared/types.ts:
--------------------------------------------------------------------------------
 1 | // Basic state type for the counter
 2 | export interface CounterState {
 3 |   value: number;
 4 | }
 5 | 
 6 | // Events that can be dispatched to the counter store
 7 | export type CounterEvents =
 8 |   | { type: "INCREMENT" }
 9 |   | { type: "DECREMENT" }
10 |   | { type: "SET"; value: number };
11 | 


--------------------------------------------------------------------------------
/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "app-bridge-monorepo",
 3 |   "private": true,
 4 |   "scripts": {
 5 |     "build": "turbo run build",
 6 |     "dev": "turbo run dev",
 7 |     "test": "turbo run test",
 8 |     "test:coverage": "turbo run test:coverage",
 9 |     "typecheck": "turbo run typecheck"
10 |   },
11 |   "devDependencies": {
12 |     "@testing-library/jest-dom": "^6.4.2",
13 |     "turbo": "^2.5.0",
14 |     "typescript": "^5.3.3",
15 |     "vitest": "^1.2.2"
16 |   },
17 |   "packageManager": "pnpm@9.5.0"
18 | }
19 | 


--------------------------------------------------------------------------------
/packages/app-bridge-native/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@open-game-system/app-bridge-native",
 3 |   "version": "0.20250411.3",
 4 |   "description": "React Native specific implementation of the app-bridge ecosystem",
 5 |   "main": "./dist/index.js",
 6 |   "module": "./dist/index.mjs",
 7 |   "types": "./dist/index.d.ts",
 8 |   "sideEffects": false,
 9 |   "files": [
10 |     "dist",
11 |     "README.md",
12 |     "LICENSE"
13 |   ],
14 |   "scripts": {
15 |     "build": "tsup --config tsup.config.ts",
16 |     "dev": "tsup --config tsup.config.ts --watch",
17 |     "clean": "rimraf dist",
18 |     "typecheck": "tsc --noEmit",
19 |     "test": "vitest run",
20 |     "test:watch": "vitest",
21 |     "test:coverage": "vitest run --coverage",
22 |     "prepublishOnly": "node -e \"const fs=require('fs'); const pkgPath='./package.json'; const pkg=JSON.parse(fs.readFileSync(pkgPath)); const deps=pkg.dependencies||{}; const peerDeps=pkg.peerDependencies||{}; const devDeps=pkg.devDependencies||{}; const version='^'+pkg.version.split('-')[0]; /* Use major/minor/patch from current version */ const fix=(obj)=>(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v.startsWith('workspace:')?version:v]))); pkg.dependencies=fix(deps); pkg.peerDependencies=fix(peerDeps); pkg.devDependencies=fix(devDeps); fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\\n'); console.log('Replaced workspace:* versions in', pkgPath);\""
23 |   },
24 |   "dependencies": {
25 |     "@open-game-system/app-bridge-types": "workspace:*",
26 |     "fast-json-patch": "^3.1.1",
27 |     "immer": "^10.0.3"
28 |   },
29 |   "peerDependencies": {
30 |     "react-native": ">=0.60.0",
31 |     "react-native-webview": ">=11.0.0",
32 |     "typescript": ">=4.5.0"
33 |   },
34 |   "devDependencies": {
35 |     "@types/react-native": "^0.72.0",
36 |     "@vitest/coverage-v8": "^1.2.2",
37 |     "jsdom": "^24.0.0",
38 |     "rimraf": "^5.0.5",
39 |     "tsup": "^8.0.1",
40 |     "typescript": "^5.3.3",
41 |     "vitest": "^1.2.2"
42 |   },
43 |   "publishConfig": {
44 |     "access": "public"
45 |   },
46 |   "keywords": [
47 |     "typescript",
48 |     "react-native",
49 |     "app-bridge",
50 |     "webview"
51 |   ],
52 |   "author": "OpenGameSystem",
53 |   "license": "MIT"
54 | }
55 | 


--------------------------------------------------------------------------------
/packages/app-bridge-native/src/__tests__/createStore.test.ts:
--------------------------------------------------------------------------------
  1 | import { describe, it, expect, vi } from 'vitest'; // Use vitest imports
  2 | import { createStore } from '../index'; // Adjust path as needed
  3 | import type { State, Event, Store } from '@open-game-system/app-bridge-types';
  4 | 
  5 | // --- Test Setup ---
  6 | interface TestState extends State {
  7 |   count: number;
  8 |   lastEvent?: string;
  9 |   asyncOpStatus?: 'pending' | 'done';
 10 | }
 11 | 
 12 | type TestEvents =
 13 |   | { type: 'INCREMENT'; amount: number }
 14 |   | { type: 'DECREMENT' }
 15 |   | { type: 'ASYNC_START' }
 16 |   | { type: 'ASYNC_FINISH' }
 17 |   | { type: 'RESET' };
 18 | 
 19 | const initialState: TestState = { count: 0 };
 20 | 
 21 | const testProducer = (draft: TestState, event: TestEvents) => {
 22 |   draft.lastEvent = event.type;
 23 |   switch (event.type) {
 24 |     case 'INCREMENT':
 25 |       draft.count += event.amount;
 26 |       break;
 27 |     case 'DECREMENT':
 28 |       if (draft.count > 0) draft.count -= 1;
 29 |       break;
 30 |     case 'ASYNC_START':
 31 |       draft.asyncOpStatus = 'pending';
 32 |       break;
 33 |     case 'ASYNC_FINISH':
 34 |       draft.asyncOpStatus = 'done';
 35 |       break;
 36 |     case 'RESET':
 37 |        Object.assign(draft, initialState);
 38 |       break;
 39 |   }
 40 | };
 41 | 
 42 | const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
 43 | 
 44 | // --- Tests --- 
 45 | describe('createStore', () => {
 46 | 
 47 |   it('should initialize with the correct state', () => {
 48 |     const store = createStore<TestState, TestEvents>({ initialState });
 49 |     expect(store.getSnapshot()).toEqual(initialState);
 50 |   });
 51 | 
 52 |   it('should update state via dispatch and producer', async () => {
 53 |     const store = createStore<TestState, TestEvents>({ initialState, producer: testProducer });
 54 |     await store.dispatch({ type: 'INCREMENT', amount: 5 });
 55 |     expect(store.getSnapshot().count).toBe(5);
 56 |     expect(store.getSnapshot().lastEvent).toBe('INCREMENT');
 57 |     await store.dispatch({ type: 'DECREMENT' });
 58 |     expect(store.getSnapshot().count).toBe(4);
 59 |     expect(store.getSnapshot().lastEvent).toBe('DECREMENT');
 60 |   });
 61 | 
 62 |   it('should notify subscribe listeners on state change and immediately', async () => {
 63 |     const store = createStore<TestState, TestEvents>({ initialState, producer: testProducer });
 64 |     const listener = vi.fn(); // Use vi.fn()
 65 | 
 66 |     const unsubscribe = store.subscribe(listener);
 67 | 
 68 |     expect(listener).toHaveBeenCalledTimes(1);
 69 |     expect(listener).toHaveBeenCalledWith(initialState);
 70 | 
 71 |     await store.dispatch({ type: 'INCREMENT', amount: 1 });
 72 | 
 73 |     expect(listener).toHaveBeenCalledTimes(2);
 74 |     expect(listener).toHaveBeenCalledWith({ count: 1, lastEvent: 'INCREMENT' });
 75 | 
 76 |     unsubscribe();
 77 |     await store.dispatch({ type: 'DECREMENT' });
 78 | 
 79 |     expect(listener).toHaveBeenCalledTimes(2);
 80 |   });
 81 | 
 82 |   it('should invoke listeners defined in the `on` configuration', async () => {
 83 |     // Use vi.fn() and provide types if needed, though often inferred
 84 |     const onIncrementListener = vi.fn<[Extract<TestEvents, { type: 'INCREMENT' }>, Store<TestState, TestEvents>], Promise<void> | void>();
 85 |     const onDecrementListener = vi.fn<[Extract<TestEvents, { type: 'DECREMENT' }>, Store<TestState, TestEvents>], Promise<void> | void>(async (event, store) => {
 86 |       await delay(10);
 87 |       expect(store.getSnapshot().count).toBe(1);
 88 |     });
 89 | 
 90 |     const store = createStore<TestState, TestEvents>({
 91 |       initialState,
 92 |       producer: testProducer,
 93 |       on: {
 94 |         INCREMENT: onIncrementListener,
 95 |         DECREMENT: onDecrementListener,
 96 |       },
 97 |     });
 98 | 
 99 |     await store.dispatch({ type: 'INCREMENT', amount: 2 });
100 |     expect(onIncrementListener).toHaveBeenCalledTimes(1);
101 |     expect(onIncrementListener).toHaveBeenCalledWith(expect.objectContaining({ type: 'INCREMENT', amount: 2 }), store);
102 |     expect(onDecrementListener).not.toHaveBeenCalled();
103 | 
104 |     await store.dispatch({ type: 'DECREMENT' });
105 |     expect(onIncrementListener).toHaveBeenCalledTimes(1);
106 |     expect(onDecrementListener).toHaveBeenCalledTimes(1);
107 |     expect(onDecrementListener).toHaveBeenCalledWith(expect.objectContaining({ type: 'DECREMENT' }), store);
108 |   });
109 | 
110 |   it('should invoke listeners added via the `store.on()` method', async () => {
111 |     const store = createStore<TestState, TestEvents>({ initialState, producer: testProducer });
112 |     const onIncrementListener = vi.fn<[Extract<TestEvents, { type: 'INCREMENT' }>, Store<TestState, TestEvents>], Promise<void> | void>();
113 |     const onDecrementListener = vi.fn<[Extract<TestEvents, { type: 'DECREMENT' }>, Store<TestState, TestEvents>], Promise<void> | void>(async (event, store) => { await delay(5); });
114 | 
115 |     const unsubInc = store.on('INCREMENT', onIncrementListener);
116 |     const unsubDec = store.on('DECREMENT', onDecrementListener);
117 | 
118 |     await store.dispatch({ type: 'INCREMENT', amount: 3 });
119 |     expect(onIncrementListener).toHaveBeenCalledTimes(1);
120 |     expect(onIncrementListener).toHaveBeenCalledWith(expect.objectContaining({ type: 'INCREMENT', amount: 3 }), store);
121 |     expect(onDecrementListener).not.toHaveBeenCalled();
122 | 
123 |     await store.dispatch({ type: 'DECREMENT' });
124 |     expect(onIncrementListener).toHaveBeenCalledTimes(1);
125 |     expect(onDecrementListener).toHaveBeenCalledTimes(1);
126 |     expect(onDecrementListener).toHaveBeenCalledWith(expect.objectContaining({ type: 'DECREMENT' }), store);
127 | 
128 |     unsubInc();
129 |     await store.dispatch({ type: 'INCREMENT', amount: 1 });
130 |     expect(onIncrementListener).toHaveBeenCalledTimes(1);
131 | 
132 |     unsubDec();
133 |     await store.dispatch({ type: 'DECREMENT' });
134 |     expect(onDecrementListener).toHaveBeenCalledTimes(1);
135 |   });
136 | 
137 | 
138 |   it('should invoke both configured and dynamic listeners for the same event type', async () => {
139 |     const configListener = vi.fn<[Extract<TestEvents, { type: 'INCREMENT' }>, Store<TestState, TestEvents>], Promise<void> | void>();
140 |     const dynamicListener = vi.fn<[Extract<TestEvents, { type: 'INCREMENT' }>, Store<TestState, TestEvents>], Promise<void> | void>();
141 | 
142 |     const store = createStore<TestState, TestEvents>({
143 |       initialState,
144 |       producer: testProducer,
145 |       on: {
146 |         INCREMENT: configListener,
147 |       },
148 |     });
149 | 
150 |     store.on('INCREMENT', dynamicListener);
151 | 
152 |     await store.dispatch({ type: 'INCREMENT', amount: 7 });
153 | 
154 |     expect(configListener).toHaveBeenCalledTimes(1);
155 |     expect(dynamicListener).toHaveBeenCalledTimes(1);
156 |     expect(configListener).toHaveBeenCalledWith(expect.objectContaining({ type: 'INCREMENT', amount: 7 }), store);
157 |     expect(dynamicListener).toHaveBeenCalledWith(expect.objectContaining({ type: 'INCREMENT', amount: 7 }), store);
158 |   });
159 | 
160 |   it('should handle async listeners and execute them without awaiting dispatch', async () => {
161 |     let listenerPromise: Promise<void> | undefined;
162 |     const asyncListener = vi.fn<[Extract<TestEvents, { type: 'ASYNC_START' }>, Store<TestState, TestEvents>], Promise<void> | void>((event, store) => {
163 |         listenerPromise = (async () => {
164 |             expect(store.getSnapshot().asyncOpStatus).toBe('pending');
165 |             await delay(20);
166 |             await store.dispatch({ type: 'ASYNC_FINISH' });
167 |         })();
168 |     });
169 | 
170 |     const store = createStore<TestState, TestEvents>({
171 |       initialState,
172 |       producer: testProducer,
173 |       on: {
174 |         ASYNC_START: asyncListener,
175 |       },
176 |     });
177 | 
178 |     // Dispatch should return immediately (void)
179 |     store.dispatch({ type: 'ASYNC_START' });
180 | 
181 |     expect(store.getSnapshot().asyncOpStatus).toBe('pending');
182 |     expect(asyncListener).toHaveBeenCalledTimes(1);
183 | 
184 |     // Check that the async listener is still running
185 |     expect(store.getSnapshot().lastEvent).toBe('ASYNC_START');
186 | 
187 |     // Wait for the listener explicitly if needed for assertion
188 |     await listenerPromise;
189 | 
190 |     // Check state after the listener dispatched ASYNC_FINISH
191 |     expect(store.getSnapshot().asyncOpStatus).toBe('done');
192 |     expect(store.getSnapshot().lastEvent).toBe('ASYNC_FINISH');
193 |   });
194 | 
195 |   it('should reset state to initial state when store.reset() is called', async () => {
196 |     const store = createStore<TestState, TestEvents>({ initialState, producer: testProducer });
197 |     await store.dispatch({ type: 'INCREMENT', amount: 10 });
198 |     expect(store.getSnapshot().count).toBe(10);
199 | 
200 |     store.reset();
201 |     expect(store.getSnapshot()).toEqual(initialState);
202 | 
203 |      await store.dispatch({ type: 'INCREMENT', amount: 1 });
204 |      expect(store.getSnapshot().count).toBe(1);
205 |   });
206 | 
207 |    it('should handle errors within async listeners gracefully (unhandled rejection)', async () => {
208 |     const errorListener = vi.fn<[Extract<TestEvents, { type: 'INCREMENT' }>, Store<TestState, TestEvents>], Promise<void> | void>(async (event, store) => {
209 |       await delay(5);
210 |       throw new Error("Listener Error!");
211 |     });
212 |     const successfulListener = vi.fn<[Extract<TestEvents, { type: 'INCREMENT' }>, Store<TestState, TestEvents>], Promise<void> | void>();
213 | 
214 |     const store = createStore<TestState, TestEvents>({
215 |       initialState,
216 |       producer: testProducer,
217 |       on: {
218 |         INCREMENT: errorListener,
219 |       },
220 |     });
221 |     store.on('INCREMENT', successfulListener);
222 | 
223 |     // Mock console.error to check if it's called for the unhandled rejection
224 |     const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
225 | 
226 |     // Dispatch is synchronous
227 |     store.dispatch({ type: 'INCREMENT', amount: 1 });
228 | 
229 |     // Allow time for the async listener promise to reject
230 |     await delay(10);
231 | 
232 |     expect(errorListener).toHaveBeenCalledTimes(1);
233 |     expect(successfulListener).toHaveBeenCalledTimes(1); // Subsequent listeners should still run
234 |     expect(consoleErrorSpy).toHaveBeenCalledWith(
235 |       expect.stringContaining('[Native Store] Unhandled promise rejection in async event listener for type "INCREMENT"'),
236 |       expect.any(Error)
237 |     );
238 | 
239 |     consoleErrorSpy.mockRestore();
240 |   });
241 | 
242 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-native/src/index.test.ts:
--------------------------------------------------------------------------------
  1 | import type { NativeBridge, BridgeStores, State } from "@open-game-system/app-bridge-types";
  2 | import { beforeEach, describe, expect, test, vi } from "vitest";
  3 | import { createNativeBridge, createStore, WebView } from "./index";
  4 | 
  5 | // Base state type with discriminator
  6 | interface CounterState extends State {
  7 |   value: number;
  8 | }
  9 | 
 10 | // Discriminated union for events
 11 | type CounterEvents =
 12 |   | { type: "INCREMENT" }
 13 |   | { type: "DECREMENT" }
 14 |   | { type: "SET"; value: number };
 15 | 
 16 | type TestStores = BridgeStores<{
 17 |   counter: {
 18 |     state: CounterState;
 19 |     events: CounterEvents;
 20 |   };
 21 | }>;
 22 | 
 23 | // Create a mock WebView implementation for testing
 24 | class MockWebView implements WebView {
 25 |   public onMessage: (event: { nativeEvent: { data: string } }) => void =
 26 |     () => {};
 27 |   public messageQueue: string[] = [];
 28 | 
 29 |   postMessage(message: string): void {
 30 |     this.messageQueue.push(message);
 31 |   }
 32 | 
 33 |   injectJavaScript(script: string): void {
 34 |     // No-op for testing
 35 |   }
 36 | }
 37 | 
 38 | describe("NativeBridge", () => {
 39 |   let bridge: NativeBridge<TestStores>;
 40 |   let mockWebView: MockWebView;
 41 | 
 42 |   beforeEach(() => {
 43 |     mockWebView = new MockWebView();
 44 |     bridge = createNativeBridge<TestStores>();
 45 | 
 46 |     // Create and register a store
 47 |     const store = createStore({
 48 |       initialState: { value: 0 },
 49 |       producer: (draft: CounterState, event: CounterEvents) => {
 50 |         switch (event.type) {
 51 |           case "INCREMENT":
 52 |             draft.value += 1;
 53 |             break;
 54 |           case "DECREMENT":
 55 |             draft.value -= 1;
 56 |             break;
 57 |           case "SET":
 58 |             draft.value = event.value;
 59 |             break;
 60 |         }
 61 |       },
 62 |     });
 63 | 
 64 |     bridge.setStore('counter', store);
 65 |   });
 66 | 
 67 |   describe("Store Management", () => {
 68 |     test("provides access to stores", () => {
 69 |       const store = bridge.getStore("counter");
 70 |       expect(store).toBeDefined();
 71 |       expect(store?.getSnapshot()).toEqual({ value: 0 });
 72 |     });
 73 | 
 74 |     test("allows subscribing to store state", () => {
 75 |       const store = bridge.getStore("counter");
 76 |       const listener = vi.fn();
 77 | 
 78 |       store?.subscribe(listener);
 79 |       store?.dispatch({ type: "INCREMENT" });
 80 | 
 81 |       const snapshot = store?.getSnapshot();
 82 |       expect(snapshot).toBeDefined();
 83 |       expect(snapshot?.value).toBe(1);
 84 |       expect(listener).toHaveBeenCalledWith({ value: 1 });
 85 |     });
 86 | 
 87 |     test("notifies store availability subscribers", () => {
 88 |       const listener = vi.fn();
 89 |       bridge.subscribe(listener);
 90 | 
 91 |       // Create a new store
 92 |       const store = createStore({
 93 |         initialState: { value: 42 },
 94 |         producer: (draft: CounterState, event: CounterEvents) => {
 95 |           if (event.type === "INCREMENT") draft.value += 1;
 96 |         },
 97 |       });
 98 | 
 99 |       // Set the store and verify listener was called
100 |       bridge.setStore('counter', store);
101 |       expect(listener).toHaveBeenCalled();
102 |     });
103 | 
104 |     test("handles store removal", () => {
105 |       const listener = vi.fn();
106 |       bridge.subscribe(listener);
107 | 
108 |       // Remove the store and verify listener was called
109 |       bridge.setStore('counter', undefined);
110 |       expect(listener).toHaveBeenCalled();
111 | 
112 |       // Verify store is no longer available
113 |       expect(bridge.getStore('counter')).toBeUndefined();
114 |     });
115 |   });
116 | 
117 |   describe("WebView Integration", () => {
118 |     test("handles WebView registration with null value", () => {
119 |       const unsubscribe = bridge.registerWebView(null);
120 |       expect(typeof unsubscribe).toBe("function");
121 |     });
122 | 
123 |     test("registers WebView and receives initial state", () => {
124 |       const unsubscribe = bridge.registerWebView(mockWebView);
125 | 
126 |       expect(mockWebView.messageQueue.length).toBeGreaterThan(0);
127 |       const message = JSON.parse(mockWebView.messageQueue[0]);
128 |       expect(message.type).toBe("STATE_INIT");
129 |       expect(message.storeKey).toBe("counter");
130 |       expect(message.data).toEqual({ value: 0 });
131 | 
132 |       unsubscribe();
133 |     });
134 | 
135 |     test("handles ready state subscription", () => {
136 |       const readyListener = vi.fn();
137 |       
138 |       // Register the WebView first
139 |       bridge.registerWebView(mockWebView);
140 |       
141 |       // Then subscribe to ready state
142 |       bridge.subscribeToReadyState(mockWebView, readyListener);
143 | 
144 |       // Should be called immediately with initial state (false)
145 |       expect(readyListener).toHaveBeenCalledWith(false);
146 | 
147 |       // Simulate BRIDGE_READY message
148 |       bridge.handleWebMessage(
149 |         JSON.stringify({
150 |           type: "BRIDGE_READY",
151 |         })
152 |       );
153 | 
154 |       // Should be called with true when ready
155 |       expect(readyListener).toHaveBeenCalledWith(true);
156 |     });
157 | 
158 |     test("handles ready state subscription with null WebView", () => {
159 |       const readyListener = vi.fn();
160 |       const unsubscribe = bridge.subscribeToReadyState(null, readyListener);
161 | 
162 |       // Should be called immediately with false
163 |       expect(readyListener).toHaveBeenCalledWith(false);
164 | 
165 |       // Should be a no-op unsubscribe
166 |       expect(() => unsubscribe()).not.toThrow();
167 |     });
168 | 
169 |     test("unregisters WebView properly", () => {
170 |       const unsubscribe = bridge.registerWebView(mockWebView);
171 |       const readyListener = vi.fn();
172 | 
173 |       bridge.subscribeToReadyState(mockWebView, readyListener);
174 |       bridge.handleWebMessage(
175 |         JSON.stringify({
176 |           type: "BRIDGE_READY",
177 |         })
178 |       );
179 | 
180 |       // Clear initial messages
181 |       mockWebView.messageQueue = [];
182 | 
183 |       // Unregister
184 |       unsubscribe();
185 | 
186 |       // Should no longer receive messages
187 |       const store = bridge.getStore("counter");
188 |       store?.dispatch({ type: "INCREMENT" });
189 | 
190 |       expect(mockWebView.messageQueue.length).toBe(0);
191 |     });
192 | 
193 |     test("handles message events from multiple WebViews", () => {
194 |       const webView1 = new MockWebView();
195 |       const webView2 = new MockWebView();
196 | 
197 |       bridge.registerWebView(webView1);
198 |       bridge.registerWebView(webView2);
199 | 
200 |       // Send ready message from both WebViews
201 |       bridge.handleWebMessage(
202 |         JSON.stringify({
203 |           type: "BRIDGE_READY",
204 |         })
205 |       );
206 | 
207 |       // Clear message queues
208 |       webView1.messageQueue = [];
209 |       webView2.messageQueue = [];
210 | 
211 |       // Dispatch an event to trigger state change
212 |       const store = bridge.getStore("counter");
213 |       store?.dispatch({ type: "INCREMENT" });
214 | 
215 |       // Both WebViews should receive the update
216 |       expect(webView1.messageQueue.length).toBe(1);
217 |       expect(webView2.messageQueue.length).toBe(1);
218 |     });
219 | 
220 |     test("handles incoming events from WebView", () => {
221 |       bridge.registerWebView(mockWebView);
222 |       const store = bridge.getStore("counter");
223 |       const listener = vi.fn();
224 |       store?.subscribe(listener);
225 | 
226 |       // Simulate an INCREMENT event from the WebView
227 |       bridge.handleWebMessage(
228 |         JSON.stringify({
229 |           type: "EVENT",
230 |           storeKey: "counter",
231 |           event: { type: "INCREMENT" },
232 |         })
233 |       );
234 | 
235 |       const snapshot = store?.getSnapshot();
236 |       expect(snapshot).toBeDefined();
237 |       expect(snapshot?.value).toBe(1);
238 |       expect(listener).toHaveBeenCalledWith({ value: 1 });
239 |     });
240 | 
241 |     test("tracks WebView ready state", () => {
242 |       bridge.registerWebView(mockWebView);
243 |       expect(bridge.getReadyState(mockWebView)).toBe(false);
244 | 
245 |       bridge.handleWebMessage(
246 |         JSON.stringify({
247 |           type: "BRIDGE_READY",
248 |         })
249 |       );
250 | 
251 |       expect(bridge.getReadyState(mockWebView)).toBe(true);
252 |     });
253 |   });
254 | });
255 | 


--------------------------------------------------------------------------------
/packages/app-bridge-native/src/index.ts:
--------------------------------------------------------------------------------
  1 | import {
  2 |   State,
  3 |   Event,
  4 |   Store,
  5 |   CreateStore,
  6 |   StoreConfig,
  7 |   Producer,
  8 |   NativeBridge,
  9 |   StoreOnConfig,
 10 |   WebView as BridgeWebView,
 11 |   WebToNativeMessage,
 12 |   NativeToWebMessage,
 13 |   BridgeStores
 14 | } from "@open-game-system/app-bridge-types";
 15 | import { produce } from "immer";
 16 | import { compare } from "fast-json-patch";
 17 | 
 18 | // Re-export BridgeWebView as WebView for consistency within this package if needed
 19 | export type WebView = BridgeWebView;
 20 | 
 21 | /**
 22 |  * Creates a new store with the given configuration according to Plan v4.
 23 |  */
 24 | export const createStore: CreateStore = <
 25 |   S extends State,
 26 |   E extends Event
 27 | >(
 28 |   config: StoreConfig<S, E>
 29 | ): Store<S, E> => {
 30 |   let currentState = config.initialState;
 31 |   const stateListeners = new Set<(state: S) => void>();
 32 |   const eventListeners = new Map<string, Set<(event: E, store: Store<S, E>) => Promise<void> | void>>();
 33 | 
 34 |   let storeInstance: Store<S, E>;
 35 | 
 36 |   const notifyStateListeners = () => {
 37 |     stateListeners.forEach(listener => listener(currentState));
 38 |   };
 39 | 
 40 |   const notifyEventListeners = (eventType: E['type'], event: E) => {
 41 |     const listeners = eventListeners.get(eventType as string);
 42 |     if (listeners) {
 43 |       listeners.forEach(listener => {
 44 |           try {
 45 |               const result = listener(event, storeInstance);
 46 |               if (result instanceof Promise) {
 47 |                   result.catch(error => {
 48 |                      console.error(`[Native Store] Unhandled promise rejection in async event listener for type "${eventType}":`, error);
 49 |                   });
 50 |               }
 51 |           } catch (error) {
 52 |               console.error(`[Native Store] Error in event listener for type "${eventType}":`, error);
 53 |           }
 54 |       });
 55 |     }
 56 |   };
 57 | 
 58 |   storeInstance = {
 59 |     getSnapshot: () => currentState,
 60 | 
 61 |     dispatch: (event: E): void => {
 62 |       let stateChanged = false;
 63 |       if (config.producer) {
 64 |         const nextState = produce(currentState, (draft: S) => {
 65 |           config.producer!(draft, event);
 66 |         });
 67 |         if (nextState !== currentState) {
 68 |             currentState = nextState;
 69 |             stateChanged = true;
 70 |         }
 71 |       }
 72 | 
 73 |       if (stateChanged) {
 74 |         notifyStateListeners();
 75 |       }
 76 | 
 77 |       notifyEventListeners(event.type as E['type'], event);
 78 |     },
 79 | 
 80 |     subscribe: (listener: (state: S) => void) => {
 81 |       stateListeners.add(listener);
 82 |       listener(currentState);
 83 |       return () => {
 84 |         stateListeners.delete(listener);
 85 |       };
 86 |     },
 87 | 
 88 |     on: <EventType extends E['type']>(
 89 |       eventType: EventType,
 90 |       listener: (event: Extract<E, { type: EventType }>, store: Store<S, E>) => Promise<void> | void
 91 |     ): (() => void) => {
 92 |        const eventTypeStr = eventType as string;
 93 |       if (!eventListeners.has(eventTypeStr)) {
 94 |         eventListeners.set(eventTypeStr, new Set());
 95 |       }
 96 |       const listeners = eventListeners.get(eventTypeStr)!;
 97 |       const typedListener = listener as (event: E, store: Store<S, E>) => Promise<void> | void;
 98 |       listeners.add(typedListener);
 99 | 
100 |       return () => {
101 |         listeners.delete(typedListener);
102 |         if (listeners.size === 0) {
103 |           eventListeners.delete(eventTypeStr);
104 |         }
105 |       };
106 |     },
107 | 
108 |     reset: () => {
109 |       currentState = config.initialState;
110 |       notifyStateListeners();
111 |     }
112 |   };
113 | 
114 |   if (config.on) {
115 |     for (const eventType in config.on) {
116 |        if (Object.prototype.hasOwnProperty.call(config.on, eventType)) {
117 |            const listener = config.on[eventType as E['type']];
118 |            if (listener) {
119 |                storeInstance.on(eventType as E['type'], listener);
120 |            }
121 |        }
122 |     }
123 |   }
124 | 
125 |   return storeInstance;
126 | };
127 | 
128 | /**
129 |  * Creates a native bridge instance using the BridgeWebView type from types package.
130 |  */
131 | export function createNativeBridge<TStores extends BridgeStores>(): NativeBridge<TStores> {
132 |   const stores = new Map<keyof TStores, Store<TStores[keyof TStores]["state"], TStores[keyof TStores]["events"]>>();
133 |   const webViews = new Set<BridgeWebView>();
134 |   const readyWebViews = new Set<BridgeWebView>();
135 |   const readyStateListeners = new Map<BridgeWebView, Set<(isReady: boolean) => void>>();
136 |   const storeListeners = new Set<() => void>();
137 | 
138 |   const notifyStoreListeners = () => {
139 |     storeListeners.forEach(listener => listener());
140 |   };
141 | 
142 |   const notifyReadyStateListeners = (webView: BridgeWebView, isReady: boolean) => {
143 |     const listeners = readyStateListeners.get(webView);
144 |     if (listeners) {
145 |       listeners.forEach((listener) => listener(isReady));
146 |     }
147 |   };
148 | 
149 |   const broadcastToWebViews = (message: NativeToWebMessage<TStores>) => {
150 |     const messageString = JSON.stringify(message);
151 |     webViews.forEach((webView) => {
152 |       if (webView.postMessage) {
153 |          webView.postMessage(messageString);
154 |       } else {
155 |          console.warn("[Native Bridge] WebView instance lacks postMessage method.");
156 |       }
157 |     });
158 |   };
159 | 
160 |   const processWebViewMessage = (
161 |     data: string,
162 |     sourceWebView?: BridgeWebView
163 |   ): void => {
164 |     let parsedData: WebToNativeMessage;
165 |     try {
166 |       parsedData = JSON.parse(data);
167 |     } catch (e) {
168 |       console.warn("[Native Bridge] Failed to parse message:", data, e);
169 |       return;
170 |     }
171 | 
172 |     if (!parsedData || typeof parsedData !== 'object' || !('type' in parsedData)) {
173 |       console.warn("[Native Bridge] Invalid message format:", parsedData);
174 |       return;
175 |     }
176 | 
177 |     switch (parsedData.type) {
178 |       case "BRIDGE_READY": {
179 |         const targetWebViews = sourceWebView ? [sourceWebView] : Array.from(webViews);
180 |         targetWebViews.forEach(webView => {
181 |             if (!webView) return;
182 |             readyWebViews.add(webView);
183 |             notifyReadyStateListeners(webView, true);
184 |             stores.forEach((store, key) => {
185 |                 const initMessage = JSON.stringify({
186 |                     type: "STATE_INIT",
187 |                     storeKey: key,
188 |                     data: store.getSnapshot(),
189 |                 });
190 |                 if (webView.postMessage) webView.postMessage(initMessage);
191 |             });
192 |         });
193 |         break;
194 |       }
195 |       case "EVENT": {
196 |         const { storeKey, event } = parsedData;
197 |         const store = stores.get(storeKey as keyof TStores) as Store<any, typeof event> | undefined;
198 |         if (store) {
199 |           store.dispatch(event);
200 |         }
201 |         break;
202 |       }
203 |     }
204 |   };
205 | 
206 |   return {
207 |     isSupported: () => true,
208 | 
209 |     getStore: <K extends keyof TStores>(key: K) => {
210 |       return stores.get(key) as Store<TStores[K]["state"], TStores[K]["events"]> | undefined;
211 |     },
212 | 
213 |     setStore: <K extends keyof TStores>(
214 |       key: K,
215 |       store: Store<TStores[K]["state"], TStores[K]["events"]> | undefined
216 |     ) => {
217 |       if (store === undefined) {
218 |         stores.delete(key);
219 |       } else {
220 |         let prevState = store.getSnapshot();
221 |         stores.set(key, store as Store<any, any>);
222 | 
223 |         const initMessage = {
224 |           type: "STATE_INIT" as const,
225 |           storeKey: key,
226 |           data: store.getSnapshot(),
227 |         };
228 |         broadcastToWebViews(initMessage);
229 | 
230 |         store.subscribe((currentState: TStores[K]["state"]) => {
231 |           const operations = compare(prevState, currentState);
232 |           if (operations.length > 0) {
233 |             broadcastToWebViews({
234 |               type: "STATE_UPDATE",
235 |               storeKey: key,
236 |               operations,
237 |             });
238 |           }
239 |           prevState = currentState;
240 |         });
241 |       }
242 |       notifyStoreListeners();
243 |     },
244 | 
245 |     subscribe: (listener: () => void) => {
246 |       storeListeners.add(listener);
247 |       return () => {
248 |         storeListeners.delete(listener);
249 |       };
250 |     },
251 | 
252 |     handleWebMessage: (message: string | { nativeEvent: { data: string } }) => {
253 |       const messageData =
254 |         typeof message === "string" ? message : message.nativeEvent.data;
255 |       processWebViewMessage(messageData, undefined);
256 |     },
257 | 
258 |     registerWebView: (webView: BridgeWebView | null | undefined) => {
259 |       if (!webView) return () => {};
260 |       webViews.add(webView);
261 |       stores.forEach((store, key) => {
262 |          const initMessage = JSON.stringify({
263 |             type: "STATE_INIT",
264 |             storeKey: key,
265 |             data: store.getSnapshot(),
266 |          });
267 |          if (webView.postMessage) webView.postMessage(initMessage);
268 |       });
269 |       return () => {
270 |         webViews.delete(webView);
271 |         readyWebViews.delete(webView);
272 |         readyStateListeners.delete(webView);
273 |       };
274 |     },
275 | 
276 |     unregisterWebView: (webView: BridgeWebView | null | undefined) => {
277 |       if (!webView) return;
278 |       webViews.delete(webView);
279 |       readyWebViews.delete(webView);
280 |       readyStateListeners.delete(webView);
281 |     },
282 | 
283 |     subscribeToReadyState: (
284 |       webView: BridgeWebView | null | undefined,
285 |       callback: (isReady: boolean) => void
286 |     ) => {
287 |       if (!webView) {
288 |         callback(false);
289 |         return () => {};
290 |       }
291 |       let listeners = readyStateListeners.get(webView);
292 |       if (!listeners) {
293 |         listeners = new Set();
294 |         readyStateListeners.set(webView, listeners);
295 |       }
296 |       listeners.add(callback);
297 |       callback(readyWebViews.has(webView));
298 |       return () => {
299 |         const currentListeners = readyStateListeners.get(webView);
300 |         if (currentListeners) {
301 |           currentListeners.delete(callback);
302 |           if (currentListeners.size === 0) {
303 |             readyStateListeners.delete(webView);
304 |           }
305 |         }
306 |       };
307 |     },
308 | 
309 |     getReadyState: (webView: BridgeWebView | null | undefined) => {
310 |       if (!webView) return false;
311 |       return readyWebViews.has(webView);
312 |     },
313 |   };
314 | }
315 | 


--------------------------------------------------------------------------------
/packages/app-bridge-native/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "../../tsconfig.json",
 3 |   "compilerOptions": {
 4 |     "outDir": "./dist",
 5 |     "composite": true,
 6 |     "declarationMap": true,
 7 |     "jsx": "react"
 8 |   },
 9 |   "include": ["src"],
10 |   "references": [
11 |     { "path": "../app-bridge-types" }
12 |   ]
13 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-native/tsup.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from 'tsup';
 2 | 
 3 | export default defineConfig({
 4 |   entry: ['src/index.ts'],
 5 |   format: ['cjs', 'esm'],
 6 |   dts: { resolve: true },
 7 |   splitting: false,
 8 |   sourcemap: true,
 9 |   clean: true,
10 |   external: [
11 |     '@open-game-system/app-bridge-types',
12 |     'react-native',
13 |     'react-native-webview',
14 |     'immer',
15 |     'fast-json-patch',
16 |     'invariant'
17 |   ],
18 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-native/vitest.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from "vitest/config";
 2 | 
 3 | export default defineConfig({
 4 |   test: {
 5 |     environment: "jsdom",
 6 |     globals: true,
 7 |     include: ["src/**/*.test.{ts,tsx}"],
 8 |     coverage: {
 9 |       provider: "v8",
10 |       reporter: ["text", "json", "html"],
11 |     },
12 |   },
13 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/README.md:
--------------------------------------------------------------------------------
  1 | # @open-game-system/app-bridge-react-native
  2 | 
  3 | React Native specific hooks, components, and context utilities for the `@open-game-system/app-bridge` ecosystem.
  4 | 
  5 | ## Installation
  6 | 
  7 | ```bash
  8 | npm install @open-game-system/app-bridge-react-native
  9 | # or
 10 | yarn add @open-game-system/app-bridge-react-native
 11 | # or
 12 | pnpm add @open-game-system/app-bridge-react-native
 13 | ```
 14 | 
 15 | ## Features
 16 | 
 17 | - `BridgedWebView`: A WebView component that automatically handles bridge registration and message handling.
 18 | - `createNativeBridgeContext`: Creates a React Context setup for easy state management with the app-bridge.
 19 | 
 20 | ## Quick Start
 21 | 
 22 | ```tsx
 23 | import React from 'react';
 24 | import { View, Text } from 'react-native';
 25 | import {
 26 |   BridgedWebView,
 27 |   createNativeBridge,
 28 |   createNativeBridgeContext,
 29 |   createStore
 30 | } from '@open-game-system/app-bridge-react-native';
 31 | import type { AppStores } from './types';
 32 | 
 33 | // Create a bridge
 34 | const bridge = createNativeBridge<AppStores>();
 35 | 
 36 | // Create a counter store
 37 | const counterStore = createStore({
 38 |   initialState: { value: 0 },
 39 |   producer: (draft, event) => {
 40 |     switch (event.type) {
 41 |       case 'INCREMENT':
 42 |         draft.value += 1;
 43 |         break;
 44 |       case 'DECREMENT':
 45 |         draft.value -= 1;
 46 |         break;
 47 |     }
 48 |   }
 49 | });
 50 | 
 51 | // Register the store with the bridge
 52 | bridge.setStore('counter', counterStore);
 53 | 
 54 | // Create context
 55 | const BridgeContext = createNativeBridgeContext<AppStores>();
 56 | const CounterContext = BridgeContext.createStoreContext('counter');
 57 | 
 58 | // App component
 59 | function App() {
 60 |   return (
 61 |     <BridgeContext.Provider bridge={bridge}>
 62 |       <View style={{ flex: 1 }}>
 63 |         <Counter />
 64 |         <BridgedWebView
 65 |           bridge={bridge}
 66 |           source={{ uri: 'https://your-web-app.com' }}
 67 |           style={{ flex: 1 }}
 68 |         />
 69 |       </View>
 70 |     </BridgeContext.Provider>
 71 |   );
 72 | }
 73 | 
 74 | // Counter component
 75 | function Counter() {
 76 |   const count = CounterContext.useSelector(state => state.value);
 77 |   const store = CounterContext.useStore();
 78 |   
 79 |   return (
 80 |     <View>
 81 |       <Text>Count: {count}</Text>
 82 |       <Button 
 83 |         title="+" 
 84 |         onPress={() => store?.dispatch({ type: 'INCREMENT' })} 
 85 |       />
 86 |       <Button 
 87 |         title="-" 
 88 |         onPress={() => store?.dispatch({ type: 'DECREMENT' })} 
 89 |       />
 90 |     </View>
 91 |   );
 92 | }
 93 | ```
 94 | 
 95 | ## API Reference
 96 | 
 97 | ### Components
 98 | 
 99 | #### `BridgedWebView`
100 | 
101 | A wrapper around `WebView` from `react-native-webview` that automatically handles bridge registration and message handling.
102 | 
103 | ```tsx
104 | <BridgedWebView
105 |   bridge={bridge} // NativeBridge instance
106 |   onMessage={customHandler} // Optional: your own message handler
107 |   {...otherWebViewProps} // All other WebView props are passed through
108 | />
109 | ```
110 | 
111 | ### Hooks and Context
112 | 
113 | #### `createNativeBridgeContext<TStores>()`
114 | 
115 | Creates a context setup for the bridge with typed store access.
116 | 
117 | ```tsx
118 | const BridgeContext = createNativeBridgeContext<AppStores>();
119 | 
120 | // In your app
121 | <BridgeContext.Provider bridge={bridge}>
122 |   {/* Children with access to the bridge */}
123 | </BridgeContext.Provider>
124 | ```
125 | 
126 | #### Store Context
127 | 
128 | ```tsx
129 | const CounterContext = BridgeContext.createStoreContext('counter');
130 | 
131 | // Access the store
132 | const store = CounterContext.useStore();
133 | 
134 | // Select state with automatic updates
135 | const count = CounterContext.useSelector(state => state.value);
136 | ```
137 | 
138 | ## License
139 | 
140 | MIT 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/babel.config.js:
--------------------------------------------------------------------------------
1 | module.exports = function(api) {
2 |   api.cache(true);
3 |   return {
4 |     presets: ['babel-preset-expo'],
5 |     // Rely solely on babel-preset-expo, which includes react-native and typescript presets
6 |   };
7 | }; 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/jest.config.js:
--------------------------------------------------------------------------------
 1 | /** @type {import('jest').Config} */
 2 | module.exports = {
 3 |   preset: 'jest-expo', // Use the preset
 4 |   // testEnvironment is handled by the preset
 5 |   // transform is handled by the preset
 6 |   setupFilesAfterEnv: ['./src/test/setup.ts'], // Keep custom setup for webview mock
 7 |   transformIgnorePatterns: [
 8 |     // Try simpler pattern mentioned in nx issue #17589
 9 |     'node_modules/(?!react-native)/', 
10 |     'jest-runner'
11 |   ]
12 | }; 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@open-game-system/app-bridge-react-native",
 3 |   "version": "0.20250411.3",
 4 |   "description": "React Native specific hooks and components for @open-game-system/app-bridge",
 5 |   "main": "dist/index.js",
 6 |   "module": "dist/index.mjs",
 7 |   "types": "dist/index.d.ts",
 8 |   "scripts": {
 9 |     "build": "tsup",
10 |     "dev": "tsup --watch",
11 |     "clean": "rm -rf dist",
12 |     "typecheck": "tsc --noEmit",
13 |     "test": "jest",
14 |     "test:watch": "jest --watch",
15 |     "prepublishOnly": "node -e \"const fs=require('fs'); const pkgPath='./package.json'; const pkg=JSON.parse(fs.readFileSync(pkgPath)); const deps=pkg.dependencies||{}; const peerDeps=pkg.peerDependencies||{}; const devDeps=pkg.devDependencies||{}; const version='^'+pkg.version.split('-')[0]; /* Use major/minor/patch from current version */ const fix=(obj)=>(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v.startsWith('workspace:')?version:v]))); pkg.dependencies=fix(deps); pkg.peerDependencies=fix(peerDeps); pkg.devDependencies=fix(devDeps); fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\\n'); console.log('Replaced workspace:* versions in', pkgPath);\""
16 |   },
17 |   "peerDependencies": {
18 |     "@open-game-system/app-bridge-native": "workspace:*",
19 |     "@open-game-system/app-bridge-types": "workspace:*",
20 |     "react": ">=18.0.0",
21 |     "react-native": ">=0.60.0",
22 |     "react-native-webview": ">=11.0.0"
23 |   },
24 |   "devDependencies": {
25 |     "@babel/core": "^7.25.2",
26 |     "@babel/runtime": "^7.0.0",
27 |     "@open-game-system/app-bridge-testing": "^0.20250410.4",
28 |     "@testing-library/react-native": "^12.4.3",
29 |     "@types/jest": "^29.5.12",
30 |     "@types/react": "^18.2.55",
31 |     "@types/react-native": "^0.73.0",
32 |     "babel-jest": "^29.7.0",
33 |     "jest": "^29.7.0",
34 |     "jest-expo": "~52.0.3",
35 |     "react-test-renderer": "^18.2.0",
36 |     "tsup": "^8.0.2",
37 |     "typescript": "^5.3.3"
38 |   },
39 |   "publishConfig": {
40 |     "access": "public"
41 |   }
42 | }
43 | 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/src/__mocks__/react-native-webview.js:
--------------------------------------------------------------------------------
 1 | import React, { forwardRef, useImperativeHandle } from 'react';
 2 | 
 3 | // Import the actual (mocked by jest-expo) View
 4 | const View = require('react-native').View;
 5 | 
 6 | // Define the mock methods we need
 7 | const mockWebViewRefMethods = {
 8 |   reload: jest.fn(),
 9 |   postMessage: jest.fn(),
10 |   injectJavaScript: jest.fn(),
11 |   // Add other methods if your component uses them
12 | };
13 | 
14 | // Create the mock component using forwardRef
15 | const MockWebViewComponent = forwardRef((props, ref) => {
16 |   // Expose mock methods via useImperativeHandle
17 |   useImperativeHandle(ref, () => (mockWebViewRefMethods));
18 | 
19 |   // Simulate onLoadEnd or other events if needed by tests
20 |   // useEffect(() => {
21 |   //   props.onLoadEnd?.();
22 |   // }, [props.onLoadEnd]);
23 | 
24 |   // Render a simple View to act as the placeholder
25 |   return <View {...props} />; 
26 | });
27 | 
28 | // Export the component directly
29 | export const WebView = MockWebViewComponent;
30 | 
31 | // Optionally, attach mocks statically if needed for other types of assertions,
32 | // but rely on useImperativeHandle for ref testing.
33 | // Object.assign(WebView, mockWebViewRefMethods);
34 | 
35 | // Mock any other exports from the original module if necessary
36 | // export const otherExport = jest.fn(); 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/src/components/BridgedWebView.tsx:
--------------------------------------------------------------------------------
 1 | import React from 'react';
 2 | import { WebView, WebViewMessageEvent } from 'react-native-webview';
 3 | import type { WebViewProps } from 'react-native-webview';
 4 | import type { BridgeStores, NativeBridge } from '@open-game-system/app-bridge-types';
 5 | 
 6 | /**
 7 |  * Props for BridgedWebView component
 8 |  * Extends standard WebViewProps to allow passing any valid prop.
 9 |  */
10 | export interface BridgedWebViewProps<TStores extends BridgeStores>
11 |   extends Omit<WebViewProps, 'onMessage' | 'source' | 'ref'>
12 | {
13 |   /**
14 |    * The NativeBridge instance to use for communication
15 |    */
16 |   bridge: NativeBridge<TStores>;
17 |   
18 |   /**
19 |    * Optional custom message handler for WebView messages
20 |    * This will be called *after* the bridge processes the message
21 |    */
22 |   onMessage?: (event: WebViewMessageEvent) => void;
23 |   
24 |   /**
25 |    * The source of the WebView (required)
26 |    */
27 |   source: WebViewProps['source'];
28 | }
29 | 
30 | /**
31 |  * A WebView component that automatically handles bridge registration and message handling
32 |  */
33 | export function BridgedWebView<TStores extends BridgeStores>({
34 |   bridge,
35 |   onMessage,
36 |   source,
37 |   ...rest
38 | }: BridgedWebViewProps<TStores>) {
39 |   const webViewRef = React.useRef<WebView>(null);
40 | 
41 |   // Register/unregister WebView with the bridge
42 |   React.useEffect(() => {
43 |     if (webViewRef.current) {
44 |       bridge.registerWebView(webViewRef.current);
45 |     }
46 |   }, [bridge]);
47 | 
48 |   // Create a message handler that processes bridge messages and calls custom handler
49 |   const handleMessage = React.useCallback(
50 |     (event: WebViewMessageEvent) => {
51 |       // Handle bridge message processing
52 |       bridge.handleWebMessage(event.nativeEvent.data);
53 |       
54 |       // Call custom handler if provided
55 |       onMessage?.(event);
56 |     },
57 |     [bridge, onMessage]
58 |   );
59 | 
60 |   return (
61 |     <WebView
62 |       ref={webViewRef}
63 |       source={source}
64 |       onMessage={handleMessage}
65 |       {...rest}
66 |     />
67 |   );
68 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/src/components/__tests__/BridgedWebView.test.tsx:
--------------------------------------------------------------------------------
 1 | /// <reference types="jest" />
 2 | 
 3 | import React from 'react';
 4 | import { render, act, screen } from '@testing-library/react-native';
 5 | import { createMockBridge } from '@open-game-system/app-bridge-testing';
 6 | import { BridgedWebView } from '../BridgedWebView'; // Component under test
 7 | import type { BridgeStores } from '@open-game-system/app-bridge-types';
 8 | import type { NativeBridge } from '@open-game-system/app-bridge-types';
 9 | 
10 | // WebView is now manually mocked via __mocks__
11 | 
12 | // Define test-specific store types
13 | interface TestStores extends BridgeStores {
14 |   counter: {
15 |     state: { value: number };
16 |     events: { type: 'INCREMENT' } | { type: 'DECREMENT' };
17 |   };
18 | }
19 | 
20 | describe('BridgedWebView', () => {
21 |   let mockBridge: NativeBridge<TestStores>;
22 | 
23 |   // Helper to create a fully typed Native mock bridge
24 |   const createFullyMockedNativeBridge = () => {
25 |     const baseMock = createMockBridge<TestStores>();
26 |     return {
27 |       ...baseMock,
28 |       handleWebMessage: jest.fn(),
29 |       registerWebView: jest.fn(() => jest.fn()), // Returns unregister function
30 |       unregisterWebView: jest.fn(),
31 |       onWebViewReady: jest.fn(() => jest.fn()), // Returns unsubscribe function
32 |       setStore: jest.fn(), // Add setStore
33 |       isWebViewReady: jest.fn().mockReturnValue(true), // Mock ready state
34 |       subscribeToReadyState: jest.fn(() => jest.fn()), // Returns unsubscribe function
35 |       getReadyState: jest.fn().mockReturnValue(true), // Mock ready state
36 |     } as NativeBridge<TestStores>; // Cast to ensure type compatibility
37 |   }
38 | 
39 |   beforeEach(() => {
40 |     mockBridge = createFullyMockedNativeBridge();
41 |     // No need to clear WebView mock here, Jest handles manual mocks
42 |   });
43 | 
44 |   it('should render without crashing', () => {
45 |     const source = { uri: 'https://example.com' };
46 |     // Check rendering doesn't throw
47 |     expect(() => {
48 |       render(
49 |         <BridgedWebView bridge={mockBridge} source={source} testID="test-webview" /> // Add testID
50 |       );
51 |     }).not.toThrow(); 
52 |     // Check that the mock (which renders a View/Text) is present
53 |     expect(screen.getByTestId("test-webview")).toBeTruthy();
54 |   });
55 | 
56 |   it('should call bridge.registerWebView on mount', () => {
57 |     const source = { uri: 'https://example.com' };
58 |     render(<BridgedWebView bridge={mockBridge} source={source} />);
59 |     // This assertion remains the same
60 |     expect(mockBridge.registerWebView).toHaveBeenCalledTimes(1);
61 |     expect(mockBridge.registerWebView).toHaveBeenCalledWith(expect.anything()); 
62 |   });
63 | 
64 |   it('should call bridge.handleWebMessage and props.onMessage when receiving a message', () => {
65 |     const source = { uri: 'https://example.com' };
66 |     const mockTestMessageData = 'test message';
67 |     const mockOnMessageProp = jest.fn();
68 | 
69 |     render(
70 |       <BridgedWebView
71 |         bridge={mockBridge}
72 |         source={source}
73 |         onMessage={mockOnMessageProp}
74 |         testID="test-webview" // Add testID to find the mock
75 |       />
76 |     );
77 | 
78 |     // Find the mocked WebView component instance via testID
79 |     const mockWebViewInstance = screen.getByTestId('test-webview');
80 |     expect(mockWebViewInstance).toBeTruthy();
81 |     expect(mockWebViewInstance.props.onMessage).toBeInstanceOf(Function);
82 | 
83 |     // Simulate message event by calling the onMessage prop on the instance
84 |     const nativeEvent = { data: mockTestMessageData };
85 |     act(() => {
86 |       mockWebViewInstance.props.onMessage({ nativeEvent });
87 |     });
88 | 
89 |     // Check bridge interaction
90 |     expect(mockBridge.handleWebMessage).toHaveBeenCalledTimes(1);
91 |     expect(mockBridge.handleWebMessage).toHaveBeenCalledWith(mockTestMessageData);
92 |     
93 |     // Check prop callback interaction
94 |     expect(mockOnMessageProp).toHaveBeenCalledTimes(1);
95 |     expect(mockOnMessageProp).toHaveBeenCalledWith({ nativeEvent });
96 |   });
97 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/src/context/__tests__/createNativeBridgeContext.test.tsx:
--------------------------------------------------------------------------------
  1 | /// <reference types="jest" />
  2 | 
  3 | import React from 'react';
  4 | import { renderHook } from '@testing-library/react-native';
  5 | import { createMockBridge } from '@open-game-system/app-bridge-testing';
  6 | import type { BridgeStores, NativeBridge } from '@open-game-system/app-bridge-types';
  7 | import { createNativeBridgeContext } from '../createNativeBridgeContext';
  8 | 
  9 | // Define test-specific store types
 10 | interface TestStores extends BridgeStores {
 11 |   counter: {
 12 |     state: { value: number };
 13 |     events: { type: 'INCREMENT' } | { type: 'DECREMENT' };
 14 |   };
 15 | }
 16 | 
 17 | // Helper to create a fully typed Native mock bridge
 18 | const createFullyMockedNativeBridge = () => {
 19 |   const baseMock = createMockBridge<TestStores>();
 20 |   return {
 21 |     ...baseMock,
 22 |     handleWebMessage: jest.fn(),
 23 |     registerWebView: jest.fn(() => jest.fn()), // Returns unregister function
 24 |     unregisterWebView: jest.fn(),
 25 |     onWebViewReady: jest.fn(() => jest.fn()), // Returns unsubscribe function
 26 |     setStore: jest.fn(), // Add setStore
 27 |     isWebViewReady: jest.fn().mockReturnValue(true), // Mock ready state
 28 |   } as NativeBridge<TestStores>; // Cast to ensure type compatibility
 29 | }
 30 | 
 31 | describe('createNativeBridgeContext', () => {
 32 |   it('should create a bridge context with hooks', () => {
 33 |     const { BridgeProvider, useBridge, createNativeStoreContext } = createNativeBridgeContext<TestStores>();
 34 |     expect(BridgeProvider).toBeDefined();
 35 |     expect(useBridge).toBeDefined();
 36 |     expect(createNativeStoreContext).toBeDefined();
 37 |   });
 38 | 
 39 |   it('should access the bridge through context', () => {
 40 |     const mockBridge = createFullyMockedNativeBridge(); // Use helper
 41 |     const { BridgeProvider, useBridge } = createNativeBridgeContext<TestStores>();
 42 | 
 43 |     const { result } = renderHook(() => useBridge(), {
 44 |       wrapper: ({ children }: { children: React.ReactNode }) => (
 45 |         <BridgeProvider bridge={mockBridge}>{children}</BridgeProvider>
 46 |       ),
 47 |     });
 48 | 
 49 |     expect(result.current).toBe(mockBridge);
 50 |   });
 51 | 
 52 |   it('should access store state through context', () => {
 53 |     const mockBridge = createFullyMockedNativeBridge(); // Use helper
 54 |     const mockStore = {
 55 |       getSnapshot: jest.fn(() => ({ value: 42 })), // Provide initial state
 56 |       subscribe: jest.fn(() => () => {}), // Return an unsubscribe function
 57 |       dispatch: jest.fn(),
 58 |     };
 59 |     // Override the helper's getStore for this specific test
 60 |     mockBridge.getStore = jest.fn().mockReturnValue(mockStore);
 61 | 
 62 |     const { BridgeProvider, createNativeStoreContext } = createNativeBridgeContext<TestStores>();
 63 |     const { StoreProvider: CounterStoreProvider, useSelector } = createNativeStoreContext('counter'); 
 64 | 
 65 |     const { result } = renderHook(
 66 |       () => useSelector((state) => state.value),
 67 |       {
 68 |         wrapper: ({ children }: { children: React.ReactNode }) => (
 69 |           <BridgeProvider bridge={mockBridge}>
 70 |             <CounterStoreProvider>{children}</CounterStoreProvider>
 71 |           </BridgeProvider>
 72 |         ),
 73 |       }
 74 |     );
 75 | 
 76 |     expect(result.current).toBe(42); // Check if the selector gets the value
 77 |     expect(mockBridge.getStore).toHaveBeenCalledWith('counter');
 78 |     expect(mockStore.subscribe).toHaveBeenCalled(); // Ensure subscription happened
 79 |   });
 80 | 
 81 |   it('should throw error when hooks are used outside Provider', () => {
 82 |     const { useBridge, createNativeStoreContext } = createNativeBridgeContext<TestStores>();
 83 |     const { useStore, useSelector } = createNativeStoreContext('counter');
 84 | 
 85 |     // Test useBridge
 86 |     const { result: bridgeResult } = renderHook(() => {
 87 |       try { useBridge(); return null; } catch (e) { return e; }
 88 |     });
 89 |     expect(bridgeResult.current).toBeInstanceOf(Error);
 90 |     expect((bridgeResult.current as Error).message).toBe('useBridge must be used within a BridgeProvider');
 91 | 
 92 |     // Test useStore
 93 |     const { result: storeResult } = renderHook(() => {
 94 |       try { useStore(); return null; } catch (e) { return e; }
 95 |     });
 96 |     expect(storeResult.current).toBeInstanceOf(Error);
 97 |     expect((storeResult.current as Error).message).toMatch(/must be used within its StoreProvider/);
 98 | 
 99 |     // Test useSelector
100 |     const { result: selectorResult } = renderHook(() => {
101 |       try { useSelector(s => s.value); return null; } catch (e) { return e; }
102 |     });
103 |     expect(selectorResult.current).toBeInstanceOf(Error);
104 |     expect((selectorResult.current as Error).message).toMatch(/must be used within its StoreProvider/);
105 |   });
106 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/src/context/createNativeBridgeContext.tsx:
--------------------------------------------------------------------------------
  1 | import React, { createContext, useContext, useMemo, useCallback, useSyncExternalStore, useRef } from 'react';
  2 | import type { BridgeStores, NativeBridge, Store, State } from '@open-game-system/app-bridge-types';
  3 | 
  4 | export interface BridgeProviderProps<TStores extends BridgeStores> {
  5 |   bridge: NativeBridge<TStores>;
  6 |   children: React.ReactNode;
  7 | }
  8 | 
  9 | export function createNativeBridgeContext<TStores extends BridgeStores>() {
 10 |   // Context for the NativeBridge instance itself
 11 |   const NativeBridgeContext = createContext<NativeBridge<TStores> | null>(null);
 12 | 
 13 |   /**
 14 |    * Provider component that makes the native bridge instance available via context.
 15 |    */
 16 |   function BridgeProvider({ bridge, children }: BridgeProviderProps<TStores>) {
 17 |     // Memoize the value to prevent unnecessary re-renders
 18 |     const value = useMemo(() => bridge, [bridge]);
 19 |     return (
 20 |       <NativeBridgeContext.Provider value={value}>
 21 |         {children}
 22 |       </NativeBridgeContext.Provider>
 23 |     );
 24 |   }
 25 | 
 26 |   /**
 27 |    * Hook to access the native bridge instance.
 28 |    * Must be used within a BridgeProvider.
 29 |    */
 30 |   function useBridge(): NativeBridge<TStores> {
 31 |     const bridge = useContext(NativeBridgeContext);
 32 |     if (!bridge) {
 33 |       throw new Error('useBridge must be used within a BridgeProvider');
 34 |     }
 35 |     return bridge;
 36 |   }
 37 | 
 38 |   /**
 39 |    * Creates hooks for accessing a specific store registered on the native bridge.
 40 |    * @param storeName The key of the store.
 41 |    * @returns An object containing `useStore` and `useSelector` hooks for the specified store.
 42 |    */
 43 |   function createNativeStoreContext<TStoreName extends keyof TStores>(
 44 |     storeName: TStoreName
 45 |   ) {
 46 |     type CurrentStore = Store<TStores[TStoreName]['state'], TStores[TStoreName]['events']>;
 47 |     type CurrentState = TStores[TStoreName]['state'];
 48 | 
 49 |     // Create a context specific to this store instance
 50 |     const StoreContext = createContext<CurrentStore | null>(null);
 51 |     StoreContext.displayName = `StoreContext<${String(storeName)}>`;
 52 | 
 53 |     /**
 54 |      * Provider that subscribes to store availability on the bridge.
 55 |      * Renders children and provides the store context only when the store exists.
 56 |      */
 57 |     function StoreProvider({ children }: { children: React.ReactNode }) {
 58 |       const bridge = useBridge();
 59 | 
 60 |       // Subscribe to general bridge changes (including store registration/unregistration)
 61 |       const subscribe = useCallback(
 62 |         (callback: () => void) => {
 63 |           return bridge.subscribe(callback); 
 64 |         },
 65 |         [bridge]
 66 |       );
 67 | 
 68 |       // Get the current store instance (or null if not registered)
 69 |       const getStoreInstance = useCallback(() => {
 70 |         return bridge.getStore(storeName) ?? null;
 71 |       }, [bridge]);
 72 | 
 73 |       // Use useSyncExternalStore to get the store instance reactively
 74 |       const store = useSyncExternalStore(
 75 |         subscribe,
 76 |         getStoreInstance,
 77 |         getStoreInstance // Assume server snapshot is same as client for native
 78 |       );
 79 | 
 80 |       // Only render children and provide context if the store currently exists
 81 |       if (!store) {
 82 |         return null; 
 83 |       }
 84 | 
 85 |       return (
 86 |         <StoreContext.Provider value={store}>
 87 |           {children}
 88 |         </StoreContext.Provider>
 89 |       );
 90 |     }
 91 |     StoreProvider.displayName = `StoreProvider<${String(storeName)}>`;
 92 | 
 93 |     /**
 94 |      * Hook to access the specific store instance from context.
 95 |      * Must be used within the corresponding StoreProvider.
 96 |      */
 97 |     function useStore(): CurrentStore {
 98 |       const store = useContext(StoreContext);
 99 |       if (!store) {
100 |         throw new Error(`useStore for '${String(storeName)}' must be used within its StoreProvider, and the store must be registered.`);
101 |       }
102 |       return store;
103 |     }
104 | 
105 |     // Default comparison function
106 |     function defaultCompare<T>(a: T, b: T) {
107 |       return a === b;
108 |     }
109 | 
110 |     /**
111 |      * Hook to select data from the store and subscribe to updates.
112 |      * Must be used within the corresponding StoreProvider.
113 |      * @param selector Function to select data from the store state.
114 |      */
115 |     function useSelector<TSelected>(
116 |       selector: (state: CurrentState) => TSelected,
117 |       // Optional comparison function
118 |       isEqual: (a: TSelected, b: TSelected) => boolean = defaultCompare
119 |     ): TSelected {
120 |       const store = useStore(); // Gets store from context, ensuring StoreProvider is used and store exists
121 |       
122 |       // Keep track of the last snapshot and selection
123 |       const lastSnapshotRef = useRef<CurrentState | null>(null);
124 |       const lastSelectionRef = useRef<TSelected | null>(null);
125 | 
126 |       const subscribeToStore = useCallback(
127 |         (onStoreChange: () => void) => {
128 |           return store.subscribe(onStoreChange);
129 |         },
130 |         [store]
131 |       );
132 | 
133 |       // This function now acts like the `getSelection` in the example
134 |       const getSelectionFromSnapshot = useCallback(() => {
135 |         const nextSnapshot = store.getSnapshot();
136 |         
137 |         // If snapshot hasn't changed, reuse last selection
138 |         if (lastSnapshotRef.current !== null && nextSnapshot === lastSnapshotRef.current) {
139 |           // Ensure lastSelectionRef.current is not null before returning
140 |           if (lastSelectionRef.current !== null) {
141 |              return lastSelectionRef.current;
142 |           }
143 |           // If lastSelectionRef is null but snapshot is same, recalculate (should be rare)
144 |         }
145 |         
146 |         // Snapshot changed or first run, calculate new selection
147 |         const nextSelection = selector(nextSnapshot);
148 | 
149 |         // If we have a previous selection and it's equal to the next selection, return the previous reference
150 |         if (lastSelectionRef.current !== null && isEqual(lastSelectionRef.current, nextSelection)) {
151 |           return lastSelectionRef.current;
152 |         }
153 | 
154 |         // Otherwise store and return the new selection and snapshot
155 |         lastSnapshotRef.current = nextSnapshot;
156 |         lastSelectionRef.current = nextSelection;
157 |         return nextSelection;
158 |       }, [store, selector, isEqual]); // Include isEqual in dependencies
159 |       
160 |       // Server snapshot simply applies the selector to the initial/server state
161 |       const getServerSnapshot = useCallback(() => {
162 |           return selector(store.getSnapshot());
163 |       }, [store, selector]);
164 | 
165 |       // Use the enhanced getter function with useSyncExternalStore
166 |       return useSyncExternalStore(
167 |         subscribeToStore,
168 |         getSelectionFromSnapshot,
169 |         getServerSnapshot 
170 |       );
171 |     }
172 | 
173 |     return {
174 |       StoreProvider, // Export the provider
175 |       useSelector,
176 |       useStore,
177 |     };
178 |   }
179 | 
180 |   return {
181 |     BridgeProvider,
182 |     useBridge,
183 |     createNativeStoreContext,
184 |   };
185 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/src/index.ts:
--------------------------------------------------------------------------------
 1 | // Re-export types from app-bridge-types
 2 | export type {
 3 |   BridgeStores,
 4 |   State,
 5 |   Event,
 6 |   Store,
 7 |   NativeBridge
 8 | } from '@open-game-system/app-bridge-types';
 9 | 
10 | // Export components
11 | export { BridgedWebView } from './components/BridgedWebView';
12 | 
13 | // Export context creator
14 | export { createNativeBridgeContext } from './context/createNativeBridgeContext';
15 | 
16 | // Re-export from app-bridge-native for convenience
17 | export { createNativeBridge, createStore } from '@open-game-system/app-bridge-native'; 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/src/test/setup.ts:
--------------------------------------------------------------------------------
 1 | /// <reference types="jest" />
 2 | 
 3 | import '@testing-library/react-native';
 4 | import '@testing-library/jest-dom';
 5 | 
 6 | // --- Global Mocks ---
 7 | 
 8 | // Core React Native mocks are now handled by the `jest-expo` preset
 9 | 
10 | // react-native-webview is now handled by the manual mock in src/__mocks__
11 | // jest.mock('react-native-webview', () => {
12 | //   const React = require('react');
13 | // 
14 | //   // Minimal forwardRef component that accepts ref and renders null
15 | //   const MockWebViewComponent = React.forwardRef((_props: any, ref: any) => {
16 | //     // Provide the expected imperative handle methods
17 | //     React.useImperativeHandle(ref, () => ({
18 | //       postMessage: jest.fn(),
19 | //       injectJavaScript: jest.fn(),
20 | //       reload: jest.fn(), 
21 | //     }));
22 | //     // Render null to be absolutely minimal
23 | //     return null; 
24 | //   });
25 | // 
26 | //   // Create the mock function wrapping the minimal component
27 | //   const MockWebView = jest.fn().mockImplementation(MockWebViewComponent);
28 | // 
29 | //   return { WebView: MockWebView };
30 | // });
31 | 
32 | // Mock ErrorUtils globally (Keep for now)
33 | (globalThis as any).ErrorUtils = {
34 |   setGlobalHandler: jest.fn(),
35 |   getGlobalHandler: jest.fn(),
36 | };
37 | 
38 | // Suppress specific console warnings (Keep for now)
39 | const originalWarn = console.warn;
40 | console.warn = (...args: any[]) => {
41 |   const warningsToSuppress = [
42 |     'Animated: `useNativeDriver`',
43 |     'Warning: componentWillReceiveProps',
44 |     'Warning: componentWillMount',
45 |     // Suppress the ref warning if it persists, though ideally forwardRef fixes it
46 |     // 'Warning: Function components cannot be given refs', 
47 |   ];
48 |   const shouldSuppress = warningsToSuppress.some(warning =>
49 |     args[0]?.includes?.(warning)
50 |   );
51 |   if (!shouldSuppress) {
52 |     originalWarn.apply(console, args);
53 |   }
54 | }; 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "../../tsconfig.json",
 3 |   "compilerOptions": {
 4 |     "outDir": "./dist",
 5 |     "composite": true,
 6 |     "declarationMap": true,
 7 |     "jsx": "react-native",
 8 |     "lib": ["ESNext"],
 9 |     "moduleResolution": "node",
10 |     "paths": {
11 |       "@open-game-system/app-bridge-types": ["../app-bridge-types/src"],
12 |       "@open-game-system/app-bridge-native": ["../app-bridge-native/src"]
13 |     }
14 |   },
15 |   "include": ["src"],
16 |   "exclude": ["node_modules", "dist"],
17 |   "references": [
18 |     { "path": "../app-bridge-types" },
19 |     { "path": "../app-bridge-native" },
20 |     { "path": "../app-bridge-testing" }
21 |   ]
22 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-react-native/tsup.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from 'tsup';
 2 | 
 3 | export default defineConfig({
 4 |   entry: ['src/index.ts'],
 5 |   format: ['cjs', 'esm'],
 6 |   dts: {
 7 |     resolve: true,
 8 |     compilerOptions: {
 9 |       composite: false,
10 |       moduleResolution: "node"
11 |     }
12 |   },
13 |   splitting: false,
14 |   sourcemap: true,
15 |   clean: true,
16 |   external: [
17 |     '@open-game-system/app-bridge-types',
18 |     '@open-game-system/app-bridge-native',
19 |     'react',
20 |     'react-native',
21 |     'react-native-webview'
22 |   ]
23 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-react/README.md:
--------------------------------------------------------------------------------
  1 | # @open-game-system/app-bridge-react
  2 | 
  3 | React hooks and components designed for integrating the `@open-game-system/app-bridge-web` package into standard web React applications.
  4 | 
  5 | ## Installation
  6 | 
  7 | ```bash
  8 | npm install @open-game-system/app-bridge-react
  9 | # or
 10 | yarn add @open-game-system/app-bridge-react
 11 | # or
 12 | pnpm add @open-game-system/app-bridge-react
 13 | ```
 14 | 
 15 | ## API Reference
 16 | 
 17 | ### createBridgeContext
 18 | 
 19 | ```typescript
 20 | /**
 21 |  * Creates a context and hooks for interacting with the bridge
 22 |  * @template TStores Store definitions for the bridge
 23 |  * @returns A set of components and hooks for interacting with the bridge
 24 |  */
 25 | export function createBridgeContext<TStores extends BridgeStores>(): {
 26 |   /**
 27 |    * Provider component that makes the bridge available to child components
 28 |    */
 29 |   Provider: React.FC<{
 30 |     children: ReactNode;
 31 |     bridge: Bridge<TStores>;
 32 |   }>;
 33 | 
 34 |   /**
 35 |    * Creates a set of hooks and components for interacting with a specific store
 36 |    * @param storeKey The key of the store to interact with
 37 |    * @returns A set of hooks and components for the specific store
 38 |    */
 39 |   createStoreContext: <K extends keyof TStores>(storeKey: K) => {
 40 |     /**
 41 |      * Provider component that automatically subscribes to store availability
 42 |      * and provides the store when it becomes available
 43 |      */
 44 |     Provider: React.FC<{ children: ReactNode }>;
 45 | 
 46 |     /**
 47 |      * Loading component that renders children only when the bridge is supported
 48 |      * but the store is not yet available
 49 |      */
 50 |     Loading: React.FC<{ children: ReactNode }>;
 51 | 
 52 |     /**
 53 |      * Hook to access the store
 54 |      * Must be used inside a Store.Provider component
 55 |      */
 56 |     useStore: () => Store<TStores[K]["state"], TStores[K]["events"]>;
 57 | 
 58 |     /**
 59 |      * Hook to select data from the store
 60 |      * Must be used inside a Store.Provider component
 61 |      */
 62 |     useSelector: <T>(selector: (state: TStores[K]["state"]) => T) => T;
 63 |   };
 64 | 
 65 |   /**
 66 |    * Renders children only when the bridge is supported
 67 |    */
 68 |   Supported: React.FC<{ children: ReactNode }>;
 69 | 
 70 |   /**
 71 |    * Renders children only when the bridge is not supported
 72 |    */
 73 |   Unsupported: React.FC<{ children: ReactNode }>;
 74 | };
 75 | ```
 76 | 
 77 | ## Usage
 78 | 
 79 | ```typescript
 80 | import { createBridgeContext } from '@open-game-system/app-bridge-react';
 81 | import type { AppStores } from './types';
 82 | 
 83 | // Create the bridge context
 84 | const { Provider, createStoreContext, Supported, Unsupported } = createBridgeContext<AppStores>();
 85 | 
 86 | // Create a store context for the counter store
 87 | const { Provider: CounterProvider, Loading: CounterLoading, useStore: useCounterStore, useSelector: useCounterSelector } = createStoreContext('counter');
 88 | 
 89 | // Use in your app
 90 | function App() {
 91 |   return (
 92 |     <Provider bridge={bridge}>
 93 |       <Supported>
 94 |         <CounterProvider>
 95 |           <Counter>
 96 |             <CounterLoading>
 97 |               <div>Loading counter...</div>
 98 |             </CounterLoading>
 99 |           </Counter>
100 |         </CounterProvider>
101 |       </Supported>
102 |       <Unsupported>
103 |         <div>Bridge not supported in this environment</div>
104 |       </Unsupported>
105 |     </Provider>
106 |   );
107 | }
108 | 
109 | function Counter() {
110 |   // Get the store directly
111 |   const counterStore = useCounterStore();
112 |   
113 |   // Or use a selector to get specific state
114 |   const value = useCounterSelector(state => state.value);
115 |   
116 |   return (
117 |     <div>
118 |       <p>Counter value: {value}</p>
119 |       <button onClick={() => counterStore.dispatch({ type: "INCREMENT" })}>
120 |         Increment
121 |       </button>
122 |     </div>
123 |   );
124 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-react/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@open-game-system/app-bridge-react",
 3 |   "version": "0.20250411.3",
 4 |   "description": "React hooks and components for the app-bridge ecosystem",
 5 |   "main": "./dist/index.js",
 6 |   "module": "./dist/index.mjs",
 7 |   "types": "./dist/index.d.ts",
 8 |   "sideEffects": false,
 9 |   "files": [
10 |     "dist",
11 |     "README.md",
12 |     "LICENSE"
13 |   ],
14 |   "scripts": {
15 |     "build": "tsup --config tsup.config.ts",
16 |     "dev": "tsup --config tsup.config.ts --watch",
17 |     "clean": "rimraf dist",
18 |     "typecheck": "tsc --noEmit",
19 |     "test": "vitest run",
20 |     "test:watch": "vitest",
21 |     "test:coverage": "vitest run --coverage",
22 |     "prepublishOnly": "node -e \"const fs=require('fs'); const pkgPath='./package.json'; const pkg=JSON.parse(fs.readFileSync(pkgPath)); const deps=pkg.dependencies||{}; const peerDeps=pkg.peerDependencies||{}; const devDeps=pkg.devDependencies||{}; const version='^'+pkg.version.split('-')[0]; /* Use major/minor/patch from current version */ const fix=(obj)=>(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v.startsWith('workspace:')?version:v]))); pkg.dependencies=fix(deps); pkg.peerDependencies=fix(peerDeps); pkg.devDependencies=fix(devDeps); fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\\n'); console.log('Replaced workspace:* versions in', pkgPath);\""
23 |   },
24 |   "dependencies": {
25 |     "@open-game-system/app-bridge-types": "workspace:*",
26 |     "@open-game-system/app-bridge-web": "workspace:*"
27 |   },
28 |   "peerDependencies": {
29 |     "react": "^18.2.0",
30 |     "typescript": ">=4.5.0"
31 |   },
32 |   "devDependencies": {
33 |     "@testing-library/jest-dom": "^6.1.0",
34 |     "@testing-library/react": "^14.1.0",
35 |     "@types/react": "^18.2.0",
36 |     "@types/react-dom": "^18.2.0",
37 |     "@vitest/coverage-v8": "^1.2.2",
38 |     "jsdom": "^24.0.0",
39 |     "tsup": "^8.0.1",
40 |     "typescript": "^5.3.3",
41 |     "rimraf": "^5.0.5",
42 |     "vitest": "^1.2.2",
43 |     "react": "^18.2.0",
44 |     "react-dom": "^18.2.0"
45 |   },
46 |   "publishConfig": {
47 |     "access": "public"
48 |   },
49 |   "keywords": [
50 |     "typescript",
51 |     "react",
52 |     "app-bridge",
53 |     "hooks"
54 |   ],
55 |   "author": "OpenGameSystem",
56 |   "license": "MIT"
57 | }
58 | 


--------------------------------------------------------------------------------
/packages/app-bridge-react/src/index.tsx:
--------------------------------------------------------------------------------
  1 | import {
  2 |   createContext,
  3 |   memo,
  4 |   type ReactNode,
  5 |   useCallback,
  6 |   useContext,
  7 |   useMemo,
  8 |   useSyncExternalStore,
  9 | } from "react";
 10 | import type {
 11 |   BridgeStores,
 12 |   Store,
 13 |   Bridge,
 14 | } from "@open-game-system/app-bridge-types";
 15 | 
 16 | interface BridgeContextValue<TStores extends BridgeStores> {
 17 |   bridge: Bridge<TStores>;
 18 | }
 19 | 
 20 | export function createBridgeContext<TStores extends BridgeStores>() {
 21 |   // Create a dummy bridge that throws on any method call
 22 |   const throwBridge = new Proxy({} as Bridge<TStores>, {
 23 |     get() {
 24 |       throw new Error(
 25 |         "Bridge not found in context. Did you forget to wrap your app in <BridgeContext.Provider bridge={...}>?"
 26 |       );
 27 |     },
 28 |   });
 29 | 
 30 |   const BridgeContext = createContext<BridgeContextValue<TStores>>({
 31 |     bridge: throwBridge,
 32 |   });
 33 | 
 34 |   const Provider = memo(
 35 |     ({
 36 |       children,
 37 |       bridge,
 38 |     }: {
 39 |       children: ReactNode;
 40 |       bridge: Bridge<TStores>;
 41 |     }) => {
 42 |       const value = useMemo(() => ({ bridge }), [bridge]);
 43 | 
 44 |       return (
 45 |         <BridgeContext.Provider value={value}>
 46 |           {children}
 47 |         </BridgeContext.Provider>
 48 |       );
 49 |     }
 50 |   );
 51 |   Provider.displayName = "BridgeProvider";
 52 | 
 53 |   /**
 54 |    * Internal hook to access the bridge instance
 55 |    * @returns The bridge instance
 56 |    * @internal
 57 |    */
 58 |   function useBridge(): Bridge<TStores> {
 59 |     const context = useContext(BridgeContext);
 60 |     return context.bridge;
 61 |   }
 62 | 
 63 |   /**
 64 |    * Create a set of hooks and components for interacting with a specific store
 65 |    * @param storeKey The key of the store to interact with
 66 |    * @returns A set of hooks and components for the specific store
 67 |    */
 68 |   function createStoreContext<K extends keyof TStores>(storeKey: K) {
 69 |     type StoreType = Store<TStores[K]["state"], TStores[K]["events"]>;
 70 |     type StoreState = TStores[K]["state"];
 71 |     
 72 |     // Create a dummy store that throws on any method call
 73 |     const throwStore = new Proxy({} as StoreType, {
 74 |       get() {
 75 |         throw new Error(
 76 |           `Store "${String(storeKey)}" is not available. Make sure to use the store hooks inside a StoreContext.Provider.`
 77 |         );
 78 |       },
 79 |     });
 80 |     
 81 |     // Create a context with a throw store as default - this ensures type safety
 82 |     // while still throwing helpful errors when accessed outside a provider
 83 |     const StoreContext = createContext<StoreType>(throwStore);
 84 |     StoreContext.displayName = `Store<${String(storeKey)}>`;
 85 | 
 86 |     /**
 87 |      * Provider component that automatically subscribes to store availability 
 88 |      * and provides the store when it becomes available
 89 |      */
 90 |     const Provider = memo(({ children }: { children: ReactNode }) => {
 91 |       const bridge = useBridge();
 92 |       
 93 |       // Subscribe to store availability
 94 |       const getStore = useCallback(() => {
 95 |         return bridge.getStore(storeKey) || null;
 96 |       }, [bridge]);
 97 |       
 98 |       // Subscribe to changes in store availability
 99 |       const subscribe = useCallback((callback: () => void) => {
100 |         return bridge.subscribe(callback);
101 |       }, [bridge]);
102 |       
103 |       // Use sync external store to track store availability
104 |       const store = useSyncExternalStore(
105 |         subscribe,
106 |         getStore,
107 |         getStore // Same for server
108 |       );
109 |       
110 |       // Only render children if store is available
111 |       if (!store) return null;
112 |       
113 |       return (
114 |         <StoreContext.Provider value={store}>
115 |           {children}
116 |         </StoreContext.Provider>
117 |       );
118 |     });
119 |     Provider.displayName = `Store.Provider<${String(storeKey)}>`;
120 | 
121 |     /**
122 |      * Loading component that renders children only when the bridge is supported 
123 |      * but the store is not yet available
124 |      */
125 |     const Loading = memo(({ children }: { children: ReactNode }) => {
126 |       const bridge = useBridge();
127 |       
128 |       // Check if bridge is supported - this is a static property that won't change
129 |       const isSupported = bridge.isSupported();
130 |       
131 |       // Subscribe to store availability
132 |       const getStoreAvailability = useCallback(() => {
133 |         return bridge.getStore(storeKey);
134 |       }, [bridge]);
135 |       
136 |       // Subscribe to changes in store availability
137 |       const subscribe = useCallback((callback: () => void) => {
138 |         return bridge.subscribe(callback);
139 |       }, [bridge]);
140 |       
141 |       // Use sync external store to track store availability
142 |       const store = useSyncExternalStore(
143 |         subscribe,
144 |         getStoreAvailability,
145 |         getStoreAvailability // Same for server
146 |       );
147 |       
148 |       // Only render children if bridge is supported but store is not available
149 |       return isSupported && !store ? <>{children}</> : null;
150 |     });
151 |     Loading.displayName = `Store.Loading<${String(storeKey)}>`;
152 | 
153 |     /**
154 |      * Hook to access the store.
155 |      * Must be used inside a Store.Provider component.
156 |      * @throws Error if used outside of Store.Provider
157 |      * @returns The store instance
158 |      */
159 |     function useStore(): StoreType {
160 |       return useContext(StoreContext);
161 |     }
162 | 
163 |     /**
164 |      * Hook to select data from the store.
165 |      * Must be used inside a Store.Provider component.
166 |      * @param selector Function to select data from the store state
167 |      * @returns The selected data from the store
168 |      * @throws Error if used outside of Store.Provider
169 |      */
170 |     function useSelector<T>(selector: (state: StoreState) => T): T {
171 |       const store = useStore();
172 |       const memoizedSelector = useMemo(() => selector, [selector]);
173 |       
174 |       return useSyncExternalStore(
175 |         store.subscribe,
176 |         () => memoizedSelector(store.getSnapshot()),
177 |         () => memoizedSelector(store.getSnapshot()) // Same for server
178 |       );
179 |     }
180 | 
181 |     return {
182 |       Provider,
183 |       Loading,
184 |       useStore,
185 |       useSelector,
186 |     };
187 |   }
188 | 
189 |   /**
190 |    * Renders children only when the bridge is supported
191 |    */
192 |   const Supported = memo(({ children }: { children: ReactNode }) => {
193 |     const bridge = useBridge();
194 |     const isSupported = bridge.isSupported();
195 |     return isSupported ? <>{children}</> : null;
196 |   });
197 |   Supported.displayName = "BridgeSupported";
198 | 
199 |   /**
200 |    * Renders children only when the bridge is not supported
201 |    */
202 |   const Unsupported = memo(({ children }: { children: ReactNode }) => {
203 |     const bridge = useBridge();
204 |     const isSupported = bridge.isSupported();
205 |     return !isSupported ? <>{children}</> : null;
206 |   });
207 |   Unsupported.displayName = "BridgeUnsupported";
208 | 
209 |   return {
210 |     Provider,
211 |     createStoreContext,
212 |     Supported,
213 |     Unsupported,
214 |   };
215 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-react/src/test/setup.ts:
--------------------------------------------------------------------------------
1 | import '@testing-library/jest-dom';
2 | import * as matchers from '@testing-library/jest-dom/matchers';
3 | import { expect } from 'vitest';
4 | 
5 | expect.extend(matchers); 


--------------------------------------------------------------------------------
/packages/app-bridge-react/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "../../tsconfig.json",
 3 |   "compilerOptions": {
 4 |     "outDir": "./dist",
 5 |     "composite": true,
 6 |     "declarationMap": true,
 7 |     "jsx": "react-jsx",
 8 |     "lib": ["DOM", "DOM.Iterable", "ESNext"],
 9 |     "moduleResolution": "node",
10 |     "paths": {
11 |       "@open-game-system/app-bridge-types": ["../app-bridge-types/src"],
12 |       "@open-game-system/app-bridge-web": ["../app-bridge-web/src"]
13 |     }
14 |   },
15 |   "include": ["src"],
16 |   "exclude": ["node_modules", "dist"],
17 |   "references": [
18 |     { "path": "../app-bridge-types" },
19 |     { "path": "../app-bridge-web" }
20 |   ]
21 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-react/tsup.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from 'tsup';
 2 | 
 3 | export default defineConfig({
 4 |   entry: ['src/index.tsx'],
 5 |   format: ['cjs', 'esm'],
 6 |   dts: {
 7 |     resolve: true,
 8 |     compilerOptions: {
 9 |       composite: false,
10 |       moduleResolution: "node"
11 |     }
12 |   },
13 |   splitting: false,
14 |   sourcemap: true,
15 |   clean: true,
16 |   external: [
17 |     '@open-game-system/app-bridge-types',
18 |     '@open-game-system/app-bridge-web',
19 |     'react'
20 |   ]
21 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-react/vitest.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from "vitest/config";
 2 | 
 3 | export default defineConfig({
 4 |   test: {
 5 |     environment: "jsdom",
 6 |     globals: true,
 7 |     include: ["src/**/*.test.{ts,tsx}"],
 8 |     coverage: {
 9 |       provider: "v8",
10 |       reporter: ["text", "json", "html"],
11 |     },
12 |     deps: {
13 |       inline: ["@testing-library/react", "@testing-library/jest-dom"],
14 |     },
15 |     setupFiles: ["src/test/setup.ts"],
16 |   },
17 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-testing/README.md:
--------------------------------------------------------------------------------
  1 | # @open-game-system/app-bridge-testing
  2 | 
  3 | Testing utilities for the app-bridge ecosystem.
  4 | 
  5 | ## Installation
  6 | 
  7 | ```bash
  8 | npm install @open-game-system/app-bridge-testing --save-dev
  9 | # or
 10 | yarn add @open-game-system/app-bridge-testing --dev
 11 | # or
 12 | pnpm add @open-game-system/app-bridge-testing --save-dev
 13 | ```
 14 | 
 15 | ## API Reference
 16 | 
 17 | ### createMockBridge
 18 | 
 19 | ```typescript
 20 | /**
 21 |  * Creates a mock bridge for testing purposes
 22 |  * This implementation mimics the behavior of a real bridge but allows
 23 |  * for more control and inspection during tests
 24 |  * @template TStores Store definitions for the bridge
 25 |  * @param config Configuration options for the mock bridge
 26 |  * @returns A MockBridge instance with additional testing utilities
 27 |  */
 28 | export function createMockBridge<TStores extends BridgeStores>(
 29 |   config?: {
 30 |     /**
 31 |      * Whether the bridge is supported in the current environment
 32 |      */
 33 |     isSupported?: boolean;
 34 | 
 35 |     /**
 36 |      * Initial state for stores in the bridge
 37 |      * When provided, stores will be pre-initialized with these values
 38 |      */
 39 |     initialState?: Partial<{
 40 |       [K in keyof TStores]: TStores[K]["state"];
 41 |     }>;
 42 |   }
 43 | ): MockBridge<TStores>;
 44 | ```
 45 | 
 46 | ### MockBridge Interface
 47 | 
 48 | ```typescript
 49 | /**
 50 |  * Extended Bridge interface with additional testing utilities
 51 |  */
 52 | export interface MockBridge<TStores extends BridgeStores> extends Omit<Bridge<TStores>, "getSnapshot"> {
 53 |   /**
 54 |    * Get a store by its key.
 55 |    * Always returns a store (creating one if it doesn't exist)
 56 |    */
 57 |   getStore: <K extends keyof TStores>(
 58 |     storeKey: K
 59 |   ) => MockStore<TStores[K]["state"], TStores[K]["events"]> | undefined;
 60 | 
 61 |   /**
 62 |    * Get all events that have been dispatched to a store
 63 |    * Creates an empty event history array if one doesn't exist
 64 |    */
 65 |   getHistory: <K extends keyof TStores>(storeKey: K) => TStores[K]["events"][];
 66 | 
 67 |   /**
 68 |    * Reset a store's state and clear its event history
 69 |    * If no storeKey is provided, resets all stores
 70 |    */
 71 |   reset: (storeKey?: keyof TStores) => void;
 72 | 
 73 |   /**
 74 |    * Set the state of a store
 75 |    * Creates the store if it doesn't already exist
 76 |    */
 77 |   setState: <K extends keyof TStores>(
 78 |     storeKey: K,
 79 |     state: TStores[K]["state"]
 80 |   ) => void;
 81 | 
 82 |   /**
 83 |    * Check if the bridge is supported
 84 |    */
 85 |   isSupported: () => boolean;
 86 | }
 87 | ```
 88 | 
 89 | ### MockStore Interface
 90 | 
 91 | ```typescript
 92 | /**
 93 |  * Interface for a mock store that includes testing utilities
 94 |  */
 95 | export interface MockStore<TState extends State, TEvent extends Event>
 96 |   extends Store<TState, TEvent> {
 97 |   /**
 98 |    * Directly modify the state using a producer function
 99 |    * Only available in mock bridge
100 |    */
101 |   produce: (producer: (state: TState) => void) => void;
102 | 
103 |   /**
104 |    * Reset the store's state to undefined and notify listeners
105 |    */
106 |   reset: () => void;
107 | 
108 |   /**
109 |    * Set the store's complete state and notify listeners
110 |    */
111 |   setState: (state: TState) => void;
112 | }
113 | ```
114 | 
115 | ## Usage
116 | 
117 | ```typescript
118 | import { createMockBridge } from '@open-game-system/app-bridge-testing';
119 | import type { AppStores } from './types';
120 | 
121 | // Create a mock bridge with initial state
122 | const bridge = createMockBridge<AppStores>({
123 |   isSupported: true,
124 |   initialState: {
125 |     counter: { value: 0 }
126 |   }
127 | });
128 | 
129 | // Get a store
130 | const counterStore = bridge.getStore('counter');
131 | 
132 | if (counterStore) {
133 |   // Test state changes
134 |   counterStore.setState({ value: 5 });
135 |   expect(counterStore.getSnapshot().value).toBe(5);
136 | 
137 |   // Test event dispatching
138 |   counterStore.dispatch({ type: "INCREMENT" });
139 |   expect(bridge.getHistory('counter')).toEqual([
140 |     { type: "INCREMENT" }
141 |   ]);
142 | 
143 |   // Test state updates
144 |   counterStore.produce(state => {
145 |     state.value += 1;
146 |   });
147 |   expect(counterStore.getSnapshot().value).toBe(6);
148 | 
149 |   // Reset the store
150 |   counterStore.reset();
151 |   expect(counterStore.getSnapshot().value).toBe(0);
152 |   expect(bridge.getHistory('counter')).toEqual([]);
153 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-testing/__tests__/mock-bridge.test.ts:
--------------------------------------------------------------------------------
  1 | import { createMockBridge } from '../src';
  2 | import type { BridgeStores } from '@open-game-system/app-bridge-types';
  3 | 
  4 | interface TestState {
  5 |   value: number;
  6 | }
  7 | 
  8 | type TestEvents = 
  9 |   | { type: 'INCREMENT' }
 10 |   | { type: 'SET'; value: number };
 11 | 
 12 | interface TestStores extends BridgeStores {
 13 |   counter: {
 14 |     state: TestState;
 15 |     events: TestEvents;
 16 |   };
 17 | }
 18 | 
 19 | describe('MockBridge', () => {
 20 |   it('should create a bridge with initial state', () => {
 21 |     const bridge = createMockBridge<TestStores>({
 22 |       initialState: {
 23 |         counter: { value: 0 }
 24 |       }
 25 |     });
 26 | 
 27 |     const store = bridge.getStore('counter');
 28 |     expect(store).toBeDefined();
 29 |     expect(store?.getSnapshot()).toEqual({ value: 0 });
 30 |   });
 31 | 
 32 |   it('should track dispatched events', () => {
 33 |     const bridge = createMockBridge<TestStores>({
 34 |       initialState: {
 35 |         counter: { value: 0 }
 36 |       }
 37 |     });
 38 | 
 39 |     const store = bridge.getStore('counter');
 40 |     store?.dispatch({ type: 'INCREMENT' });
 41 |     store?.dispatch({ type: 'SET', value: 5 });
 42 | 
 43 |     expect(bridge.getHistory('counter')).toEqual([
 44 |       { type: 'INCREMENT' },
 45 |       { type: 'SET', value: 5 }
 46 |     ]);
 47 |   });
 48 | 
 49 |   it('should allow direct state manipulation', () => {
 50 |     const bridge = createMockBridge<TestStores>({
 51 |       initialState: {
 52 |         counter: { value: 0 }
 53 |       }
 54 |     });
 55 | 
 56 |     const store = bridge.getStore('counter');
 57 |     store?.produce(state => {
 58 |       state.value = 42;
 59 |     });
 60 | 
 61 |     expect(store?.getSnapshot()).toEqual({ value: 42 });
 62 |   });
 63 | 
 64 |   it('should notify subscribers of state changes', () => {
 65 |     const bridge = createMockBridge<TestStores>({
 66 |       initialState: {
 67 |         counter: { value: 0 }
 68 |       }
 69 |     });
 70 | 
 71 |     const store = bridge.getStore('counter');
 72 |     const listener = jest.fn();
 73 |     store?.subscribe(listener);
 74 | 
 75 |     store?.produce(state => {
 76 |       state.value = 42;
 77 |     });
 78 | 
 79 |     expect(listener).toHaveBeenCalledWith({ value: 42 });
 80 |   });
 81 | 
 82 |   it('should reset state and history', () => {
 83 |     const bridge = createMockBridge<TestStores>({
 84 |       initialState: {
 85 |         counter: { value: 0 }
 86 |       }
 87 |     });
 88 | 
 89 |     const store = bridge.getStore('counter');
 90 |     store?.produce(state => {
 91 |       state.value = 42;
 92 |     });
 93 |     store?.dispatch({ type: 'INCREMENT' });
 94 | 
 95 |     bridge.reset('counter');
 96 | 
 97 |     expect(store?.getSnapshot()).toEqual({ value: 0 });
 98 |     expect(bridge.getHistory('counter')).toEqual([]);
 99 |   });
100 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-testing/__tests__/setup.ts:
--------------------------------------------------------------------------------
1 | // Add any global test setup here
2 | import '@testing-library/jest-dom'; 


--------------------------------------------------------------------------------
/packages/app-bridge-testing/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@open-game-system/app-bridge-testing",
 3 |   "version": "0.20250411.3",
 4 |   "description": "Testing utilities for the app-bridge ecosystem",
 5 |   "main": "./dist/index.js",
 6 |   "module": "./dist/index.mjs",
 7 |   "types": "./dist/index.d.ts",
 8 |   "exports": {
 9 |     ".": {
10 |       "import": "./dist/index.mjs",
11 |       "require": "./dist/index.js",
12 |       "types": "./dist/index.d.ts",
13 |       "source": "./src/index.ts"
14 |     }
15 |   },
16 |   "sideEffects": false,
17 |   "files": [
18 |     "dist",
19 |     "src",
20 |     "README.md",
21 |     "LICENSE"
22 |   ],
23 |   "scripts": {
24 |     "build": "tsup --config tsup.config.ts",
25 |     "dev": "tsup --config tsup.config.ts --watch",
26 |     "clean": "rimraf dist",
27 |     "typecheck": "tsc --noEmit",
28 |     "test": "vitest run",
29 |     "test:watch": "vitest",
30 |     "test:coverage": "vitest run --coverage",
31 |     "prepublishOnly": "node -e \"const fs=require('fs'); const pkgPath='./package.json'; const pkg=JSON.parse(fs.readFileSync(pkgPath)); const deps=pkg.dependencies||{}; const peerDeps=pkg.peerDependencies||{}; const devDeps=pkg.devDependencies||{}; const version='^'+pkg.version.split('-')[0]; /* Use major/minor/patch from current version */ const fix=(obj)=>(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v.startsWith('workspace:')?version:v]))); pkg.dependencies=fix(deps); pkg.peerDependencies=fix(peerDeps); pkg.devDependencies=fix(devDeps); fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\\n'); console.log('Replaced workspace:* versions in', pkgPath);\""
32 |   },
33 |   "dependencies": {
34 |     "@open-game-system/app-bridge-types": "workspace:*"
35 |   },
36 |   "peerDependencies": {
37 |     "@testing-library/react": ">=12.0.0",
38 |     "typescript": ">=4.5.0"
39 |   },
40 |   "devDependencies": {
41 |     "@testing-library/jest-dom": "^6.1.0",
42 |     "@testing-library/react": "^14.1.0",
43 |     "@vitest/coverage-v8": "^1.2.2",
44 |     "tsup": "^8.0.1",
45 |     "typescript": "^5.3.3",
46 |     "rimraf": "^5.0.5",
47 |     "vitest": "^1.2.2"
48 |   },
49 |   "publishConfig": {
50 |     "access": "public"
51 |   },
52 |   "keywords": [
53 |     "typescript",
54 |     "testing",
55 |     "app-bridge",
56 |     "mock"
57 |   ],
58 |   "author": "OpenGameSystem",
59 |   "license": "MIT"
60 | }
61 | 


--------------------------------------------------------------------------------
/packages/app-bridge-testing/src/index.test.ts:
--------------------------------------------------------------------------------
  1 | import { describe, expect, it, vi } from "vitest";
  2 | import { createMockBridge, BridgeStores, State } from "./index";
  3 | 
  4 | interface CounterState extends State {
  5 |   value: number;
  6 | }
  7 | 
  8 | type CounterEvents =
  9 |   | { type: "INCREMENT" }
 10 |   | { type: "DECREMENT" }
 11 |   | { type: "SET"; value: number };
 12 | 
 13 | interface UserState extends State {
 14 |   name: string;
 15 |   age: number;
 16 | }
 17 | 
 18 | type UserEvents =
 19 |   | { type: "SET_NAME"; name: string }
 20 |   | { type: "SET_AGE"; age: number }
 21 |   | { type: "SET"; value: UserState };
 22 | 
 23 | interface TestStores extends BridgeStores {
 24 |   counter: {
 25 |     state: CounterState;
 26 |     events: CounterEvents;
 27 |   };
 28 |   user: {
 29 |     state: UserState;
 30 |     events: UserEvents;
 31 |   };
 32 | }
 33 | 
 34 | describe("createMockBridge", () => {
 35 |   it("should create a bridge with initial state", () => {
 36 |     const bridge = createMockBridge<TestStores>({
 37 |       isSupported: true,
 38 |       initialState: {
 39 |         counter: { value: 42 },
 40 |       },
 41 |     });
 42 | 
 43 |     const counterStore = bridge.getStore("counter");
 44 |     expect(counterStore?.getSnapshot()).toEqual({ value: 42 });
 45 |   });
 46 | 
 47 |   it("should record dispatched events", () => {
 48 |     const bridge = createMockBridge<TestStores>({
 49 |       isSupported: true,
 50 |       initialState: {
 51 |         counter: { value: 0 },
 52 |       },
 53 |     });
 54 | 
 55 |     const counterStore = bridge.getStore("counter");
 56 |     if (!counterStore) throw new Error("Store not available");
 57 | 
 58 |     counterStore.dispatch({ type: "INCREMENT" });
 59 |     expect(bridge.getHistory("counter")).toEqual([{ type: "INCREMENT" }]);
 60 | 
 61 |     counterStore.dispatch({ type: "DECREMENT" });
 62 |     expect(bridge.getHistory("counter")).toEqual([
 63 |       { type: "INCREMENT" },
 64 |       { type: "DECREMENT" },
 65 |     ]);
 66 | 
 67 |     counterStore.dispatch({ type: "SET", value: 42 });
 68 |     expect(bridge.getHistory("counter")).toEqual([
 69 |       { type: "INCREMENT" },
 70 |       { type: "DECREMENT" },
 71 |       { type: "SET", value: 42 },
 72 |     ]);
 73 |   });
 74 | 
 75 |   it("should handle subscriptions", () => {
 76 |     const bridge = createMockBridge<TestStores>({
 77 |       isSupported: true,
 78 |       initialState: {
 79 |         counter: { value: 0 },
 80 |       },
 81 |     });
 82 | 
 83 |     const counterStore = bridge.getStore("counter");
 84 |     if (!counterStore) throw new Error("Store not available");
 85 |     const listener = vi.fn();
 86 |     counterStore.subscribe(listener);
 87 | 
 88 |     // Initial state
 89 |     expect(listener).toHaveBeenCalledWith({ value: 0 });
 90 | 
 91 |     // State updates via produce
 92 |     counterStore.produce((state: CounterState) => {
 93 |       state.value = 1;
 94 |     });
 95 |     expect(listener).toHaveBeenCalledWith({ value: 1 });
 96 |   });
 97 | 
 98 |   it("should handle unsubscribe", () => {
 99 |     const bridge = createMockBridge<TestStores>({
100 |       isSupported: true,
101 |       initialState: {
102 |         counter: { value: 0 },
103 |       },
104 |     });
105 | 
106 |     const counterStore = bridge.getStore("counter");
107 |     if (!counterStore) throw new Error("Store not available");
108 |     const listener = vi.fn();
109 |     const unsubscribe = counterStore.subscribe(listener);
110 | 
111 |     counterStore.produce((state: CounterState) => {
112 |       state.value = 1;
113 |     });
114 |     expect(listener).toHaveBeenCalledTimes(2); // Initial + produce
115 | 
116 |     unsubscribe();
117 |     counterStore.produce((state: CounterState) => {
118 |       state.value = 2;
119 |     });
120 |     expect(listener).toHaveBeenCalledTimes(2); // No additional calls
121 |   });
122 | 
123 |   it("should handle reset", () => {
124 |     const bridge = createMockBridge<TestStores>({
125 |       isSupported: true,
126 |       initialState: {
127 |         counter: { value: 0 },
128 |       },
129 |     });
130 | 
131 |     const counterStore = bridge.getStore("counter");
132 |     if (!counterStore) throw new Error("Store not available");
133 | 
134 |     // Dispatch some events
135 |     counterStore.dispatch({ type: "INCREMENT" });
136 |     counterStore.dispatch({ type: "INCREMENT" });
137 |     expect(bridge.getHistory("counter")).toHaveLength(2);
138 | 
139 |     // Reset the store
140 |     bridge.reset("counter");
141 |     expect(counterStore.getSnapshot()).toEqual({ value: 0 });
142 |     expect(bridge.getHistory("counter")).toHaveLength(0);
143 |   });
144 | 
145 |   it("should handle produce for direct state manipulation", () => {
146 |     const bridge = createMockBridge<TestStores>({
147 |       isSupported: true,
148 |       initialState: {
149 |         counter: { value: 0 },
150 |       },
151 |     });
152 | 
153 |     const counterStore = bridge.getStore("counter");
154 |     if (!counterStore) throw new Error("Store not available");
155 |     const listener = vi.fn();
156 |     counterStore.subscribe(listener);
157 | 
158 |     counterStore.produce((state: CounterState) => {
159 |       state.value = 42;
160 |     });
161 | 
162 |     expect(counterStore.getSnapshot()).toEqual({ value: 42 });
163 |     expect(listener).toHaveBeenCalledWith({ value: 42 });
164 |   });
165 | 
166 |   it("should check if bridge is supported", () => {
167 |     const bridge = createMockBridge<TestStores>({
168 |       isSupported: true,
169 |       initialState: {
170 |         counter: { value: 0 },
171 |       },
172 |     });
173 | 
174 |     expect(bridge.isSupported()).toBe(true);
175 | 
176 |     const unsupportedBridge = createMockBridge<TestStores>({
177 |       isSupported: false,
178 |       initialState: {
179 |         counter: { value: 0 },
180 |       },
181 |     });
182 | 
183 |     expect(unsupportedBridge.isSupported()).toBe(false);
184 |   });
185 | 
186 |   describe("store availability", () => {
187 |     it("should return undefined for unavailable stores", () => {
188 |       const bridge = createMockBridge<TestStores>({
189 |         initialState: {
190 |           counter: { value: 0 },
191 |         },
192 |       });
193 | 
194 |       const counterStore = bridge.getStore("counter");
195 |       expect(counterStore).toBeDefined();
196 | 
197 |       const userStore = bridge.getStore("user");
198 |       expect(userStore).toBeUndefined();
199 |     });
200 | 
201 |     it("should notify listeners of store availability changes", () => {
202 |       const bridge = createMockBridge<TestStores>();
203 |       const listener = vi.fn();
204 |       const unsubscribe = bridge.subscribe(listener);
205 | 
206 |       // Initially no stores available
207 |       expect(listener).toHaveBeenCalledTimes(0);
208 |       const counterStoreBefore = bridge.getStore("counter");
209 |       expect(counterStoreBefore).toBeUndefined();
210 | 
211 |       bridge.setState("counter", { value: 0 });
212 | 
213 |       // Make counter store available
214 |       expect(listener).toHaveBeenCalledTimes(1);
215 | 
216 |       const counterStoreAfter = bridge.getStore("counter");
217 |       expect(counterStoreAfter).toBeDefined();
218 |       unsubscribe();
219 |     });
220 |   });
221 | 
222 |   describe("error cases", () => {
223 |     it("should handle invalid store keys", () => {
224 |       const bridge = createMockBridge<TestStores>();
225 | 
226 |       // Use a type assertion that maintains some type safety
227 |       // This simulates accessing a non-existent store
228 |       const store = bridge.getStore("invalid" as unknown as keyof TestStores);
229 |       expect(store).toBeUndefined();
230 |     });
231 |   });
232 | 
233 |   describe("type safety", () => {
234 |     it("should enforce event types", () => {
235 |       const bridge = createMockBridge<TestStores>({
236 |         initialState: {
237 |           counter: { value: 0 },
238 |         },
239 |       });
240 | 
241 |       const counterStore = bridge.getStore("counter");
242 |       if (!counterStore) throw new Error("Store not available");
243 | 
244 |       // Valid event
245 |       counterStore.dispatch({ type: "INCREMENT" });
246 | 
247 |       // @ts-expect-error - Invalid event type
248 |       counterStore.dispatch({ type: "INVALID" });
249 | 
250 |       // @ts-expect-error - Missing required value
251 |       counterStore.dispatch({ type: "SET" });
252 |     });
253 |   });
254 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-testing/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "../../tsconfig.json",
 3 |   "compilerOptions": {
 4 |     "outDir": "./dist",
 5 |     "composite": true,
 6 |     "declarationMap": true
 7 |   },
 8 |   "include": ["src/**/*.ts"],
 9 |   "exclude": ["node_modules", "dist"],
10 |   "references": [
11 |     { "path": "../app-bridge-types" }
12 |   ]
13 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-testing/tsup.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from 'tsup';
 2 | 
 3 | export default defineConfig({
 4 |   entry: ['src/index.ts'],
 5 |   format: ['cjs', 'esm'],
 6 |   dts: { resolve: true },
 7 |   splitting: false,
 8 |   sourcemap: true,
 9 |   clean: true,
10 |   external: [
11 |     '@open-game-system/app-bridge-types',
12 |     '@testing-library/react'
13 |   ],
14 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-testing/vitest.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from "vitest/config";
 2 | 
 3 | export default defineConfig({
 4 |   test: {
 5 |     environment: "node",
 6 |     globals: true,
 7 |     include: ["src/**/*.test.{ts,tsx}"],
 8 |     coverage: {
 9 |       provider: "v8",
10 |       reporter: ["text", "json", "html"],
11 |     },
12 |   },
13 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-types/README.md:
--------------------------------------------------------------------------------
  1 | # @open-game-system/app-bridge-types
  2 | 
  3 | Core type definitions for the app-bridge ecosystem.
  4 | 
  5 | ## Installation
  6 | 
  7 | ```bash
  8 | npm install @open-game-system/app-bridge-types
  9 | # or
 10 | yarn add @open-game-system/app-bridge-types
 11 | # or
 12 | pnpm add @open-game-system/app-bridge-types
 13 | ```
 14 | 
 15 | ## API Reference
 16 | 
 17 | ### Core Types
 18 | 
 19 | ```typescript
 20 | /**
 21 |  * Represents a generic state type that can be used in stores
 22 |  */
 23 | export type State = object;
 24 | 
 25 | /**
 26 |  * Represents a generic event type that can be dispatched to stores
 27 |  * Events are discriminated unions with a type field and optional additional properties
 28 |  */
 29 | export type Event = { type: string };
 30 | 
 31 | /**
 32 |  * Producer function type for handling events
 33 |  * Similar to Immer's produce function
 34 |  */
 35 | export type Producer<S extends State, E extends Event> = (draft: S, event: E) => void;
 36 | 
 37 | /**
 38 |  * Store configuration for creating new stores
 39 |  */
 40 | export interface StoreConfig<S extends State, E extends Event> {
 41 |   initialState: S;
 42 |   producer?: Producer<S, E>;
 43 | }
 44 | 
 45 | /**
 46 |  * Creates a new store with the given configuration
 47 |  */
 48 | export type CreateStore = <S extends State, E extends Event>(
 49 |   config: StoreConfig<S, E>
 50 | ) => Store<S, E>;
 51 | 
 52 | /**
 53 |  * Represents a store instance with state management capabilities
 54 |  */
 55 | export interface Store<S extends State = State, E extends Event = Event> {
 56 |   /** Get the current state */
 57 |   getSnapshot(): S;
 58 |   /** Subscribe to state changes */
 59 |   subscribe(listener: (state: S) => void): () => void;
 60 |   /**
 61 |    * Dispatch an event to the store. Synchronously updates state and triggers listeners.
 62 |    */
 63 |   dispatch(event: E): void;
 64 |   /** Reset store to initial state */
 65 |   reset(): void;
 66 |   /**
 67 |    * Add a listener for specific dispatched events.
 68 |    * Listeners can be async and receive the event and store instance.
 69 |    * @param eventType The type of the dispatched event (E['type']).
 70 |    * @param listener The callback function.
 71 |    * @returns An unsubscribe function.
 72 |    */
 73 |   on(eventType: E['type'], listener: (event: E, store: Store<S, E>) => void): () => void;
 74 | }
 75 | 
 76 | /**
 77 |  * Represents a collection of store definitions
 78 |  */
 79 | export type BridgeStores<
 80 |   T extends Record<string, { state: State; events: Event }> = Record<
 81 |     string,
 82 |     { state: State; events: Event }
 83 |   >
 84 | > = {
 85 |   [K in keyof T]: {
 86 |     state: T[K]["state"];
 87 |     events: T[K]["events"];
 88 |   };
 89 | };
 90 | 
 91 | /**
 92 |  * Base bridge interface that all implementations extend
 93 |  */
 94 | export interface Bridge<TStores extends BridgeStores> {
 95 |   /**
 96 |    * Check if the bridge is supported in the current environment
 97 |    */
 98 |   isSupported: () => boolean;
 99 | 
100 |   /**
101 |    * Get a store by its key
102 |    * Returns undefined if the store doesn't exist
103 |    */
104 |   getStore: <K extends keyof TStores>(
105 |     storeKey: K
106 |   ) => Store<TStores[K]["state"], TStores[K]["events"]> | undefined;
107 | 
108 |   /**
109 |    * Set or remove a store for a given key
110 |    */
111 |   setStore: <K extends keyof TStores>(
112 |     key: K,
113 |     store: Store<TStores[K]["state"], TStores[K]["events"]> | undefined
114 |   ) => void;
115 | 
116 |   /**
117 |    * Subscribe to store availability changes
118 |    */
119 |   subscribe: (listener: () => void) => () => void;
120 | }
121 | 
122 | /**
123 |  * Utility type to extract store types from any Bridge implementation
124 |  */
125 | export type ExtractStoresType<T> = T extends {
126 |   getStore: <K extends keyof (infer U)>(key: K) => any;
127 | }
128 |   ? U
129 |   : never;
130 | 
131 | /**
132 |  * Defines the configuration for declarative, potentially async event listeners
133 |  * within a store, triggered *after* state updates for a given dispatched event type.
134 |  * Listeners receive the event and the store instance.
135 |  */
136 | export type StoreOnConfig<S extends State, E extends Event> = Partial<{
137 |   [K in E['type']]: (event: Extract<E, { type: K }>, store: Store<S, E>) => void;
138 | }>;
139 | ```
140 | 
141 | ## Usage Examples
142 | 
143 | ### Creating a Store Type
144 | 
145 | ```typescript
146 | // Define your state type
147 | interface CounterState extends State {
148 |   value: number;
149 | }
150 | 
151 | // Define your events
152 | type CounterEvents =
153 |   | { type: "INCREMENT" }
154 |   | { type: "DECREMENT" }
155 |   | { type: "SET"; value: number };
156 | 
157 | // Create store configuration
158 | const config: StoreConfig<CounterState, CounterEvents> = {
159 |   initialState: { value: 0 },
160 |   producer: (draft, event) => {
161 |     switch (event.type) {
162 |       case "INCREMENT":
163 |         draft.value += 1;
164 |         break;
165 |       case "DECREMENT":
166 |         draft.value -= 1;
167 |         break;
168 |       case "SET":
169 |         draft.value = event.value;
170 |         break;
171 |     }
172 |   }
173 | };
174 | ```
175 | 
176 | ### Defining Bridge Stores
177 | 
178 | ```typescript
179 | // Define your application's stores
180 | type AppStores = {
181 |   counter: {
182 |     state: CounterState;
183 |     events: CounterEvents;
184 |   };
185 |   // Add more stores as needed
186 | };
187 | 
188 | // Use with a bridge implementation
189 | const bridge: Bridge<AppStores> = createBridge();
190 | ```
191 | 
192 | ### Using Store Methods
193 | 
194 | ```typescript
195 | // Get a store
196 | const store = bridge.getStore('counter');
197 | if (store) {
198 |   // Subscribe to state changes
199 |   const unsubscribe = store.subscribe(state => {
200 |     console.log('Counter value:', state.value);
201 |   });
202 | 
203 |   // Dispatch events
204 |   store.dispatch({ type: "INCREMENT" });
205 |   store.dispatch({ type: "SET", value: 42 });
206 | 
207 |   // Reset to initial state
208 |   store.reset();
209 | 
210 |   // Clean up subscription
211 |   unsubscribe();
212 | }
213 | ```


--------------------------------------------------------------------------------
/packages/app-bridge-types/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@open-game-system/app-bridge-types",
 3 |   "version": "0.20250411.3",
 4 |   "description": "Core type definitions for the app-bridge ecosystem",
 5 |   "main": "./dist/index.js",
 6 |   "module": "./dist/index.mjs",
 7 |   "types": "./dist/index.d.ts",
 8 |   "sideEffects": false,
 9 |   "files": [
10 |     "dist",
11 |     "README.md",
12 |     "LICENSE"
13 |   ],
14 |   "scripts": {
15 |     "build": "tsup src/index.ts --format cjs,esm --dts",
16 |     "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
17 |     "clean": "rimraf dist",
18 |     "typecheck": "tsc --noEmit",
19 |     "prepublishOnly": "node -e \"const fs=require('fs'); const pkgPath='./package.json'; const pkg=JSON.parse(fs.readFileSync(pkgPath)); const deps=pkg.dependencies||{}; const peerDeps=pkg.peerDependencies||{}; const devDeps=pkg.devDependencies||{}; const version='^'+pkg.version.split('-')[0]; /* Use major/minor/patch from current version */ const fix=(obj)=>(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v.startsWith('workspace:')?version:v]))); pkg.dependencies=fix(deps); pkg.peerDependencies=fix(peerDeps); pkg.devDependencies=fix(devDeps); fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\\n'); console.log('Replaced workspace:* versions in', pkgPath);\""
20 |   },
21 |   "dependencies": {
22 |     "fast-json-patch": "^3.1.1"
23 |   },
24 |   "devDependencies": {
25 |     "tsup": "^8.0.1",
26 |     "typescript": "^5.3.3",
27 |     "rimraf": "^5.0.5"
28 |   },
29 |   "peerDependencies": {
30 |     "typescript": ">=4.5.0"
31 |   },
32 |   "publishConfig": {
33 |     "access": "public"
34 |   },
35 |   "keywords": [
36 |     "typescript",
37 |     "types",
38 |     "app-bridge"
39 |   ],
40 |   "author": "OpenGameSystem",
41 |   "license": "MIT"
42 | }
43 | 


--------------------------------------------------------------------------------
/packages/app-bridge-types/src/globals.d.ts:
--------------------------------------------------------------------------------
1 | declare module 'expo-status-bar';
2 | declare module 'react-native-webview'; 


--------------------------------------------------------------------------------
/packages/app-bridge-types/src/index.ts:
--------------------------------------------------------------------------------
  1 | import { Operation } from "fast-json-patch";
  2 | 
  3 | export type { Operation };
  4 | 
  5 | /**
  6 |  * Represents a generic state type that can be used in stores
  7 |  */
  8 | export type State = object;
  9 | 
 10 | /**
 11 |  * Represents a generic event type that can be dispatched to stores
 12 |  * Events are discriminated unions with a type field and optional additional properties
 13 |  * Example:
 14 |  * type CounterEvents =
 15 |  *   | { type: "INCREMENT" }
 16 |  *   | { type: "SET"; value: number }
 17 |  */
 18 | export type Event = { type: string };
 19 | 
 20 | /**
 21 |  * Represents a store definition with its state and event types
 22 |  * (This type might be less relevant with the simplified config)
 23 |  */
 24 | export interface StoreDefinition<
 25 |   S extends State = State,
 26 |   E extends Event = Event
 27 | > {
 28 |   initialState: S;
 29 |   reducers?: Record<string, (state: S, event: E) => S>;
 30 | }
 31 | 
 32 | /**
 33 |  * Represents a collection of store definitions
 34 |  */
 35 | export type BridgeStores<
 36 |   T extends Record<string, { state: State; events: Event }> = Record<
 37 |     string,
 38 |     { state: State; events: Event }
 39 |   >
 40 | > = {
 41 |   [K in keyof T]: {
 42 |     state: T[K]["state"];
 43 |     events: T[K]["events"];
 44 |   };
 45 | };
 46 | 
 47 | /**
 48 |  * Represents a store instance with state management capabilities
 49 |  */
 50 | // Ensure Store interface is simplified according to Plan v4
 51 | export interface Store<S extends State = State, E extends Event = Event> {
 52 |   /**
 53 |    * Get the current state
 54 |    */
 55 |   getSnapshot(): S;
 56 | 
 57 |   /**
 58 |    * Dispatch an event to the store. Returns a Promise that resolves when listeners complete.
 59 |    */
 60 |   dispatch(event: E): void; // Revert to void return type
 61 | 
 62 |   /**
 63 |    * Subscribe to state changes
 64 |    * Returns an unsubscribe function
 65 |    */
 66 |   subscribe(listener: (state: S) => void): () => void;
 67 | 
 68 |   /**
 69 |    * Reset store to its initial state
 70 |    */
 71 |   reset(): void;
 72 | 
 73 |   /**
 74 |    * Add a listener for specific dispatched events.
 75 |    * @param eventType The type of the dispatched event (E['type']).
 76 |    * @param listener The callback function (potentially async) receiving the event and store instance.
 77 |    * @returns An unsubscribe function.
 78 |    */
 79 |   // Ensure signature matches Plan v4
 80 |   on<EventType extends E['type']>(
 81 |     eventType: EventType,
 82 |     listener: (
 83 |       event: Extract<E, { type: EventType }>,
 84 |       store: Store<S, E> // Pass store instance
 85 |     ) => Promise<void> | void // Allow async
 86 |   ): () => void;
 87 | }
 88 | 
 89 | /**
 90 |  * Producer function type for handling events (simplified)
 91 |  */
 92 | export type Producer<S extends State, E extends Event> = (draft: S, event: E) => void;
 93 | 
 94 | /**
 95 |  * Defines the configuration for declarative event listeners within a store.
 96 |  */
 97 | export type StoreOnConfig<S extends State, E extends Event> = Partial<{
 98 |   [K in E['type']]: (
 99 |     event: Extract<E, { type: K }>,
100 |     store: Store<S, E>
101 |   ) => Promise<void> | void;
102 | }>;
103 | 
104 | /**
105 |  * Store configuration for creating new stores (simplified)
106 |  */
107 | export interface StoreConfig<S extends State, E extends Event> {
108 |   initialState: S;
109 |   producer?: Producer<S, E>;
110 |   on?: StoreOnConfig<S, E>; // Optional 'on' config
111 | }
112 | 
113 | /**
114 |  * Creates a new store with the given configuration (simplified)
115 |  */
116 | export type CreateStore = <S extends State, E extends Event>(
117 |   config: StoreConfig<S, E>
118 | ) => Store<S, E>;
119 | 
120 | /**
121 |  * Represents the current state of all stores in a bridge
122 |  */
123 | export type BridgeState<TStores extends BridgeStores> = {
124 |   [K in keyof TStores]: TStores[K]["state"] | null;
125 | };
126 | 
127 | /**
128 |  * Utility type to extract store types from any Bridge implementation
129 |  */
130 | export type ExtractStoresType<T> = T extends {
131 |   getStore: <K extends keyof (infer U)>(key: K) => any;
132 | } ? U : never;
133 | 
134 | /**
135 |  * Represents a WebView instance that can receive JavaScript and handle messages
136 |  * Keep this minimal interface as required by the bridge implementations.
137 |  */
138 | export interface WebView {
139 |   injectJavaScript?: (script: string) => void;
140 |   postMessage?: (message: string) => void;
141 |   // Add other methods ONLY if used by createNativeBridge or createWebBridge
142 |   // onMessage?: (event: { nativeEvent: { data: string } }) => void; // Usually handled by props/registration
143 | }
144 | 
145 | /**
146 |  * Base bridge interface - applicable to both web and native contexts
147 |  */
148 | export interface Bridge<TStores extends BridgeStores> {
149 |   isSupported: () => boolean;
150 |   getStore: <K extends keyof TStores>(
151 |     storeKey: K
152 |   ) => Store<TStores[K]["state"], TStores[K]["events"]> | undefined;
153 |   setStore: <K extends keyof TStores>(
154 |     key: K,
155 |     store: Store<TStores[K]["state"], TStores[K]["events"]> | undefined
156 |   ) => void;
157 |   subscribe: (listener: () => void) => () => void;
158 | }
159 | 
160 | /**
161 |  * Message types for communication between web and native
162 |  */
163 | export type WebToNativeMessage =
164 |   | { type: "EVENT"; storeKey: string; event: Event }
165 |   | { type: "BRIDGE_READY" };
166 | 
167 | export type NativeToWebMessage<TStores extends BridgeStores> =
168 |   | {
169 |       type: "STATE_INIT";
170 |       storeKey: keyof TStores;
171 |       data: TStores[keyof TStores]["state"];
172 |     }
173 |   | {
174 |       type: "STATE_UPDATE";
175 |       storeKey: keyof TStores;
176 |       data?: TStores[keyof TStores]["state"];
177 |       operations?: Operation[];
178 |     };
179 | 
180 | /**
181 |  * Native bridge interface with additional capabilities specific to the native side.
182 |  */
183 | export interface NativeBridge<TStores extends BridgeStores> extends Bridge<TStores> {
184 |   handleWebMessage: (message: string | { nativeEvent: { data: string } }) => void;
185 |   registerWebView: (webView: WebView | null | undefined) => () => void;
186 |   unregisterWebView: (webView: WebView | null | undefined) => void;
187 |   subscribeToReadyState: (
188 |     webView: WebView | null | undefined,
189 |     callback: (isReady: boolean) => void
190 |   ) => () => void;
191 |   getReadyState: (webView: WebView | null | undefined) => boolean;
192 | }
193 | 


--------------------------------------------------------------------------------
/packages/app-bridge-types/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "../../tsconfig.json",
 3 |   "compilerOptions": {
 4 |     "outDir": "./dist",
 5 |     "rootDir": "./src",
 6 |     "declarationDir": "./dist",
 7 |     "composite": true,
 8 |     "declarationMap": true,
 9 |     "target": "es2018",
10 |     "module": "esnext",
11 |     "moduleResolution": "node",
12 |     "declaration": true,
13 |     "sourceMap": true,
14 |     "strict": true,
15 |     "esModuleInterop": true,
16 |     "skipLibCheck": true,
17 |     "forceConsistentCasingInFileNames": true,
18 |     "noImplicitAny": false
19 |   },
20 |   "include": ["src", "src/**/*.d.ts"]
21 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-web/README.md:
--------------------------------------------------------------------------------
 1 | # @open-game-system/app-bridge-web
 2 | 
 3 | Web-specific implementation of the app-bridge ecosystem.
 4 | 
 5 | ## Installation
 6 | 
 7 | ```bash
 8 | npm install @open-game-system/app-bridge-web
 9 | # or
10 | yarn add @open-game-system/app-bridge-web
11 | # or
12 | pnpm add @open-game-system/app-bridge-web
13 | ```
14 | 
15 | ## API Reference
16 | 
17 | ### createWebBridge
18 | 
19 | ```typescript
20 | /**
21 |  * Creates a web bridge instance for use in web applications
22 |  * This implementation receives state from the native side through WebView messages
23 |  * @template TStores Store definitions for the bridge
24 |  * @returns A Bridge instance
25 |  */
26 | export function createWebBridge<TStores extends BridgeStores>(): Bridge<TStores>;
27 | ```
28 | 
29 | ### Bridge Interface
30 | 
31 | ```typescript
32 | /**
33 |  * Represents the web bridge interface
34 |  */
35 | export interface Bridge<TStores extends BridgeStores> {
36 |   /**
37 |    * Check if the bridge is supported in the current environment
38 |    * For web bridge, this checks if ReactNativeWebView is available
39 |    */
40 |   isSupported: () => boolean;
41 | 
42 |   /**
43 |    * Get a store by its key
44 |    * Returns undefined if the store doesn't exist
45 |    */
46 |   getStore: <K extends keyof TStores>(
47 |     storeKey: K
48 |   ) => Store<TStores[K]["state"], TStores[K]["events"]> | undefined;
49 | 
50 |   /**
51 |    * Subscribe to store availability changes
52 |    * Returns an unsubscribe function
53 |    */
54 |   subscribe: (listener: () => void) => () => void;
55 | }
56 | ```
57 | 
58 | ## Usage
59 | 
60 | ```typescript
61 | import { createWebBridge } from '@open-game-system/app-bridge-web';
62 | import type { AppStores } from './types';
63 | 
64 | // Create the web bridge
65 | const bridge = createWebBridge<AppStores>();
66 | 
67 | // Check if bridge is supported
68 | if (bridge.isSupported()) {
69 |   // Get a store
70 |   const counterStore = bridge.getStore('counter');
71 |   
72 |   if (counterStore) {
73 |     // Subscribe to state changes
74 |     const unsubscribe = counterStore.subscribe(state => {
75 |       console.log('Counter value:', state.value);
76 |     });
77 | 
78 |     // Dispatch events
79 |     counterStore.dispatch({ type: "INCREMENT" });
80 | 
81 |     // Clean up subscription
82 |     unsubscribe();
83 |   }
84 | }
85 | ``` 


--------------------------------------------------------------------------------
/packages/app-bridge-web/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "@open-game-system/app-bridge-web",
 3 |   "version": "0.20250411.3",
 4 |   "description": "Web-specific implementation of the app-bridge ecosystem",
 5 |   "main": "./dist/index.js",
 6 |   "module": "./dist/index.mjs",
 7 |   "types": "./dist/index.d.ts",
 8 |   "sideEffects": false,
 9 |   "files": [
10 |     "dist",
11 |     "README.md",
12 |     "LICENSE"
13 |   ],
14 |   "scripts": {
15 |     "build": "tsup --config tsup.config.ts",
16 |     "dev": "tsup --config tsup.config.ts --watch",
17 |     "clean": "rimraf dist",
18 |     "typecheck": "tsc --noEmit",
19 |     "test": "vitest run",
20 |     "test:watch": "vitest",
21 |     "test:coverage": "vitest run --coverage",
22 |     "prepublishOnly": "node -e \"const fs=require('fs'); const pkgPath='./package.json'; const pkg=JSON.parse(fs.readFileSync(pkgPath)); const deps=pkg.dependencies||{}; const peerDeps=pkg.peerDependencies||{}; const devDeps=pkg.devDependencies||{}; const version='^'+pkg.version.split('-')[0]; /* Use major/minor/patch from current version */ const fix=(obj)=>(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v.startsWith('workspace:')?version:v]))); pkg.dependencies=fix(deps); pkg.peerDependencies=fix(peerDeps); pkg.devDependencies=fix(devDeps); fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\\n'); console.log('Replaced workspace:* versions in', pkgPath);\""
23 |   },
24 |   "dependencies": {
25 |     "@open-game-system/app-bridge-types": "workspace:*",
26 |     "fast-json-patch": "^3.1.1"
27 |   },
28 |   "devDependencies": {
29 |     "tsup": "^8.0.1",
30 |     "typescript": "^5.3.3",
31 |     "rimraf": "^5.0.5",
32 |     "vitest": "^1.2.2",
33 |     "@vitest/coverage-v8": "^1.2.2",
34 |     "jsdom": "^24.0.0"
35 |   },
36 |   "peerDependencies": {
37 |     "typescript": ">=4.5.0"
38 |   },
39 |   "publishConfig": {
40 |     "access": "public"
41 |   },
42 |   "keywords": [
43 |     "typescript",
44 |     "web",
45 |     "app-bridge",
46 |     "webview"
47 |   ],
48 |   "author": "OpenGameSystem",
49 |   "license": "MIT"
50 | }
51 | 


--------------------------------------------------------------------------------
/packages/app-bridge-web/src/index.test.ts:
--------------------------------------------------------------------------------
  1 | /**
  2 |  * @vitest-environment jsdom
  3 |  */
  4 | import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
  5 | import { createWebBridge, BridgeStores, State } from './index';
  6 | import { Operation } from 'fast-json-patch';
  7 | 
  8 | // Define test-specific types
  9 | interface CounterState extends State {
 10 |   value: number;
 11 | }
 12 | 
 13 | type CounterEvent =
 14 |   | {
 15 |       type: 'SET';
 16 |       value: number;
 17 |     }
 18 |   | {
 19 |       type: 'INCREMENT' | 'DECREMENT';
 20 |     };
 21 | 
 22 | interface TestStores extends BridgeStores {
 23 |   counter: {
 24 |     state: CounterState;
 25 |     events: CounterEvent;
 26 |   };
 27 |   [key: string]: {
 28 |     state: State;
 29 |     events: { type: string };
 30 |   };
 31 | }
 32 | 
 33 | describe('Web Bridge', () => {
 34 |   let bridge: ReturnType<typeof createWebBridge<TestStores>>;
 35 |   let mockPostMessage: ReturnType<typeof vi.fn>;
 36 | 
 37 |   beforeEach(() => {
 38 |     mockPostMessage = vi.fn();
 39 |     // Mock ReactNativeWebView
 40 |     (window as any).ReactNativeWebView = {
 41 |       postMessage: mockPostMessage
 42 |     };
 43 |     bridge = createWebBridge<TestStores>();
 44 |   });
 45 | 
 46 |   afterEach(() => {
 47 |     delete (window as any).ReactNativeWebView;
 48 |     vi.clearAllMocks();
 49 |   });
 50 | 
 51 |   describe('Bridge Ready', () => {
 52 |     it('sends BRIDGE_READY message when created', () => {
 53 |       expect(mockPostMessage).toHaveBeenCalledWith(
 54 |         JSON.stringify({
 55 |           type: 'BRIDGE_READY'
 56 |         })
 57 |       );
 58 |     });
 59 | 
 60 |     it('sends BRIDGE_READY message when ReactNativeWebView becomes available', () => {
 61 |       delete (window as any).ReactNativeWebView;
 62 |       mockPostMessage = vi.fn();
 63 |       
 64 |       // Make ReactNativeWebView available
 65 |       (window as any).ReactNativeWebView = {
 66 |         postMessage: mockPostMessage
 67 |       };
 68 | 
 69 |       // Create bridge after ReactNativeWebView is available
 70 |       bridge = createWebBridge<TestStores>();
 71 | 
 72 |       expect(mockPostMessage).toHaveBeenCalledWith(
 73 |         JSON.stringify({
 74 |           type: 'BRIDGE_READY'
 75 |         })
 76 |       );
 77 |     });
 78 |   });
 79 | 
 80 |   describe('isSupported', () => {
 81 |     it('returns true when ReactNativeWebView is available', () => {
 82 |       expect(bridge.isSupported()).toBe(true);
 83 |     });
 84 | 
 85 |     it('returns false when ReactNativeWebView is not available', () => {
 86 |       delete (window as any).ReactNativeWebView;
 87 |       expect(bridge.isSupported()).toBe(false);
 88 |     });
 89 |   });
 90 | 
 91 |   describe('getStore', () => {
 92 |     it('returns undefined for uninitialized stores', () => {
 93 |       // No state has been initialized yet
 94 |       const store = bridge.getStore('counter');
 95 |       expect(store).toBeUndefined();
 96 |     });
 97 | 
 98 |     it('returns the same store instance for the same key', () => {
 99 |       // First initialize a store
100 |       const stateInit = {
101 |         type: 'STATE_INIT',
102 |         storeKey: 'counter',
103 |         data: { value: 0 }
104 |       };
105 | 
106 |       window.dispatchEvent(
107 |         new MessageEvent('message', {
108 |           data: JSON.stringify(stateInit)
109 |         })
110 |       );
111 | 
112 |       // Now we can get the store
113 |       const store1 = bridge.getStore('counter');
114 |       const store2 = bridge.getStore('counter');
115 |       expect(store1).toBeDefined();
116 |       expect(store2).toBeDefined();
117 |       expect(store1).toBe(store2);
118 |     });
119 | 
120 |     it('returns a store with the correct methods', () => {
121 |       // Initialize store
122 |       const stateInit = {
123 |         type: 'STATE_INIT',
124 |         storeKey: 'counter',
125 |         data: { value: 0 }
126 |       };
127 | 
128 |       window.dispatchEvent(
129 |         new MessageEvent('message', {
130 |           data: JSON.stringify(stateInit)
131 |         })
132 |       );
133 | 
134 |       const store = bridge.getStore('counter');
135 |       expect(store).toBeDefined();
136 |       if (!store) throw new Error('Store not available');
137 |       
138 |       expect(store.getSnapshot).toBeDefined();
139 |       expect(store.subscribe).toBeDefined();
140 |       expect(store.dispatch).toBeDefined();
141 |     });
142 | 
143 |     it('getSnapshot returns state immediately after initialization', () => {
144 |       // Initialize store
145 |       const stateInit = {
146 |         type: 'STATE_INIT',
147 |         storeKey: 'counter',
148 |         data: { value: 42 }
149 |       };
150 | 
151 |       window.dispatchEvent(
152 |         new MessageEvent('message', {
153 |           data: JSON.stringify(stateInit)
154 |         })
155 |       );
156 | 
157 |       const store = bridge.getStore('counter');
158 |       if (!store) throw new Error('Store not available');
159 |       expect(store.getSnapshot()).toEqual({ value: 42 });
160 |     });
161 | 
162 |     it('getSnapshot returns updated state after receiving state update message', () => {
163 |       // First initialize the state
164 |       const stateInit = {
165 |         type: 'STATE_INIT',
166 |         storeKey: 'counter',
167 |         data: { value: 0 }
168 |       };
169 | 
170 |       window.dispatchEvent(
171 |         new MessageEvent('message', {
172 |           data: JSON.stringify(stateInit)
173 |         })
174 |       );
175 | 
176 |       const store = bridge.getStore('counter');
177 |       if (!store) throw new Error('Store not available');
178 | 
179 |       // Then update it with patch operations
180 |       const stateUpdate = {
181 |         type: 'STATE_UPDATE',
182 |         storeKey: 'counter',
183 |         operations: [
184 |           { op: 'replace', path: '/value', value: 42 }
185 |         ] as Operation[]
186 |       };
187 | 
188 |       window.dispatchEvent(
189 |         new MessageEvent('message', {
190 |           data: JSON.stringify(stateUpdate)
191 |         })
192 |       );
193 | 
194 |       expect(store.getSnapshot()).toEqual({ value: 42 });
195 |     });
196 |   });
197 | 
198 |   describe('store subscriptions', () => {
199 |     it('subscribe notifies listeners of state changes', () => {
200 |       // Initialize store
201 |       const stateInit = {
202 |         type: 'STATE_INIT',
203 |         storeKey: 'counter',
204 |         data: { value: 0 }
205 |       };
206 | 
207 |       window.dispatchEvent(
208 |         new MessageEvent('message', {
209 |           data: JSON.stringify(stateInit)
210 |         })
211 |       );
212 | 
213 |       const store = bridge.getStore('counter');
214 |       if (!store) throw new Error('Store not available');
215 |       
216 |       const listener = vi.fn();
217 |       store.subscribe(listener);
218 | 
219 |       // Listener should be called immediately with current state
220 |       expect(listener).toHaveBeenCalledWith({ value: 0 });
221 |       
222 |       // Reset the mock to see if it's called again with updates
223 |       listener.mockReset();
224 | 
225 |       // Send update
226 |       const stateUpdate = {
227 |         type: 'STATE_UPDATE',
228 |         storeKey: 'counter',
229 |         operations: [
230 |           { op: 'replace', path: '/value', value: 42 }
231 |         ] as Operation[]
232 |       };
233 | 
234 |       window.dispatchEvent(
235 |         new MessageEvent('message', {
236 |           data: JSON.stringify(stateUpdate)
237 |         })
238 |       );
239 | 
240 |       expect(listener).toHaveBeenCalledWith({ value: 42 });
241 |     });
242 | 
243 |     it('subscribe allows unsubscribing', () => {
244 |       // Initialize store
245 |       const stateInit = {
246 |         type: 'STATE_INIT',
247 |         storeKey: 'counter',
248 |         data: { value: 0 }
249 |       };
250 | 
251 |       window.dispatchEvent(
252 |         new MessageEvent('message', {
253 |           data: JSON.stringify(stateInit)
254 |         })
255 |       );
256 | 
257 |       const store = bridge.getStore('counter');
258 |       if (!store) throw new Error('Store not available');
259 |       
260 |       const listener = vi.fn();
261 |       const unsubscribe = store.subscribe(listener);
262 |       
263 |       // Should be called immediately with current state
264 |       expect(listener).toHaveBeenCalledWith({ value: 0 });
265 |       listener.mockReset();
266 |       
267 |       // Unsubscribe
268 |       unsubscribe();
269 | 
270 |       // Send update
271 |       const stateUpdate = {
272 |         type: 'STATE_UPDATE',
273 |         storeKey: 'counter',
274 |         operations: [
275 |           { op: 'replace', path: '/value', value: 42 }
276 |         ] as Operation[]
277 |       };
278 | 
279 |       window.dispatchEvent(
280 |         new MessageEvent('message', {
281 |           data: JSON.stringify(stateUpdate)
282 |         })
283 |       );
284 | 
285 |       // Listener should not be called after unsubscribe
286 |       expect(listener).not.toHaveBeenCalled();
287 |     });
288 |   });
289 | 
290 |   describe('event dispatching', () => {
291 |     it('dispatches events through postMessage', () => {
292 |       // Initialize store
293 |       const stateInit = {
294 |         type: 'STATE_INIT',
295 |         storeKey: 'counter',
296 |         data: { value: 0 }
297 |       };
298 | 
299 |       window.dispatchEvent(
300 |         new MessageEvent('message', {
301 |           data: JSON.stringify(stateInit)
302 |         })
303 |       );
304 | 
305 |       const store = bridge.getStore('counter');
306 |       if (!store) throw new Error('Store not available');
307 | 
308 |       // Dispatch an event
309 |       store.dispatch({ type: 'INCREMENT' });
310 | 
311 |       // Check that postMessage was called with the correct event
312 |       expect(mockPostMessage).toHaveBeenCalledWith(
313 |         JSON.stringify({
314 |           type: 'EVENT',
315 |           storeKey: 'counter',
316 |           event: { type: 'INCREMENT' }
317 |         })
318 |       );
319 |     });
320 | 
321 |     it('handles missing ReactNativeWebView gracefully', () => {
322 |       // Initialize store
323 |       const stateInit = {
324 |         type: 'STATE_INIT',
325 |         storeKey: 'counter',
326 |         data: { value: 0 }
327 |       };
328 | 
329 |       window.dispatchEvent(
330 |         new MessageEvent('message', {
331 |           data: JSON.stringify(stateInit)
332 |         })
333 |       );
334 | 
335 |       const store = bridge.getStore('counter');
336 |       if (!store) throw new Error('Store not available');
337 | 
338 |       // Remove ReactNativeWebView
339 |       delete (window as any).ReactNativeWebView;
340 | 
341 |       // This should not throw
342 |       store.dispatch({ type: 'INCREMENT' });
343 |     });
344 |   });
345 | 
346 |   describe('error handling', () => {
347 |     it('handles invalid message data gracefully', () => {
348 |       // Send invalid JSON
349 |       window.dispatchEvent(
350 |         new MessageEvent('message', {
351 |           data: 'invalid json'
352 |         })
353 |       );
354 | 
355 |       // This should not throw
356 |       expect(bridge.getStore('counter')).toBeUndefined();
357 |     });
358 | 
359 |     it('handles unknown message types gracefully', () => {
360 |       window.dispatchEvent(
361 |         new MessageEvent('message', {
362 |           data: JSON.stringify({
363 |             type: 'UNKNOWN',
364 |             storeKey: 'counter',
365 |             data: { value: 0 }
366 |           })
367 |         })
368 |       );
369 | 
370 |       // This should not throw
371 |       expect(bridge.getStore('counter')).toBeUndefined();
372 |     });
373 |   });
374 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-web/src/index.ts:
--------------------------------------------------------------------------------
  1 | import { applyPatch } from "fast-json-patch";
  2 | import type {
  3 |   Bridge,
  4 |   BridgeStores,
  5 |   Event,
  6 |   Store,
  7 |   Operation,
  8 | } from "@open-game-system/app-bridge-types";
  9 | 
 10 | export type { BridgeStores, State } from "@open-game-system/app-bridge-types";
 11 | 
 12 | /**
 13 |  * Message types for communication
 14 |  */
 15 | export type WebToNativeMessage =
 16 |   | { type: "EVENT"; storeKey: string; event: Event }
 17 |   | { type: "BRIDGE_READY" };
 18 | 
 19 | export type NativeToWebMessage<TStores extends BridgeStores = BridgeStores> = {
 20 |   type: "STATE_INIT";
 21 |   storeKey: keyof TStores;
 22 |   data: TStores[keyof TStores]["state"];
 23 | } | {
 24 |   type: "STATE_UPDATE";
 25 |   storeKey: keyof TStores;
 26 |   data?: TStores[keyof TStores]["state"];
 27 |   operations?: Operation[];
 28 | };
 29 | 
 30 | export interface WebViewBridge {
 31 |   postMessage: (message: string) => void;
 32 | }
 33 | 
 34 | declare global {
 35 |   interface Window {
 36 |     ReactNativeWebView?: WebViewBridge;
 37 |   }
 38 | }
 39 | 
 40 | /**
 41 |  * Creates a web bridge instance for use in web applications
 42 |  * This implementation receives state from the native side through WebView messages
 43 |  *
 44 |  * @template TStores Store definitions for the bridge
 45 |  * @returns A Bridge instance
 46 |  */
 47 | export function createWebBridge<
 48 |   TStores extends BridgeStores
 49 | >(): Bridge<TStores> {
 50 |   // Internal state storage
 51 |   const stateByStore = new Map<
 52 |     keyof TStores,
 53 |     TStores[keyof TStores]["state"]
 54 |   >();
 55 | 
 56 |   // Store instances by key
 57 |   const stores = new Map<
 58 |     keyof TStores,
 59 |     Store<TStores[keyof TStores]["state"], TStores[keyof TStores]["events"]>
 60 |   >();
 61 | 
 62 |   // Listeners for state changes by store key
 63 |   const stateListeners = new Map<
 64 |     keyof TStores,
 65 |     Set<(state: TStores[keyof TStores]["state"]) => void>
 66 |   >();
 67 | 
 68 |   // Listeners for store availability changes
 69 |   const storeListeners = new Set<() => void>();
 70 | 
 71 |   /**
 72 |    * Notify all listeners for a specific store's state changes
 73 |    */
 74 |   const notifyStateListeners = <K extends keyof TStores>(storeKey: K) => {
 75 |     const listeners = stateListeners.get(storeKey);
 76 |     if (listeners && stateByStore.has(storeKey)) {
 77 |       const state = stateByStore.get(storeKey);
 78 |       listeners.forEach((listener) => listener(state!));
 79 |     }
 80 |   };
 81 | 
 82 |   /**
 83 |    * Notify all listeners that a store's availability has changed
 84 |    */
 85 |   const notifyStoreListeners = () => {
 86 |     storeListeners.forEach((listener) => listener());
 87 |   };
 88 | 
 89 |   // Handle messages from native
 90 |   if (typeof window !== "undefined" && window.ReactNativeWebView) {
 91 |     console.log("[Web Bridge] ReactNativeWebView detected. Adding message listener and sending BRIDGE_READY.");
 92 |     // Send bridge ready message
 93 |     window.ReactNativeWebView.postMessage(JSON.stringify({ type: "BRIDGE_READY" }));
 94 | 
 95 |     const messageHandler = (event: MessageEvent) => {
 96 |       // console.log("[Web Bridge] Received raw message event:", event); // Log raw event
 97 |       try {
 98 |         const message = JSON.parse(event.data) as NativeToWebMessage;
 99 |         // console.log("[Web Bridge] Parsed message data:", message); // Log parsed message
100 |         if (message.type === "STATE_INIT") {
101 |           // console.log(`[Web Bridge] Handling STATE_INIT for store '${String(message.storeKey)}'`, message.data); // Log init handling
102 |           if (message.data === null) {
103 |             // Remove state when receiving null data
104 |             stateByStore.delete(message.storeKey as keyof TStores);
105 |           } else {
106 |             // Initialize state with full data
107 |             stateByStore.set(message.storeKey as keyof TStores, message.data);
108 |           }
109 |           notifyStateListeners(message.storeKey as keyof TStores);
110 |           notifyStoreListeners();
111 |         } else if (message.type === "STATE_UPDATE") {
112 |           // console.log(`[Web Bridge] Handling STATE_UPDATE for store '${String(message.storeKey)}'`, message.operations); // Log update handling
113 |           if (message.data === null) {
114 |             // Remove state when receiving null data
115 |             stateByStore.delete(message.storeKey as keyof TStores);
116 |             notifyStateListeners(message.storeKey as keyof TStores);
117 |             notifyStoreListeners();
118 |           } else if (message.operations) {
119 |             // Apply patch operations
120 |             const currentState = stateByStore.get(
121 |               message.storeKey as keyof TStores
122 |             );
123 |             if (currentState) {
124 |               const result = applyPatch(currentState, message.operations);
125 |               stateByStore.set(
126 |                 message.storeKey as keyof TStores,
127 |                 result.newDocument
128 |               );
129 |               // console.log(`[Web Bridge] State updated for store '${String(message.storeKey)}' via patch:`, result.newDocument); // Log state after patch
130 |               notifyStateListeners(message.storeKey as keyof TStores);
131 |             }
132 |           }
133 |         }
134 |       } catch (error) {
135 |         console.error("[Web Bridge] Error handling message:", error); // Keep basic error log
136 |       }
137 |     };
138 | 
139 |     window.addEventListener("message", messageHandler);
140 | 
141 |     // Optional: Add cleanup function if the bridge instance can be destroyed
142 |     // () => window.removeEventListener("message", messageHandler);
143 | 
144 |   } else {
145 |     console.warn("[Web Bridge] ReactNativeWebView NOT detected.");
146 |   }
147 | 
148 |   return {
149 |     /**
150 |      * Check if the bridge is supported
151 |      * For web bridge, this checks if ReactNativeWebView is available
152 |      */
153 |     isSupported: () =>
154 |       typeof window !== "undefined" && !!window.ReactNativeWebView,
155 | 
156 |     /**
157 |      * Get a store by its key
158 |      * Returns undefined if the store doesn't exist
159 |      */
160 |     getStore: <K extends keyof TStores>(
161 |       storeKey: K
162 |     ): Store<TStores[K]["state"], TStores[K]["events"]> | undefined => {
163 |       // Only return a store if we have state for it
164 |       if (!stateByStore.has(storeKey)) return undefined;
165 | 
166 |       // Return existing store instance if we have one
167 |       let store = stores.get(storeKey) as
168 |         | Store<TStores[K]["state"], TStores[K]["events"]>
169 |         | undefined;
170 | 
171 |       // Create a new store if needed
172 |       if (!store) {
173 |         const storeImpl: Store<TStores[K]["state"], TStores[K]["events"]> = {
174 |           getSnapshot: () => stateByStore.get(storeKey)!,
175 |           subscribe: (listener: (state: TStores[K]["state"]) => void) => {
176 |             if (!stateListeners.has(storeKey)) {
177 |               stateListeners.set(storeKey, new Set());
178 |             }
179 |             const listeners = stateListeners.get(storeKey)!;
180 |             listeners.add(listener);
181 | 
182 |             // Notify immediately with current state
183 |             if (stateByStore.has(storeKey)) {
184 |               listener(stateByStore.get(storeKey)!);
185 |             }
186 | 
187 |             return () => {
188 |               listeners.delete(listener);
189 |             };
190 |           },
191 |           dispatch: async (event: TStores[K]["events"]): Promise<void> => {
192 |             console.log(`[Web Bridge] Dispatching event for store ${String(storeKey)}:`, event);
193 |             if (!window.ReactNativeWebView) {
194 |               console.warn(
195 |                 "[Web Bridge] Cannot dispatch events: ReactNativeWebView not available"
196 |               );
197 |               return;
198 |             }
199 |             const message: WebToNativeMessage = {
200 |               type: "EVENT",
201 |               storeKey: storeKey as string,
202 |               event,
203 |             };
204 |             console.log("[Web Bridge] Sending message to native:", message);
205 |             window.ReactNativeWebView.postMessage(JSON.stringify(message));
206 |           },
207 |           reset: () => {
208 |             // For web bridge, reset is a no-op since state is managed by native
209 |             console.warn("[Web Bridge] Reset operation not supported in web bridge");
210 |           },
211 |           // Add 'on' method to satisfy the interface
212 |           on: <EventType extends TStores[K]["events"]['type']>(
213 |             eventType: EventType,
214 |             _listener: (
215 |               event: Extract<TStores[K]["events"], { type: EventType }>,
216 |               store: Store<TStores[K]["state"], TStores[K]["events"]>
217 |             ) => Promise<void> | void
218 |           ): (() => void) => {
219 |               console.warn(`[Web Bridge] store.on("${eventType}", ...) was called, but listeners added on the web side are not executed. Add listeners on the native side or via the store's 'on' config.`);
220 |               // Return a no-op unsubscribe function
221 |               return () => {};
222 |           }
223 |         };
224 |         stores.set(storeKey, storeImpl);
225 |         store = storeImpl;
226 |       }
227 | 
228 |       return store;
229 |     },
230 | 
231 |     /**
232 |      * Set or remove a store for a given key
233 |      */
234 |     setStore: <K extends keyof TStores>(
235 |       key: K,
236 |       store: Store<TStores[K]["state"], TStores[K]["events"]> | undefined
237 |     ) => {
238 |       if (store === undefined) {
239 |         stores.delete(key);
240 |         stateByStore.delete(key);
241 |       } else {
242 |         stores.set(key, store);
243 |         const snapshot = store.getSnapshot();
244 |         if (snapshot !== undefined) {
245 |           stateByStore.set(key, snapshot);
246 |         }
247 |       }
248 |       notifyStoreListeners();
249 |     },
250 | 
251 |     /**
252 |      * Subscribe to store availability changes
253 |      * Returns an unsubscribe function
254 |      */
255 |     subscribe: (listener: () => void) => {
256 |       storeListeners.add(listener);
257 |       return () => {
258 |         storeListeners.delete(listener);
259 |       };
260 |     },
261 |   };
262 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-web/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "extends": "../../tsconfig.json",
 3 |   "compilerOptions": {
 4 |     "outDir": "./dist",
 5 |     "declarationDir": "./dist",
 6 |     "composite": true,
 7 |     "declarationMap": true,
 8 |     "lib": ["dom", "dom.iterable", "esnext"]
 9 |   },
10 |   "include": ["src"],
11 |   "references": [
12 |     { "path": "../app-bridge-types" }
13 |   ]
14 | } 


--------------------------------------------------------------------------------
/packages/app-bridge-web/tsup.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from 'tsup';
 2 | 
 3 | export default defineConfig({
 4 |   entry: ['src/index.ts'],
 5 |   format: ['cjs', 'esm'],
 6 |   dts: { resolve: true },
 7 |   splitting: false,
 8 |   sourcemap: true,
 9 |   clean: true,
10 |   external: ['@open-game-system/app-bridge-types'],
11 | }); 


--------------------------------------------------------------------------------
/packages/app-bridge-web/vitest.config.ts:
--------------------------------------------------------------------------------
 1 | import { defineConfig } from "vitest/config";
 2 | 
 3 | export default defineConfig({
 4 |   test: {
 5 |     environment: "jsdom",
 6 |     globals: true,
 7 |     include: ["src/**/*.test.{ts,tsx}"],
 8 |     coverage: {
 9 |       provider: "v8",
10 |       reporter: ["text", "json", "html"],
11 |     },
12 |   },
13 | }); 


--------------------------------------------------------------------------------
/pnpm-workspace.yaml:
--------------------------------------------------------------------------------
1 | packages:
2 |   - 'packages/*'
3 |   - 'examples/*' 


--------------------------------------------------------------------------------
/tsconfig.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "compilerOptions": {
 3 |     "target": "es2018",
 4 |     "module": "esnext",
 5 |     "moduleResolution": "node",
 6 |     "declaration": true,
 7 |     "sourceMap": true,
 8 |     "declarationMap": true,
 9 |     "strict": true,
10 |     "esModuleInterop": true,
11 |     "skipLibCheck": true,
12 |     "forceConsistentCasingInFileNames": true,
13 |     "lib": ["es2018", "dom"],
14 |     "composite": true
15 |   }
16 | } 


--------------------------------------------------------------------------------
/turbo.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "$schema": "https://turbo.build/schema.json",
 3 |   "tasks": {
 4 |     "lint": {
 5 |       "outputs": []
 6 |     },
 7 |     "test": {
 8 |       "dependsOn": ["build"],
 9 |       "inputs": ["**/*.{ts,tsx,js,jsx}"]
10 |     },
11 |     "build": {
12 |       "dependsOn": ["^build"],
13 |       "outputs": [
14 |         "dist/**",
15 |         "node_modules/.cache/metro/**"
16 |       ]
17 |     },
18 |     "dev": {
19 |       "cache": false,
20 |       "persistent": true
21 |     }
22 |   }
23 | }
24 | 


--------------------------------------------------------------------------------