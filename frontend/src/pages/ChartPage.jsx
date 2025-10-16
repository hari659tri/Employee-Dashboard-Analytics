import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// 🔹 Reusable Button component
const Button = ({ children, onClick, variant = "primary", style = {} }) => {
  const baseStyle = {
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s ease-in-out",
    ...style,
  };

  const styles = {
    primary: { ...baseStyle, background: "#2563eb", color: "#fff" },
    ghost: { ...baseStyle, background: "#f3f4f6", color: "#111" },
  };

  return (
    <button
      onClick={onClick}
      style={styles[variant]}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
    >
      {children}
    </button>
  );
};

// 🔹 Chart Page Component
export default function ChartPage() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // keep original to reshuffle
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const resp = await fetch("http://localhost:5000/api/gettabledata.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "test", password: "123456" }),
        });

        if (!resp.ok) throw new Error("Network response was not OK");

        const json = await resp.json();
        const arr = json?.TABLE_DATA?.data;

        if (!Array.isArray(arr))
          throw new Error("Unexpected API response — expected array");

        // 🔹 Convert rows to objects
        const formattedData = arr.map((row, idx) => ({
          id: `${row[3]}-${idx}`,
          name: row[0],
          salary: Number(row[5]?.replace(/[^0-9.-]+/g, "")),
        }));

        // 🔹 Shuffle array to show random 10 employees initially
        const shuffled = formattedData.sort(() => Math.random() - 0.5);
        const chartData = shuffled.slice(0, 10);

        setOriginalData(formattedData);
        setData(chartData);
      } catch (err) {
        console.error(err);
        setError("Failed to load chart data from API");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Shuffle data without reloading
  const shuffleData = () => {
    const shuffled = [...originalData].sort(() => Math.random() - 0.5);
    setData(shuffled.slice(0, 10));
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2 style={{ textAlign: "center", color: "#111" }}>
        Salary Bar Chart (Random 10 Employees)
      </h2>

      {/* 🔹 Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        <Button variant="ghost" onClick={() => navigate("/list")}>
          Back to List
        </Button>
        <Button variant="primary" onClick={shuffleData}>
          🔁 Shuffle Data
        </Button>
      </div>

      {/* 🔹 Loading / Error */}
      {loading && (
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          Loading chart...
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center", color: "crimson" }}>{error}</div>
      )}

      {/* 🔹 Chart */}
      {!loading && !error && data.length > 0 && (
        <div
          style={{
            width: "100%",
            height: 400,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(20,20,40,0.06)",
            padding: 16,
            transition: "0.3s ease",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#374151", fontSize: 12 }}
                angle={-25}
                textAnchor="end"
                height={70}
              />
              <YAxis tick={{ fill: "#374151", fontSize: 12 }} />
              <Tooltip
                formatter={(v) => `$${v.toLocaleString()}`}
                labelStyle={{ color: "#111" }}
              />
              <Bar
                dataKey="salary"
                fill="url(#barGradient)"
                radius={[10, 10, 0, 0]}
                animationDuration={700}
                activeBar={{ fill: "#14B8A6" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 🔹 No Data */}
      {!loading && !error && data.length === 0 && (
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          No data available
        </div>
      )}
    </div>
  );
}
