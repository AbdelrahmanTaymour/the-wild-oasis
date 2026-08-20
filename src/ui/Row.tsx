import styled, { css } from "styled-components";

interface RowProps {
  type?: "vertical" | "horizontal";
}

const Row = styled.div.attrs<RowProps>((props) => ({
  type: props.type || "vertical",
}))`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      justify-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
