import React from "react";
import { useState } from "@wordpress/element";

window.resourceAddress = "";

const BoxForm = ({ onSubmit = () => null }) => {
  const [resourceUrl, setResourceUrl] = useState(window.resourceAddress);
  const onChange = event => {
    const input = event.target;
    setResourceUrl(input.value);
  };
  const onFormSubmit = () => {
    window.resourceAddress = resourceUrl;
    onSubmit();
  };
  return (
    <div className="resource-form">
      <h1>Add testing resource api</h1>
      <p>
        Go to <a href="https://jsonbox.io">jsonbox.io</a>, copy and paste the
        url and add to this field. This will be stored to a{" "}
        <code>resourceAddress</code> global on the window that you can use as a
        testing api for this project.
      </p>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="resource-url-input">jsonbox.io address:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control mr-4"
            value={resourceUrl}
            onChange={onChange}
          />
          <button className="btn btn-primary" type="submit">
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoxForm;
