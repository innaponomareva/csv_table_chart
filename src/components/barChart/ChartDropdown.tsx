interface ChartDropdownProps {
  categoryList: string[];
  category: string;
  onClickHandler: (category: string) => void;
}

const ChartDropdown: React.FC<ChartDropdownProps> = ({
  categoryList,
  category,
  onClickHandler,
}) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {category !== "" ? category : categoryList[0]}
      </button>

      <ul className="dropdown-menu">
        {categoryList.map((category, index) => (
          <li
            key={index}
            className="dropdown-item"
            onClick={() => onClickHandler(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartDropdown;
