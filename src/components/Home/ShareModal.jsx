
//Share task Modal (INPUT FIELD)
export default function ShareModal({ onClose, onShare, email, setEmail,loading,backendError }) {
    return (
        <>
        
      <div className="modal-overlay">
        <div className="modal">
          <h3>Share Task</h3>
          {!loading ? (
            <>
                {<p className="error-prompt">{backendError || '\u00A0'}</p> }
              <input
                type="email"
                className="task-input"
                placeholder="Enter user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={onShare}>OK</button>
                <button onClick={onClose}>Cancel</button>
              </div>
            </>
          ) : (
            <p>Loading, please wait...</p>
          )}
        </div>
      </div>
      </>
    );
  }
  