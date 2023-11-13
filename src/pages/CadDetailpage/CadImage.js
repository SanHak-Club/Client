import { OutputContext } from "../../contextAPI/OutputContext";
import { useContext, useState } from "react";
import cryptoJs from "crypto-js";
import Modal from "react-modal";

Modal.setAppElement("#root");

function CadImage({ id }) {
  const { output } = useContext(OutputContext);
  const matchedOutput = output.find((item) => item.id === id);

  const decipher = cryptoJs.AES.decrypt(
    matchedOutput.s3Url,
    cryptoJs.enc.Utf8.parse(process.env.REACT_APP_AES_KEY),
    {
      iv: cryptoJs.enc.Utf8.parse(process.env.REACT_APP_AES_IV),
      padding: cryptoJs.pad.Pkcs7,
      mode: cryptoJs.mode.CBC,
    }
  );

  const imgURL = decipher.toString(cryptoJs.enc.Utf8);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      marginTop: "80px",
    },
  };

  return (
    <div className="h-[90%] w-[40%] p-4 bg-white rounded-lg shadow-lg flex items-center justify-center">
      <img
        src={imgURL}
        className="h-full w-full object-cover"
        onClick={() => setModalIsOpen(true)}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <img
          src={imgURL}
          className="h-full w-full object-cover overflow-y-auto custom-scrollbar"
        />
        <button
          onClick={() => setModalIsOpen(false)}
          style={{
            fontSize: "20px",
            backgroundColor: "#f1f6fe",
            borderRadius: "8px",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default CadImage;
