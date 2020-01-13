import React from "react";
import Helmet from "react-helmet";

import { useSiteMetadata, useAvatar } from "../hooks";

interface OGMetaTag {
  property: string;
  content: string;
}

interface TwitterMetaTag {
  name: string;
  content: string;
}

interface SEOProps {
  lang?: string;
  meta?: (OGMetaTag | TwitterMetaTag)[];
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  url?: string;
}

const SEO: React.FunctionComponent<SEOProps> = ({
  lang = "en",
  meta = [],
  title,
  description,
  image,
  imageAlt,
  type = "website",
  url,
}): React.ReactElement => {
  const {
    title: defaultTitle = "",
    description: defaultDescription = "",
    author,
    siteUrl,
  } = useSiteMetadata();
  const avatar = useAvatar({ width: 1024, height: 1024 });

  const metaDescription = description || defaultDescription;
  const metaImageUrl = `${siteUrl}${image || avatar.childImageSharp.fixed.src}`;
  const metaImageAlt = imageAlt || `Cover photo of ${author.name}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={defaultTitle}
      titleTemplate={`${title} | %s`}
      meta={[
        {
          name: "google-site-verification",
          content: "OZ82-xGcAi-7G55v3p4iJa-qlkwTTG1ExzUrYXxdsT0",
        },
        { property: "og:title", content: title },
        { name: "twitter:title", content: title },

        { name: "description", content: metaDescription },
        { property: "og:description", content: metaDescription },
        { name: "twitter:description", content: metaDescription },

        { name: "twitter:card", content: "summary" },
        { property: "og:type", content: type },

        { property: "og:image", content: metaImageUrl },
        { name: "twitter:image", content: metaImageUrl },

        ...(Boolean(image) === Boolean(imageAlt) // don't want to show the wrong imageAlt
          ? [
              { property: "og:image:alt", content: metaImageAlt },
              { name: "twitter:image:alt", content: metaImageAlt },
            ]
          : []),

        ...(url
          ? [
              { property: "og:url", content: url },
              { property: "twitter:url", content: url },
            ]
          : []),

        ...(author.social.twitter
          ? [
              { name: "twitter:creator", content: author.social.twitter },
              { name: "twitter:site", content: author.social.twitter },
            ]
          : []),
      ].concat(meta)}
    />
  );
};

export default SEO;
