import React from "react";
import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  const fallback = "/images/fallback-600x400.png";

  return (
    <div className={classes.categoryCard}>
      <Link
        className={classes.cardLink}
        to={`/categories/${data.name}`}
      >
        <div className={classes.cardMedia}>
          <img
            className={classes.cardImg}
            src={data.imgLink}
            alt={data.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallback;
            }}
          />
        </div>

        <div className={classes.cardBody}>
          <h3 className={classes.cardTitle}>{data.title}</h3>
          <p className={classes.cardCta}>Shop now</p>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
