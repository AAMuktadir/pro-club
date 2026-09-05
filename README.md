# Pro-Club

A full-stack sports club management platform for managing clubs, players, divisions, profiles, and club-related statistics.

Pro-Club was built as a personal learning project focused on full-stack application architecture, authentication, protected workflows, data management, and responsive dashboard-style interfaces.

🌐 **Live Demo:** https://proclubs.vercel.app/  
💻 **GitHub:** https://github.com/AAMuktadir/pro-club

---

## Overview

Pro-Club provides a centralized platform for creating and managing football clubs, player profiles, club information, divisions, and related data.

The application includes authentication, protected routes, club management workflows, searchable directories, dashboard statistics, and responsive interfaces.

It was developed to explore practical full-stack patterns using Next.js, MongoDB, JWT authentication, and server-side application logic.

---

## Features

### Club Registration & Management

Users can create and manage club information through dedicated club-management workflows.

Features include:

- Club registration
- Club profile management
- Club information editing
- Division assignment
- Club rating information
- Club statistics
- Club search and filtering

### Player Management

The platform includes player-focused functionality such as:

- Player profiles
- Player directory
- Player information management
- Player search
- Player filtering
- Club-player association

### Club Profiles

Each club can maintain a structured profile containing relevant club information.

The club profile experience is designed to provide a centralized view of:

- Club details
- Division
- Rating
- Players
- Statistics
- Management information

### Division Tracking

Clubs can be organized and tracked by division.

This supports structured competition-related data and provides a clearer way to categorize clubs.

### Search & Filtering

Users can search and filter available data to quickly locate clubs and players.

Supported workflows include:

- Club search
- Player search
- Club filtering
- Player filtering

### Management Dashboard

The application includes dashboard-style interfaces for managing club-related data and viewing useful information.

Dashboard functionality includes:

- Club information
- Player information
- Division data
- Statistics
- Management actions

### Authentication

The application includes user authentication using:

- JWT
- bcrypt
- Protected routes
- Middleware-based access control

Sensitive account functionality is restricted to authenticated users.

---

## Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS

### Backend

- Next.js server-side functionality
- Node.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Tokens (JWT)
- bcrypt
- Middleware-based route protection

### Deployment

- Vercel

---

## Application Architecture

A simplified application flow:

```text
User
 │
 ├── Register / Login
 │
 ▼
Authentication Layer
 │
 ├── bcrypt
 │
 └── JWT
 │
 ▼
Protected Application
 │
 ├── Club Management
 ├── Player Management
 ├── Club Profiles
 ├── Division Tracking
 └── Dashboard
 │
 ▼
Server-Side Logic
 │
 ▼
MongoDB / Mongoose
```

---

## Authentication Flow

The application uses JWT-based authentication.

A simplified flow:

```text
User Credentials
      ↓
Authentication Request
      ↓
Password Verification with bcrypt
      ↓
JWT Generation
      ↓
Authenticated Session
      ↓
Protected Routes
```

Middleware is used to restrict access to application areas that require authentication.

---

## Interesting Technical Implementation

### Protected Club Management

Club-management functionality is separated from public application routes.

Protected sections include workflows such as:

```text
/manage-club
/club-profile
```

Authentication middleware checks access before allowing users to interact with these areas.

### MongoDB Data Modeling

MongoDB and Mongoose are used to manage application entities such as:

- Users
- Clubs
- Players
- Divisions
- Club-related information

Mongoose provides schema-based data modeling and application-level database interaction.

### Search & Filtering

Club and player directories support search and filtering to make larger collections easier to navigate.

The general interaction follows:

```text
User Search / Filter
       ↓
Application State
       ↓
Filtered Club / Player Results
```

### Dashboard-Oriented UI

The application uses dashboard-style layouts to organize management workflows and statistics.

This helps separate operational actions from public-facing profile views.

### Responsive Interfaces

The interface is designed to adapt across different screen sizes while maintaining usable club and player management workflows.

---

## Core Data Areas

The application is organized around several main entities:

```text
Users
Clubs
Players
Divisions
Club Profiles
Statistics
```

These entities work together to provide the overall club-management experience.

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/AAMuktadir/pro-club.git
cd pro-club
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

The application requires configuration for services such as:

- MongoDB connection
- JWT authentication

Create the appropriate local environment file and add the environment variables expected by the current project code.

Do not commit private credentials or secrets to Git.

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Build

```bash
npm run build
npm start
```

---

## Deployment

Pro-Club is deployed on Vercel.

🌐 https://proclubs.vercel.app/

Required production environment variables should be configured through the deployment environment rather than committed to the repository.

---

## Project Status

**Personal / Learning Project**

The project is functional and demonstrates full-stack club-management workflows, authentication, database integration, and dashboard development.

Development and improvements may continue over time.

---

## Future Improvements

Potential improvements include:

- Expand player statistics
- Add richer club analytics
- Improve division and competition workflows
- Add role-based permissions
- Add stronger input validation
- Improve error handling
- Add automated testing
- Improve accessibility
- Expand responsive behavior
- Add more detailed activity/history tracking
- Improve administrative management workflows

---

## What I Learned

This project provided practical experience with:

- Full-stack Next.js development
- MongoDB data modeling
- Mongoose
- JWT authentication
- Password hashing with bcrypt
- Middleware-based route protection
- Search and filtering
- Dashboard development
- Club and player data management
- Responsive application design

---

## About Me

I'm **Abdullah Al Muktadir**, a Full Stack Developer with 4+ years of experience building enterprise applications, internal business systems, e-commerce platforms, and modern web applications.

My primary areas of work include:

- Next.js
- React
- TypeScript
- Node.js
- REST APIs
- PostgreSQL
- MongoDB
- AWS
- Docker
- Linux
- CI/CD

---

## Connect

- **Portfolio:** https://muktadir.netlify.app
- **LinkedIn:** https://linkedin.com/in/aa-muktadir
- **GitHub:** https://github.com/AAMuktadir
- **Email:** muktadir.96@gmail.com

---

## Usage

This project is intended for personal development, learning, and demonstration purposes.

Feel free to explore the implementation and use the project as a reference for learning full-stack application architecture and club-management workflows.
