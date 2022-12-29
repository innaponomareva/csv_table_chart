import { useContext, useEffect, useRef, useState } from "react";
import {
  DataContext,
  DataContextInterface,
} from "../../context/data/dataContext";
import clsx from "clsx";
import { IFilter } from "../../models/IFilter";

interface TableDataCellProps {
  rowId: string;
  fieldIndex: number;
  fieldKey: string;
  fieldValue: string;
  filter: IFilter | null;
}

const TableDataCell: React.FC<TableDataCellProps> = ({
  rowId,
  fieldIndex,
  fieldKey,
  fieldValue,
  filter,
}) => {
  const { updateRecord } = useContext(DataContext) as DataContextInterface;
  const [value, setValue] = useState(fieldValue);
  const [activeFilter, setActiveFilter] = useState(false);
  const prevStateRef: React.MutableRefObject<string | undefined> = useRef();

  useEffect(() => {
    if (filter && filter.category === fieldKey) {
      setActiveFilter(true);
    }
  }, [filter, fieldKey, setActiveFilter]);

  useEffect(() => {
    prevStateRef.current = fieldValue;
  }, [fieldValue]);

  return (
    <td className={clsx(activeFilter && "active-filter")}>
      <textarea
        rows={4}
        className={clsx(
          "form-control form-control-cell",
          fieldIndex === 0 && "form-control-th"
        )}
        value={value}
        disabled={activeFilter}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={
          prevStateRef.current !== undefined && prevStateRef.current !== value
            ? () => {
                console.log("prevStateRef.current", prevStateRef.current);
                console.log("value", value);
                updateRecord({ id: rowId, key: fieldKey, value: value });
              }
            : undefined
        }
      />
    </td>
  );
};

export default TableDataCell;
