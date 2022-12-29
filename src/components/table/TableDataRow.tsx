import TableDataCell from "./TableDataCell";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import { useContext } from "react";
import {
  DataContext,
  DataContextInterface,
} from "../../context/data/dataContext";
import { createTableRow } from "../../service/file";
import CustomButton from "../CustomButton";
import { IDataItem } from "../../models/IDataItem";
import { IFilter } from "../../models/IFilter";

interface TableDataRowProps {
  item: IDataItem;
  filter: IFilter | null;
}
const TableDataRow: React.FC<TableDataRowProps> = ({ item, filter }) => {
  const { data, addRecord, deleteRecord } = useContext(
    DataContext
  ) as DataContextInterface;
  const array = Object.keys(item).filter((key) => key !== "id");

  return (
    <tr className="table-data-row">
      <td>
        <div className="btn-box">
          <CustomButton
            icon={<BsTrash />}
            className="trash-icon-btn"
            tooltip="delete row"
            onClick={() => deleteRecord(item.id)}
          />

          <CustomButton
            icon={<BsPlusCircle />}
            className="plus-icon-btn"
            tooltip="add next row"
            onClick={() =>
              addRecord({
                newRecord: createTableRow(data, item),
                afterItemId: item.id,
              })
            }
          />
        </div>
      </td>
      {array.map((key, index) => {
        return (
          <TableDataCell
            key={`${Math.random()} ${index}`}
            rowId={item.id}
            fieldIndex={index}
            fieldKey={key}
            fieldValue={item[key]}
            filter={filter}
          />
        );
      })}
    </tr>
  );
};

export default TableDataRow;
