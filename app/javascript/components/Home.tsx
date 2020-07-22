import React from "react";
import ImageLinkForm from "./ImageLinkForm";
import ImageIndex from "./ImageIndex";
import { Container } from "@material-ui/core";

export default function Home(): JSX.Element {
  return (
    <Container maxWidth="md">
      <ImageLinkForm />
      <ImageIndex />
    </Container>
  );
}
