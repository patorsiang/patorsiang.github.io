# CV Generation Logic

**Version:** v1.0.0
**Status:** Final
**Owner:** Napatchol Thaipanich
**Project:** Portfolio Web + CV Generator

---

## 1. Purpose

The CV engine generates role-specific CV outputs from one consistent portfolio content source.

Instead of manually maintaining many CV versions, the system should:

1. Read structured profile data.
2. Select content based on a target role.
3. Rank the most relevant experience, projects, skills, awards, and education.
4. Group the selected content into a CV-friendly structure.
5. Output either ATS-friendly CV data or visual CV data.

The main goal is consistency:

* One source of truth for portfolio and CV content.
* Multiple role-specific CV versions.
* Easy export to JSON, HTML, PDF, and possibly Markdown.
* Better control over what is shown, hidden, shortened, or emphasized.

---

## 2. Core Flow

```text
role → filter → rank → group → output
```

### 2.1 Role

The user selects or configures a target role.

Example roles:

* `software_engineer`
* `frontend_engineer`
* `fullstack_engineer`
* `ai_ml_engineer`
* `security_engineer`
* `blockchain_engineer`
* `game_tools_engineer`
* `freelance_web_developer`
* `global_tech_profile`

Each role has its own configuration:

* Target title
* Priority skills
* Relevant industries
* Preferred project types
* Keywords for ATS
* Sections to include or exclude
* Maximum number of projects
* Maximum number of bullets per experience
* Tone and output style

---

### 2.2 Filter

The engine filters content from the source data.

Filtering decides whether an item should be included, hidden, or treated as optional.

Filter inputs:

* Role config
* Content tags
* Visibility status
* Confidentiality status
* Language
* Target country or market
* Output mode
* Freshness
* Manual pinning rules

Example filtering logic:

```text
Include item if:
- item.visibility = public
- item.status is not archived
- item.tags overlap with role.required_tags or role.preferred_tags
- item.confidentiality is allowed for this output

Exclude item if:
- item.visibility = private
- item.confidentiality = employer_confidential
- item.role_relevance_score is below minimum threshold
- item.language is unsupported for selected output
```

Filtering should be conservative. It is better to omit weak or irrelevant content than to overload the CV.

---

### 2.3 Rank

After filtering, the engine ranks items by relevance.

Ranking helps decide what appears first and what gets cut when space is limited.

Recommended ranking factors:

| Factor          | Description                                                | Example                                                     |
| --------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| Role match      | How strongly the item matches the target role              | React project ranks higher for the frontend role            |
| Keyword match   | ATS keyword overlap                                        | `Next.js`, `TypeScript`, `AWS`                              |
| Impact          | Clear outcome, measurable result, or strong responsibility | Reduced manual work, built a production platform            |
| Recency         | Newer work may rank higher                                 | Current or recent role/project                              |
| Depth           | Shows technical complexity                                 | ML dissertation, blockchain platform, full-stack system     |
| Differentiation | Makes the profile stand out                                | Law background, cybersecurity competitions, AI + blockchain |
| Evidence        | Has link, repo, demo, article, or certificate              | GitHub repo, live demo, write-up                            |
| Manual priority | User explicitly pins the item                              | Featured project pinned by the owner                        |

Suggested scoring model:

```text
score =
  roleMatch * 0.30 +
  keywordMatch * 0.20 +
  impact * 0.15 +
  recency * 0.10 +
  depth * 0.10 +
  differentiation * 0.10 +
  evidence * 0.05 +
  manualBoost
```

Manual boost should not completely override relevance, but it can help force important personal-brand items into the result.

---

### 2.4 Group

The ranked content is grouped into CV sections.

Default ATS CV grouping:

```text
Header
Summary
Skills
Work Experience
Selected Projects
Education
Awards & Activities
Languages
Interests / Additional
```

Default visual CV grouping:

```text
Hero / Header
Role Summary
Core Strengths
Experience Timeline
Featured Projects
Education
Awards & Activities
Skill Cloud / Skill Groups
Languages
Links
```

Grouping rules should depend on output mode and role config.

Examples:

* For `software_engineer`, work experience should appear before education.
* For `ai_ml_engineer`, selected ML projects may appear before older frontend work.
* For `frontend_engineer`, visual projects and web dashboards should be emphasised.
* For `security_engineer`, CTF, cybersecurity competitions, cryptography, and blockchain security-related projects should rank higher.
* For `global_tech_profile`, education, international study, cross-domain projects, and competitions should be balanced.

---

### 2.5 Output

The engine outputs structured CV data first.

Rendering should be a separate layer.

Recommended output pipeline:

```text
Generated CV JSON
    ↓
ATS template / Visual template
    ↓
HTML preview
    ↓
PDF export
    ↓
Optional Markdown export
```

The CV engine should not directly design the PDF. It should produce clean structured data that templates can render.

---

## 3. Role Configs

Role configs define how the engine behaves for each target role.

### 3.1 Role Config Shape

```ts
type CvRoleConfig = {
  id: string;
  label: string;
  targetTitle: string;
  summaryIntent: string;

  requiredTags: string[];
  preferredTags: string[];
  excludedTags?: string[];

  atsKeywords: string[];
  prioritySkillGroups: string[];
  priorityProjectTypes: string[];
  priorityExperienceTypes: string[];

  sectionOrder: CvSectionId[];

  limits: {
    maxPages: number;
    maxProjects: number;
    maxExperienceItems: number;
    maxBulletsPerExperience: number;
    maxSkillsPerGroup: number;
  };

  outputModes: CvOutputMode[];

  rules?: {
    includeEducationProjects?: boolean;
    includeInterests?: boolean;
    includeAwards?: boolean;
    includeLanguages?: boolean;
    allowCoursework?: boolean;
    preferRecentProjects?: boolean;
    preferProductionExperience?: boolean;
  };
};
```

---

### 3.2 Example: Full-Stack Engineer

```json
{
  "id": "fullstack_engineer",
  "label": "Full-Stack Engineer",
  "targetTitle": "Full-Stack Developer",
  "summaryIntent": "Show end-to-end product development ability across frontend, backend, cloud, data, and secure systems.",
  "requiredTags": ["frontend", "backend", "web", "software-engineering"],
  "preferredTags": ["react", "nextjs", "nodejs", "api", "cloud", "database", "security", "ai"],
  "excludedTags": ["too-academic", "unmaintained", "private-only"],
  "atsKeywords": [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "FastAPI",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "GCP",
    "Docker",
    "Git",
    "Agile"
  ],
  "prioritySkillGroups": ["programming", "frontend", "backend", "database", "cloud", "security"],
  "priorityProjectTypes": ["production-web", "fullstack-app", "dashboard", "api", "ai-product"],
  "priorityExperienceTypes": ["full-time", "freelance", "internship"],
  "sectionOrder": [
    "header",
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "awards",
    "languages"
  ],
  "limits": {
    "maxPages": 2,
    "maxProjects": 4,
    "maxExperienceItems": 5,
    "maxBulletsPerExperience": 4,
    "maxSkillsPerGroup": 8
  },
  "outputModes": ["ats", "visual"],
  "rules": {
    "includeEducationProjects": true,
    "includeInterests": false,
    "includeAwards": true,
    "includeLanguages": true,
    "allowCoursework": false,
    "preferRecentProjects": true,
    "preferProductionExperience": true
  }
}
```

---

### 3.3 Example: AI / ML Engineer

```json
{
  "id": "ai_ml_engineer",
  "label": "AI / ML Engineer",
  "targetTitle": "AI / Machine Learning Engineer",
  "summaryIntent": "Emphasize machine learning, applied AI systems, data pipelines, model evaluation, and software engineering ability.",
  "requiredTags": ["ai", "machine-learning", "python", "data"],
  "preferredTags": ["deep-learning", "computer-vision", "tensorflow", "scikit-learn", "pandas", "research", "backend"],
  "atsKeywords": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "scikit-learn",
    "Pandas",
    "NumPy",
    "Computer Vision",
    "Model Evaluation",
    "FastAPI",
    "Data Processing"
  ],
  "prioritySkillGroups": ["machine-learning", "programming", "backend", "data", "cloud"],
  "priorityProjectTypes": ["ml-research", "ml-system", "computer-vision", "ai-product"],
  "priorityExperienceTypes": ["full-time", "academic-project", "research-project"],
  "sectionOrder": [
    "header",
    "summary",
    "skills",
    "projects",
    "experience",
    "education",
    "awards",
    "languages"
  ],
  "limits": {
    "maxPages": 2,
    "maxProjects": 5,
    "maxExperienceItems": 4,
    "maxBulletsPerExperience": 3,
    "maxSkillsPerGroup": 8
  },
  "outputModes": ["ats", "visual"],
  "rules": {
    "includeEducationProjects": true,
    "includeInterests": false,
    "includeAwards": true,
    "includeLanguages": true,
    "allowCoursework": true,
    "preferRecentProjects": true,
    "preferProductionExperience": false
  }
}
```

---

### 3.4 Example: Security Engineer

```json
{
  "id": "security_engineer",
  "label": "Security Engineer",
  "targetTitle": "Security-Focused Software Engineer",
  "summaryIntent": "Show secure software development, cybersecurity learning, CTF activity, cryptography, and blockchain-related security exposure.",
  "requiredTags": ["security", "software-engineering"],
  "preferredTags": ["ctf", "cryptography", "blockchain", "linux", "backend", "cloud", "python"],
  "atsKeywords": [
    "Cybersecurity",
    "CTF",
    "Linux",
    "Python",
    "Cryptography",
    "RSA",
    "Blockchain",
    "Secure Backend",
    "Node.js",
    "Golang",
    "Hyperledger Fabric"
  ],
  "prioritySkillGroups": ["security", "programming", "backend", "blockchain", "cloud"],
  "priorityProjectTypes": ["ctf-writeup", "security-lab", "cryptography", "blockchain"],
  "priorityExperienceTypes": ["full-time", "competition", "community"],
  "sectionOrder": [
    "header",
    "summary",
    "skills",
    "experience",
    "awards",
    "projects",
    "education",
    "languages"
  ],
  "limits": {
    "maxPages": 2,
    "maxProjects": 4,
    "maxExperienceItems": 5,
    "maxBulletsPerExperience": 3,
    "maxSkillsPerGroup": 8
  },
  "outputModes": ["ats", "visual"],
  "rules": {
    "includeEducationProjects": true,
    "includeInterests": false,
    "includeAwards": true,
    "includeLanguages": true,
    "allowCoursework": true,
    "preferRecentProjects": true,
    "preferProductionExperience": true
  }
}
```

---

## 4. ATS vs Visual CV

The same generated CV data can be rendered differently depending on output mode.

---

### 4.1 ATS CV

ATS mode is optimized for applicant tracking systems and recruiter scanning.

Rules:

* Use simple layout.
* Avoid complex columns.
* Avoid icons as the only label.
* Avoid images, charts, and decorative graphics.
* Use standard section titles.
* Use plain text links.
* Prefer measurable, keyword-rich bullet points.
* Keep file length to 1–2 pages depending on role and seniority.
* Use common headings such as `Work Experience`, `Education`, `Skills`, `Projects`.

ATS output should prioritize:

1. Searchability
2. Keyword coverage
3. Clarity
4. Chronological credibility
5. Concise impact

Recommended ATS sections:

```text
Header
Professional Summary
Technical Skills
Work Experience
Selected Projects
Education
Awards & Activities
Languages
```

ATS should hide or reduce:

* Hobbies unless directly relevant.
* Long coursework lists.
* Weak or old projects.
* Decorative descriptions.
* Unverified claims.

---

### 4.2 Visual CV

Visual mode is optimized for portfolio website rendering and human storytelling.

Rules:

* Can use cards, timeline, badges, icons, and project previews.
* Can include a stronger personal brand narrative.
* Can show links to GitHub, portfolio pages, demos, blog posts, and write-ups.
* Can support interactive filtering by role, technology, and project type.
* Can include more personality, but should still be professional.

Visual output should prioritize:

1. First impression
2. Storytelling
3. Project evidence
4. Clear technical range
5. Personality and differentiation

Recommended visual sections:

```text
Hero
Role Summary
Core Strengths
Experience Timeline
Featured Projects
Education
Awards & Activities
Skills
Languages
Personal Interests
```

Visual mode can include:

* Featured project cards
* Skill badges
* Timeline layout
* Download ATS CV button
* Role selector
* Language selector
* GitHub/repo proof links
* Blog/write-up references

---

## 5. Source Data Requirements

The CV engine should consume structured data from the portfolio content layer.

Recommended source files:

```text
/content/profile/profile.json
/content/experience/*.mdx
/content/projects/*.mdx
/content/education/*.mdx
/content/awards/*.mdx
/content/skills/skills.json
/content/languages/languages.json
/content/interests/interests.json
/config/cv/roles/*.json
```

The source data should support both manual and automated content.

Examples:

* Manual profile content
* GitHub repository metadata
* Blog post metadata
* Project write-ups
* CV-only private descriptions
* Public portfolio descriptions
* Future translations

---

## 6. Data Model Notes

Each content item should include enough metadata for filtering and ranking.

### 6.1 Common Content Fields

```ts
type CvContentItem = {
  id: string;
  type: "experience" | "project" | "education" | "award" | "skill" | "language" | "interest";
  title: string;
  subtitle?: string;
  organization?: string;
  location?: string;
  startDate?: string;
  endDate?: string | "present";
  summary?: string;
  bullets?: string[];
  links?: CvLink[];

  tags: string[];
  technologies?: string[];
  industries?: string[];
  roleRelevance?: Record<string, number>;

  visibility: "public" | "cv-only" | "private";
  confidentiality: "public" | "anonymized" | "employer-confidential" | "private";
  status: "active" | "maintained" | "draft" | "archived";

  evidenceLevel?: "none" | "description" | "repo" | "demo" | "case-study" | "award";
  manualPriority?: number;
  pinnedForRoles?: string[];
  excludedFromRoles?: string[];
};
```

### 6.2 Link Model

```ts
type CvLink = {
  label: string;
  url: string;
  type: "github" | "demo" | "portfolio" | "linkedin" | "paper" | "writeup" | "certificate" | "other";
  visibility: "public" | "cv-only" | "private";
};
```

---

## 7. Ranking Details

### 7.1 Role Match

Role match compares item tags and technologies with the role config.

```text
roleMatch = weighted overlap between:
- item.tags
- item.technologies
- role.requiredTags
- role.preferredTags
- role.priorityProjectTypes
- role.prioritySkillGroups
```

Required tags should carry more weight than preferred tags.

---

### 7.2 Keyword Match

Keyword match checks whether the item helps cover ATS keywords.

Example:

A Data Wow experience item with `Next.js`, `Ruby`, `AWS`, `dashboard`, and `PDPA` should rank well for frontend, full-stack, and privacy-tech roles.

---

### 7.3 Impact Score

Impact score should reward clear responsibility and outcomes.

High-impact examples:

* Built production platform.
* Improved performance.
* Reduced manual workload.
* Shipped under strict deadlines.
* Designed system architecture.
* Led or owned feature delivery.
* Achieved award, finalist status, or competition ranking.

Low-impact examples:

* Only lists tools.
* No clear responsibility.
* No outcome.
* Too generic.

---

### 7.4 Evidence Score

Evidence score rewards proof.

Suggested values:

```text
none = 0.0
description = 0.2
repo = 0.5
demo = 0.6
case-study = 0.7
award = 0.8
repo + demo + writeup = 1.0
```

---

### 7.5 Freshness Score

Freshness should help recent work appear higher, but should not bury older high-value work.

Suggested logic:

```text
current_or_recent = 1.0
within_2_years = 0.8
within_5_years = 0.5
older_than_5_years = 0.2
```

Older work can still rank high if it has strong relevance, impact, or differentiation.

---

## 8. Manual Overrides

The user should be able to override ranking safely.

Supported override types:

```text
pin
hide
boost
lower
force_include
force_exclude
rewrite_for_role
```

Example:

```json
{
  "roleId": "ai_ml_engineer",
  "pin": ["project.rugpull-detection", "project.food101-classification"],
  "hide": ["interest.table-tennis"],
  "boost": {
    "education.kent-msc-advanced-cs": 0.2
  },
  "rewriteForRole": {
    "experience.datawow-frontend": "Emphasize data dashboards, production delivery, and frontend architecture."
  }
}
```

Manual overrides should be visible in admin/debug mode so the generated CV does not feel mysterious.

---

## 9. Generated CV JSON Example

```json
{
  "meta": {
    "generatedAt": "2026-05-15T00:00:00+07:00",
    "roleId": "fullstack_engineer",
    "outputMode": "ats",
    "language": "en",
    "maxPages": 2,
    "sourceVersion": "portfolio-content-v1"
  },
  "header": {
    "name": "Napatchol Thaipanich",
    "targetTitle": "Full-Stack Developer",
    "location": "Bangkok, Thailand",
    "email": "napatchol.tha@gmail.com",
    "phone": "+66-959-390-164",
    "links": [
      {
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/in/napatchol-thaipanich/"
      },
      {
        "label": "GitHub",
        "url": "https://github.com/patorsiang"
      },
      {
        "label": "Portfolio",
        "url": "https://patorsiang.github.io/en"
      }
    ]
  },
  "summary": {
    "text": "Full-stack developer with experience building production web platforms, dashboards, backend services, and blockchain-related systems. Skilled in React, Next.js, Node.js, Python, cloud platforms, and applied AI projects, with an interdisciplinary background in computer science, cybersecurity, and law."
  },
  "skills": [
    {
      "group": "Programming & Fundamentals",
      "items": ["JavaScript", "TypeScript", "Python", "Java", "Go", "SQL", "OOP"]
    },
    {
      "group": "Frontend",
      "items": ["React", "Next.js", "Vue", "Nuxt", "HTML", "CSS", "Tailwind"]
    },
    {
      "group": "Backend & Tools",
      "items": ["Node.js", "Express.js", "FastAPI", "Git", "Docker", "REST API"]
    },
    {
      "group": "Cloud & Data",
      "items": ["AWS", "GCP", "Azure", "Firebase", "PostgreSQL", "MongoDB"]
    }
  ],
  "experience": [
    {
      "id": "experience.secure-d-fullstack",
      "title": "Full-Stack Developer",
      "organization": "Secure-D",
      "location": "Bangkok, Thailand",
      "startDate": "2026-02",
      "endDate": "present",
      "bullets": [
        "Develop full-stack features for a cybersecurity training and playground platform using modern web technologies.",
        "Contribute to frontend and backend implementation across gamified security learning workflows.",
        "Collaborate with team members on feature delivery, code quality, and platform improvements."
      ],
      "rankDebug": {
        "score": 0.91,
        "matchedKeywords": ["full-stack", "security", "frontend", "backend"]
      }
    },
    {
      "id": "experience.datawow-frontend",
      "title": "Frontend Developer",
      "organization": "Data Wow Co., Ltd.",
      "location": "Bangkok, Thailand",
      "startDate": "2021-12",
      "endDate": "2023-04",
      "bullets": [
        "Built PDPA compliance platforms using modern frontend frameworks and production cloud deployment workflows.",
        "Developed dashboards and online platforms with real-time data handling for business users.",
        "Worked in agile teams to deliver production-ready features under strict deadlines."
      ],
      "rankDebug": {
        "score": 0.86,
        "matchedKeywords": ["Next.js", "dashboard", "AWS", "agile"]
      }
    }
  ],
  "projects": [
    {
      "id": "project.rugpull-detection",
      "title": "Cryptocurrency Rug Pull Detection",
      "subtitle": "MSc Dissertation",
      "summary": "Designed a machine learning system to detect and categorize fraudulent blockchain projects.",
      "technologies": ["Python", "Machine Learning", "Data Processing", "Blockchain"],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/patorsiang/rugpull-detection-msc-kent-2025"
        }
      ],
      "rankDebug": {
        "score": 0.78,
        "matchedKeywords": ["Python", "Machine Learning", "Blockchain"]
      }
    },
    {
      "id": "project.smart-shoe",
      "title": "Smart Shoe Prototype",
      "subtitle": "IoT and Mobile Devices Project",
      "summary": "Built an Arduino-based smart shoe integrated with a Next.js app for real-time gait monitoring and fall detection.",
      "technologies": ["Arduino", "Next.js", "IoT", "Sensors"],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/patorsiang/smart-shoe"
        }
      ],
      "rankDebug": {
        "score": 0.72,
        "matchedKeywords": ["Next.js", "IoT", "real-time"]
      }
    }
  ],
  "education": [
    {
      "degree": "MSc Advanced Computer Science",
      "result": "Distinction",
      "organization": "University of Kent",
      "location": "Canterbury, UK",
      "startDate": "2024-09",
      "endDate": "2025-09"
    },
    {
      "degree": "B.Sc. Information and Communication Technology",
      "organization": "Mahidol University",
      "location": "Nakhon Pathom, Thailand",
      "startDate": "2015-07",
      "endDate": "2019-06"
    }
  ],
  "awards": [
    {
      "title": "Top 4 - Women Thailand Cyber Top Talent 2022",
      "category": "Cybersecurity Competition"
    },
    {
      "title": "Finalist - LINE Hack 2023",
      "category": "Hackathon"
    }
  ],
  "languages": [
    {
      "name": "Thai",
      "level": "Native"
    },
    {
      "name": "English",
      "level": "IELTS 6 / CEFR B2"
    },
    {
      "name": "Korean",
      "level": "Elementary"
    }
  ]
}
```

---

## 10. CV Output Types

### 10.1 `generatedCvJson`

Main structured output used by all templates.

Use for:

* Debugging
* Preview rendering
* PDF generation
* Version comparison
* Testing role configs

---

### 10.2 `atsHtml`

Simple HTML version for ATS export.

Rules:

* Minimal CSS
* Semantic headings
* No complex grid dependency
* Print-friendly
* Plain links

---

### 10.3 `visualHtml`

Portfolio-style CV page.

Rules:

* Responsive layout
* Timeline/cards allowed
* More personality
* Project previews allowed
* Download ATS CV button

---

### 10.4 `pdf`

Generated from HTML using a PDF strategy.

Recommended options:

1. Print CSS + browser print
2. Playwright PDF export
3. React PDF only if layout becomes highly controlled and separate from website rendering

Recommended first version:

```text
HTML + print CSS + Playwright export
```

Reason:

* Keeps website and CV styling close.
* Easier to debug visually.
* Good enough for ATS and visual PDF versions.

---

## 11. Debug Output

The engine should support debug mode.

Debug mode should show:

* Which role config was used
* Which items were included
* Which items were excluded
* Ranking scores
* Matched keywords
* Manual overrides
* Missing required keywords
* Warnings about weak sections

Example debug warning:

```json
{
  "warnings": [
    "Only 2 backend-related bullets found for fullstack_engineer.",
    "No measurable impact found in Secure-D experience bullets.",
    "AI/ML role config selected, but TensorFlow appears only in skills and not in work experience."
  ]
}
```

This is important because the user should understand why the CV changed.

---

## 12. Editing Workflow

Recommended admin/editor workflow:

```text
1. User selects target role.
2. Engine generates CV preview.
3. User reviews included/excluded content.
4. User pins, hides, boosts, or rewrites items.
5. Engine regenerates CV.
6. User exports ATS PDF or visual PDF.
7. Generated version is saved with metadata.
```

Generated CV versions should be saved for reference.

Example saved version path:

```text
/generated/cv/fullstack-engineer/en/2026-05-15.generated.json
/generated/cv/fullstack-engineer/en/2026-05-15.ats.pdf
/generated/cv/fullstack-engineer/en/2026-05-15.visual.pdf
```

---

## 13. Content Safety and Confidentiality Rules

The CV generator must avoid exposing sensitive or employer-confidential information.

Rules:

1. Never include private employer details unless explicitly marked public.
2. Use anonymized case studies for employer work if needed.
3. Do not expose internal system names, client names, credentials, private repos, or non-public metrics.
4. For current work, prefer general role descriptions unless the content is approved.
5. Keep private notes separate from public portfolio content.

Suggested confidentiality values:

```text
public
anonymized
employer-confidential
private
```

Rendering behavior:

| Confidentiality       | Portfolio         | ATS CV            | Visual CV         |
| --------------------- | ----------------- | ----------------- | ----------------- |
| public                | show              | show              | show              |
| anonymized            | show with rewrite | show with rewrite | show with rewrite |
| employer-confidential | hide              | hide              | hide              |
| private               | hide              | hide              | hide              |

---

## 14. Testing Requirements

The CV engine should have tests for:

### 14.1 Filtering

* Private items are excluded.
* Employer-confidential items are excluded.
* Role-relevant items are included.
* Archived items are excluded unless manually forced.

### 14.2 Ranking

* Strong role matches rank higher.
* Manual pins work.
* Old but important items can still appear.
* Weak unrelated items are cut.

### 14.3 Grouping

* ATS section order follows role config.
* Visual section order follows visual template.
* Empty sections are hidden.
* Required sections are present.

### 14.4 Output

* JSON schema is valid.
* ATS HTML renders without layout-breaking elements.
* PDF export works.
* Links are preserved.
* Special characters render correctly.

---

## 15. MVP Scope

### MVP Must Have

* Role config JSON
* Source data JSON/MDX
* Filter logic
* Rank logic
* Group logic
* Generated CV JSON
* ATS HTML preview
* Print CSS
* PDF export
* Manual pin/hide support

### MVP Should Have

* Visual CV preview
* Debug panel
* Role keyword coverage report
* Basic version history

### Later

* AI-assisted bullet rewriting
* Multi-language CV generation
* Translation workflow
* Job description matching
* One-click tailoring from job post
* GitHub/blog auto-sync
* Visual analytics for keyword coverage

---

## 16. Recommended Implementation Structure

```text
/src/features/cv-engine/
  configs/
    roles/
      fullstack-engineer.json
      frontend-engineer.json
      ai-ml-engineer.json
      security-engineer.json
  core/
    filterCvContent.ts
    rankCvContent.ts
    groupCvContent.ts
    generateCv.ts
  renderers/
    atsHtmlRenderer.tsx
    visualCvRenderer.tsx
    pdfExport.ts
  schemas/
    cvContent.schema.ts
    cvRoleConfig.schema.ts
    generatedCv.schema.ts
  utils/
    keywordMatch.ts
    dateScoring.ts
    confidentiality.ts
  tests/
    filterCvContent.test.ts
    rankCvContent.test.ts
    groupCvContent.test.ts
```

---

## 17. Acceptance Criteria

The CV generation logic is complete when:

* A role config can generate a role-specific CV JSON.
* ATS and visual modes can use the same generated CV data.
* Irrelevant and private content is filtered out.
* Relevant work, projects, skills, and education are ranked correctly.
* Section grouping changes depending on target role.
* Output can be previewed before export.
* Manual overrides are supported.
* Debug mode explains why items were included or excluded.
* Generated output can be exported to PDF.

---

## 18. Final Decision

Use this pipeline as the core CV generation architecture:

```text
portfolio content source
    ↓
role config
    ↓
filter
    ↓
rank
    ↓
group
    ↓
generated CV JSON
    ↓
ATS / visual renderer
    ↓
HTML preview
    ↓
PDF export
```

This keeps the system flexible, testable, and reusable for both the portfolio website and role-specific job applications.
