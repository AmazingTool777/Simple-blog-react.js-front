import { useCallback, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

// Custom hooks
import useLikes from "./useLikes";
import { useContainedScrollEndObserver } from "../../../hooks/useScrollEndObserver";

// Components
import LikeItem from "../LikeItem";

const LikesListModal = ({ show, post, onHide }) => {
  const bodyRef = useRef();
  const listRef = useRef();

  const { likes, page, isLoading, pages, hasFetched, handleLikesReset, handlePageChange } = useLikes(post._id, {
    shouldFetch: show,
  });

  const isEndOfList = page >= pages;

  const handleEndOfScroll = useCallback(() => {
    !isEndOfList && handlePageChange(page + 1);
  }, [handlePageChange, isEndOfList, page]);

  const handleModalHide = useCallback(() => {
    onHide();
    handleLikesReset();
  }, [handleLikesReset, onHide]);

  useContainedScrollEndObserver(bodyRef, listRef, handleEndOfScroll);

  const shouldRenderLoaders = isLoading && page === 1 && !hasFetched;

  return (
    <Modal backdrop="static" scrollable show={show} onHide={handleModalHide}>
      <Modal.Header closeButton>
        <Modal.Title>People who liked this post</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={bodyRef} className="modal-body-body">
        {shouldRenderLoaders ? (
          <p>Loading ...</p>
        ) : (
          <div ref={listRef}>
            <ul className="list-unstyled m-0 p-0">
              {likes.map((like) => (
                <li key={like._id} className="mb-2">
                  <LikeItem like={like} />
                </li>
              ))}
            </ul>
            {isLoading && <Spinner size="md" animation="border" variant="secondary" />}
            {isEndOfList && <p className="text-secondary text-center">End of results</p>}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LikesListModal;
