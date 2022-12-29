interface FileInputProps {
  onChange?: (event: any) => void;
}
const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return (
    <label htmlFor="formFile" className="form-label">
      <input
        className="form-control"
        type="file"
        accept=".csv"
        id="formFile"
        onChange={onChange}
      />
    </label>
  );
};

export default FileInput;
