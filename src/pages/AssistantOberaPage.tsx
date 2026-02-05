import { Link } from "react-router-dom";

export function AssistantOberaPage() {
  return (
    <div className="layout">
      <header className="header-card">
        <h1 className="logo">ober<span>A</span></h1>
        <p>Garant de la qualité de votre air</p>
        <h2>Assistant Technique OberA</h2>
      </header>

      <main className="panel">
        <h3>Que souhaitez-vous faire ?</h3>
        <div className="grid-actions">
          <button className="action-btn" type="button">🍃 Purificateurs d'air</button>
          <button className="action-btn" type="button">🌪️ Dépoussiéreurs</button>
          <button className="action-btn" type="button">🧊 Rafraîchisseurs d'air</button>
          <button className="action-btn" type="button">🛠️ Tables aspirantes</button>
          <button className="action-btn wide" type="button">🔧 Commander des consommables</button>
          <Link className="action-btn wide primary" to="/charbon-actif">
            🧪 Calculateur saturation charbon actif
          </Link>
        </div>
      </main>
    </div>
  );
}
