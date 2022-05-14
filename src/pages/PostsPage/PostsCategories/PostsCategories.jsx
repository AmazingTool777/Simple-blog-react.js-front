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
import Loaders from "./PostsCategoriesLoaders.jsx";

// Custom hooks
import usePostsCategories from "../usePostsCategories";

const PostsCategories = () => {
	const { categories, page, isLoading, handlePageChange } = usePostsCategories();

	return (
		<section className="d-flex align-items-center mt-4">
			<section
				id="posts-categories-slider"
				className="border border-2 border-light border-start-0 border-end-0 py-2 flex-fill"
			>
				{categories.length > 0 || isLoading ? (
					<Swiper
						slidesPerView={"auto"}
						spaceBetween={12}
						navigation={true}
						modules={[Navigation]}
						onReachEnd={() => {
							console.log("Hello");
							handlePageChange(page + 1);
						}}
					>
						{categories.map((category) => (
							<SwiperSlide key={category._id} className="post-category-slide py-3">
								<CategoryBullet category={category} />
							</SwiperSlide>
						))}
						{isLoading && (
							<span slot="wrapper-end" className="d-flex align-items-center">
								<Loaders number={2} />
							</span>
						)}
					</Swiper>
				) : (
					<p className="pb-0 text-secondary">No categories to show</p>
				)}
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
