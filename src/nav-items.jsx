import { HomeIcon, BookmarkIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import BookmarkManager from "./pages/BookmarkManager.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Bookmark Manager",
    to: "/bookmark-manager",
    icon: <BookmarkIcon className="h-4 w-4" />,
    page: <BookmarkManager />,
  },
];
