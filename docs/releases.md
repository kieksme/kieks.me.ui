# Verantwortung und Releases

Vor Veröffentlichung entscheiden: endgültiger Repositoryname, GitHub-Sichtbarkeit, Registry (z. B. npm oder GitHub Packages), Zugriffsmodell, Paket-/Assetlizenzen und verantwortliche Maintainer. In dieser Startstruktur ist jedes tatsächliche Paket `private: true`; es wird nichts publiziert.

Vorschlag: `@kieksme/tokens`, später `@kieksme/astro`, bei Bedarf `@kieksme/react`. Unabhängige SemVer-Versionen pro Paket und nachvollziehbare Änderungsnotizen. Entfernte Tokens oder geänderte Komponentenverträge benötigen Major-Versionen; sichtbare Designänderungen müssen auch bei unveränderten Props angekündigt und geprüft werden.

Design-Freigabe durch Brand-Verantwortliche, technische Freigabe durch Paket-Maintainer und einen betroffenen Konsumenten. Keine verpflichtenden direkten Checkout-Verknüpfungen zwischen Repositories: Konsumenten sollen geprüfte, fixierte Artefaktversionen nutzen. Lokale Links dienen nur der Entwicklung. Registry-Secrets erst anfordern, wenn das Veröffentlichungsziel feststeht.
