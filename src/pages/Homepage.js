import { Carousel } from "react-bootstrap";
import image1 from "../images/image-1.jpeg";
import image2 from "../images/image-2.jpeg";
import image3 from "../images/image-3.jpeg";

function Homepage() {
  return (
    <div>
      <Carousel interval={2000}>
        <Carousel.Item className="carousel-item">
          <img src={image1} alt="image 1" />
          <div className="carousel-caption d-none d-md-block">
            <div className="carousel-text-box">
              <h5>Yayoi Kusama in Berlin!</h5>
              <p>
                Yayoi Kusama is the superstar of contemporary art in Japan. In
                2021, the Gropius Bau in Berlin dedicates the first
                comprehensive retrospective in Germany to the artist.
              </p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img src={image2} alt="image 2" />

          <div className="carousel-caption d-none d-md-block">
            <div className="carousel-text-box">
              <h5>Daniel Arsham | UNEARTHED </h5>
              <p>
                The show combines two separate but interrelated bodies of work,
                that aim to create a scenario in which objects from ancient
                past, are contextualized in the future.
              </p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img src={image3} alt="image 3" />
          <div className="carousel-caption d-none d-md-block">
            <div className="carousel-caption d-none d-md-block">
              <div className="carousel-text-box">
                <h5>Must-See Art Guide: Berlin</h5>
                <p>
                  Berlin Gallery Weekend is debuting its first-ever fall edition
                  this weekend with a focus on emerging artists.
                </p>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Homepage;
