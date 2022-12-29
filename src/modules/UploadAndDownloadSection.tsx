import { useContext } from "react";
import CustomButton from "../components/CustomButton";
import FileInput from "../components/FileInput";
import { DataContext, DataContextInterface } from "../context/data/dataContext";
import { downloadCsvFile } from "../service/file";

interface UploadAndDownloadSectionProps {
  loading: boolean;
  onFileChange: (event: any) => void;
}

const UploadAndDownloadSection: React.FC<UploadAndDownloadSectionProps> = ({
  loading,
  onFileChange,
}) => {
  const { data } = useContext(DataContext) as DataContextInterface;
  return (
    <section className="d-flex align-items-start gap-5 pb-5">
      <>
        <FileInput onChange={onFileChange} />
        {!loading && data.length > 0 && (
          <CustomButton
            label="Download"
            className="btn-outline-secondary"
            onClick={() => downloadCsvFile("csv_created_by_Inna", data)}
          />
        )}
      </>
    </section>
  );
};

export default UploadAndDownloadSection;
