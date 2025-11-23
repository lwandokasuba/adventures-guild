# 🛡️ Adventures Guild API

Welcome to the **Adventures Guild**, a project built to bring the organizational and ranking structure of the classic **isekai** adventurer's guild into a modern, virtual platform.

This API acts as the core system for tracking adventurer status, managing the job board, and linking real-world skills to a fantastical profile.

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

## 🤝 Contribution and Roadmap

This project is a living application of modern backend principles applied to a fun concept.

Future development will focus on the complex **Quest/Job Board** logic, implementing **Guild Master** oversight, and designing the **Skills/Titles** structure.