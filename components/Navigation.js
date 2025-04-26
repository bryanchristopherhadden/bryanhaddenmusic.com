'use client'

import { useState, useEffect } from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav id="menu" className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <div className="navbar-brand">
            <span>Bryan Hadden</span>
            <span>
              Songwriter <span>|</span> Producer
            </span>
          </div>
        </div>
        <div className="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={pathname === item.href ? "active" : ""}
              >
                <Link href={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

