# 🛡️ Adventures Guild Project

Welcome to the **Adventures Guild**, a project built to bring the organizational and ranking structure of the classic **isekai** adventurer's guild into a modern, virtual platform.

This Project acts as the core system for tracking adventurer status, managing the job board, and linking real-world skills to a fantastical profile.

---

## ✨ Concept and Vision

The core vision is to gamify professional and personal achievements by mapping them onto a familiar fantasy framework. Imagine a user's career progress being tracked not just as promotions, but as **rank ups** within the Guild.

### Core Tropes Mimicked:

* **Adventurer Ranks:** Users start at rank F and progress to rank S based on experience and successful quest completion.
* **The Job Board:** A centralized location for available **Quests** (jobs/tasks) that are filtered by rank.
* **Guild Masters:** Specific high-ranking users oversee virtual locations, acting as regional leaders or project managers.
* **Adventurer Profile:** A user's profile is their character sheet, detailing their rank, titles, skills, and quest history.

---

## 🚀 Key Features

### 1. User & Rank Management
The foundation of the Guild.

* **User Profiles:** Detailed records for all adventurers, including personal identification and credentials.
* **Rank Progression:** A fixed hierarchy of ranks (F, E, D, C, B, A, S). User rank is a central field that governs access to quests and abilities.
* **Audit Logging (`Change`):** A robust system that tracks every significant change to a user's profile (e.g., a rank change), ensuring complete data integrity and history.

### 2. The Quest Board (Job Management)
The Guild's primary function—connecting adventurers to tasks.

* **Quests:** Every job or task is registered as a **Quest**. Quests are assigned a minimum rank required for acceptance.
* **Rank Gating:** The system strictly enforces that an adventurer can only view or accept Quests at or below their current rank.
* **Quest History:** Tracking of accepted, completed, and failed Quests to calculate an adventurer's experience and reputation.

### 3. World & Governance
Adding geographical and organizational structure.

* **Virtual Locations:** Jobs are tied to specific virtual regions or domains (e.g., "The Forest of Code," "The Crystalline Tower of DevOps").
* **Guild Masters:** High-level adventurers are designated as **Guild Masters** and assigned oversight of a specific Virtual Location.

### 4. Skills, Titles, and Social Integration
Linking fantasy status to real-world context.

* **Skills:** Future plan to link a user's profile to external professional profiles (e.g., **LinkedIn**) to import and track verifiable **Skills**.
* **Titles:** Users can earn **Titles** (e.g., *Slayer of Bugs*, *Master of the Deployment Orb*) based on unique achievements or rank.

---

## 🛠️ Technical Design Notes

The API is built using modern architectural patterns to ensure scalability and reliability:

* **NestJS (Node.js):** Utilizes the powerful, modular architecture for backend development.
* **GraphQL:** Uses the **Code-First** approach to define a flexible and efficient schema for querying and mutating data.
* **TypeORM:** Manages data persistence and complex relationships across entities.
* **Transactional Integrity:** Critical operations, such as changing a user's rank and logging that change, are wrapped in database transactions to guarantee atomicity and data safety.
* **Polymorphic Relationships:** The `Change` log employs a polymorphic association pattern to reference any entity type (User, Quest, Location, etc.) without creating rigid database foreign key constraints for every single possibility.

---

## 🗺️ Architectural Roadmap

The Adventures Guild is transitioning to a **microservices-based architecture** supported by a modern, decoupled frontend.

### Current Architecture
* **Monolith Core:** NestJS (GraphQL) handles all core business logic (Users, Ranks, Changes) and data access.

### Future Architecture

The system will transition to an **Event-Driven Architecture (EDA)** where microservices communicate via an internal message broker.

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **Next.js** | Provides a modern, responsive user interface for adventurers to view their profiles, manage quests, and interact with the job board. |
| **Core API Gateway** | NestJS/GraphQL | Remains the primary entry point for the frontend, consolidating data from various microservices. |
| **Event Bus** | Redis/Kafka/RabbitMQ | The central messaging layer for all microservices to publish and consume events (e.g., `RankUpEvent`, `QuestCompletedEvent`). |
| **Microservices** | NestJS/Custom | Dedicated services to handle specific domains (e.g., Quest Management, Social Sync, Title Generation). |

---

## 🔮 Future Works and Expansion

I plan to expand the project into two major areas to increase performance, user experience, and feature complexity.

### 1. 🌐 Next.js Frontend Application

A dedicated, decoupled frontend application will be developed using **Next.js** to provide a superior, dynamic user experience.

* **User Dashboard:** A personalized hub for adventurers to track their progress, view active quests, and manage their profile.
* **Server-Side Rendering (SSR) & Static Site Generation (SSG):** Leveraging Next.js capabilities for performance gains, especially for public-facing profiles or static guild data.
* **GraphQL Client:** Utilizing tools like Apollo Client or Relay to efficiently consume the data exposed by the NestJS GraphQL API.

### 2. ⚡ Event-Driven Microservices

To handle complex, asynchronous actions like rank calculation, quest management, and external data synchronization, the core application will be broken down into dedicated microservices communicating via an **Event Bus**.

| Microservice | Purpose | Example Event Consumption |
| :--- | :--- | :--- |
| **Quest Service** | Manages the creation, assignment, and completion of all Quests. | Consumes `UserRankUpdateEvent` to adjust quest eligibility caches. |
| **Title Service** | Responsible for generating and assigning unique **Titles** (e.g., 'Slayer of Bugs') based on achievements. | Consumes `QuestCompletedEvent` to check for title-earning criteria. |
| **Social Sync Service** | Handles integration with external platforms (e.g., LinkedIn) to verify and sync adventurer **Skills**. | Consumes a `ProfileCreatedEvent` to trigger initial external data fetch. |
| **Notification Service** | Sends real-time updates and notifications (e.g., "Your Rank has increased!") to users via websockets or email. | Consumes **any** major system event (e.g., `RankUpEvent`, `QuestFailedEvent`). |

This shift ensures the core **User/Rank API** remains highly focused, while complex, scalable features like Quest management and external synchronization are handled by independent, resilient services.

---

## 🤝 Contribution and Roadmap

This project is a living application of modern backend principles applied to a fun concept.

Future development will focus on the complex **Quest/Job Board** logic, implementing **Guild Master** oversight, and designing the **Skills/Titles** structure.