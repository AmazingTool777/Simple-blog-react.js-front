import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// Styles
import "./PostsCategories.css";

// Components
import CategoryBullet from "../../../components/CategoryBullet";
import Loaders from "./PostsCategoriesLoaders";
import PostsCategoriesModal from "../PostsCategoriesModal";

// Custom hooks
import usePostsCategories from "../usePostsCategories";

const PostsCategories = ({ isDisabled, categoryId, onCategoryIdSelect }) => {
  const { categories: _categories, page, isLoading, handlePageChange } = usePostsCategories(true);

  /* Moving the active category bullet to the first
   Adding a bullet labelled "All" if no category is provided */
  const categories = useMemo(() => {
    const categories = [{ _id: null, label: "All" }, ..._categories];
    if (categoryId) {
      // Prepending the active category at the beginning
      const activeIndex = categories.findIndex((category) => category._id === categoryId);
      const [activeCategory] = categories.splice(activeIndex, 1);
      categories.unshift(activeCategory);
    }
    return categories;
  }, [categoryId, _categories]);

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
            onReachEnd={() => handlePageChange(page + 1)}
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id} className="post-category-slide py-3">
                <CategoryBullet
                  isActive={category._id === categoryId}
                  isDisabled={isLoading || isDisabled}
                  category={category}
                  onClick={onCategoryIdSelect}
                />
              </SwiperSlide>
            ))}
            {isLoading && (
              <span slot="wrapper-end" className="d-flex align-items-center">
                <Loaders number={2} />
              </span>
            )}
          </Swiper>
        ) : (
          <p className="mb-0 text-secondary">No categories to show</p>
        )}
      </section>
      <div className="ps-3">
        <PostsCategoriesModal categoryId={categoryId} onCategorySelect={onCategoryIdSelect} />
      </div>
    </section>
  );
};

export default PostsCategories;
