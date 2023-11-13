import { OutputContext } from "../../contextAPI/OutputContext";
import { useContext } from "react";

function CadInfo({ id }) {
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "dwg-upload";
  const { output } = useContext(OutputContext);
  const matchedOutput = output.find((item) => item.id === id);

  const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${matchedOutput.mainCategory}${matchedOutput.subCategory}/${matchedOutput.title}`;
  let indexlist = matchedOutput.index.split("|");
  return (
    <div className="h-[90%] w-[40%] border-[2px] flex flex-col justify-between items-center p-4 bg-white rounded-lg shadow-lg">
      <div className="w-full h-[10%] border-b text-[18px] truncate text-center mb-4">
        {matchedOutput.title}
      </div>
      <div className="w-full h-[20%] border-b text-[15px]  text-center mb-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {`${matchedOutput.mainCategory}${matchedOutput.subCategory}/${matchedOutput.title}`}
      </div>
      <div className="w-full h-[10%] border-b text-[15px] truncate text-center mb-4">
        {matchedOutput.author}
      </div>
      <div className="w-full h-[10%] border-b text-[15px] truncate text-center mb-4">
        작성날짜: {matchedOutput.createdAt}
      </div>
      <div className="w-full h-[40%] border-b text-[15px] text-center mb-4 overflow-y-auto custom-scrollbar">
        {indexlist.join(",")}
      </div>
      <div className="w-[20%] h-[10%] flex items-end justify-end ml-auto">
        <a
          href={fileURL}
          download
          className="text-[15px]  px-4 py-2 bg-[#f1f6fe] transition-colors duration-200  border-b rounded-lg shadow-lg"
        >
          다운로드
        </a>
      </div>
    </div>
  );
}

export default CadInfo;
