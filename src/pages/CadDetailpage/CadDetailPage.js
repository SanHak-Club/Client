import { useParams } from "react-router";
import { OutputContext } from "../../contextAPI/OutputContext";
import { useContext } from "react";
import CadImage from "./CadImage";
import CadInfo from "./CadInfo";
import CadSimilar from "./CadSimilar";

function CadDetailPage() {
  const { id } = useParams();
  return (
    <div class="flex flex-col  w-[100vw] h-[120vh]  items-center justify-evenly bg-[#f1f6fe] overflow-y-auto overflow-x-hidden">
      <div class="flex w-[80%] h-[60%] border-[2px]  justify-evenly items-center  bg-white rounded-lg shadow-lg ">
        <CadImage id={id} />
        <CadInfo id={id} />
      </div>
      <div className="flex-col w-[80%] h-[30%]">
        <CadSimilar id={id} />
      </div>
    </div>
  );
}

export default CadDetailPage;
