import { ICategoryItem } from "../../models/ICategoryItem";

interface ChartDataListProps {
  categoryItems: ICategoryItem[];
}

const ChartDataList: React.FC<ChartDataListProps> = ({ categoryItems }) => {
  return (
    <ul className="chart-data-list-container">
      {categoryItems.map((item, index) => {
        return (
          <li key={index}>
            <span className="count">{index + 1}</span>
            <span>{`${item.label} (${item.frequency}%)`}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ChartDataList;
