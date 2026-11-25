# Öffentliche npm-Pakete und Releases

## Vorbereiteter Stand

Öffentliche Paketnamen: **`@kieksme/tokens`** und **`@kieksme/astro`**, anfänglich Version `0.1.0`. Root-Workspace und `@kieksme/catalog` bleiben privat. Die Paketmanifeste enthalten `publishConfig.access: public`; das ist eine Veröffentlichungsvorbereitung, keine bereits erfolgte npm-Publikation.

`@kieksme/astro` hängt exakt von derselben Version von `@kieksme/tokens` ab. Npm Workspaces verlinkt diese SemVer-Abhängigkeit lokal; Tarballs enthalten kein `workspace:`-Protokoll und benötigen beim Verbraucher keine benachbarten Checkouts. Beide Pakete werden in dieser ersten Release-Struktur gemeinsam versioniert. Eine spätere unabhängige Versionierung braucht ein bewusstes Releaseverfahren.

Der Token-Export enthält JSON und generiertes CSS. Der Astro-Export enthält kompilierbare `.astro`-Quellen, CSS und unveränderte Logo-SVGs. Der konsumierende Astro-Build kompiliert die Komponenten und verarbeitet die Assets. Es gibt keinen vorgetäuschten frameworkunabhängigen JavaScript-UI-Build.

## Einmalige Einrichtung vor dem ersten Publish

1. Auf npm den Besitz beziehungsweise die Publikationsrechte für den Scope **`@kieksme`** und beide konkreten Paketnamen prüfen. Der GitHub-Organisationsname allein gewährt keine npm-Rechte.
2. **Noch nicht vorhandene Pakete:** Die erste öffentliche Veröffentlichung muss gegebenenfalls durch eine berechtigte Person in einer gesicherten npm-Sitzung erfolgen, weil ein Trusted Publisher gewöhnlich an einem bereits existierenden Paket eingerichtet wird. Dafür exakt die geprüften Release-Tarballs verwenden, Tokens zuerst und danach Astro. Vor dieser Bootstrap-Publikation Eigentümer, Scope und Paketnamen prüfen. In dieser Vorbereitung wurden keine npm-Zugangsdaten angefordert oder erzeugt und keine Pakete veröffentlicht.
3. Für **jedes** npm-Paket unter Settings → Trusted publishing einen GitHub-Actions-Publisher konfigurieren: Owner **`kieksme`**, Repository **`kieks.me.ui`**, Workflowdatei **`release.yml`**, GitHub-Environment **`npm-release`**. Angaben müssen exakt zum Workflow passen. Die Workflowdatei liegt unter `.github/workflows/release.yml`.
4. In GitHub das Environment **`npm-release`** anlegen und geeignete Freigabe-/Branch- bzw. Tag-Regeln setzen. Den ersten Publish bei Bedarf mit manuellem Review schützen. OIDC benötigt `id-token: write`; der Workflow erteilt ansonsten nur `contents: read`.
5. Keine dauerhaft gespeicherten `NPM_TOKEN`-/`NODE_AUTH_TOKEN`-Secrets für diesen Workflow hinzufügen. Beim Check dieser Umgebung waren diese Variablennamen nicht gesetzt. Ein vorhandenes GitHub-Token ersetzt keine npm-Scope- oder Trusted-Publisher-Berechtigung.

Der Workflow fordert npm-Provenance an; dafür muss das GitHub-Quellrepository öffentlich sein. Bei der Vorbereitung wurde `kieksme/kieks.me.ui` als öffentlich verifiziert.

Trusted Publishing setzt einen unterstützten GitHub-hosted Runner und hinreichend aktuelles npm voraus. Der Workflow verwendet Ubuntu, Node 24 und gepinntes npm 11.19.1. OIDC-/npm-Verfügbarkeit und die einmalige Einrichtung müssen bei der ersten echten Ausführung geprüft werden; die lokale Vorbereitung kann das nicht bestätigen.

## Ablauf und Schutzgrenzen

- Ein Tag **`ui-v0.1.0`** triggert den Release für die entsprechende gemeinsame Paketversion. Beide Manifestversionen sowie die Astro-Dependency müssen übereinstimmen.
- Der Tag-Commit muss auf `origin/main` enthalten sein. Manuelle Workflowläufe müssen auf `main` gestartet werden. Keine stillen Branch-Releases.
- `workflow_dispatch` hat `publish: false` als Standard: es baut, prüft und lädt Tarballs als GitHub-Artefakt hoch, schreibt aber nicht nach npm. Nur ein Release-Tag oder ein bewusst aktivierter manueller Publish fordert die Publikation an.
- Vor Publikation laufen frozen Installation (`npm ci --ignore-scripts`), Katalog-Build, vorhandene Tests, Playwright-Browserprüfungen sowie isolierte Builds echter Tarball-Verbraucher mit Astro 5.18.2 und 7.4.13.
- Die Reihenfolge ist Tokens → Astro. Ein bereits veröffentlichter identischer Tarball wird anhand `dist.integrity` übersprungen. Existiert dieselbe Version mit anderem Inhalt, bricht der Workflow ab; keine Wiederveröffentlichung oder stilles Überschreiben. Netzwerk-/Authfehler beim Registry-Check werden nicht als fehlendes Paket behandelt.
- Ein Abbruch nach dem Tokens-Publish kann einen teilweise veröffentlichten Release hinterlassen. Derselbe unveränderte Commit kann nach Behebung erneut ausgeführt werden; der identische Token-Tarball wird dann übersprungen. Bei geänderten Quellen beide Versionen erhöhen.

## Lokale Vorbereitung ohne Registry-Schreibzugriff

```sh
npm ci --ignore-scripts
npm run build
npm test
RELEASE_DIR=/tmp/kieksme-release node .github/scripts/package-release.mjs
RELEASE_DIR=/tmp/kieksme-release node .github/scripts/consumer-smoke.mjs
```

Der Consumer-Smoke installiert gepackte Tarballs und gepinnte Astro-Versionen in temporären Verzeichnissen, kompiliert eine Seite mit Logo, Heading und Card und prüft gerenderte Inhalte, Logo-Ausgabe sowie gebündeltes CSS. Das ist kein Test jeder Astro-Version innerhalb der deklarierten Peer-Range `>=5 <8` und keine Validierung des kompletten Konsumentenprodukts.

## Lizenz- und Assethinweise

Website-basierte Tokens und Code behalten den mitgelieferten Website-MIT-Hinweis. Die Logo-SVGs stammen aus dem Brand-Repository, dessen GPL-v3-Text und Quellenhinweis im Astro-Paket mitgeliefert werden; sie werden nicht pauschal zu MIT umdeklariert. Das Paket verweist deshalb auf `LICENSES.md`. Marken-/Logonutzungsregeln werden dadurch nicht aufgehoben.

Fontdateien werden derzeit **nicht** vom Astro-Paket verteilt. Der optionale Export `@kieksme/astro/fonts.css` lädt Hanken Grotesk und Source Sans 3 aus gepinnten `@fontsource`-Abhängigkeiten, die Fontdateien samt SIL-OFL-Notices mitliefern. Alternativ laden Verbraucher die Schriften selbst. CSS-Schriftfamilien allein stellen keine Fontdateien bereit. Vor einer späteren Asset-/Fontpaketierung Auswahl, Lizenzen und Originaldateien prüfen.

## Verantwortung und Änderungsregeln

Design-Freigabe durch Brand-Verantwortliche, technische Freigabe durch Paket-Maintainer und einen betroffenen Konsumenten. Entfernte Tokens oder geänderte Komponentenverträge sind Breaking Changes. Sichtbare Designänderungen benötigen ebenfalls Änderungsnotizen und visuelle Prüfung. Konsumenten verwenden fixierte geprüfte Versionen und aktualisieren schrittweise; ein Rücksprung erfolgt durch Pinning auf eine frühere freigegebene Version.
