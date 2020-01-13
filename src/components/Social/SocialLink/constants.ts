import {
  FaAt,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaMedium,
  FaGoodreadsG,
} from "react-icons/fa";
import { IconType } from "react-icons/lib/cjs";

interface PredefinedLinkValue {
  baseUrl?: string;
  hoverColor?: string;
  Icon: IconType;
  title: string;
}

const SOCIALS: { [key: string]: PredefinedLinkValue } = {
  linkedin: {
    baseUrl: "https://www.linkedin.com/in",
    hoverColor: "#2867B2",
    Icon: FaLinkedin,
    title: "LinkedIn",
  },
  github: {
    baseUrl: "https://github.com",
    Icon: FaGithub,
    title: "GitHub",
  },
  medium: {
    baseUrl: "https://medium.com",
    Icon: FaMedium,
    title: "Medium",
  },
  twitter: {
    baseUrl: "https://twitter.com",
    Icon: FaTwitter,
    title: "Twitter",
    hoverColor: "#08a0e9",
  },
  goodreads: {
    baseUrl: "https://goodreads.com",
    Icon: FaGoodreadsG,
    title: "Goodreads",
    hoverColor: "#553b08",
  },
  email: {
    Icon: FaAt,
    title: "Email",
    hoverColor: "#D44638",
  },
};

export default SOCIALS;
