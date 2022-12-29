import { IDataItem } from "../models/IDataItem";
import { ICategoryItemsSet } from "../models/ICategoryItemsSet";
import { ICategoryItem } from "../models/ICategoryItem";

export const getCategoryItems = (data: IDataItem[], category: string) => {
  const allValuesInCategory = getAllCategoryItems(data, category); // ['Damen', 'Herren', 'Damen', 'Damen']
  const set = getSetOfUniqueCategoryItemsAndTheirCount(allValuesInCategory); // {Herren: 1, Damen: 3}
  const numOfArticles = data.length - 1;

  const array = [] as ICategoryItem[];
  for (let key in set) {
    const percentage = (set[key] * 100) / numOfArticles;
    array.push({
      label: key === "" ? "not-specified" : key,
      frequency: percentage.toFixed(1),
    });
  }
  return array;
};

export const getAllCategoryItems = (data: IDataItem[], category: string) => {
  const temp: (string | number)[] = [];
  data.forEach((item) => {
    temp.push(item[category]);
  });
  return temp;
};

export const getSetOfUniqueCategoryItemsAndTheirCount = (
  allValues: (string | number)[]
) => {
  const set: ICategoryItemsSet = {};
  for (let i = 0; i < allValues.length; i++) {
    if (set[allValues[i]]) {
      set[allValues[i]]++;
    } else if (!set[allValues[i]] && allValues[i] !== undefined) {
      set[allValues[i]] = 1;
    }
  }
  return set;
};
