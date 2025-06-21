import PropTypes from "prop-types";

export default function TeleportConfirmation({ pendingTeleport, onConfirm, onCancel }) {
  if (!pendingTeleport) return null;

  return (
    <div className="teleport-confirmation">
      <p>
        You want to teleport to row {pendingTeleport.row}, col {pendingTeleport.col}?
      </p>
      <button className="button-confirm" onClick={onConfirm}>Yes</button>
      <button className="button-cancel" onClick={onCancel}>No</button>
    </div>
  );
}

TeleportConfirmation.propTypes = {
  pendingTeleport: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
  }),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
