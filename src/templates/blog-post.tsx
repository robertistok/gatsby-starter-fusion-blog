import React from "react";
import { graphql } from "gatsby";
import { animated } from "react-spring";
import { GatsbyLocation } from "local-types";
import { MarkdownRemark } from "graphql-types";

import Layout from "../components/Layout";
import SEO from "../components/Seo";
import Post from "../components/Post";
import { useSiteMetadata, usePageTransitions } from "../hooks";

interface BlogPostTemplateProps {
  location: GatsbyLocation;
  data: {
    markdownRemark: MarkdownRemark;
  };
}

const BlogPostTemplate: React.FunctionComponent<BlogPostTemplateProps> = ({
  data,
  location,
}): React.ReactElement => {
  const { frontmatter, ...post } = data.markdownRemark;
  const { title: siteTitle, siteUrl } = useSiteMetadata();

  const transitions = usePageTransitions({ location });

  return (
    <Layout
      location={location}
      title={siteTitle}
      headerProps={{ showBackNav: true }}
    >
      <SEO
        title={frontmatter.title}
        description={`${post.timeToRead} min read · ${frontmatter.description}`}
        image={
          frontmatter.cover
            ? frontmatter.cover.childImageSharp.fixed.src
            : undefined
        }
        imageAlt={`Cover photo for ${frontmatter.title}`}
        type="article"
        url={`${siteUrl}/blog/${frontmatter.slug}`}
        meta={[
          { property: "article:published_time", content: frontmatter.date },
          { property: "article:section", content: frontmatter.category },
          ...(frontmatter.tags || []).map(t => ({
            property: "article:tag",
            content: t,
          })),
        ]}
      />
      {transitions.map(({ props, key }) => (
        <animated.div key={key} style={props}>
          <Post post={{ frontmatter, ...post }} />
        </animated.div>
      ))}
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        cover {
          childImageSharp {
            fixed {
              src
            }
          }
        }
        slug
        description
        category
        tags
      }
      timeToRead
    }
  }
`;
