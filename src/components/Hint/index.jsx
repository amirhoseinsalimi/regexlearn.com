import { useState, useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from "react-intl";

import Shortcut from "../Shortcut";
import hotkeys from "../../utils/hotkeys";
import shortcuts from "../../shortcuts";



const Hint = ({ regex, flags }) => {
  const hintRef = useRef(null);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    hotkeys(shortcuts.hint, function(event, handler){
      event.preventDefault();
      ReactTooltip.show(hintRef.current);
      setShowStatus(true);
    });


    return () => {
      hotkeys.unbind(shortcuts.hint);
      ReactTooltip.hide(hintRef.current);
      setShowStatus(false);
    };
  }, [regex]);

  const toggleShow = () => {
    if (showStatus) {
      ReactTooltip.hide(hintRef.current);
      setShowStatus(false);
    } else {
      ReactTooltip.show(hintRef.current);
      setShowStatus(true);
    }
  };

  return (
    <div ref={hintRef} className="hint" data-tip data-for="hint">
      <span
        role="button"
        className="hint-question"
        onClick={toggleShow}
        onKeyPress={toggleShow}
        tabIndex={0}
      >
        <FormattedMessage id="general.hintQuestion" />
        <Shortcut command={shortcuts.hint} />
      </span>

      <ReactTooltip
        backgroundColor="#444"
        arrowColor="#444"
        clickable
        id="hint"
        place="top"
        effect="solid"
      >
        <span className="hint-answer">
          /{regex}/{flags}
        </span>
      </ReactTooltip>
    </div>
  );
};

export default Hint;
