import React, { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagManager from "react-gtm-module";

function App() {
  const [formInput, setFormInput] = useState({
    firstname: "Rishav",
    lastname: "Kumar",
    email: "rishav@gamil.com",
    mobile: "6203356879",
    username: "user@123",
    gender: "M",
    birthday: "10 AUG 2000",
  });

  const [customAttribute, setCustomAttribute] = useState({
    attributeName: "",
    attributeType: "string",
    attributeValue: "",
  });
  const [uid, setUid] = useState({ id: "" });
  const handleLogOut = () => {
    console.log("Logout Button Clicked ");
    toast.warning("Log Out Successfull");
  };
  const handleIdChange = (e) => {
    setUid({
      ...uid,
      [e.target.name]: e.target.value,
    });
  };
  const handleUidSubmit = (e) => {
    e.preventDefault();
    // Moengage Adding Unique User Id
    console.log("User logging : " + uid.id);
    toast.success("User logged in : " + uid.id);
  };
  // GTM Initialization
  const tagManagerArgs = {
    gtmId: "GTM-5PWRGFW2",
  };

  TagManager.initialize(tagManagerArgs);

  const trackButtonClickedEvent = () => {
    console.log("Button Clicked Event made");
    toast.success("Button Clicked Event made");
  };

  const trackUserDeatilsUpdateEvent = () => {
    console.log("User deatils updated");
    toast.success("User details updated");
  };

  const handleInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleCustomAttributeChange = (e) => {
    setCustomAttribute({
      ...customAttribute,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    trackUserDeatilsUpdateEvent();
  };
  const handleCustomAttributeSubmit = (e) => {
    e.preventDefault();
    if (
      customAttribute.attributeName !== "" &&
      customAttribute.attributeValue !== ""
    ) {
      var typedAttributeValue;
      switch (customAttribute.attributeType) {
        case "string":
          typedAttributeValue = customAttribute.attributeValue.toString();
          break;
        case "integer":
          typedAttributeValue = parseInt(customAttribute.attributeValue);
          break;
        case "double":
          typedAttributeValue = parseFloat(customAttribute.attributeValue);
          break;
        case "date":
          typedAttributeValue = new Date(customAttribute.attributeValue);
          break;
        case "boolean":
          typedAttributeValue = customAttribute.attributeValue === "true";
          break;
        case "array":
          // Assume array values are separated with comma
          typedAttributeValue = customAttribute.attributeValue.split(",");
          break;
        default:
          typedAttributeValue = customAttribute.attributeValue.toString();
      }
      toast.success("Custom attribute added" + typedAttributeValue);
    } else {
      toast.error("Custom attribute fields cannot be empty");
    }
  };
  // Name each type for UI
  const typeOptions = [
    "string",
    "integer",
    "double",
    "date",
    "boolean",
    "array",
  ];
  return (
    <div className="App">
      <ToastContainer />
      <div className="App-header">
        <h1>Moenage</h1>
        <h2>
          Welcome to Sample Moenage Web SDK APP 2 using Google Tag Manager (GTM)
          Templates{" "}
        </h2>
      </div>
      <p className="App-intro">
        To get started Read{" "}
        <a
          href="https://github.com/moengage/webSDK-sample/tree/master/react-sample"
          rel="noopener noreferrer"
          className="App-link"
        >
          moenage-react-sample
        </a>
        and
        <a
          href="https://github.com/moengage/webSDK-sample/tree/master/react-sample"
          target="_blank"
          rel="noopener noreferrer"
          className="App-link"
        >
          moenage-react-sample
        </a>
        .
      </p>

      <button className="App-button" onClick={trackButtonClickedEvent}>
        Track Sample Event
      </button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <form className="Custom-Attribute-Form" onSubmit={handleUidSubmit}>
          <input
            name="id"
            value={uid.id}
            onChange={handleIdChange}
            required
            placeholder="User ID"
          />
          <button type="submit">Log In </button>
        </form>
        <button className="LogOut-button" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      <form className="App-form" onSubmit={handleSubmit}>
        <input
          name="firstname"
          id="firstname"
          value={formInput.firstname}
          onChange={handleInputChange}
          required
          placeholder="First name"
        />
        <input
          name="lastname"
          value={formInput.lastname}
          onChange={handleInputChange}
          required
          placeholder="Last name"
        />
        <input
          name="email"
          value={formInput.email}
          onChange={handleInputChange}
          required
          placeholder="Email"
        />
        <input
          name="mobile"
          value={formInput.mobile}
          onChange={handleInputChange}
          required
          placeholder="Mobile"
        />
        <input
          name="username"
          value={formInput.username}
          onChange={handleInputChange}
          required
          placeholder="Username"
        />
        <input
          name="gender"
          value={formInput.gender}
          onChange={handleInputChange}
          required
          placeholder="Gender"
        />
        <input
          name="birthday"
          value={formInput.birthday}
          onChange={handleInputChange}
          required
          placeholder="Birthday"
        />
        <button className="Form-button" type="submit">
          Submit
        </button>
      </form>
      <form
        className="Custom-Attribute-Form"
        onSubmit={handleCustomAttributeSubmit}
      >
        <select
          name="attributeType"
          value={customAttribute.attributeType}
          onChange={handleCustomAttributeChange}
        >
          {typeOptions.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
        </select>
        <input
          name="attributeName"
          value={customAttribute.attributeName}
          onChange={handleCustomAttributeChange}
          required
          placeholder="Add custom attribute name"
        />
        <input
          name="attributeValue"
          value={customAttribute.attributeValue}
          onChange={handleCustomAttributeChange}
          required
          placeholder="Add custom attribute value"
        />
        <button type="submit">Add Attribute</button>
      </form>
    </div>
  );
}

export default App;
