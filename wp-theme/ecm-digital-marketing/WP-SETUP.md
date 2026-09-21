# ECM WordPress-blocktema — opsætningsguide

Dette er en fuld konvertering af det statiske ECM-site
(https://snorre0405.github.io/ecom-digitalmarketing/) til et rigtigt
WordPress **blocktema** (Full Site Editing). Samme design, layout,
farver, typografi, responsivitet og alle 10 sider — men nu bygget af
Gutenberg-kerneblokke, så tekst, billeder og sektioner kan redigeres
direkte i Site Editor.

## 1. Installation

1. Zip mappen `wp-theme/ecm-digital-marketing/` (selve temamappen, ikke
   den overliggende `wp-theme`-mappe).
2. WP-admin → **Udseende → Temaer → Tilføj nyt → Upload tema** → vælg
   zip-filen → **Installer** → **Aktivér**.
   (Alternativt: læg mappen direkte i `wp-content/themes/` via FTP/SSH.)
3. Kræver WordPress 6.5+ (testet mod 6.6). Ingen plugins er påkrævet for
   at siden virker — se dog punkt 6 om kontaktformularen.

## 2. Første opsætning (ca. 10 minutter)

### 2.1 Sitetitel og undertekst
**Indstillinger → Generelt**:
- Titel: `ECM`
- Undertekst: `E-commerce & Digital Marketing`

Disse to felter driver "wordmark"-logoet i header og footer
(Site Title + Site Tagline-blokkene).

### 2.2 Opret de 9 undersider
Temaet har en **dedikeret skabelon pr. side** (`page-{slug}.html`), som
WordPress automatisk bruger, når du opretter en side med den præcise
slug herunder — du skal altså ikke selv sætte indhold eller vælge
skabelon manuelt, kun oprette siden og udgive den:

| Sidetitel (forslag)        | Slug (permalink)   | Skabelon, der bruges automatisk |
|-----------------------------|---------------------|----------------------------------|
| Uddannelsen                 | `uddannelse`         | `page-uddannelse.html` |
| Studiemiljø                 | `studiemiljoe`        | `page-studiemiljoe.html` |
| Cases & projekter            | `cases`               | `page-cases.html` |
| Karriere + Muligheder        | `karriere`             | `page-karriere.html` |
| Praktisk info                | `praktisk-info`         | `page-praktisk-info.html` |
| FAQ                          | `faq`                    | `page-faq.html` |
| Mød os                       | `moed-os`                 | `page-moed-os.html` |
| Kontakt                      | `kontakt`                   | `page-kontakt.html` |
| Er ECM noget for dig? (test)  | `test`                       | `page-test.html` |

Forsiden kræver ikke en separat side — `front-page.html` bruges
automatisk til forsiden (`/`), uanset om Læsning-indstillingen står på
"seneste indlæg" eller "statisk side".

Hvis en skabelon af en eller anden grund ikke vælges automatisk (fx hvis
du bruger en anden slug), kan du altid tvinge den valgt manuelt: åbn
siden → panelet **Side** i højre sidebjælke → **Skabelon** → vælg den
rigtige fra listen (de ni er registreret i `theme.json` under
`customTemplates`, så de altid er valgbare).

### 2.3 Navigation
Header- og footer-menuerne er bygget med kernens **Navigation**-blok og
indeholder allerede alle links som "fallback-indhold" — sitet virker
altså med det samme uden yderligere opsætning. Hvis I ønsker at kunne
redigere menuen ét sted (fx tilføje et punkt), kan I åbne
**Udseende → Site Editor → Navigation**, hvor blokkens indhold kan
konverteres til en gemt, genanvendelig menu via værktøjslinjens
"..." → "Opret menu".

### 2.4 Billeder
Alle billed- og videofelter er bevaret som tydelige tekst-pladsholdere
(fx `[BILLEDE: To studerende sidder ved deres computere …]`), præcis
som i det oprindelige design — nøjagtig samme liste som i den statiske
sites README. Udskift dem ved at:
1. Åbne siden i **Rediger** (post-editoren) eller i **Site Editor**
   (for forsiden og de 9 undersider, da deres indhold ligger i selve
   skabelonen).
2. Slette pladsholder-gruppen og indsætte en **Billede**- eller
   **Video**-blok i stedet, eller trække et billede ind i
   Mediebiblioteket og vælge det.

Billedstørrelser er allerede registreret i `functions.php`:
`ecm-hero` (1200×900), `ecm-portrait` (600×750) til teamprofiler og
`ecm-card` (800×600) til cases/galleri.

## 3. Sådan er sektionerne bygget (for jeres eksamensforsvar)

| Sektionstype | Gutenberg-løsning | Hvorfor |
|---|---|---|
| Sidehoved/sidefod | **Template parts** (`parts/header.html`, `parts/footer.html`) med Site Title, Navigation- og Search-blokke | Redigeres ét sted, opdateres alle steder — kernen i FSE |
| Hero, kortgrid, citater, CTA-bannere | Almindelige **Group/Columns/Heading/Paragraph/Buttons**-blokke med egne CSS-klasser | 100 % feltbaseret redigering af al tekst |
| FAQ, "Det lærer du", "Du kender det allerede", "En dag på ECM" | Kernens **Details-blok** (`<details>/<summary>`) | Nativt tilgængelig foldud-funktion helt uden JavaScript — bedre semantik end den håndrullede accordion-JS fra prototypen |
| "Er ECM noget for dig?"-testen | **Custom HTML-blok** | Testen er en stateful, scorende komponent uden kerne-blok-modstykke. Selve spørgsmål/resultat-teksterne ligger bevidst i `assets/js/quiz.js` (variablerne `QUESTIONS`/`RESULTS`), ikke i siden, så scorings-logikken holdes ét sted |
| Kontaktformular | **Custom HTML-blok** (mailto-formular, samme som i prototypen) | Ingen kerne-formularblok findes i WordPress; til rigtig serverafsendelse anbefales et formular-plugin (se punkt 6) |
| Ikoner i kortgrid/kontakt | **Custom HTML-blok** (inline SVG) | Rent dekorative, ikke tekstindhold der skal redigeres |
| Design (farver, fonte, spacing) | `theme.json` → **Global Styles** + `assets/css/style.css` for komponent-CSS, grid og tilgængelighed | theme.json driver editorens farve-/skrift-vælgere; det komplekse komponent-CSS (grid, hover, foldud) ligger i det genbrugte stylesheet |

Se README.md i repoets rod for den fulde, oprindelige gennemgang af
sektionerne og hvordan de matcher WordPress-begreber (Pages, Posts,
Menus, blokke/templates, plugins) — den gennemgang gælder stadig, nu
bare implementeret i praksis i dette tema.

## 4. Pladsholdere, der skal udfyldes

Samme liste som i det statiske site (uændret indhold, nu i skabelonerne
i `templates/`):

- **Billeder/video**: forside-hero, uddannelse (skærm-billede), karriere
  (arbejdssituation), studiemiljø (4 stk.), mød os (4 portrætter).
- **Fakta der skal verificeres**: ansøgningsfrist, adgangskrav,
  studiestart, SU-link, fagoversigt/ECTS, officiel ansøgningslink,
  kontakt-mail, svartid, adresse.
- **Bertrams profiltekst** på Mød os-siden.
- **De fire cases** på Cases-siden (kun struktur er udfyldt).

Søg efter `[` i temamappen for at finde dem alle:
```
grep -rn "\[" templates/
```

## 5. Genbrugelige mønstre (patterns)

Ud over de faste sidedesigns leverer temaet seks genbrugelige
**patterns** (klik "+" i editoren → fanen **Mønstre** → kategorien
"ECM — sektioner"):

- **CTA-banner** — mørk, centreret opfordringssektion
- **Kortgrid (5 linkkort)** — samme kortdesign som forsiden
- **FAQ-liste (foldud)** — til en ny FAQ-sektion et andet sted
- **Teamprofil-kort** — til at tilføje et 5. gruppemedlem
- **Case-kort** — til et nyt projekt/case
- **To kolonner — billede + tekst** — generisk tekst+billede-sektion

Disse er ikke bundet til en bestemt side og kan indsættes på enhver
side eller i et indlæg.

## 6. Kendte afgrænsninger og anbefalinger

- **Kontaktformularen** sender ikke fra serveren — den åbner kun
  besøgendes eget mailprogram (samme adfærd som i prototypen). Til en
  rigtig formular: installér **Contact Form 7** eller **Jetpack Forms**
  og erstat Custom HTML-blokken på Kontakt-siden med plugin'ets blok.
- **Testens indhold** (spørgsmål/resultater) redigeres i koden
  (`assets/js/quiz.js`), ikke i Gutenberg — dokumenteret direkte på
  test-siden som en note til redaktører.
- **Skrifttyper** hentes fra Google Fonts CDN (samme som prototypen).
  Overvej at selv-hoste fontfilerne, hvis siden skal leve op til
  GDPR-anbefalinger om ikke at kalde tredjepartsservere, eller hvis
  temaet skal indsendes til WordPress.org (som kræver selv-hostede
  fonte).
- **screenshot.png** (temaets miniature i Temaer-oversigten) er ikke
  inkluderet, da den kræver en visuel eksport fra en kørende
  WordPress-installation. Tilføj en 1200×900 px PNG med navnet
  `screenshot.png` i temamappens rod, når I har et skærmbillede.

## 7. Lokal test

Hurtigste vej til at se temaet køre lokalt:
```
npx @wordpress/env start
```
(kræver Docker) — eller brug Local, MAMP, eller en almindelig
web-hosting-konto med WordPress 6.5+. Placér temamappen i
`wp-content/themes/ecm-digital-marketing/` og aktivér den som i punkt 1.
