// src/pages/story/StoryDetail.js
import { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import storyList from "../../data/stories.json";
import commentList from "../../data/comments.json";
import Comments from "../../components/features/Comments.js";
import { AuthContext } from "../../context/AuthContext";

const StoryDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Lấy thông tin tài khoản từ AuthContext
  const story = storyList.stories.find((story) => story.id.toString() === id);

  // Lấy viewCount và commentCount từ localStorage
  const storedCounts = localStorage.getItem("storyCounts");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const storyCounts = storedCounts ? JSON.parse(storedCounts) : {};

  // Khởi tạo viewCount và commentCount cho truyện hiện tại
  const [viewCount, setViewCount] = useState(
    storyCounts[id]?.viewCount || story.viewCount || 0
  );
  const [commentCount, setCommentCount] = useState(
    storyCounts[id]?.commentCount || story.commentCount || 0
  );

  // Khởi tạo trạng thái nút yêu thích
  const [isFavorite, setIsFavorite] = useState(false);

  // Tăng viewCount khi trang được tải
  useEffect(() => {
    const updatedViewCount = viewCount + 1;
    setViewCount(updatedViewCount);

    // Cập nhật storyCounts trong localStorage
    const updatedStoryCounts = {
      ...storyCounts,
      [id]: {
        viewCount: updatedViewCount,
        commentCount: commentCount,
      },
    };
    localStorage.setItem("storyCounts", JSON.stringify(updatedStoryCounts));
  }, [id]);

  // Kiểm tra trạng thái yêu thích khi trang được tải
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};

      // Kiểm tra xem truyện hiện tại có trong danh sách yêu thích của user không
      const userFavorites = favorites[user.username] || [];
      setIsFavorite(userFavorites.includes(parseInt(id)));
    }
  }, [id, user]);

  // Xử lý khi nhấn nút yêu thích
  const handleFavoriteClick = () => {
    if (!user) {
      alert("PLease Login to add favorite story !");
      return;
    }

    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};

    // Lấy danh sách yêu thích của user hiện tại
    const userFavorites = favorites[user.username] || [];

    if (isFavorite) {
      // Xóa truyện khỏi danh sách yêu thích
      const updatedUserFavorites = userFavorites.filter(
        (storyId) => storyId !== parseInt(id)
      );
      favorites[user.username] = updatedUserFavorites;
      setIsFavorite(false);
    } else {
      // Thêm truyện vào danh sách yêu thích
      favorites[user.username] = [...userFavorites, parseInt(id)];
      setIsFavorite(true);
    }

    // Lưu lại danh sách yêu thích vào localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  // Lấy danh sách bình luận từ localStorage (nếu có)
  const storedComments = localStorage.getItem("comments");
  const localComments = storedComments ? JSON.parse(storedComments) : [];

  // Kết hợp danh sách bình luận từ comments.json và localStorage
  const combinedComments = [...commentList.comments, ...localComments];

  // Loại bỏ trùng lặp dựa trên id
  const uniqueComments = Array.from(
    new Map(combinedComments.map((comment) => [comment.id, comment])).values()
  );

  // Lọc bình luận theo storyId và sắp xếp theo ngày (mới nhất trước)
  const comments = uniqueComments
    .filter((comment) => comment.storyId && comment.storyId.toString() === id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!story) {
    return <div>Story not found!</div>;
  }

  return (
    <Container className="justify-content-center">
      <Row>
        <Col md={6}>
          <img
            src={story.coverImage}
            alt=""
            className="rounded-2 shadow-sm"
            style={{ width: "350px", height: "100%" }}
          />
        </Col>
        <Col md={4} className="mt-5 text-start">
          <Card.Body>
            <Card.Title className="text-danger mb-3 opacity-75 title-text">
              <h1>{story.title}</h1>
            </Card.Title>
            <Card.Text>
              <h6 className="text-muted">
                <strong>Genre: </strong>
                {story.genre}
              </h6>
            </Card.Text>
            <Card.Text>
              <h6 className="text-muted">
                <strong>Author: </strong>
                {story.author}
              </h6>
            </Card.Text>
            <Card.Text>
              <h6 className="text-muted">
                <strong>View: </strong>
                {viewCount}
              </h6>
            </Card.Text>
            <Card.Text>
              <h6 className="text-muted">
                <strong>Comments: </strong>
                {commentCount}
              </h6>
            </Card.Text>
            <div className="d-flex align-items-center">
              <Button
                as={Link}
                to={`/stories/read/${story.id}`}
                className="mt-2 read-now-btn me-2"
              >
                Read Now
              </Button>
              <Button
                variant="outline-danger"
                className="mt-2"
                onClick={handleFavoriteClick}
                style={{
                  border: "none",
                  background: "transparent",
                }}
              >
                <FaHeart
                  variant="outline-danger"
                  size={30}
                  color={isFavorite ? "#ff4d4d" : "#acacac"}
                />
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <h3>Comment</h3>
        </Col>
      </Row>
      <Comments
        commentList={comments}
        storyId={parseInt(id)}
        setCommentCount={setCommentCount}
      />
    </Container>
  );
};

export default StoryDetail;
