import PropTypes from "prop-types";

import "./TeleportConfirm.css";

export function TeleportConfirm(props) {
  return (
    <div className="teleport-confirmation">
      <p>Teleport here?</p>
      <button className="button-confirm" onClick={props.confirmTeleport}>
        Yes
      </button>
      <button className="button-cancel" onClick={props.cancelTeleport}>
        No
      </button>
    </div>
  );
}

TeleportConfirm.propTypes = {
  confirmTeleport: PropTypes.func,
  cancelTeleport: PropTypes.func,
};
