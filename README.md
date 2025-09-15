# Frontend

## Candidate Screening & Resume Standardization Platform

A React-based web platform to manage job candidate workflows including **job enrichment**, **resume uploads**, **LinkedIn uploads**, **candidate screening**, and **resume standardization**. The platform interacts with a backend API to fetch and process candidate data.

## Features

1. **Job Enrichment**
   - Input a job description.
   - Automatically enrich job data with skills, responsibilities, and summary.
   - Proceed to resume upload after enrichment.

2. **Resume Upload**
   - Upload multiple resumes (PDF, DOCX).
   - Supports backtracking without losing uploaded files.
   - Tracks upload status for each candidate.

3. **LinkedIn Upload**
   - Upload LinkedIn profiles for additional candidate information.

4. **Candidate Screening**
   - Screen resumes using backend API and job description.
   - Calculates a **fit score** for each candidate.
   - Displays results with colored badges:  
     - Green: Selected (Fit Score > 50%)  
     - Red: Rejected (Fit Score ≤ 50%)

5. **Standardized Resume**
   - Standardizes selected resumes via backend API.
   - Displays resumes with **alias name** extracted from content.
   - Preview resumes in a table.
   - Download resumes as **PDF** or **TXT**, optionally with company logo.

6. **Responsive UI**
   - Mobile-friendly and dynamic stepper navigation.
   - Maintains state across navigation steps.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios  
- **Icons:** React Icons (`FaFilePdf`, `FaFileWord`)  
- **Backend API:** REST endpoints for:
  - `/api/job/enrich` → Job enrichment  
  - `/api/resume/screen` → Candidate screening  
  - `/api/resume/standardize/{candidateId}` → Resume standardization  

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/YourUsername/your-repo.git
cd your-repo

## Tech Used

### Frontend
- **React** – UI library for building dynamic interfaces  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **Axios** – HTTP client for API calls  
- **React Icons** – For PDF, Word, and other file type icons  

### Backend (API)
- **Spring Boot** – REST API backend  
- **Java** – Core backend language  
- **Docker** – Containerization for deployment  
- **Janino / JavaCompiler** – For dynamic Java code execution in candidate screening  

### Others
- **File Handling** – Upload, preview, and download candidate resumes  
- **PDF Generation** – For standardized resume downloads (with optional logo)  
- **State Management** – React `useState` to persist data across workflow steps  



#Backend
# TalentAI Resume Service

A Spring Boot service for **resume upload, LinkedIn profile intake, AI-based candidate screening, and standardized resume generation**, integrated with **Azure OpenAI** for parsing and scoring.

---

## Features

- Upload resumes (PDF, DOCX, TXT) and parse using Azure OpenAI to extract:
  - Name
  - Email
  - Skills
  - Experience
  - Education
- Upload LinkedIn profiles
- AI-based candidate screening with a numeric score
- Generate standardized text-based resumes
- In-memory storage of candidate profiles (can be extended to DB)
- Fully configurable for Azure OpenAI API

---

## Prerequisites

- Java 17+
- Maven or Gradle
- Spring Boot 3.x
- Azure OpenAI API Key and Deployment
- Optional: IDE (IntelliJ, VS Code)

---

## Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <project-folder>

