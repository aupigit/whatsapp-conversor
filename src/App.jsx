import React, { useState } from "react";
import Card from "./components/Card/Card";
import "./Form.scss";
import {
  ArrowFatDown,
  Copy,
  LinkBreak,
  LinkSimpleHorizontal,
  Swap,
  WhatsappLogo,
} from "phosphor-react";
import MaskedInput from "./components/MaskedInput/MaskedInput";
import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import Confetti from "./components/Animation/Confetti";
import { QRCodeCanvas } from "qrcode.react";

const Form = () => {
  const [phoneState, setPhoneState] = useState("");
  const [messageState, setMessageState] = useState("");
  const [urlState, setUrlState] = useState("");
  const [copyState, setCopyState] = useState("Copiar Link");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [returnData, setReturnData] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let newPhone = phoneState.replace(/\D/g, "");
    setUrlState(
      `https://api.whatsapp.com/send?phone=55${newPhone}&text=${encodeURIComponent(
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
    setIsSubmitting(false);
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
              <i className="material-icons right">
                <Copy />
              </i>
            </button>
          </div>

          <div className="col s12 m6">
            <a
              className="btn waves-effect waves-light teal button-handler"
              href={url}
              target="a_blank"
            >
              Enviar no WhatsApp
              <i className="material-icons right">
                {" "}
                <LinkSimpleHorizontal />
              </i>
            </a>
          </div>
          <div className="col s12 m12">
            <Button
              className="btn waves-effect waves-light teal accent-1 teal-text button-handler"
              onClick={() => {
                clearAll();
              }}
              endIcon={<Swap />}
            >
              Refazer
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <span className="black-text">
              Ou se preferir use o QR CODE abaixo
              <i>
                {" "}
                <ArrowFatDown size={16} weight="bold" />
              </i>
              <br />
              <br />
            </span>
            <QRCodeCanvas id="qrCode" value={urlState} size={200} level={"H"} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <>
        {isSubmitting && (
          <>
            {!returnData && (
              <Card>
                <Confetti />

                <div className="form-wrap">
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div className="row">
                      <div className="input-field col s12">
                        <h4> Parabéns 🎉🎉🎉</h4>
                        <h5>
                          Agora você pode enviar esse link pra quem você quiser
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      {urlState ? renderResult(urlState) : ""}
                    </div>
                  </form>
                </div>
              </Card>
            )}
          </>
        )}

        {!isSubmitting && (
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
                      <WhatsappLogo size={37} weight="duotone" /> Whatsapp
                      Conversor
                    </h4>
                    <p className="teal-text margin-negative">
                      Crie mensagens personalizadas do WhatsApp e envie para
                      quem você quiser.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <MaskedInput
                      id="phone"
                      type="number"
                      mask={"(99) 99999-9999"}
                      name="phone"
                      label="Escreva seu número de telefone aqui 📱"
                      onChange={(e) => setPhoneState(e.target.value)}
                      value={phoneState}
                    />

                    <span className="helper-text">
                      Ex: 47988369635
                      <br />
                      <span className="teal-text">
                        Não se esqueça do prefixo.
                      </span>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <TextField
                      id="message"
                      name="message"
                      type="text"
                      className="materialize-textarea validate"
                      value={messageState}
                      label="Escreva sua mensagem aqui ✍️"
                      onChange={(e) => setMessageState(e.target.value)}
                      required
                      fullWidth
                      variant="standard"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <button
                      className="btn waves-effect waves-light teal button-handler"
                      type="submit"
                    >
                      Gerar Link
                      <i className="material-icons right">
                        <LinkSimpleHorizontal />
                      </i>
                    </button>
                  </div>
                  {urlState ? renderResult(urlState) : ""}
                </div>
              </form>
            </div>
          </Card>
        )}
      </>
    </>
  );
};

export default Form;
