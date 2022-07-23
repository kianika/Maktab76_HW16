import { Component } from "react";
import React from "react";
import "./App.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const style = { display: "flex", gap: 10, alignItems: "center" };
let defaultError = true;
const initialState = {
  items: [],
  name: "",
  familyname: "",
  phonenumber: "",
  email: "",
  nameError: "",
  familynameError: "",
  phonenumberError: "",
  emailError: "",
  options: "",
  id: 0,
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    defaultError = false;
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }, this.validate);
  };

  validate = () => {
    this.validateName();
    this.validateFamilyName();
    this.validateEmail();
    this.validatePhoneNumber();
  };

  validateName = () => {
    const { name } = this.state;
    if (name === "") {
      this.setState({ nameError: "Name is Required!" });
    } else if (new RegExp("[0-9]").test(name)) {
      this.setState({ nameError: "Invalid Name!" });
    } else {
      this.setState({ nameError: "" });
    }
  };

  validateFamilyName = () => {
    const { familyname } = this.state;
    if (familyname === "") {
      this.setState({ familynameError: "Name is Required!" });
    } else if (new RegExp("[0-9]").test(familyname)) {
      this.setState({ familynameError: "Invalid FamilyName!" });
    } else {
      this.setState({ familynameError: "" });
    }
  };

  validatePhoneNumber = () => {
    const { phonenumber } = this.state;
    if (phonenumber === "") {
      this.setState({ phonenumberError: "Phone Number is required!" });
    } else if (!phonenumber.startsWith("09") || phonenumber.length > 10) {
      this.setState({ phonenumberError: "Invalid PhoneNumber!" });
    } else {
      this.setState({ phonenumberError: "" });
    }
  };

  validateEmail = () => {
    const { email } = this.state;
    if (email === "") {
      this.setState({ emailError: "Email is Required!" });
    } else if (!email.includes("@")) {
      this.setState({ emailError: "Invalid email" });
    } else {
      this.setState({ emailError: "" });
    }
  };

  getData(data) {}

  handleAdd = async (event) => {
    event.preventDefault();
    const { name, familyname, phonenumber, options, email } = this.state;
    const id = this.state.id++;
    this.setState({
      items: [
        ...this.state.items,
        { id, name, familyname, phonenumber, options, email },
      ],
    });
    console.log(this.state.items);
  };

  handleSelect = (e) => {
    this.setState({ options: e.target.value });
  };

  handleDelete(id) {
    let filterr = [...this.state.items].filter((card) => card.id !== id);
    this.setState({ items: filterr });
    return;
  }

  submit = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleDelete(id),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  render() {
    const {
      name,
      familyname,
      phonenumber,
      email,
      nameError,
      familynameError,
      phonenumberError,
      emailError,
    } = this.state;
    const isValid =
      nameError === "" &&
      familynameError === "" &&
      phonenumberError === "" &&
      emailError === "";
    return (
      <>
        <div className="container">
          <form>
            <h1 className="Info">Contacts Info</h1>
            <div style={style}>
              <input
                name="name"
                placeholder="name"
                value={name}
                onChange={this.handleChange}
              />
              <span className="error-message">*</span>
            </div>
            <div className="error-message">{nameError}</div>
            <div style={style}>
              <input
                name="familyname"
                placeholder="Family Name"
                value={familyname}
                onChange={this.handleChange}
              />
              <span className="error-message">*</span>
            </div>
            <div className="error-message">{familynameError}</div>
            <div style={style}>
              <input
                name="phonenumber"
                placeholder="Phone Number"
                value={phonenumber}
                onChange={this.handleChange}
              />
              <span className="error-message">*</span>
            </div>
            <div className="error-message">{phonenumberError}</div>
            <div style={style}>
              <select
                className="select"
                id="select"
                name="relation"
                required
                onChange={this.handleSelect}
              >
                <option value="" disabled selected hidden>
                  Relationship
                </option>
                <option value="family-members">Family members</option>
                <option value="colleague">Colleague</option>
                <option value="friend">Friend</option>
                <option value="relatives">Relative</option>
              </select>
            </div>
            <div style={style}>
              <input
                name="email"
                placeholder="email"
                value={email}
                onChange={this.handleChange}
              />
              <span className="error-message">*</span>
            </div>
            <div className="error-message">{emailError}</div>
            <button
              type="button"
              value="Add"
              disabled={!isValid || defaultError}
              onClick={this.handleAdd}
            >
              Add{" "}
            </button>
          </form>
        </div>
        <div className="container">
          {this.state.items.map((item) => {
            const { id, name, familyname, phonenumber, options, email } = item;
            return (
              <section key={id} className="card">
                <div>
                  <FaEdit /> <FaTrash onClick={() => this.submit(id)} />
                </div>
                <h4>
                  {name} {familyname}
                </h4>
                <p>{phonenumber}</p>
                <p>{options}</p>
                <p>{email}</p>
              </section>
            );
          })}
        </div>
      </>
    );
  }
}
export default App;
