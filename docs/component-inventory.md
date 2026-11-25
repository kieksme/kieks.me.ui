# Komponenten-Inventur und Ausbaupriorität

Stand: geprüfte lokale Checkouts der Website, Brand, Kursplattform, Budget, DataHub, Offers und Infra. Dies ist eine Bestandsaufnahme und Extraktionsplanung; die unten genannten Kandidaten sind noch keine veröffentlichten Library-Komponenten.

## Verbindliche gestalterische Quelle

**Das Website-Repository `kieks.me` ist die visuelle Referenz.** Maßgeblich sind `src/components/ui/atoms`, `molecules`, `organisms`, `src/assets/styles/brand-colors.css`, `figma/spec/spec/SPEC.md` und `tokens.json`. Das Brand-Repository liefert Original-Logos, Fonts und Nutzungsregeln. Das bestehende grüne Kurs-Theme ist nicht die Vorlage für die gemeinsame Bibliothek.

Kurs- und Budgetportal liefern zusätzliche funktionale Muster. DataHub verwendet überwiegend Payload-Komponenten; seine Adminoberfläche wird nicht durch eine neu gebaute allgemeine Bibliothek ersetzt. Bereits vorhanden im UI-Paket: **Logo, Heading, Button, Card und Note**. Varianten vorhandener Komponenten werden nicht als neue Komponenten doppelt gezählt.

## P1 – Grundlage für die Kursportal-Umstellung

| Kandidat | Tatsächlicher Bestand / Quelle | Vertrag und wichtige Zustände |
| --- | --- | --- |
| TextLink | Website `src/components/ui/atoms/TextLink.astro` | Linkziel, optionaler Pfeil, externe Links, Fokus, reduzierte Bewegung |
| Lead / Text | Website `src/components/ui/atoms/Lead.astro` | Größe, Textfarbe, Slot; nicht fest an Website-Tailwindklassen binden |
| AppShell / Container | Kurs `src/layouts/Course.astro`; Website `src/layouts/PageLayout.astro` und `Layout.astro` | Inhaltsbreite, Header-/Footer-Slots, Seitentitel; Metadaten und projektspezifische Ladeprozesse bleiben im Konsumenten |
| Header / Navigation | Website `src/components/ui/organisms/Header.astro`; Kurslayout | Links und Aktionen als Daten, aktiver Eintrag, mobile Navigation, Tastatur/Fokus; Website-Routenhelper entkoppeln |
| Footer | Website `src/components/ui/organisms/Footer.astro`; Kurslayout | Linkgruppen, Marke, Rechtstext-Slots; keine hardcodierten Produktlinks |
| FormField | Website `src/components/ui/Form.astro`, `blog/AuthorContact.astro`; Kurs `src/pages/zugang/[code].astro` | Label, Hilfetext, Fehler, required, eindeutige IDs und aria-Verknüpfungen |
| TextInput / Textarea | dieselben Formulare; Kurs-Lernkontrolle | Typ, Wert, Autocomplete, readonly/disabled, Fehler; kontrollierte Übernahme von HTML-Attributen |
| Select | Budget `src/components/contracts/MonthSelector.astro`, `budget/CompanySelect.astro` | Optionen, Wert, Platzhalter, Fehler, disabled; URL-/API-Logik nicht übernehmen |
| RadioGroup / Checkbox | Kurs `src/quiz/browser.ts`; Website/Budget `src/components/ui/Form.astro` | Feldgruppenlabel, Optionen, Auswahl, Pflichtfeld, disabled; Quizwertung bleibt außerhalb |
| Alert / StatusMessage | Kurs Anmeldung, `src/courses/ParticipantList.astro`, Lernkontrolle; Website `blog/AuthorContact.astro` | Info/Erfolg/Fehler, statisch oder Live-Status; semantisch passende `status`-/`alert`-Rolle |
| Progress | Kurs `src/pages/ki-kompetenz-kurs/lernkontrolle.astro`; Budget `src/components/contracts/ProgressBar.astro` | Wert, Maximum, Label, Zahlenanzeige; nicht nur farbliche Unterscheidung |
| Dialog | Kurs `src/courses/CourseQr.astro` | Öffner, Titel, Inhalt, Schließen, Escape, Fokus-Rückgabe; mehrfach pro Seite verwendbar |
| CopyButton | Kurs `src/courses/CourseQr.astro` | Kopierwert, Label, Erfolg/Fehler; kein fest eingebauter Zugangslink |
| EmptyState | Kurs `src/pages/index.astro`; Budget `src/components/contracts/ContractOverview.astro` | Überschrift, Erklärung, optionaler nächster Schritt; leer von fehlgeschlagen unterscheiden |
| ThemeToggle | Website/Budget `src/components/common/ToggleTheme.astro` | Hell/Dunkel/System, Zustand und Beschriftung; `astrowind:config` und globale Skriptabhängigkeit entfernen |

## P2 – weitere wiederverwendbare Familien

| Kandidat | Tatsächlicher Bestand / Quelle | Extraktionshinweis |
| --- | --- | --- |
| Accordion / FAQ | Website `src/components/ui/molecules/FaqItem.astro` | Native details/summary, offen/geschlossen, mehrere Instanzen; Marker als dekorativer Baustein |
| PrevNext / Pagination | Website/Budget `src/components/blog/Pagination.astro`; Kurs-Modulseite | Vorheriger/nächster Link, aktuelle Seite, Grenzen; Routenbildung bleibt im Konsumenten |
| MetadataList / DefinitionList | Website `src/components/ui/DListItem.astro`; Kurs Lernkontrolle; Budget-Vertragskarten | Bezeichnung/Wert-Paare; kompakt/mehrspaltig |
| ObjectiveList / SidebarPanel | Kurs `src/pages/ki-kompetenz-kurs/module/[id].astro` | Auf Card und Text aufbauen; Daten und Seitennavigation außerhalb |
| TeaserCard / FeatureCard | Website `src/components/CourseTeaser.astro`, `ui/molecules/FeatureCard.astro`, `ServiceCard.astro` | Bestehende Card durch Slots/Varianten ergänzen; nicht je Produkt eine fast identische neue Card bauen |
| Avatar / PersonCard | Website `src/components/ui/molecules/AvatarCard.astro`, `ui/EdgeAvatar.astro` | Bild, Alternativtext, Name, Rolle, Beschreibung; keine Vertrauensannahme für ungeprüftes HTML |
| StepList / Timeline | Website `src/components/ui/molecules/StepCard.astro`, `ui/Timeline.astro`, `widgets/Steps.astro` | Nummerierte Schritte, Titel, Beschreibung, responsiver Verlauf |
| Hero / CTA | Website `src/components/ui/organisms/CtaSection.astro`, `ServiceDetail.astro`, `widgets/ServiceHero.astro` | Inhalt und Links über Props/Slots; gestalterische Wiederverwendung ohne Website-Textkopien |
| Dekorationen | Website `src/components/ui/atoms/Sticker.astro`, `Marker.astro`, `ZigzagDivider.astro`, `Burst.astro`, `Halftone.astro` | Originalassets beibehalten, rein dekorativ aus dem Accessibility-Baum nehmen, reduzierte Bewegung berücksichtigen |
| PricingCard | Offers `AN2025001/components/card-price.*`; Website `widgets/Pricing.astro` | Darstellungsdaten und CTA; keine Zahlungs-/Buchungslogik einbauen |

## Kurs-Kompositionen

Diese Bausteine werden aus der gemeinsamen UI zusammengesetzt und bleiben fachlich beim Kursprodukt:

- **CourseTile / CourseHero:** Kursmetadaten und Einstieg aus Katalog/Datenquelle.
- **CourseRegistration:** Anmeldung mit Zuständen ungültig, voll, schon reserviert und nicht erreichbar. Authentifizierung, Platztransaktion und Cookies bleiben serverseitig.
- **QuizQuestion / AnswerOption / QuizReview:** Darstellung aus FormField, RadioGroup, Card, Status und Progress. Auswahlstrategie und Bewertung bleiben Kurslogik.
- **CourseSharePanel:** QR-Ansicht aus Dialog und CopyButton; geschützte Teilnehmer-/Referentenlinks bleiben Produktdaten.
- **ParticipantList / ConnectionStatus:** generische Liste und Statusanzeige; WebSocket-Authentifizierung und personenbezogene Daten bleiben Kurslogik. Demos nur mit synthetischen Daten.
- **ConfirmationDownload / MaterialDownload:** Button und Downloadstatus; Teilnahme, Bestehen, PDF-Erzeugung und gebuchter Materialanspruch werden im Backend geprüft.

Nicht als vorhandene gemeinsame Library ausgegeben werden Kalender, Buchungscheckout, Rechnungsverwaltung oder ein allgemeines React-Admin-UI. Dafür ist eine eigene Anforderung nötig.

## Umsetzung und Prüfungen

1. Pro Kandidat die aktuelle Website-Darstellung als Referenz erfassen. Funktionale Kurszustände ergänzen; bestehende Website- und Legacy-AstroWind-Komponenten nicht blind duplizieren.
2. Eigenständige Astro-Komponenten mit gemeinsamen Tokens und reinem CSS erstellen. Website/Budget nutzen Tailwind 3, Kurs Tailwind 4; weder deren Utilities noch virtuelle Projektimporte als Voraussetzung in das Paket ziehen.
3. In Astrobook Hell/Dunkel, schmal/breit und relevante Zustände zeigen. Props und Slots direkt an der Story dokumentieren.
4. Tastatur, Fokus, Labels, Fehleranzeigen, mehrere Instanzen, deaktivierte Zustände und gezielte Screenshotvergleiche prüfen. Keine globale ID oder ein nur auf die erste Instanz zielender querySelector.
5. Echte gepackte Pakete in unterstützten Astro-Konsumenten testen, dann schrittweise ins Kursportal übernehmen. Aktuell getestet sind Astro 5.18.2 und 7.4.13; daraus folgt keine Prüfung aller Zwischenversionen.

Für den ersten Migrationsschritt priorisieren wir **AppShell/Navigation, TextLink/Lead, Formulare und Statusmeldungen**. Anschließend folgen Fortschritt, Dialog/Kopieren und die Kurs-Kompositionen. Die übrigen Website-Muster erweitern den Bestand bedarfsorientiert.
