<!--
SYNC IMPACT REPORT
==================
Version: 0.0.0 → 1.0.0
Change Type: MAJOR - Initial constitution ratification
Date: 2026-01-28

Modified Principles:
- PRINCIPLE_1: Created "Test-First Development (NON-NEGOTIABLE)"
- PRINCIPLE_2: Created "Code Quality & Maintainability"
- PRINCIPLE_3: Created "Single Responsibility & Modularity"
- PRINCIPLE_4: Created "Consistent Code Style & Standards"
- PRINCIPLE_5: Created "User-Centric Simplicity"

Added Sections:
- Core Principles (all 5 principles)
- Technology Stack & Constraints
- Development Workflow & Quality Gates
- Governance

Templates Status:
- ✅ plan-template.md: Constitution Check section updated with specific principle checks
- ✅ spec-template.md: Requirements structure supports test-first approach
- ✅ tasks-template.md: Test-first task organization aligns with TDD principle
- ✅ All templates reviewed and aligned

Follow-up TODOs:
- Ensure all developers are onboarded with constitutional principles
- Review existing code for constitutional compliance
-->

# Todo App Bootcamp Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

Test-Driven Development (TDD) is MANDATORY for all feature work. Tests MUST be written and approved before implementation begins. The Red-Green-Refactor cycle is strictly enforced: write failing tests first, implement minimal code to pass, then refactor for quality.

**Coverage Requirements**:
- Minimum 80% code coverage across all packages
- Unit tests for all components, functions, and services
- Integration tests for component interactions and API communication
- Tests MUST be independent, isolated, and use mocks for external dependencies

**Rationale**: Test-first ensures code correctness, maintainability, and serves as living documentation. It prevents regressions and enables confident refactoring.

### II. Code Quality & Maintainability

All code MUST follow DRY (Don't Repeat Yourself), KISS (Keep It Simple), and SOLID principles. Extract common code into shared utilities. Prefer simple, straightforward implementations over complex ones. Avoid premature optimization—write clear code first, optimize only when necessary with data-driven justification.

**Error Handling**: All operations that can fail MUST include try-catch blocks with meaningful error messages and user feedback.

**Comments**: Comment only the "why," not the "what." Keep comments updated. Use JSDoc for public functions and components. Avoid obvious comments.

**Rationale**: Quality principles ensure long-term maintainability, reduce technical debt, and make the codebase accessible to all team members.

### III. Single Responsibility & Modularity

Each module, component, function, and class MUST have a single, well-defined responsibility. A component should have one reason to change. Functions should do one thing well. Organize code logically with clear separation of concerns.

**File Organization**:
- Frontend: `components/`, `services/`, `utils/` with colocated tests
- Backend: `routes/`, `controllers/`, `services/`, `middleware/` with colocated tests
- Tests in `__tests__/` directories adjacent to source files

**Rationale**: Single responsibility makes code easier to understand, test, maintain, and refactor. It enables parallel development and reduces coupling.

### IV. Consistent Code Style & Standards

Consistent formatting and naming conventions are MANDATORY. Use ESLint for enforcement. All linting errors and warnings MUST be addressed before pull requests.

**Formatting**:
- 2 spaces indentation (JavaScript, JSON, CSS, Markdown)
- Lines under 100 characters
- LF (Unix-style) line endings
- Remove trailing whitespace

**Naming**:
- `camelCase` for variables and functions
- `PascalCase` for React components and classes
- `UPPER_SNAKE_CASE` for constants
- Descriptive names that clearly indicate purpose

**Import Order**: External libraries → Internal modules → Styles (separated by blank lines)

**Rationale**: Consistency reduces cognitive load, makes code reviews faster, and prevents style-related debates. Automated enforcement (ESLint) ensures compliance.

### V. User-Centric Simplicity

Build only what users need. Follow YAGNI (You Aren't Gonna Need It) principles. Features MUST have clear user value and be independently testable. Prioritize core functionality over advanced features.

**Requirements**:
- All features MUST have clear acceptance scenarios (Given-When-Then)
- Requirements MUST be specific and measurable (FR-001, FR-002 format)
- User stories MUST be prioritized (P1, P2, P3) by value
- Each user story MUST be independently implementable and testable

**Out of Scope**: Unless explicitly requested, avoid: bulk operations, advanced filtering, search, undo/redo, categories, priorities, recurring items, notifications, authentication, multi-user support.

**Rationale**: Simplicity reduces scope creep, accelerates delivery, and keeps the codebase maintainable. Focus delivers higher quality for core features.

## Technology Stack & Constraints

**Architecture**: Monorepo using npm workspaces
- `packages/frontend/`: React application
- `packages/backend/`: Express.js API server

**Technology Requirements**:
- **Frontend**: React, React DOM, CSS, Jest
- **Backend**: Node.js (v16+), Express.js, Jest
- **Package Manager**: npm (v7+)
- **Testing**: Jest with @testing-library/react for frontend

**Data Persistence**: Express.js backend with in-memory or file-based storage. Single-user scope—no authentication or user isolation required.

**Browser Support**: Modern browsers, desktop-focused (no specific mobile optimization required)

## Development Workflow & Quality Gates

**Git Practices**:
- Atomic commits: One logical change per commit
- Clear commit messages explaining "why" not just "what"
- Feature branches: `feature/feature-name` pattern
- Pull requests required for all changes
- Code review approval required before merge

**Pre-Commit Requirements**:
- All tests pass (`npm test`)
- No linting errors or warnings (`npm run lint`)
- Code follows formatting standards
- Changes are atomic and well-described

**Code Review Checklist**:
- [ ] Code follows naming conventions
- [ ] Imports organized correctly
- [ ] No linting errors/warnings
- [ ] Code is DRY and avoids repetition
- [ ] Functions/components have single responsibility
- [ ] Error handling implemented
- [ ] Comments are clear and helpful
- [ ] Tests written for new functionality
- [ ] Git commits are atomic and well-described
- [ ] No console.log statements in production code

**Testing Gates**:
- Tests MUST be written before implementation (Red-Green-Refactor)
- All tests MUST pass before commit
- Coverage MUST be at or above 80%
- Tests MUST follow Arrange-Act-Assert pattern
- Test names MUST clearly indicate what is being tested

## Governance

This constitution supersedes all other development practices and guidelines. All code changes, reviews, and planning MUST verify compliance with constitutional principles.

**Amendment Process**:
1. Propose amendment with clear justification and impact analysis
2. Update constitution version following semantic versioning
3. Document changes in Sync Impact Report
4. Update all affected templates and documentation
5. Communicate changes to all team members

**Versioning Policy**:
- **MAJOR**: Backward incompatible principle removals or redefinitions
- **MINOR**: New principles added or materially expanded guidance
- **PATCH**: Clarifications, wording fixes, non-semantic refinements

**Compliance Review**: Constitution alignment MUST be checked during:
- Feature planning (plan.md Constitution Check section)
- Code reviews (review checklist)
- Pull request approvals (merge gates)

**Complexity Justification**: Any deviation from principles or addition of complexity MUST be documented with clear business justification in plan.md Complexity Tracking section.

**Reference Documentation**:
- Detailed coding standards: `docs/coding-guidelines.md`
- Testing strategy: `docs/testing-guidelines.md`
- Feature requirements: `docs/functional-requirements.md`
- UI specifications: `docs/ui-guidelines.md`
- Project overview: `docs/project-overview.md`

**Version**: 1.0.0 | **Ratified**: 2026-01-28 | **Last Amended**: 2026-01-28
