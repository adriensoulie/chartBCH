import styled from "styled-components";

const Container = styled.div`
  background: #3861fb;
  padding: 40px;
  display: flex;
  justify-content: right;
  opacity: 0.9;
`;

const Text = styled.p`
  color: #fff;
  font-weight: semibold;
  font-style: italic;
`;

export default function Footer() {
  return (
    <Container>
      <Text>Made with passion by Adrien SOULIE</Text>
    </Container>
  );
}
