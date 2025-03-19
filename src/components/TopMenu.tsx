import Image from "next/image";
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopmenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  
  return (
    <div className={styles.topMenu}>
      <div className={styles.menuItems}>
        <TopMenuItem title="Booking" pageRef="/booking" />
      </div>
      
      <div className={styles.logoContainer}>
        <Image
          src={"/img/logo.png"}
          className={styles.logoImg}
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
          priority
        />
      </div>
      
      {session ? (
        <Link href="/api/auth/signout" className="flex items-center absolute left-5 h-full px-2 text-amber-500 hover:text-amber-400 transition-colors text-sm">
          Sign-Out of {session.user?.name}
        </Link>
      ) : (
        <Link href="/api/auth/signin" className="flex items-center absolute left-5 h-full px-2 text-amber-500 hover:text-amber-400 transition-colors text-sm">
          Sign-In
        </Link>
      )}
    </div>
  );
}