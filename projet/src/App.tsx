import { useState } from "react";
import { PROTEIN_GUIDELINES } from "./data/proteinGuidelines";
import type { Goal } from "./data/proteinGuidelines";
import {
  calculateProteinRange,
  generateWeights,
  formatProteinRange,
} from "./utils/calculations";
import "./App.css";

function App() {
  const [minWeight, setMinWeight] = useState<number>(50);
  const [maxWeight, setMaxWeight] = useState<number>(100);
  const [rows, setRows] = useState<number>(6);
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);

  const handleGoalChange = (goal: Goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const isInvalidWeight = minWeight >= maxWeight;
  const isInvalidNegative = minWeight <= 0 || maxWeight <= 0;
  const isInvalidRows = rows < 2;
  const hasErrors = isInvalidWeight || isInvalidNegative || isInvalidRows;

  const weights = hasErrors ? [] : generateWeights(minWeight, maxWeight, rows);

  const exportToCSV = () => {
    if (selectedGoals.length === 0 || hasErrors) return;
    const headers = ["Poids (kg)", ...selectedGoals.map(g => PROTEIN_GUIDELINES[g].label)];
    const csvRows = weights.map(w => {
      const rowData = [w.toString()];
      selectedGoals.forEach(goal => {
        const { min, max } = calculateProteinRange(w, PROTEIN_GUIDELINES[goal].min, PROTEIN_GUIDELINES[goal].max);
        rowData.push(formatProteinRange(Number(min.toFixed(1)), Number(max.toFixed(1))));
      });
      return rowData.join(";");
    });
    const csvContent = [headers.join(";"), ...csvRows].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "besoins_proteines.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    // AJOUT DE CETTE DIV CONTAINER
    <div className="app-container">
      <h1>Calculateur de Besoins</h1>
      
      {/* Classe input-group ajoutée */}
      <div className="controls input-group">
        <div>
          <label htmlFor="minWeight">Poids min (kg)</label>
          <input id="minWeight" type="number" value={minWeight} onChange={(e) => setMinWeight(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="maxWeight">Poids max (kg)</label>
          <input id="maxWeight" type="number" value={maxWeight} onChange={(e) => setMaxWeight(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="rows">Nombre de lignes</label>
          <input id="rows" type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
        </div>
      </div>

      {hasErrors && (
        <div className="error-message">
          {isInvalidNegative && <p>⚠️ Les poids doivent être supérieurs à 0.</p>}
          {isInvalidWeight && !isInvalidNegative && <p>⚠️ Le poids min doit être inférieur au poids max.</p>}
          {isInvalidRows && <p>⚠️ Il faut au moins 2 lignes.</p>}
        </div>
      )}

      <h2>Objectifs sportifs</h2>
      {/* Classes goals-group et checkbox-item ajoutées */}
      <div className="controls goals-group">
        {Object.entries(PROTEIN_GUIDELINES).map(([key, value]) => (
          <div key={key} className="checkbox-item">
            <input
              type="checkbox"
              id={key}
              checked={selectedGoals.includes(key as Goal)}
              onChange={() => handleGoalChange(key as Goal)}
            />
            <label htmlFor={key}>{value.label}</label>
          </div>
        ))}
      </div>

      {selectedGoals.length > 0 && !hasErrors && (
        <>
          <button className="export-btn" onClick={exportToCSV}>
            📥 Télécharger le tableau (CSV)
          </button>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Poids (kg)</th>
                  {selectedGoals.map((goal) => (
                    <th key={goal}>{PROTEIN_GUIDELINES[goal].label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weights.map((w) => (
                  <tr key={w}>
                    <td>{w}</td>
                    {selectedGoals.map((goal) => {
                      const { min, max } = calculateProteinRange(w, PROTEIN_GUIDELINES[goal].min, PROTEIN_GUIDELINES[goal].max);
                      return (
                        <td key={goal}>
                          {formatProteinRange(Number(min.toFixed(1)), Number(max.toFixed(1)))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;