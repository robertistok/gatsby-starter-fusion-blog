import React, { useRef, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { File } from "graphql-types";

import SEO from "../components/Seo";
import { useSiteMetadata } from "../hooks";

const ResumePage: React.FunctionComponent = (): React.ReactElement => {
  // change the resume file  to yours
  const { file: resume }: { file: File } = useStaticQuery(graphql`
    {
      file(name: { eq: "robert_istok_resume" }) {
        publicURL
      }
    }
  `);

  const { author } = useSiteMetadata();
  const resumeUrl = useRef(null);
  useEffect(() => resume && resumeUrl.current && resumeUrl.current.click(), [
    resume,
    resumeUrl,
  ]);

  return (
    <>
      <SEO
        title="Curriculum Vitae"
        description={`Check out ${author.name}'s resume and feel free to drop him a message 🙏`}
      />
      <DownloadURL
        href={resume.publicURL}
        type="application/pdf"
        ref={resumeUrl}
      />
    </>
  );
};

const DownloadURL = styled.a`
  display: none;
`;

export default ResumePage;
