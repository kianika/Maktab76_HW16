import { Component } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

class List extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="container">
        {items.map((item) => {
          const { id, name, familyname, phonenumber, options, email } = item;
          console.log(items);
          return (
            <section key={id} className="card">
              <h4>
                {name}
                <FaEdit />
                <FaTrash onClick={this.props.handelDelete} />
              </h4>
              <p>{familyname}</p>
              <p>{phonenumber}</p>
              <p>{options}</p>
              <p>{email}</p>
            </section>
          );
        })}
      </div>
    );
  }
}

export default List;
