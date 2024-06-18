# Landing Page Dashboard

## Overview

The Landing Page Dashboard is a web application built with Next.js 14 and Tailwind CSS, designed to manage and visualize landing pages. It provides functionality for creating, editing, previewing, and viewing landing pages. The application includes components for form rendering, error handling, and layout management.

### Deployed Link

[https://landing-page-dashboard-sigma.vercel.app/](https://landing-page-dashboard-sigma.vercel.app/)

## Features

- **Form Factory**: Dynamically renders components based on type for landing page creation.
- **Landing Page Form**: Component for editing and viewing landing page details.
- **Layout**: Provides a consistent UI with navigation for managing landing pages.
- **Error Boundary**: Catches errors in components to prevent crashes and show fallback UI.
- **Dynamic Pages**: Includes routes for creating, editing, previewing, and viewing landing pages.

## Tech Stack

- **Next.js 14**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling components.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for improved development experience.
- **Vercel**: Platform for deploying the application.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/landing-page-dashboard.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` to view the application.

## Project Structure

- **src/components/ErrorBoundary/index.tsx**: Error boundary component to handle errors gracefully.
- **src/components/FallbackScreen/index.tsx**: Fallback screen component displayed on error.
- **src/components/FormFactory/index.tsx**: Component type renderer for dynamic form rendering.
- **src/components/LandingPageForm/index.tsx**: Form for creating, editing, previewing, and viewing landing pages.
- **src/components/Layout/index.tsx**: Layout component providing a consistent UI with navigation.
- **src/pages/create.tsx**: Page for creating new landing pages.
- **src/pages/edit/[id].tsx**: Page for editing existing landing pages.
- **src/pages/preview/[id].tsx**: Page for previewing landing pages.
- **src/pages/view/[id].tsx**: Page for viewing landing pages.

## Usage

1. **Create Page**: Use the `/create` route to create a new landing page.
2. **Edit Page**: Access `/edit/[id]` to edit an existing landing page by ID.
3. **Preview Page**: View a preview of a landing page using `/preview/[id]`.
4. **View Page**: See the live version of a landing page via `/view/[id]`.

## Development

- **Component-Based**: Built using reusable components for modularity and maintainability.
- **State Management**: Utilizes `React Context API` for centralized state management.
- **Error Handling**: Implements an error boundary to catch and display errors without crashing the application.

## Deployment

The application is deployed on Vercel. Access it through the following link:

[https://landing-page-dashboard-sigma.vercel.app/](https://landing-page-dashboard-sigma.vercel.app/)

---

**Author**: Durgesh Kumar Singh\
**Contact**: dk829445@gmail.com

For any inquiries or feedback, please reach out via email.