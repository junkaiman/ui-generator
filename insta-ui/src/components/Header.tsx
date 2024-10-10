import { githubLink } from "@/lib/consts";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <a href="/">
          <div className="text-2xl font-bold">📐 Insta UI</div>
        </a>
        <div className="flex gap-5 items-center">
          <a href="/about" className="no-underline text-black">
            About
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </div>
      </div>
    </div>
  );
}
