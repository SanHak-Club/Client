import axios from "axios";
import { OutputContext } from "../../contextAPI/OutputContext";
import { useContext, useEffect, useState } from "react";
import cryptoJs from "crypto-js";
import { useNavigate } from "react-router-dom";

function CadSimilar({ id }) {
  const { output } = useContext(OutputContext);
  const matchedOutput = output.find((item) => item.id === id);
  const [labelSimilarity, setLabelSimilarity] = useState([]);
  const [totalSimilarity, setTotalSimilarity] = useState([]);
  const navigate = useNavigate();

  const fetchSimilarities = async () => {
    const labelRes = await axios.get(
      `http://127.0.0.1:8000/api/labelsimilarity/${matchedOutput.id}/`
    );
    setLabelSimilarity(labelRes.data);

    const totalRes = await axios.get(
      `http://127.0.0.1:8000/api/totalsimilarity/${matchedOutput.id}/`
    );
    setTotalSimilarity(totalRes.data);
  };

  useEffect(() => {
    fetchSimilarities();
  }, [id]);

  const handleClick = (cadDataId) => {
    navigate(`/cad/${cadDataId}`);
  };

  return (
    <div className="flex flex-col justify-around items-center h-auto w-full bg-white rounded-lg shadow-lg p-6 space-x-4">
      <h2 className="text-lg font-semibold mb-2">Label Similarity</h2>
      <div className="flex justify-around items-center w-full">
        {labelSimilarity.slice(0, 5).map((cadData, index) => {
          console.log(cadData); // 여기를 추가하였습니다.
          const decipher = cryptoJs.AES.decrypt(
            cadData.s3Url,
            cryptoJs.enc.Utf8.parse(process.env.REACT_APP_AES_KEY),
            {
              iv: cryptoJs.enc.Utf8.parse(process.env.REACT_APP_AES_IV),
              padding: cryptoJs.pad.Pkcs7,
              mode: cryptoJs.mode.CBC,
            }
          );

          const imgURL = decipher.toString(cryptoJs.enc.Utf8);

          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center h-auto w-1/5 bg-gray-200 rounded-lg p-4 cursor-pointer m-2"
              onClick={() => handleClick(cadData._id)}
            >
              <img
                src={imgURL}
                className="h-[80%] w-full object-cover rounded-lg"
              />
              <div className="mt-2 text-center font-semibold text-lg">
                {cadData.title}
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="text-lg font-semibold mt-4 mb-2">Total Similarity</h2>
      <div className="flex justify-around items-center w-full">
        {totalSimilarity.slice(0, 5).map((cadData, index) => {
          console.log(cadData); // 여기를 추가하였습니다.
          const decipher = cryptoJs.AES.decrypt(
            cadData.s3Url,
            cryptoJs.enc.Utf8.parse(process.env.REACT_APP_AES_KEY),
            {
              iv: cryptoJs.enc.Utf8.parse(process.env.REACT_APP_AES_IV),
              padding: cryptoJs.pad.Pkcs7,
              mode: cryptoJs.mode.CBC,
            }
          );

          const imgURL = decipher.toString(cryptoJs.enc.Utf8);

          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center h-auto w-1/5 bg-gray-200 rounded-lg p-4 cursor-pointer m-2"
              onClick={() => handleClick(cadData._id)}
            >
              <img
                src={imgURL}
                className="h-[80%] w-full object-cover rounded-lg"
              />
              <div className="mt-2 text-center font-semibold text-lg">
                {cadData.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CadSimilar;
