import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import storyList from "../../data/stories.json";
import commentList from "../../data/comments.json";

const StoryDetail = () => {
  const { id } = useParams();
  const story = storyList.stories.find((story) => story.id.toString() === id);
  const comments = commentList.comments
    .filter((comment) => comment.storyId.toString() === id)
    .sort((a, b) => a.id - b.id);
  return (
    <>
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
                <h1>{story.title} </h1>
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
                  {story.viewCount}
                </h6>
              </Card.Text>
              <Card.Text>
                <h6 className="text-muted">
                  <strong>Comments: </strong>
                  {story.commentCount}
                </h6>
              </Card.Text>
              <Button
                as={Link}
                to={`/stories/read/${story.id}`}
                className="mt-2 read-now-btn"
              >
                Read Now
              </Button>
            </Card.Body>
          </Col>
        </Row>
        <Row>
          <Col className="mt-4">
            <h3>Comment</h3>
          </Col>
        </Row>
        {comments.map((comment) => (
          <Row>
            <Col>
              <Card className="mt-3 bg-secondary bg-opacity-25">
                <Card.Body>
                  <Row>
                    <Col className="text-start">
                      <Card.Text className="text-danger title-text">
                        <h5>{comment.username}</h5>
                      </Card.Text>
                      <Card.Text>{comment.content}</Card.Text>
                    </Col>
                    <Col className="text-end text-muted">
                      <Card.Text>{comment.date}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default StoryDetail;
