import { Link, useLocation } from "react-router-dom"
import {
  Book,
  FileText,
  Home,
  MessageSquare,
  User,
  Wallet,
  Users,
  BarChart,
} from "lucide-react"
import { useUser } from "../../context/user-context"
import { cn } from "../../lib/utils"

export function Navbar() {
  const location = useLocation()
  const { userType } = useUser()

  const researcherLinks = [
    { href: "/feed", label: "Feed", icon: Home },
    { href: "/articles", label: "Artigos", icon: FileText },
    { href: "/messages", label: "Mensagens", icon: MessageSquare },
    { href: "/transactions", label: "Transações", icon: Wallet },
    { href: "/profile", label: "Perfil", icon: User },
  ]

  const entrepreneurLinks = [
    { href: "/feed", label: "Feed", icon: Home },
    { href: "/researchers", label: "Pesquisadores", icon: Users },
    { href: "/transactions", label: "Transações", icon: Wallet },
    { href: "/dashboard", label: "Dashboard", icon: BarChart },
    { href: "/profile", label: "Perfil", icon: User },
  ]

  const links = userType === "entrepreneur" ? entrepreneurLinks : researcherLinks

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Book className="h-6 w-6" />
            <span>NexusR</span>
            {userType && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full ml-2 capitalize">
                {userType === "researcher" ? "Pesquisador" : "Empresário"}
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
            <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
              JD
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
