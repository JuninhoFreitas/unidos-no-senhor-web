import React, { Component } from "react";
import { connect } from "react-redux";
import Contact from "./Contact";
import { getContacts } from "../../actions/contactActions";

class Contacts extends Component {
  componentDidMount() {
    this.props.getContacts();
    console.log('PR', this.props);
  }

  render() {
    console.log('eaaaa', this.props)
    return (
      <React.Fragment>
        <h1 className="mb-3">
          <span className="text-primary">Lista de </span>Membros
        </h1>
        {
          this.props.membros.map((membro) => {
            console.log("ei", membro);
            return <Contact membros={membro} key={membro.id} />;
          })
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('SA', state);
  return {
  membros: state.membro.membros,
}};

export default connect(mapStateToProps, { getContacts })(Contacts);
