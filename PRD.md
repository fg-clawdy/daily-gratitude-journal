# PRD: Daily Gratitude Journal

## Introduction

A simple, beautiful daily gratitude journaling app where users write what they're grateful for each day and view their history in a calendar. The app is local-only (no backend), mobile-first, and focuses on ease of use and visual appeal.

## Goals

- Provide a quick, frictionless way to record daily gratitude (under 30 seconds)
- Create a visually appealing, calming interface with pastel colors
- Enable users to review past entries via calendar view
- Work entirely offline (localStorage only, no backend)
- Ensure excellent mobile experience (primary platform)

## User Stories

### US-001: Write Today's Gratitude Entry
**Description:** As a user, I want to write what I'm grateful for today so I can reflect on positive moments.

**Acceptance Criteria:**
- [ ] "Today" view displays current date prominently
- [ ] Large text area (min 3 rows) for gratitude entry
- [ ] Character limit: 500 characters with live counter
- [ ] Counter shows remaining characters
- [ ] Counter turns orange at 50 chars remaining, red at 10
- [ ] Entry auto-saves on blur (no explicit save button needed)
- [ ] Entry persists in localStorage
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

### US-002: View Past Entries in Calendar
**Description:** As a user, I want to see a calendar of my past entries so I can reflect on my gratitude journey.

**Acceptance Criteria:**
- [ ] Calendar view shows current month by default
- [ ] Days with entries show filled dot indicator
- [ ] Days without entries show empty state
- [ ] Tap/click day to view that day's entry
- [ ] Selected day shows entry in panel below calendar
- [ ] Previous/next month navigation arrows
- [ ] Swipe left/right changes months (mobile)
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

### US-003: Navigate Between Today and Calendar Views
**Description:** As a user, I want to easily switch between writing today's entry and viewing my calendar.

**Acceptance Criteria:**
- [ ] Bottom tab navigation with two tabs: "Today" and "Calendar"
- [ ] Tab navigation always visible (fixed position)
- [ ] Active tab highlighted with visual indicator
- [ ] Tap tab to switch views instantly
- [ ] Navigation state persists on reload (URL or localStorage)
- [ ] Touch targets: 44x44px minimum (mobile accessibility)
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

### US-004: See Welcome Hints for New Users
**Description:** As a first-time user, I want helpful hints so I understand how to use the app.

**Acceptance Criteria:**
- [ ] Today view shows hint text when no entry exists: "What are you grateful for today?"
- [ ] Calendar view shows empty state when no entries: "Start writing to see your gratitude journey"
- [ ] Hints disappear once user has written first entry (Today) or has any entries (Calendar)
- [ ] Hint text styled differently (lighter color, italic) from actual content
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

### US-005: Responsive Mobile-First Design
**Description:** As a mobile user, I want the app to look and work great on my phone.

**Acceptance Criteria:**
- [ ] Mobile viewport (375px-428px) is primary design target
- [ ] All touch targets: 44x44px minimum
- [ ] Text area easily tappable and fills most of screen
- [ ] Calendar cells large enough for comfortable tapping
- [ ] Tab navigation stays fixed at bottom (thumb-friendly)
- [ ] Responsive layout works on tablet (768px+) and desktop (1024px+)
- [ ] No horizontal scrolling on any viewport
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

### US-006: Visual Design with Pastel Theme
**Description:** As a user, I want a calming, visually pleasing interface that makes me feel good.

**Acceptance Criteria:**
- [ ] Pastel color palette: lavender (#E6E6FA), pink (#FFB6C1), mint (#98FB98)
- [ ] Lavender as primary background color
- [ ] Pink accents for active states and highlights
- [ ] Mint for success indicators (dots on calendar)
- [ ] Rounded corners on all UI elements (8px border radius minimum)
- [ ] Subtle shadows for depth (4px blur, 10% opacity)
- [ ] Custom font loaded (Quicksand or similar friendly rounded font)
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

### US-007: LocalStorage Data Persistence
**Description:** As a developer, I need entries to persist in localStorage so users don't lose data.

**Acceptance Criteria:**
- [ ] Entries stored in localStorage with key: `gratitude-entries`
- [ ] Data structure: `{ "YYYY-MM-DD": "entry text" }`
- [ ] localStorage limit handling: warn user if approaching 5MB limit
- [ ] Data schema versioning for future migrations (`v1` key)
- [ ] Auto-save on text area blur (debounced 500ms)
- [ ] Typecheck passes

### US-008: Handle Empty States Gracefully
**Description:** As a user, I want helpful empty states when I have no data yet.

**Acceptance Criteria:**
- [ ] Today view with no entry: Shows placeholder text
- [ ] Calendar view with no entries: Shows friendly message
- [ ] Selected calendar day with no entry: Shows "No entry for this day"
- [ ] Empty states visually distinct (lighter text, icons optional)
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

### US-009: Calendar Month Navigation
**Description:** As a user, I want to view entries from previous months.

**Acceptance Criteria:**
- [ ] Arrow buttons for previous/next month (desktop/tablet)
- [ ] Swipe gestures for month navigation (mobile)
- [ ] Current month displayed as "Month YYYY" (e.g., "February 2026")
- [ ] Cannot navigate to future months (no entries possible)
- [ ] Smooth transition between months (CSS animation optional)
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

### US-010: Edit Existing Entries
**Description:** As a user, I want to edit past entries if I made a mistake or want to add more.

**Acceptance Criteria:**
- [ ] Clicking past day in calendar loads entry in text area (read-only initially)
- [ ] "Edit" button appears when viewing past entry
- [ ] Clicking "Edit" enables text area for editing
- [ ] Auto-save on blur (same as Today view)
- [ ] Can navigate back to Today after editing past entry
- [ ] Typecheck passes
- [ ] Verify in browser using webapp-testing skill

## Functional Requirements

- **FR-1:** App must store all entries in localStorage with key `gratitude-entries`
- **FR-2:** Data structure must be `{ "YYYY-MM-DD": "entry text" }` for easy date lookup
- **FR-3:** Today view must display current date and text area for entry
- **FR-4:** Text area must auto-save on blur (500ms debounce)
- **FR-5:** Character counter must update in real-time and change color based on remaining characters
- **FR-6:** Calendar view must display current month with dot indicators for days with entries
- **FR-7:** Calendar must support month navigation via arrows and swipe gestures
- **FR-8:** Bottom tab navigation must persist across page reloads
- **FR-9:** All touch targets must be minimum 44x44px for mobile accessibility
- **FR-10:** App must use pastel color palette (lavender, pink, mint) consistently

## Non-Goals (Out of Scope)

- ❌ User authentication (local-only app)
- ❌ Backend API or database (localStorage only)
- ❌ Social sharing features
- ❌ Reminders or notifications
- ❌ Export entries to PDF/email
- ❌ Multi-user support
- ❌ Rich text formatting (plain text only)
- ❌ Image attachments
- ❌ Search functionality (not needed for v1)

## Design Considerations

### UI/UX Requirements

**Mobile-First Design:**
- Primary viewport: 375px-428px (iPhone SE to iPhone Pro Max)
- Text area fills most of screen in Today view
- Bottom tab navigation (thumb-friendly)
- Large touch targets (44x44px minimum)
- Swipe gestures for calendar navigation

**Color Palette:**
- **Lavender (#E6E6FA):** Primary background
- **Pink (#FFB6C1):** Active states, highlights, accents
- **Mint (#98FB98):** Success indicators, filled dots
- **White (#FFFFFF):** Text areas, cards
- **Gray (#333333):** Text color

**Typography:**
- Primary font: Quicksand (Google Fonts) or similar rounded, friendly font
- Fallback: system-ui, sans-serif
- Font sizes: 18px body, 24px headings, 14px labels

**Component Style:**
- Rounded corners: 8px minimum
- Shadows: `0 2px 4px rgba(0,0,0,0.1)`
- Smooth transitions: 200ms ease-in-out

### Responsive Breakpoints

- **Mobile:** 375px-767px (primary design)
- **Tablet:** 768px-1023px (scaled-up mobile layout)
- **Desktop:** 1024px+ (centered max-width container, 600px)

## Technical Considerations

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Storage:** localStorage (browser native)
- **Deployment:** Vercel (static export)

### File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with font
│   ├── page.tsx            # Main app component
│   ├── today/
│   │   └── page.tsx        # Today view
│   └── calendar/
│       └── page.tsx        # Calendar view
├── components/
│   ├── TodayView.tsx       # Today's entry component
│   ├── CalendarView.tsx    # Calendar grid component
│   ├── TabNavigation.tsx   # Bottom tab nav
│   └── CharacterCounter.tsx # Counter component
├── lib/
│   └── storage.ts          # localStorage helpers
└── types/
    └── index.ts            # TypeScript types
```

### Data Model
```typescript
// localStorage key: "gratitude-entries"
// localStorage value:
{
  version: "v1",
  entries: {
    "2026-02-13": "I'm grateful for...",
    "2026-02-12": "Another entry...",
    // ...
  }
}
```

### Key Functions
- `saveEntry(date: string, text: string): void` - Save/update entry
- `getEntry(date: string): string | null` - Get entry for date
- `getAllEntries(): Record<string, string>` - Get all entries
- `getDatesWithEntries(): string[]` - Get array of dates with entries

### Performance Considerations
- Auto-save debounced to 500ms (prevent excessive writes)
- Calendar renders only current month (no infinite scroll)
- localStorage limit check before write (~5MB browser limit)
- Lazy load calendar view (only load when tab active)

## Security Considerations

**Local-Only App (No Backend):**
- ✅ No authentication required (local-only data)
- ✅ No API endpoints to secure
- ✅ No sensitive data transmitted over network
- ✅ localStorage data accessible only to same origin
- ✅ XSS prevention via React's built-in escaping

**Input Validation:**
- Character limit enforced client-side (500 chars)
- HTML escaping handled by React (automatic)
- No external user input beyond text area

**Browser Security:**
- localStorage scoped to domain (same-origin policy)
- No third-party scripts loaded
- CSP headers configured (Vercel default)

## Mobile-First UX Requirements

**Touch Interactions:**
- All buttons/tabs: 44x44px minimum touch target
- Text area: Large, easy to tap (full-width minus padding)
- Calendar cells: 48x48px minimum (7 cells across ~320px width)
- Swipe gestures: Left/right for calendar month navigation

**Responsive Layout:**
- Primary design for 375px-428px (iPhone SE to Pro Max)
- No horizontal scrolling on any viewport
- Text area scales to fill available height in Today view
- Calendar grid scales cells based on container width

**Performance on Mobile:**
- Static site (no server requests after initial load)
- Text area auto-save debounced (reduce localStorage writes)
- Calendar renders only visible month (not entire year)
- Images/assets optimized for mobile bandwidth

**Accessibility:**
- Touch targets meet iOS/Android guidelines (44x44px)
- Color contrast meets WCAG AA standards
- Font sizes readable on mobile (18px minimum body text)
- Tab navigation reachable with thumb on bottom of screen

## Operations Documentation

### Deployment
**Platform:** Vercel (recommended)
- Deploy via GitHub integration (auto-deploy on push to main)
- Static export (no server-side rendering needed)
- CDN distribution (fast global delivery)

**Environment Variables:**
- None required (local-only app)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
- `out/` (Next.js static export)

### Health Check Endpoint
- **N/A** (static site, no backend)
- Monitor via Vercel's built-in uptime monitoring

### Monitoring
- Vercel Analytics for page views (optional)
- Browser DevTools for client-side errors
- localStorage usage monitoring (warn at 4MB of 5MB limit)

### Scaling
- **N/A** (static site scales automatically via CDN)
- No database or backend to scale

### Maintenance
- **localStorage limit:** Warn users approaching 5MB limit
- **Browser compatibility:** Test on Chrome, Safari, Firefox (latest 2 versions)
- **Data migration:** If localStorage schema changes, include migration function

### Troubleshooting
**localStorage full:**
- Warn user when approaching 5MB limit
- Suggest exporting/deleting old entries (future feature)

**Data corruption:**
- Validate localStorage data on load
- Reset to empty state if validation fails
- Log error to console for debugging

### Backup & Recovery
- **N/A** (local-only app, no server backups)
- Users can manually export data (future feature)

## Success Metrics

**User Engagement:**
- Users write entry within 30 seconds of opening app
- Average time on Today view: under 2 minutes
- Return rate: 70%+ of users return next day

**Performance:**
- Time to interactive: under 2 seconds on 3G
- Auto-save delay: under 500ms (debounced)
- Calendar view render: under 100ms

**Usability:**
- Zero confusion on first use (clear empty states)
- 100% mobile users complete first entry
- Calendar navigation intuitive (no help needed)

## Open Questions

None (all requirements clarified).

---

**Status:** ✅ Approved by Cito (2026-02-13)  
**Implementation:** Ready for Deb to begin  
**Estimated Effort:** 10 stories (8 priority-1, 2 priority-2)
