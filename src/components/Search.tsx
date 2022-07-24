import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ChangeEvent, PropsWithChildren, SyntheticEvent, useState } from "react";
import { constants } from "../utils/constants";

interface SearchProps {
  onClick(event: SyntheticEvent, input: string): void;
}

export function Search({ children, onClick }: PropsWithChildren<SearchProps>): JSX.Element {
  const [input, setInput] = useState(constants.EMPTY_STRING.toString());

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <Form className="d-flex flex-row">
      <InputGroup>
        <Form.Control placeholder="Enter text here..." onChange={handleChange} value={input} />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={(e) => onClick(e, input)}>Search</Button>
        {children}
      </ButtonGroup>
    </Form>
  );
}
