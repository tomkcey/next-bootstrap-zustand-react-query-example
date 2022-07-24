import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StarshipTable } from "../components/starships/StarshipTable";
import { StarshipDisplay } from "../components/starships/StarshipDisplay";

export default function Home(): JSX.Element {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row>
        <Col xs={10} md={10} lg={10}>
          <StarshipTable />
        </Col>
      </Row>
      <Row>
        <Col xs={10} md={10} lg={10}>
          <StarshipDisplay />
        </Col>
      </Row>
    </Container>
  );
}
