import Image from "next/image";
import Link from "next/link";

import { SearchIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/outline/";
import { selectCartItems } from "../redux/cartSlice";
import { useSelector } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  const items = useSelector(selectCartItems);

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image fill src="https://rb.gy/vsvv2o" alt="Apple Logo" style={{ objectFit: "contain" }} />
          </div>
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a href="headerLink">Products</a>
        <a href="headerLink">Explore</a>
        <a href="headerLink">Support</a>
        <a href="headerLink">Business</a>
      </div>

      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <SearchIcon className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                {items.length}
              </span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <Image
            src={session.user?.image || ""}
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon className="headerIcon" onClick={() => signIn()} />
        )}
      </div>
    </header>
  );
}

export default Header;
