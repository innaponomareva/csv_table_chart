import { useContext, useState } from "react";
import BarChartSection from "../modules/BarChartSection";
import Loader from "../components/loader/Loader";
import TableSection from "../modules/TableSection";
import { DataContext, DataContextInterface } from "../context/data/dataContext";
import { getFormatedData, getHeaders } from "../service/file";
import UploadAndDownloadSection from "../modules/UploadAndDownloadSection";

const Main: React.FC = () => {
  const { data, setData } = useContext(DataContext) as DataContextInterface;
  const [loading, setLoading] = useState(false);

  const onFileChange = (event: any) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = () => {
        const result = reader.result;
        const formatedData = getFormatedData(result);
        setData(formatedData ? formatedData : []);
        setLoading(false);
      };
    }
  };

  return (
    <div className="container-fluid py-5 ">
      <UploadAndDownloadSection loading={loading} onFileChange={onFileChange} />
      {loading && <Loader />}
      {!loading && data.length > 0 && (
        <>
          <BarChartSection categoryList={getHeaders(data[0])} />
          <TableSection />
        </>
      )}
    </div>
  );
};

export default Main;
