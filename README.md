\# 🏡 Property Listing Search Service (Full-Stack Assessment)



This workspace contains a completely production-ready, full-stack real estate listing aggregation and search system. The architecture features an enterprise-grade \*\*Java Spring Boot API Backend\*\* working in harmony with a decoupled \*\*React TypeScript User Interface\*\*. 



The entire engine operates dynamically over raw input feeds, ingestible directly from the locally bundled `sample\_listings.json` data matrix.



\---



\## 🏗️ Core Architecture Overview



The system is cleanly divided into two independent service frameworks:

1\. \*\*`/listing-search-service` (Backend):\*\* A standalone Java Spring Boot REST API that manages file ingestion data parsing via Jackson ObjectMappers, cross-field input parameters defense, dynamic scoring algorithms, and safe database pagination slices.

2\. \*\*`/listing-search-ui` (Frontend):\*\* A type-safe React UI component panel built with TypeScript, featuring active user entry forms, reactive loading indicators, graceful empty state views, and integrated validation error handling.



\---



\## 🚀 Local Quickstart, Building, \& Execution Roadmap



\### 📦 Prerequisites

Ensure your local workstation has the following environments configured globally:

\* \*\*Java Development Kit (JDK 17 or higher)\*\*

\* \*\*Apache Maven 3.6+\*\*

\* \*\*Node.js (v16+) \& npm\*\*



\---



\### ☕ Part A: Deploying the Java REST API Backend



1\. Open a terminal window and enter the backend engine folder:

&#x20;  ```bash

&#x20;  cd listing-search-service

&#x20;  ```

2\. \*\*Build and Test:\*\* Compile the core binaries and execute the comprehensive edge-case validation test suite:

&#x20;  ```bash

&#x20;  mvn clean package

&#x20;  ```

&#x20;  \*(Verifies out-of-bounds metrics, cross-field parameters failures, and alphabetical tie-breaking rules).\*

3\. \*\*Run Server:\*\* Launch the live web container instance:

&#x20;  ```bash

&#x20;  mvn spring-boot:run

&#x20;  ```

&#x20;  \*The api service initializes instantly and listens for query streams at: `http://localhost:8080/api/listings`\*



\---



\### ⚛️ Part B: Deploying the React TypeScript Frontend UI



1\. Open a second, separate terminal window and enter the user interface layout folder:

&#x20;  ```bash

&#x20;  cd listing-search-ui

&#x20;  ```

2\. \*\*Install Libraries:\*\* Restore the node ecosystem dependencies:

&#x20;  ```bash

&#x20;  npm install

&#x20;  ```

3\. \*\*Run Application:\*\* Launch the interactive tracking browser interface:

&#x20;  ```bash

&#x20;  npm start

&#x20;  ```

&#x20;  \*Windows will automatically launch a fresh window pane pointing to: `http://localhost:3000`\*



\---



\## 📐 Scoring Algorithm Strategy \& Relevance Metrics



The application implements a custom relevance scoring model that grades every matching property on a \*\*maximum scale of 100 points\*\*:



1\. \*\*Base Baseline Score (50 Points):\*\* Awarded immediately to any property passing strict input parameters to prevent ranking dropouts.

2\. \*\*Target Budget Affinity (Up to 30 Points):\*\* Uses an exponential decay function relative to user budget constraints:

&#x20;  \\\[\\text{Budget Score} = 30 \\times e^{-\\left(\\frac{\\vert{}P\_{\\text{listing}} - B\_{\\text{target}}\\vert{}}{B\_{\\text{target}} \\times 0.4}\\right)}\\]

&#x20;  This gracefully scores variance curves rather than enforcing rigid cutoffs.

3\. \*\*Inventory Recency Bonus (Up to 20 Points):\*\* Rewards fresh market inventory using a monthly decay curve based on listing age:

&#x20;  \\\[\\text{Recency Score} = \\frac{20}{1 + \\left(\\frac{\\text{Age in Days}}{30}\\right)}\\]



\* \*\*Tie-Breaking Rule:\*\* If two properties receive identical floating-point match scores, the sorting pipeline drops back to an alphabetic sort on the listing's unique `id` to ensure deterministic presentation order.



