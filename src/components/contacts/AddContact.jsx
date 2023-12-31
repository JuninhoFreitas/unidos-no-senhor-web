import React, { Component } from "react";
import { connect } from "react-redux";
import TextInputGroup from "../layout/TextInputGroup";
import { addContact } from "../../actions/contactActions";

class AddContact extends Component {
  state = {
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    dataBatismo: "",
    cargo: "",
    dataEntrada: "",
    dataSaida: "",
    situacao: "",
    observacao: "",
    errors: {},
  };

  onSubmit = (e) => {
    e.preventDefault();

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
    } = this.state;

    // Check For Errors
    if (nome === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (telefone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const newContact = {
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
    };

    //// SUBMIT CONTACT ////
    this.props.addContact(newContact);

    // Clear State
    this.setState({
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      dataBatismo: "",
      cargo: "",
      dataEntrada: "",
      dataSaida: "",
      situacao: "",
      observacao: "",
      errors: {},
    });

    //Redirect to home
    this.props.history.push("/");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
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
      errors,
    } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Cadastrar Membro</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Nome"
              name="nome"
              placeholder="Insira um nome"
              value={nome}
              onChange={this.onChange}
              error={errors.nome}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Insira um Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Telefone"
              name="telefone"
              placeholder="Insira um Telefone"
              value={telefone}
              onChange={this.onChange}
              error={errors.telefone}
            />
            <TextInputGroup
              label="Data Nascimento(Opcional)"
              name="dataNascimento"
              placeholder="Insira a Data de Nascimento"
              value={dataNascimento}
              onChange={this.onChange}
              error={errors.dataNascimento}
            />
            <TextInputGroup
              label="Data Batismo(Opcional)"
              name="dataBatismo"
              placeholder="Insira a Data de Batismo"
              value={dataBatismo}
              onChange={this.onChange}
              error={errors.dataBatismo}
            />
            <TextInputGroup
              label="Cargo(Opcional)"
              name="cargo"
              placeholder="Insira o Cargo"
              value={cargo}
              onChange={this.onChange}
              error={errors.cargo}
            />
            <TextInputGroup
              label="Data Entrada(Opcional)"
              name="dataEntrada"
              placeholder="Insira a Data de Entrada"
              value={dataEntrada}
              onChange={this.onChange}
              error={errors.dataEntrada}
            />
            <TextInputGroup
              label="Data Saida(Opcional)"
              name="dataSaida"
              placeholder="Insira a Data de Saída"
              value={dataSaida}
              onChange={this.onChange}
              error={errors.dataSaida}
            />
            <TextInputGroup
              label="Situacao(Opcional)"
              name="situacao"
              placeholder="Insira a situacao do cadastro"
              value={situacao}
              onChange={this.onChange}
              error={errors.situacao}
            />
            <TextInputGroup
              label="Observacao(Opcional)"
              name="observacao"
              placeholder="Insira uma observacao"
              value={observacao}
              onChange={this.onChange}
              error={errors.observacao}
            />
            <input
              type="submit"
              value="Cadastrar Membro"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { addContact })(AddContact);
