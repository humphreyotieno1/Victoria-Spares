"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle 
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu"

const CATEGORIES = [
  "Engine Parts", 
  "Body Parts", 
  "Electrical", 
  "Wheels & Tires", 
  "Interior"
]

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cartItems } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Listen for scroll events to apply shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`
  }

  const totalCartItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)

  return (
    <div className="fixed z-50 w-full">
    <header className="fixed top-0 z-50 w-full">
      {/* Announcement Banner */}
      <div className="bg-primary px-4 py-2 text-center text-xs sm:text-sm font-medium text-primary-foreground">
        Get Started with Victoria Phantom Spares: <span className="font-bold">FREESHIP</span>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`border-b bg-background transition-all duration-200 ${
          isScrolled ? "shadow-md" : ""
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Left Section: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0" title="Navigation Menu">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex h-full flex-col">
                  {/* Mobile Menu Header */}
                  <div className="border-b p-4">
                    <Link href="/" className="mb-4 block text-xl font-bold">
                      Victoria Phantom
                    </Link>
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                      </Button>
                    </form>
                  </div>
                  
                  {/* Mobile Menu Links */}
                  <div className="flex-1 overflow-auto py-4">
                    <nav className="flex flex-col space-y-1 px-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            pathname === link.href
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                    
                    {/* Categories Section */}
                    <div className="mt-6 px-4">
                      <div className="rounded-md bg-muted p-3">
                        <h3 className="mb-2 text-sm font-medium">Categories</h3>
                        <div className="space-y-1">
                          {CATEGORIES.map((category) => (
                            <Link
                              key={category}
                              href={`/shop?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-background"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Menu Footer */}
                  <div className="border-t p-4">
                    {user ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium truncate max-w-[200px]">
                            {user.name || user.email}
                          </span>
                        </div>
                        <Button variant="outline" className="w-full mt-2" onClick={logout}>
                          Log Out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button asChild className="w-full">
                          <Link href="/auth/login">Sign In</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/auth/register">Register</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold md:text-2xl">Victoria Phantom</span>
            </Link>
          </div>

          {/* Middle Section: Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href 
                    ? "text-primary after:absolute after:bottom-[-1.5rem] after:left-0 after:h-[2px] after:w-full after:bg-primary" 
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section: Search, Cart, and User */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] lg:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
                disabled={!searchQuery.trim()}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>

            {/* Mobile Search Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-[30vh] sm:h-[20vh]" title="Product Search">
                <SheetTitle className="sr-only">Product Search</SheetTitle>
                <div className="flex h-full flex-col justify-center px-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button 
                      type="submit" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                      disabled={!searchQuery.trim()}
                    >
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>

            {/* Cart Link */}
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="relative"
              aria-label={`Shopping cart with ${totalCartItems} items`}
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                  >
                    {totalCartItems > 99 ? "99+" : totalCartItems}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium truncate">{user.name || "User"}</span>
                      <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist" className="cursor-pointer">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex sm:items-center sm:gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/auth/register" className="hidden md:inline-flex">Register</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile-only Sign In Button for non-logged in users */}
            {!user && (
              <Button 
                variant="ghost" 
                size="icon" 
                asChild 
                className="sm:hidden"
                aria-label="Sign in"
              >
                <Link href="/auth/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
    </div>
  )
}