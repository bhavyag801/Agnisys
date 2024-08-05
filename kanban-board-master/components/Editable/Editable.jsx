import React, { useState } from "react";
import PropTypes from "prop-types";
import { Plus, X } from "react-feather";
import "./Editable.css";

const Editable = ({
  handler = false,
  defaultValue = "",
  onSubmit,
  placeholder = "Enter text",
  btnName = "Add",
  name = "Add",
  parentClass = "",
  className = "",
  setHandler,
}) => {
  const [show, setShow] = useState(handler);
  const [text, setText] = useState(defaultValue);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (text && onSubmit) {
      setText("");
      onSubmit(text);
    }
    setShow(false);
  };

  return (
    <div className={`editable ${parentClass}`}>
      {show ? (
        <form onSubmit={handleOnSubmit}>
          <div className={`editable__input ${className}`}>
            <textarea
              placeholder={placeholder}
              autoFocus
              id="edit-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="btn__control">
              <button className="add__btn" type="submit">
                {btnName}
              </button>
              <X
                className="close"
                onClick={() => {
                  setShow(false);
                  if (setHandler) setHandler(false);
                }}
              />
            </div>
          </div>
        </form>
      ) : (
        <p
          onClick={() => {
            setShow(true);
          }}
        >
          {defaultValue === "" && <Plus />}
          {name}
        </p>
      )}
    </div>
  );
};

Editable.propTypes = {
  handler: PropTypes.bool,
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  btnName: PropTypes.string,
  name: PropTypes.string,
  parentClass: PropTypes.string,
  className: PropTypes.string,
  setHandler: PropTypes.func,
};




export default Editable;
