import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-gray-800 h-16">
      <ul className="flex items-center justify-center h-full">
        <li className="mr-6">
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-white hover:text-gray-400">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
