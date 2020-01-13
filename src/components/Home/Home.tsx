import React from "react";
import { GatsbyLocation } from "local-types";

import Intro from "./Intro";
import ShowcasedPosts from "./ShowcasedPosts";

interface HomeProps {
  location: GatsbyLocation;
}

const Home: React.FunctionComponent<HomeProps> = ({
  location,
}): React.ReactElement => (
  <>
    <Intro />
    <ShowcasedPosts location={location} />
  </>
);

export default Home;
