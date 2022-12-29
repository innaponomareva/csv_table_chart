import clsx from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import {
  DataContext,
  DataContextInterface,
} from "../../../context/data/dataContext";
import { getCategoryItems } from "../../../service/category-items";
import { IFilter } from "../../../models/IFilter";
import TableHeaderDropdown from "./TableHeaderDropdown";

interface TableHeaderCellProps {
  index: number;
  header: string;
  filter: IFilter | null;
  setFilter: (filter: IFilter | null) => void;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  index,
  header,
  filter,
  setFilter,
}) => {
  const { data, updateHeaders } = useContext(
    DataContext
  ) as DataContextInterface;
  const [inputValue, setInputValue] = useState<string>(header);
  const [activeFilter, setActiveFilter] = useState(false);
  const prevInputValueRef: React.MutableRefObject<string | undefined> =
    useRef();
  const categoryItems = getCategoryItems(data, header); // 'Geschlecht' --> // [{label: Herren, frequency: 1}, {label: Damen, frequency: 3}]

  useEffect(() => {
    prevInputValueRef.current = header;
  }, [header]);

  useEffect(() => {
    if (prevInputValueRef.current && inputValue === "id") {
      alert('Word "id" is reserved. Please choose another word.');
      setInputValue(prevInputValueRef.current);
    }
  }, [inputValue]);

  useEffect(() => {
    if (filter && filter.category === header) {
      setActiveFilter(true);
    }
  }, [filter, header, setActiveFilter]);

  return (
    <th className={clsx(activeFilter && "active-filter")}>
      <TableHeaderDropdown
        header={header}
        options={categoryItems}
        setFilter={setFilter}
      >
        <input
          style={{
            minWidth: clsx(
              index === 1 || index === 3 || index === 4 ? "20rem" : "10rem"
            ),
          }}
          className="form-control form-control-th"
          value={inputValue}
          disabled={activeFilter}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={
            prevInputValueRef.current &&
            prevInputValueRef.current !== inputValue &&
            inputValue !== "id"
              ? () =>
                  updateHeaders({
                    [`${prevInputValueRef.current}`]: inputValue,
                  })
              : undefined
          }
        />
      </TableHeaderDropdown>
    </th>
  );
};

export default TableHeaderCell;
