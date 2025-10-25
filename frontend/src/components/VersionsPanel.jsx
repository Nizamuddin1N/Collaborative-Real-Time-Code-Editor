export default function VersionPanel({ versions, onRestore }) {
  return (
    <div style={{
      width: "300px",
      background: "#1e1e1e",
      color: "white",
      padding: "10px",
      borderRadius: "8px",
      overflowY: "auto",
      height: "500px"
    }}>
      <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Version History</h3>
      {versions.length === 0 ? (
        <p style={{ color: "#aaa" }}>No versions yet</p>
      ) : (
        versions.map((v, i) => (
          <div key={i} style={{
            background: "#2b2b2b",
            padding: "8px",
            marginBottom: "8px",
            borderRadius: "6px"
          }}>
            <p style={{ fontSize: "12px", color: "#ccc" }}>
              {new Date(v.timestamp).toLocaleString()}
            </p>
            <button
              onClick={() => onRestore(v.content)}
              style={{
                marginTop: "5px",
                background: "#007acc",
                color: "white",
                border: "none",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Restore
            </button>
          </div>
        ))
      )}
    </div>
  )
}
