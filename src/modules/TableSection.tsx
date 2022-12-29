import { useContext, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { DataContext, DataContextInterface } from "../context/data/dataContext";
import { IDataItem } from "../models/IDataItem";
import { IFilter } from "../models/IFilter";
import { createTableRow, getHeaders } from "../service/file";
import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";
import TableDataRow from "../components/table/TableDataRow";
import TableHeaderCell from "../components/table/TableHeaderCell/TableHeaderCell";

const TableSection: React.FC = () => {
  const { data, addRecord } = useContext(DataContext) as DataContextInterface;
  const [filter, setFilter] = useState<IFilter | null>(null);
  const [count, setCount] = useState<number>(5);
  const [state, setState] = useState<IDataItem[] | []>([]);
  const [filtered, setFiltered] = useState<IDataItem[] | []>([]);

  useEffect(() => {
    if (filter) {
      const filtered = data.filter(
        (item: IDataItem) => item[filter.category] === filter.option
      );
      setFiltered(filtered);
      setState(filtered.filter((_: IDataItem, index: number) => index < count));
    } else {
      setState(data.filter((_: IDataItem, index: number) => index < count));
    }
  }, [filter, data, count]);

  return (
    <section>
      <SectionTitle title="Table Section" />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <CustomButton
                icon={<BsPlusCircle />}
                className="plus-icon-btn"
                tooltip={"Add 1st row"}
                onClick={() =>
                  addRecord({
                    newRecord: createTableRow(data, data[0]),
                  })
                }
              />
            </th>
            {getHeaders(data[0]).map((key, index) => {
              return (
                <TableHeaderCell
                  key={`${Math.random()} ${index}`}
                  index={index}
                  header={key}
                  filter={filter}
                  setFilter={setFilter}
                />
              );
            })}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {state.length > 0 &&
            state.map((item, index) => {
              return (
                <TableDataRow
                  key={`${Math.random()} ${index}`}
                  item={item}
                  filter={filter}
                />
              );
            })}
        </tbody>
      </table>

      {((filter && filtered.length > state.length) ||
        (!filter && data.length > state.length)) && (
        <button
          type="button"
          className="btn btn-secondary mx-auto my-0 d-flex"
          onClick={() => setCount(count + 5)}
        >
          Load 5 more
        </button>
      )}
    </section>
  );
};

export default TableSection;
