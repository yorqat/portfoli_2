# Portfolio TODO

Context: this is a portfolio intended to get me hired. I am new to the industry
and everything here is self-initiated — no client, employer or shipped-under-a-team
work. The goal of this list is to be hireable **without overpositioning**.

Status legend: `[x]` done in code · `[~]` partially done · `[ ]` not started

---

## 1. Critical — a visitor must be able to act

- [x] Add `/contact` page with email, socials and availability
- [x] Replace the dead CTA button (`lounge/+page.svelte`, was a `<button>` with no
      handler and no link) with a real link to `/contact`
- [x] Put an email address in the footer
- [x] Replace the dead footer links `/#about`, `/#services`, `/#contact`, which
      point at sections that do not exist, with real routes
- [x] Add Contact to the nav (the `reach` entry was written and then commented out)
- [x] Add a status line to the homepage so a visitor knows I am actually
      available and what I want

### Still needs me

- [ ] **Replace the availability placeholder** on `/contact` and the homepage with a
      real date. Currently an obvious `TODO` string.
- [ ] **Confirm the contact address.** `feedback+dev.yorqat@gmail.com` is used
      because it is the only one in the repo; it reads like a feedback inbox rather
      than an address to hire me at. Consider `yorqat@<domain>`.
- [ ] Add a downloadable resume/CV PDF and link it from `/contact` and the footer.
      There is no CV anywhere on the site right now.

## 2. Positioning — stop overpositioning

- [x] Label the work as self-initiated, in plain language, so it is never mistaken
      for client or employment work
- [x] Cut the homepage marquee from 9 unfalsifiable adjectives to terms I can
      defend under questioning
- [x] Say "design engineer" / junior-friendly framing in site metadata rather than a
      bare senior-sounding title
- [ ] **Decide the primary role.** The labels said design; the evidence is mostly
      front-end implementation. Pick one primary and one secondary, and say so in
      the first line of the homepage. Currently unresolved.
- [ ] Write the honest framing line in my own words and put it on `/works`:
      what each project is, and that there was no brief and no team.

## 3. Credibility — claims that are not mine yet

- [ ] **Attribute or drop the borrowed stats.** `/works` leads with "recruiters
      spend ~6 seconds" and `/content` leads with "viewers retain 95% of a video
      message vs 10%". Both come from other people's research, presented in my
      own voice. Either cite the source or demote them to background — I did not
      do this because inventing a citation would be worse than the problem.
- [ ] Show real process artifacts. The site claims "Userflow from Miro or Figjam",
      "Persona Drafts", "Jira ticket with latest iteration design attached",
      "Bug report from a usability session". Claiming a process without showing it
      reads as invented.
- [ ] Get **one external design review** of a project and publish the response:
      what a professional said, and what I changed. This converts a self-claim
      into a validated one and is the single highest-value item in this section.
- [ ] Add real outcomes with numbers to the case studies. Currently
      `projectOverview` is one sentence and nothing else.

## 4. Depth — one deep case study beats three shallow ones

- [ ] Pick one project and write it up properly: context, role, problem, what I
      did, what failed, outcome, what I'd do differently. Use it as the template
      for the other two.
- [ ] Add real user testing to that project — even 5 people, even informal.
- [ ] Add a dated changelog to one shipped project. Live URL + visible history
      reads as "I maintain things".
- [ ] Rename the `Blogs` nav item to `Writing`.
- [ ] Decide what `/content` is actually for. The label does not say, and it
      duplicates `/blog`.

## 5. Outside the code — the actual way out

- [ ] **Get one real client**, however small: a friend's business, a local
      nonprofit, a side hustle, unpaid if needed. One "I worked with this person"
      is worth more than another portfolio piece.
- [ ] Contribute to open source and get real review from maintainers.
- [ ] Write up the accessibility work (the preferences component, reduced-motion
      system, the marquee screen-reader fix) as a blog post with a before/after.
      It is a real differentiator and currently unstated.
- [ ] Target small studios, agencies and startups hiring junior designers, instead
      of roles asking for 5 years. That mismatch is a targeting problem, not a
      portfolio problem.

## 6. Housekeeping

- [ ] Visually review the `/lounge` social card. It was generated blind — I verified
      it by pixel sampling, not by eye. Confirm the face crop and composition.
- [ ] Dribbble placeholder was fixed. Look for other placeholder content.
- [ ] Decide whether `/works/live/*` demos should be indexed. Currently excluded
      from the sitemap by choice; revisit if reach matters more than positioning.
- [ ] `src/styles/UI_MILESTONES.md` has an open item to define shared utility
      mixins including `visually-hidden`, which now exists.
