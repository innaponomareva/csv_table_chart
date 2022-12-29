import { ReactNode, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { ICategoryItem } from "../../../models/ICategoryItem";

interface TableHeaderDropdownProps {
  header: string;
  options: ICategoryItem[];
  setFilter: (filter: { category: string; option: string } | null) => void;
  children: ReactNode;
}

const TableHeaderDropdown: React.FC<TableHeaderDropdownProps> = ({
  header,
  options,
  setFilter,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-content-container">
        {children}
        <button
          className="btn p-0"
          type="button"
          aria-expanded="false"
          onBlur={() => setOpen(false)}
        >
          {!open && (
            <BsChevronDown
              className="chevron-icon"
              onClick={() => setOpen(true)}
            />
          )}
          {open && (
            <BsChevronUp
              className="chevron-icon"
              onClick={() => setOpen(false)}
            />
          )}
        </button>
      </div>
      {open && (
        <ul className="custom-dropdown-menu">
          <li
            className="custom-dropdown-menu-item"
            onMouseDown={() => {
              setFilter(null);
              setOpen(false);
            }}
          >
            all
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              className="custom-dropdown-menu-item"
              onMouseDown={() => {
                setFilter({ category: header, option: option.label });
                setOpen(false);
              }}
            >
              {option.label === "" ? "not specified" : option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TableHeaderDropdown;
