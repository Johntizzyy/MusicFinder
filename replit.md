# Overview

This is a full-stack music discovery application built with React (frontend) and Express.js (backend). The application allows users to search for music using the iTunes API, preview tracks, and manage a personal favorites collection. The frontend features a modern UI built with shadcn/ui components and Tailwind CSS, while the backend provides a RESTful API structure with database integration capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for Home, Favorites, and 404 handling
- **UI Framework**: shadcn/ui components with Radix UI primitives and Tailwind CSS for styling
- **State Management**: React Query (@tanstack/react-query) for server state and custom hooks for local state
- **Animation**: Framer Motion for smooth transitions and micro-interactions
- **Theme System**: Custom dark/light mode implementation with localStorage persistence

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage Pattern**: Interface-based storage layer with in-memory implementation for development and PostgreSQL support for production
- **Development Setup**: Vite integration for hot reloading in development mode
- **API Structure**: RESTful endpoints under `/api` prefix with centralized error handling

## Data Management
- **ORM**: Drizzle ORM with schema-first approach defined in `shared/schema.ts`
- **Database**: PostgreSQL (configured but using in-memory storage as fallback)
- **Migrations**: Drizzle Kit for database schema migrations
- **Type Safety**: Generated TypeScript types from database schema using drizzle-zod

## Component Architecture
- **Design System**: Consistent component library with shadcn/ui providing base components
- **Custom Components**: Specialized music-related components (Player, TrackCard, SearchBar)
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## State Management Strategy
- **Server State**: React Query for API calls, caching, and synchronization
- **Client State**: React hooks for component-level state and custom hooks for cross-component state
- **Persistence**: localStorage for favorites and user preferences like theme settings
- **Form Handling**: React Hook Form with Zod validation schemas

# External Dependencies

## Third-Party APIs
- **iTunes Search API**: Primary data source for music search functionality, track information, and audio previews
- **CORS Handling**: Direct client-side API calls to iTunes with appropriate error handling

## Database Services
- **Neon Database**: PostgreSQL hosting service (@neondatabase/serverless driver)
- **Connection Pool**: Built-in connection pooling for production database connections

## UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Feather-inspired icon library for consistent iconography
- **Google Fonts**: Inter and other web fonts for typography

## Development Tools
- **Vite**: Fast build tool with hot module replacement and optimized bundling
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

## Animation and Interaction
- **Framer Motion**: Animation library for smooth transitions and gesture handling
- **Embla Carousel**: Lightweight carousel component for image galleries
- **React Day Picker**: Date selection component for calendar functionality