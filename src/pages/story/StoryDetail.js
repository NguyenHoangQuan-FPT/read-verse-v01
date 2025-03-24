// src/pages/story/StoryDetail.js
import { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { getStories, updateStories } from "../../utils/storyService.js";
import commentList from "../../data/comments.json";
import Comments from "../../components/features/Comments.js";

const StoryDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [stories, setStories] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Lấy danh sách sách từ localStorage
  useEffect(() => {
    const storiesFromLocal = getStories();
    setStories(storiesFromLocal);

    const story = storiesFromLocal.find((s) => s.id.toString() === id);
    if (story) {
      setViewCount(story.viewCount || 0);
      setCommentCount(story.commentCount || 0);
    }
  }, [id]);

  // Tăng viewCount khi trang được tải
  useEffect(() => {
    const story = stories.find((s) => s.id.toString() === id);
    if (story) {
      const updatedViewCount = (story.viewCount || 0) + 1;
      setViewCount(updatedViewCount);

      const updatedStories = stories.map((s) =>
        s.id.toString() === id ? { ...s, viewCount: updatedViewCount } : s
      );
      setStories(updatedStories);
      updateStories(updatedStories);
    }
  }, [id]);

  // Kiểm tra trạng thái yêu thích
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};
      const userFavorites = favorites[user.username] || [];
      setIsFavorite(userFavorites.includes(parseInt(id)));
    }
  }, [id, user]);

  const handleFavoriteClick = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm truyện vào yêu thích!");
      return;
    }

    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};
    const userFavorites = favorites[user.username] || [];

    if (isFavorite) {
      const updatedUserFavorites = userFavorites.filter(
        (storyId) => storyId !== parseInt(id)
      );
      favorites[user.username] = updatedUserFavorites;
      setIsFavorite(false);
    } else {
      favorites[user.username] = [...userFavorites, parseInt(id)];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const storedComments = localStorage.getItem("comments");
  const localComments = storedComments ? JSON.parse(storedComments) : [];
  const combinedComments = [...commentList.comments, ...localComments];
  const uniqueComments = Array.from(
    new Map(combinedComments.map((comment) => [comment.id, comment])).values()
  );
  const comments = uniqueComments
    .filter((comment) => comment.storyId && comment.storyId.toString() === id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const story = stories.find((story) => story.id.toString() === id);

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
                  padding: "5px",
                }}
              >
                <FaHeart size={24} color={isFavorite ? "red" : "gray"} />
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
