import { githubLink } from "@/lib/consts";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <Link href="/" shallow>
          <div className="text-2xl font-bold">📐 Insta UI</div>
        </Link>
        <div className="flex gap-5 items-center">
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
