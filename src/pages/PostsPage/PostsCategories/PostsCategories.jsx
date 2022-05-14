import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./PostsCategories.css";

// Components
import CategoryBullet from "../CategoryBullet";

const PostsCategories = () => {
	return (
		<section className="d-flex align-items-center mt-4">
			<section
				id="posts-categories-slider"
				className="border border-2 border-light border-start-0 border-end-0 py-2 flex-fill"
			>
				<Swiper slidesPerView={"auto"} spaceBetween={12} navigation={true} modules={[Navigation]}>
					{[...Array(15).keys()].map((i) => (
						<SwiperSlide key={`slide-${i}`} className="post-category-slide py-3">
							<CategoryBullet category={{ _id: i, label: "Category" }} />
						</SwiperSlide>
					))}
				</Swiper>
			</section>
			<div className="ps-3">
				<OverlayTrigger placement="bottom" overlay={<Tooltip>View all categories</Tooltip>}>
					<Button variant="light" className="text-primary">
						<FontAwesomeIcon icon="eye" />
					</Button>
				</OverlayTrigger>
			</div>
		</section>
	);
};

export default PostsCategories;
