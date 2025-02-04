# Twitter Clone with Next.js

A modern social media application built with Next.js, TypeScript, and Redux Toolkit. Features a clean, responsive design and real-time interactions.

## 🚀 Features

-   **Home Feed**: Real-time post stream with search functionality
-   **Explore**: Discover posts through tag-based filtering
-   **Bookmarks**: Save and organize your favorite posts
-   **Profile**: View and manage your posts
-   **Responsive Design**: Seamless experience across all devices

## 💻 Tech Stack

-   **Next.js 14**: For server-side rendering and optimal performance
-   **TypeScript**: Ensuring type safety and better developer experience
-   **Redux Toolkit**: Managing global state for posts and bookmarks
-   **Tailwind CSS**: Creating a modern, responsive UI
-   **JSON Server**: Simulating backend API for development

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/merttcetn/twitter-clone-with-next-js
```

2. Install dependencies:

```bash
npm install
```

3. Start the mock API server:

```bash
npm run json-server
```

4. Run the development server:

```bash
npm run dev
```

## 🌟 Feature Details

### Home Feed

-   Chronological post feed
-   Smart search with 1.5s debounce
-   Create and share new posts
-   View post comments
-   Like and bookmark functionality

### Explore

-   Filter posts by tags
-   Multi-tag selection support
-   Infinite scroll pagination

### Bookmarks

-   Save posts for later
-   Manage saved content
-   Quick access to favorite posts

### Profile

-   Personal post timeline
-   Infinite scroll for seamless browsing

## 🔧 Technical Implementation

### State Management

-   Centralized state with Redux Toolkit
-   Separate slices for posts and bookmarks
-   Async operations handled through Redux Toolkit's built-in tools

### Performance Optimizations

-   Debounced search functionality
-   Infinite scroll using Intersection Observer API
-   Caching strategies for improved load times

### Responsive Design

-   Mobile-first approach
-   Fluid layouts for all screen sizes
-   Flexible UI components with Tailwind CSS

## 🚦 API Structure

-   `GET /posts?_sort=timestamp&_order=desc`: Fetch chronological posts
-   `GET /posts?q={query}&_sort=timestamp&_order=desc`: Search posts by content
-   `POST /posts`: Create new posts (timestamp auto-generated)
-   `GET /posts?username={username}&_sort=timestamp&_order=desc`: Fetch user-specific posts
-   `GET /posts?_page={page}&_limit={limit}`: Paginated post retrieval

## 👨‍💻 Developer Notes

### Technical Challenges & Solutions

1. **Redux State Management**: Implemented custom type definitions and transformations to handle immutability challenges with comment structures
2. **Infinite Scroll**: Built a performant scroll implementation using Intersection Observer API
3. **Type Safety**: Comprehensive TypeScript implementation for robust error prevention
4. **Bookmark System**: In-memory bookmark storage with plans for persistent storage implementation

### Time Management

-   First day: Basic structure and home page implementation
-   Second day: Explore and Bookmarks pages
-   Third day: Profile page and general improvements
-   Fourth day: Bug fixes, documentation, eslint and build processes. I had trouble with eslint and build processes for the first time, so it took longer than expected.
