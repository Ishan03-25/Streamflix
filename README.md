OpenSoft GC 2025 - Enhancing User Experience in a Movie Database Website with MongoDB Atlas

Overview

This project aims to enhance the user experience in a movie database website by integrating advanced search and video playback functionalities. Using MongoDB Atlas Search, the system implements autocomplete search, fuzzy matching, and semantic search. Additionally, advanced video playback options are incorporated to improve user engagement and usability.

Features

1. Authorization and Authentication (20 Points)

Secure user authentication using OAuth2, JWT, or other industry-standard protocols.

Ensures only authorized users can access platform features.

2. Autocomplete Search (25 Points)

MongoDB Atlas Search enables efficient autocomplete functionality.

Partial queries sent from the client-side return relevant movie titles in real-time.

Users receive immediate feedback with dynamic search suggestions.

3. Fuzzy Search (25 Points)

Handles typos and spelling variations using fuzzy matching algorithms.

Configurable edit distance ensures optimal balance between precision and recall.

Enhances search accuracy by providing relevant matches even with misspellings.

4. Video Playback Options (15 Points)

Integration of a custom video player.

Features include play, pause, seek, volume control, and additional playback settings.

Users can select different resolution settings and adjust playback speed.

5. Semantic Search (Bonus: 15 Points)

Leverages MongoDB Vector Search for advanced semantic understanding.

Uses sentence embeddings to generate vector-based representations of movie plots.

Enables context-aware and intelligent search beyond simple keyword matching.

Tech Stack

Frontend: React, Next.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: OAuth2, JWT

Search Engine: MongoDB Atlas Search, Vector Search

Video Player: Custom implementation using HTML5 Video API, HLS.js

Implementation Details

User Interface

Real-time autocomplete feature in the search bar.

Users can input movie preferences based on genres and descriptions.

Dynamic suggestions appear as users type.

Backend Integration

Search queries are processed using MongoDB Atlas Search.

Backend handles autocomplete, fuzzy matching, and semantic search.

Results are formatted and sent to the frontend for a seamless experience.

Bonus Features

Semantic search: Uses open-source NLP models for vector embeddings.

Improved search ranking: Adjusts search results based on user behavior.

Challenges Faced & Solutions

Challenge

Solution

Managing large-scale movie datasets efficiently

Indexed key fields in MongoDB Atlas for faster queries

Implementing efficient fuzzy search without high latency

Tuned search parameters to optimize performance

Creating an intuitive video player with adaptive bitrate streaming

Used HLS.js for smooth playback

Future Enhancements

Voice-based search for hands-free movie discovery.

AI-powered recommendations based on user watch history.

Offline mode for video playback.

Deployment Details

Hosting: Vercel (Frontend), AWS/GCP (Backend)

Database: Hosted on MongoDB Atlas with production-ready configurations

Submission Guidelines

GitHub Repository: Create a public repository for the project.

Video Demonstration: Upload a walkthrough video to Google Drive (public access required) and provide the link.

Project Report: Include a detailed documentation covering:

Introduction

Features & Implementation

Tech Stack Justification

Challenges & Solutions

Future Enhancements

Deployment Details (if applicable)

References

MongoDB Atlas Search Documentation

MongoDB University

GitHub Student Pack
