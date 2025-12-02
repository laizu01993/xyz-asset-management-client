import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banner1.webp"
import banner2 from "../../../assets/Banner2.jpg"
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={6000}
        >
            {/* Slide 1 */}
            <div className="relative">
                <img src={banner1} className="h-[600px] object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">

                    <Link to="joinHRManager">
                    <button className="btn px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md">
                        Join as HR Manager
                    </button>
                    </Link>

                </div>
            </div>
            <div className="relative">
                <img src={banner2} className="h-[600px] object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">

                    <Link to="joinEmployee">
                    <button className="btn px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md">
                        Join as an Employee
                    </button>
                    </Link>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;