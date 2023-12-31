import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteContact } from "../../actions/contactActions";

class Contact extends Component {
  state = {
    showContactInfo: false,
  };
  render() {
    console.log('this.props.membros', this.props.membros)
    const {
      nome,
      email,
      telefone,
      dataNascimento,
      dataBatismo,
      cargo,
      dataEntrada,
      dataSaida,
      situacao,
      observacao,
      createdAt,
      updatedAt,
      id,
    } = this.props.membros || {};
    return (
      <div className="card mb-2">
        <div className="card-header">
          <h4>
            {nome}
            <i
              className="fa fa-sort-down ml-2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                this.setState({
                  showContactInfo: !this.state.showContactInfo,
                })
              }
            ></i>
            <i
              className="fa fa-times"
              style={{ cursor: "pointer", float: "right", color: "#2b6ca3" }}
              onClick={() => this.props.deleteContact(id)}
            ></i>
            <Link to={`contact/edit/${id}`}>
              <i
                className="fa fa-pencil"
                style={{
                  cursor: "pointer",
                  float: "right",
                  color: "black",
                  marginRight: "1rem",
                }}
              />
            </Link>
          </h4>
        </div>
        {this.state.showContactInfo ? (
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Email: {email}</li>
              <li className="list-group-item">Telefone: {telefone}</li>
              <li className="list-group-item">Data Nascimento: {dataNascimento}</li>
              <li className="list-group-item">Data Batismo: {dataBatismo}</li>
              <li className="list-group-item">Cargo: {cargo}</li>
              <li className="list-group-item">Data Entrada: {dataEntrada}</li>
              <li className="list-group-item">Data Saida: {dataSaida}</li>
              <li className="list-group-item">Situação: {situacao}</li>
              <li className="list-group-item">Observação: {observacao}</li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(null, { deleteContact })(Contact);
