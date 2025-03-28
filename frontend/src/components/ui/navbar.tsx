import { Link, useLocation } from "react-router-dom";
import {
  Book,
  FileText,
  Home,
  MessageSquare,
  User,
  Wallet,
  Users,
  BarChart,
  ChevronDown,
} from "lucide-react";
import { useUser } from "../../context/user-context";
import { cn } from "../../lib/utils";
import { useState, useRef } from "react";

export function Navbar() {
  const location = useLocation();
  const { userType } = useUser();

  const [isArticleDropdownOpen, setArticleDropdownOpen] = useState(false);

  console.log('UserType in Navbar:', userType);

  const researcherLinks = [
    { href: "/researcher-feed", label: "Feed", icon: Home },
    { href: "/list", label: "Messages", icon: MessageSquare },
    { href: "/transactions", label: "Transactions", icon: Wallet },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const entrepreneurLinks = [
    { href: "/entrepreneur-feed", label: "Feed", icon: Home },
    { href: "/researchers", label: "Researchers", icon: Users },
    { href: "/transactions", label: "Transactions", icon: Wallet },
    { href: "/list", label: "Messages", icon: BarChart },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const links = userType === "entrepreneur" ? entrepreneurLinks : researcherLinks;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setArticleDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setArticleDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4 relative">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Book className="h-6 w-6" />
            <span>NexusR</span>
            {userType && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full ml-2 capitalize">
                {userType === "researcher" ? "Researcher" : "Entrepreneur"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-gray-500 font-medium hover:text-blue-600 transition-colors flex items-center gap-1",
                  location.pathname === link.href && "text-blue-600 font-semibold"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            ))}

            {/* Articles Dropdown with delay */}
            {userType === "researcher" && (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={cn(
                    "text-gray-500 font-medium hover:text-blue-600 transition-colors flex items-center gap-1",
                    location.pathname.includes("/articles") && "text-blue-600 font-semibold"
                  )}
                >
                  <FileText className="h-5 w-5" />
                  <span className="hidden md:inline">Articles</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isArticleDropdownOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md border mt-2 z-50">
                    <Link
                      to="/create-post"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Article Feed
                    </Link>
                    <Link
                      to="/submit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Submit Article
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
