import { useContext, useState } from 'react';
import { DataContext, DataContextInterface } from '../context/data/dataContext';
import SectionTitle from '../components/SectionTitle';
import BarChart from '../components/barChart/BarChart';
import ChartDataList from '../components/barChart/ChartDataList';
import ChartDropdown from '../components/barChart/ChartDropdown';
import { getCategoryItems } from '../service/category-items';

interface BarChartSectionProps {
  categoryList: string[];
}

const BarChartSection: React.FC<BarChartSectionProps> = ({ categoryList }) => {
  const { data } = useContext(DataContext) as DataContextInterface;
  const [category, setCategory] = useState('');
  const categoryItems = getCategoryItems(data, category); // [{label: Herren, frequency: 1}, {label: Damen, frequency: 3}]

  const onCategoryClickHandler = (category: string) => {
    if (category === 'none') {
      setCategory('');
    } else {
      setCategory(category);
    }
  };

  return (
    <section className="pb-5">
      <SectionTitle title="Chart Section" subtitle="Please choose a category" />

      <ChartDropdown
        categoryList={['none', ...categoryList]}
        category={category}
        onClickHandler={onCategoryClickHandler}
      />
      {category && categoryItems && (
        <div className="chart-data-container">
          <BarChart category={category} categoryItems={categoryItems} />
          <ChartDataList categoryItems={categoryItems} />
        </div>
      )}
    </section>
  );
};

export default BarChartSection;
