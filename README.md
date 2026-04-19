# Mini Notes App

A full-stack, modern Mini Notes application built with Next.js, featuring a clean minimalist SaaS aesthetic, smooth animations, and a seamless light/dark theme toggle.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete notes.
- **Modern Tech Stack**: Built with Next.js (App Router), React, and TypeScript.
- **MongoDB Database**: Persistent storage utilizing Mongoose models.
- **Beautiful UI**: 
  - Pure CSS implementation configured for both clean White (Light Mode) and #2b2b2b Slate (Dark Mode) themes.
  - Built-in theme toggler that persists your preferences locally.
  - Premium, subtle shadows, focus outlines, and input layouts akin to enterprise SaaS applications.
- **Smooth Animations**: Animated interactions and layout transitions powered by Framer Motion.
- **Search Capability**: Instantly search and filter through your existing notes.
- **Refined Loading States**: Granular loading feedback (saving spinners, exact-note deletion spinners).
- **Next.js 15 Ready**: Codebase accounts for asynchronous Route Handler parameters perfectly.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) via Mongoose
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📦 Getting Started

### Prerequisites

You need `Node.js` installed and a `MongoDB` instance (like MongoDB Atlas) ready.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd notes-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root of the project and define your MongoDB URI:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/MiniNotes
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to start taking notes.

## 📁 Project Structure

- `app/` - Contains the primary Next.js (App Router) pages, layouts, and API routes (`/api/notes`).
- `models/` - Contains the Mongoose database schemas (`Note.ts`).
- `lib/` - Holds utility functions, including the cached MongoDB connection file (`mongodb.ts`).

## 🎨 Theme Architecture

The UI relies on standard CSS Modules along with global CSS variables to orchestrate themes cleanly without heavy frameworks like Tailwind. Switch themes seamlessly via the top-right sun/moon icon.

## 📝 License

This project is open-source and available for all learning or professional iterations.
