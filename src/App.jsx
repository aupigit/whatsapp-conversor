import React, { useState } from "react";
import Card from "./components/Card/Card";
import "./Form.scss";
import { LinkSimple, WhatsappLogo } from "phosphor-react";

const Form = () => {
  const [phoneState, setPhoneState] = useState("");
  const [messageState, setMessageState] = useState("");
  const [urlState, setUrlState] = useState("");
  const [copyState, setCopyState] = useState(
    "Copiar para área de transferência"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrlState(
      `https://wa.me/?phone=${phoneState}&text=${encodeURIComponent(
        messageState
      )}`
    );
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopyState("Copiado!");
    setTimeout(() => {
      setCopyState("Copiar para área de transferência");
    }, 2000);
  };

  const clearAll = () => {
    setPhoneState("");
    setMessageState("");
    setUrlState("");
  };

  function renderResult(url) {
    return (
      <div className="col s12 result-wrapper">
        <span type="text" id="result" className="result" readOnly={!!urlState}>
          {urlState}
        </span>
        <hr />
        <br />
        <div className="row">
          <div className="col s12 m6">
            <button
              className="btn waves-effect waves-light teal button-handler"
              onClick={() => {
                copyToClipboard(urlState);
              }}
            >
              {copyState}
              <i className="material-icons right">content_copy</i>
            </button>
          </div>
          <div className="col s12 m6">
            <a
              className="btn waves-effect waves-light teal button-handler"
              href={url}
              target="a_blank"
            >
              Enviar no WhatsApp
              <i className="material-icons right">open_in_new</i>
            </a>
          </div>
          <div className="col s12 m12">
            <button
              className="btn waves-effect waves-light teal accent-1 teal-text button-handler"
              onClick={() => {
                clearAll();
              }}
            >
              Limpar tudo
              <i className="material-icons right">clear_all</i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <div className="form-wrap">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="row">
            <div className="input-field col s12">
              <h4>
                <WhatsappLogo size={37} weight="duotone" /> Whatsapp Conversor
              </h4>
              <p className="teal-text margin-negative">
                Crie mensagens personalizadas do WhatsApp e envie para quem você
                quiser.{" "}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="phone"
                name="phone"
                type="number"
                className="validate"
                value={phoneState}
                onChange={(e) => setPhoneState(e.target.value)}
                required
              />
              <label htmlFor="phone">
                Escreva seu número de telefone aqui 📱
              </label>
              <span className="helper-text">
                <span className="teal-text">Não se esqueça do prefixo.</span>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="message"
                name="message"
                type="text"
                className="materialize-textarea validate"
                value={messageState}
                onChange={(e) => setMessageState(e.target.value)}
                required
              />
              <label htmlFor="message">Escreva sua mensagem aqui ✍️</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button
                className="btn waves-effect waves-light teal button-handler"
                type="submit"
              >
                Gerar Link
                <i className="material-icons right">link</i>
              </button>
            </div>
            {urlState ? renderResult(urlState) : ""}
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Form;
