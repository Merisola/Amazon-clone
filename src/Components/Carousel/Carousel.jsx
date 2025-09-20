import { Carousel } from "react-responsive-carousel";
import { img } from "./Images/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div className={classes.hero_img}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={true}
      >
        {img.map((imageItemLink, index) => (
          <img key={index} src={imageItemLink} alt={`carousel-${index}`} />
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
