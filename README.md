# ECM — Markedsføringssite (eksamensprojekt, Grundlæggende e-handel)

Statisk, responsiv prototype for markedsføringssiden til uddannelsen **E-commerce og Digital Marketing (ECM)** på Erhvervsakademi København. Siden er bygget som sektioner/blokke, så den direkte kan genskabes i WordPress med Gutenberg — se punkt **c)** nedenfor.

## Sådan ser du siden
Åbn `index.html` i en browser, eller kør en lokal server fra projektmappen, fx:
```
python3 -m http.server 8000
```
og gå til `http://localhost:8000`.

## Sidestruktur
| Fil | Indhold |
|---|---|
| `index.html` | Forside |
| `uddannelse.html` | Uddannelsen |
| `studiemiljoe.html` | Studiemiljø ("en helt almindelig studiedag" + galleri) |
| `cases.html` | Cases & projekter (underside til Studiemiljø) |
| `moed-os.html` | Mød os / om gruppen (underside til Studiemiljø) |
| `karriere.html` | Karriere + Muligheder |
| `praktisk-info.html` | Praktisk info |
| `faq.html` | FAQ (harmonika) |
| `kontakt.html` | Kontakt |
| `test.html` | "Er ECM noget for dig?"-testen (quiz) |
| `assets/css/style.css` | Delt design system (tokens, komponenter, grid) |
| `assets/js/main.js` | Delt interaktivitet (nav, søgning, accordions, reveal) |
| `assets/js/quiz.js` | Logik for testen |

---

## a) Pladsholdere, der skal udfyldes

**Billeder & video** (alle markeret `[BILLEDE: ...]` / `[VIDEO: ...]` direkte i koden med en beskrivelse af, hvad motivet skal vise):
- Forside — hero: to studerende ved deres computere, der griner/smiler
- Uddannelsen — nærbillede af kreativt + analytisk arbejde side om side
- Karriere — billede af studerende i en arbejdssituation
- Studiemiljø — 4 stk. (undervisning, projektarbejde-video, workshop, fællesskab)
- Mød os — 4 portrætbilleder (Signe, Rose, Snorre, Bertram)
- Forside — studenter-citater har pladsholder-avatar (kan erstattes af rigtige billeder)

**Tekst/fakta, der skal verificeres eller indsættes officielt:**
- Ansøgningsfrist (forside hero-meta, Praktisk info)
- Adgangskrav (Praktisk info, FAQ)
- Studiestart-dato (Praktisk info)
- SU/finansiering-link (Praktisk info)
- Fagoversigt, semesterstruktur og ECTS-fordeling (Uddannelsen) — linker foreløbigt til EK's officielle side
- Officiel ansøgningslink (Praktisk info, FAQ, forside- og undersidefooter — linker foreløbigt til optagelse.dk)
- Kontakt-mailadresse, forventet svartid og adresse (Kontakt)
- Bertrams profiltekst og alder (Mød os) — de øvrige tre profiler er udfyldt med de tekster, gruppen har leveret
- De fire cases på Cases-siden har foreløbig kun problemtype/flow — konkrete projekter og resultater indsættes, når de er godkendt til offentliggørelse

Alle pladsholdere er markeret i koden med `[ ]`, så de er nemme at søge frem (`grep -r "\["`) og udskifte.

Filen `ecm-forside-prototype.html` i rodmappen er et tidligt, enkeltsidet designudkast fra opstarten af projektet og indgår ikke i den leverede, flersidede site — den er bevaret som referencemateriale.

---

## b) Vigtigste designbeslutninger

| Beslutning | Begrundelse (punkt i briefen) |
|---|---|
| Flersidet struktur (10 sider) i stedet for én lang side | Punkt 4: navigationen har 5 faste hovedpunkter, og indhold som FAQ, cases og profiler kræver egne sider for at holde forsiden overskuelig |
| Delt `style.css` + `main.js` for alle sider | Svarer til WordPress' globale styles/temaer og gør vedligehold ét sted i stedet for per side |
| 4/8/12-kolonne `.layout-grid` + specifikke breakpoints ved 768px og 1200px | Punkt 1: mobile-first med iPhone-, iPad- og MacBook Air-bredder som reference |
| Accentfarve ændret fra et lysere rødt til `#C0392B` | Punkt 1 (WCAG 2.1 AA): sikrer ≥4.5:1 kontrast for CTA-tekst i hvidt på farvet baggrund |
| Alle knapper min. 44×44px (`--tap-min`) | Punkt 1: WCAG-krav til tryk-mål på mobil |
| Semantisk HTML: `header`, `nav`, `main`, `section`, `footer`, `button` til interaktive elementer | Punkt 1: semantisk struktur og skærmlæser-venlighed |
| Skip-link, synlig fokus-ring (`:focus-visible`), `aria-expanded`/`aria-current` på interaktive komponenter | Punkt 1: tastaturnavigation og tydeligt fokus |
| Søgeikon åbner et søgefelt i stedet for at gå til en selvstændig søgeresultatside | Punkt 4: "søgeikon til højre" på alle bredder; enkel klient-side søgning på sidetitler |
| "Tag Testen Her" vises som fuld knap på desktop/tablet og som kompakt "Test"-knap på mobil, ud over burgermenuen | Punkt 4: CTA'en skal være synlig i headeren på alle sider og enheder |
| Cases & Mød os er undersider til Studiemiljø (linket fra siden og footeren, ikke i hovedmenuen) | Punkt 4 angiver kun 5 hovedmenupunkter — Cases/Mød os er stadig tilgængelige som WordPress-underordnede sider |
| "Du kender det allerede" og kompetence-grid er klik-for-at-folde-ud i stedet for statisk tekst | Punkt 3: engagerende, ligeværdig tone, og møder målgruppen i det, de allerede kender (TikTok, annoncer mv.), før det kobles til faglige begreber |
| Ingen løn/job-tal, ingen fagnavne der ikke er offentliggjort, ingen ansøgningsfunktion | Punkt 9: kun dokumenterbar information; alt andet er placeholder med link til officiel kilde |
| Testen scorer bredt på tre profiler og lover aldrig optagelse | Punkt 7: 8 spørgsmål, kreativ/analytisk/bred vinkel, altid CTA'erne "Læs om uddannelsen" og "Søg ind" |
| Farvepalet: varm off-white baggrund, mørk ink-tekst, én rød accentfarve + gul highlight | Punkt 3: moderne, digital, energisk men læsbar — accentfarven bruges konsekvent kun til CTA'er og highlights, så den ikke drukner i baggrunden |

---

## c) WordPress-sammenligning

Siden er bygget, så hver del direkte kan genskabes i WordPress:

| På denne prototype | WordPress-begreb |
|---|---|
| `index.html`, `uddannelse.html`, `karriere.html` osv. | **Pages** — hver HTML-fil bliver én WordPress-side |
| `cases.html`, `moed-os.html` (linket fra Studiemiljø, ikke i hovedmenuen) | **Underordnede sider** (Page attributes → Parent page: Studiemiljø) |
| De enkelte team-profiler på `moed-os.html` | Kunne alternativt bygges som **Posts** i et "Team"-taxonomi/custom post type, hvis gruppen vokser |
| Gentagne blokke som hero, kortgrid, FAQ-accordion, timeline, quote-cards | **Gutenberg-blokke** — enten kernens Group/Columns/Cover-blokke med custom CSS-klasser, eller egne **block patterns** man genbruger på tværs af sider |
| `header`/`.site-header` og `footer`/`.site-footer` (identiske på alle sider) | **Template parts** ("header" og "footer") i Site Editor — redigeres ét sted, opdateres alle steder |
| Hovedmenuen med de 5 punkter + mobilpanel | **Menus** (Appearance → Menus / Navigation-blok), med to menulokationer: primær og mobil |
| `assets/css/style.css` design-tokens (farver, fonte, spacing) | **`theme.json` → Global Styles** (Site Editor → Styles) |
| Sidens overordnede opbygning (hero + sektioner i rækkefølge) | **Templates** (fx en "Page" eller "Front Page"-skabelon i Site Editor, sammensat af blok-patterns) |
| FAQ-accordion, quiz, søgefelt, timeline, flip-cards | **Plugins/custom blocks**: fx et FAQ/Accordion-plugin, et Forms-plugin (til kontaktformularen) og en simpel custom block eller embed til quizzen (kan bygges som en Gutenberg-blok med JavaScript, eller embeddes via en iframe/shortcode) |
| Søgeikon → søgefelt | Kernens **Search-blok**, evt. udvidet med et søge-plugin, hvis indhold vokser |
| Ansøgnings- og optagelse.dk-links | Almindelige **links** — ingen plugin nødvendig, da der bevidst ikke er en ansøgningsfunktion på siden |
| Placeholder-billeder | **Media Library** — pladsholderne udskiftes med rigtige billeder/videoer, uploadet og indsat via Image/Video/Gallery-blokke |

Kort sagt: hver `.html`-fil = én **Page**, de faste, genbrugte dele (header, footer, kort-grid, FAQ, hero) = **template parts og block patterns**, det visuelle sprog i `style.css` = **Global Styles/theme.json**, og navigationen = **Menus**.
