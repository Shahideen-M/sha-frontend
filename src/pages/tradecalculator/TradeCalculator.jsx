import { useState } from "react";
import "./TradeCalculator.css";
import { calculateTrade } from "../../services/tradeApi";

function TradeCalculator() {

    const [mode, setMode] = useState("craft");

    const [sellingPrice, setSellingPrice] = useState("");
    const [tax, setTax] = useState("10");
    const [quantity, setQuantity] = useState("1");

    const [materials, setMaterials] = useState([
        {
            materialName: "",
            quantity: "",
            price: ""
        }
    ]);

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function addMaterial() {

        setMaterials(prev => [
            ...prev,
            {
                materialName: "",
                quantity: "",
                price: ""
            }
        ]);

        setResult(null);
    }

    function updateMaterial(index, field, value) {

        const updated = [...materials];

        updated[index][field] = value;

        setMaterials(updated);

        setResult(null);
    }

    function removeMaterial(index) {

        setMaterials(
            materials.filter((_, i) => i !== index)
        );

        setResult(null);
    }

    async function handleCalculate() {

    setLoading(true);

    try {

        const request = {

            sellingPrice: Number(sellingPrice),
            tax: Number(tax),
            quantity: Number(quantity),

            materials:
                mode === "craft"
                    ? materials.map(material => ({
                        materialName: material.materialName,
                        requiredQuantity: Number(material.quantity),
                        price: Number(material.price)
                    }))
                    : []

        };

        const response = await calculateTrade(request);
        setResult(response);

    } catch (error) {

        console.error(error);
        alert("Calculation failed.");
        {error && <p className="error">{error}</p>}

    } finally {

        setLoading(false);

    }

}

    return (
        <div className="trade-page">

            <h1>Trade Calculator</h1>

            <div className="mode-buttons">
                <button className={mode === "craft" ? "active" : ""}
                    onClick={() => {
                    setMode("craft");
                    setResult(null);
                    }}
                >
                    Craft Calculator
                </button>

                <button className={mode === "tax" ? "active" : ""}
                    onClick={() => {
                    setMode("tax");
                    setResult(null);
                    }}
                >
                    Tax Calculator
                </button>
            </div>

            <div className="trade-form">

                <label>Selling Price</label>
                <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => {
                        setSellingPrice(e.target.value);
                        setResult(null);
                    }}
                />

                <label>Tax (%)</label>
                <input
                    type="number"
                    value={tax}
                    onChange={(e) => {
                        setTax(e.target.value);
                        setResult(null);
                    }}
                />

                <label>Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        setQuantity(e.target.value);
                        setResult(null);
                    }}
                />

            </div>

            { mode === "craft" && (
                <div className="materials">

                <h2>Materials</h2>

                <div className="material-row header">
                    <span>Name</span>
                    <span>Qty</span>
                    <span>Price</span>
                </div>

                {materials.map((material, index) => (

                    <div className="material-row" key={index}>

                        <input
                            placeholder="Material Name"
                            value={material.materialName}
                            onChange={(e) =>
                                updateMaterial(
                                    index,
                                    "materialName",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="number"
                            placeholder="Qty "
                            value={material.quantity}
                            onChange={(e) =>
                                updateMaterial(
                                    index,
                                    "quantity",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={material.price}
                            onChange={(e) =>
                                updateMaterial(
                                    index,
                                    "price",
                                    e.target.value
                                )
                            }
                        />

                        <button className="remove-btn"
                            onClick={() => removeMaterial(index)}
                            disabled={materials.length === 1}>
                            ✕
                        </button>

                    </div>

                ))}

                <button className="add-btn" onClick={addMaterial}>
                    + Add Material
                </button>

            </div>
            )}

            <button className="calculate-btn"
            onClick={handleCalculate}
            disabled={loading}>
                {loading ? "Calculating..." : "Calculate"}
            </button>

            {result && (

                <div className="result-card">
                    <h2>Results</h2>

                    <div className="result-item">
                        <span>Net Received</span>
                        <span>{result.netReceived}</span>
                    </div>

                    {mode === "craft" && (
                        <>
                            <div className="result-item">
                                <span>Total Cost / Craft</span>
                                <span>{result.totalCostPerCraft}</span>
                            </div>

                            <div className="result-item">
                                <span>Total Cost</span>
                                <span>{result.totalCostPerAllCrafts}</span>
                            </div>

                            <div className="result-item">
                                <span>Profit / Craft</span>
                                <span>{result.profitPerCraft}</span>
                            </div>

                            <div className="result-item">
                                <span>Total Profit</span>
                                <span>{result.totalProfit}</span>
                            </div>

                            <div className="result-item">
                                <span>Profit %</span>
                                <span>{result.profitPercentage.toFixed(2)}%</span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default TradeCalculator;