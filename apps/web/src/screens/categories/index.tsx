import CategoryTree from "@app/components/category-tree";
import PageTitle from "@app/components/page-title";

function Categories() {
  return (
    <div className="flex-1">
      <PageTitle>Categories</PageTitle>
      <CategoryTree />
    </div>
  );
}

export default Categories;
