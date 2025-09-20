import React from "react";
import categoryInfos from "./Categoryfullinfo";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return (
    <section className={classes.categoriesWrap}>
      <div className={classes.categoriesGrid}>
        {categoryInfos.map((info) => (
          <CategoryCard key={info.name} data={info} />
        ))}
      </div>
    </section>
  );
}

export default Category;
