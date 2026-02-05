import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { FILTER_REFERENCES, GROUPS, POLLUANTS, calcMonoSaturation, clamp, parseNumberLoose, statusFromSaturation } from "../lib/calculator";

export function CharbonActifPage() {
  const [filterId, setFilterId] = useState(FILTER_REFERENCES.EPUREX_1000.id);
  const [polluantId, setPolluantId] = useState(POLLUANTS[0].id);
  const [poidsMesure, setPoidsMesure] = useState("");
  const [humidite, setHumidite] = useState("");
  const [temperature, setTemperature] = useState("");

  const filter = useMemo(
    () => Object.values(FILTER_REFERENCES).find((item) => item.id === filterId) ?? FILTER_REFERENCES.EPUREX_1000,
    [filterId]
  );

  const polluant = useMemo(() => POLLUANTS.find((item) => item.id === polluantId) ?? POLLUANTS[0], [polluantId]);
  const poids = parseNumberLoose(poidsMesure);
  const gain = Number.isFinite(poids) ? poids - filter.poidsNeufBrutKg : Number.NaN;
  const result = calcMonoSaturation(gain, filter.poidsCharbonNetKg, GROUPS[polluant.group].avg);
  const saturation = Number.isFinite(result.saturationPct) ? clamp(result.saturationPct, 0, 500) : Number.NaN;
  const status = statusFromSaturation(saturation);

  const warnings = useMemo(() => {
    const out: string[] = [];
    const h = parseNumberLoose(humidite);
    const t = parseNumberLoose(temperature);
    if (!Number.isFinite(poids)) out.push("Poids mesuré invalide: utilisez une valeur numérique (ex: 8,30).");
    if (Number.isFinite(gain) && gain < 0) out.push("Poids inférieur au poids neuf: vérifier la saisie ou la référence filtre.");
    if (Number.isFinite(h) && (h < 0 || h > 100)) out.push("Humidité hors plage (0-100%).");
    if (Number.isFinite(t) && (t < -20 || t > 120)) out.push("Température extrême: vérifier le capteur.");
    if (polluant.group === "4") out.push("Groupe 4: adsorption quasi nulle, utiliser un média spécifique.");
    return out;
  }, [poids, gain, humidite, temperature, polluant.group]);

  return (
    <div className="layout">
      <div className="topbar">
        <Link to="/">← Retour Assistant OberA</Link>
      </div>
      <main className="panel">
        <h2>Calculateur de saturation du charbon actif</h2>
        <p>Mode fiable: décision basée sur seuils 70/75/100% avec garde-fous de saisie.</p>

        <div className="form-grid">
          <label>Référence filtre
            <select value={filterId} onChange={(e) => setFilterId(e.target.value)}>
              {Object.values(FILTER_REFERENCES).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>

          <label>Polluant
            <select value={polluantId} onChange={(e) => setPolluantId(e.target.value)}>
              {POLLUANTS.map((item) => <option key={item.id} value={item.id}>{item.label} — {GROUPS[item.group].label}</option>)}
            </select>
          </label>

          <label>Poids brut mesuré (kg)
            <input value={poidsMesure} onChange={(e) => setPoidsMesure(e.target.value)} placeholder="Ex: 8,30" />
          </label>

          <label>Humidité (%)
            <input value={humidite} onChange={(e) => setHumidite(e.target.value)} placeholder="Optionnel" />
          </label>

          <label>Température (°C)
            <input value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="Optionnel" />
          </label>
        </div>

        <div className="results">
          <article>
            <h3>Gain adsorption</h3>
            <strong>{Number.isFinite(gain) ? gain.toFixed(2) : "-"} kg</strong>
          </article>
          <article>
            <h3>Capacité max</h3>
            <strong>{Number.isFinite(result.capaciteMaxKg) ? result.capaciteMaxKg.toFixed(2) : "-"} kg</strong>
          </article>
          <article>
            <h3>Saturation</h3>
            <strong>{Number.isFinite(saturation) ? saturation.toFixed(0) : "-"} %</strong>
            <span className="status">{status}</span>
          </article>
        </div>

        {warnings.length > 0 && (
          <ul className="warnings">
            {warnings.map((warning) => <li key={warning}>{warning}</li>)}
          </ul>
        )}
      </main>
    </div>
  );
}
