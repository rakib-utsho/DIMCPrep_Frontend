"use client";

import UserImg from "@/assets/navbar/user_13983903.png";
import ContactIco from "@/assets/extra/profileIcon/contact-ico.png";
import LogOutIco from "@/assets/extra/profileIcon/logout-ico.png";
import TestIcon from "@/assets/extra/profileIcon/test-h-ico.png";
import ProfileIco from "@/assets/extra/profileIcon/user-p-ico.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LiaComment } from "react-icons/lia";
import logo from "../../assets/logo/logo.png";
import { Modal } from "../modal/Modal";
import ModalThemeWrapper from "../modal/ModalThemeWrapper";
import TestModalOne from "../modal/TestModalOne";
import NavButton from "../NavButton/NavButton";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { logout, setUser } from "@/redux/features/user/userSlice";
import { useGetProfileQuery } from "@/redux/api/updateProfile/profile";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { FiEdit } from "react-icons/fi";

// Types
interface Subscription {
  id: string;
  isActive: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  imageURL?: string;
  subscriptions?: Subscription[];
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface RootState {
  user: UserState;
}

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user, shallowEqual);
  const subscriptions = useSelector(
    (state: RootState) => state.user.user?.subscriptions || [],
    shallowEqual
  );

  const token = Cookies.get("token");
  const { data: profileData, isError } = useGetProfileQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  // Update Redux on profile load
  useEffect(() => {
    if (profileData) dispatch(setUser(profileData));
    if (isError) dispatch(logout());
  }, [profileData, isError, dispatch]);

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsHovered(false);
  }, [pathname]);

  const handleCloseMenu = () => setIsHovered(false);
  const handleModalClose = () => setModalOpen(false);

  const handleLogout = async () => {
    Cookies.remove("token");
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 200));
    router.push("/");
    toast.success("Logout Successful");
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "center" });
      pricingSection.classList.add("animate-pulse");
      setTimeout(() => pricingSection.classList.remove("animate-pulse"), 2000);
    }
  };

  const handleStartTest = () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      Cookies.remove("token");
      dispatch(logout());
      return;
    }

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const activeSubscription = subscriptions.find((sub) => sub?.isActive);
    if (!activeSubscription) {
      toast.error("Please subscribe first to start a test.");
      scrollToPricing();
      return;
    }

    setModalOpen(true);
  };
  const checkToken = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      Cookies.remove("token");
      dispatch(logout());
       // Wait briefly to ensure cleanup
      await new Promise((resolve) => setTimeout(resolve, 200));
      // Redirect to home or login page
      router.push("/");
          return;
        }
    if (!user) {
      toast.error("Please login first");
      return;
    }
  };
  return (
    <nav className="bg-white shadow-sm py-4 px-4 sm:px-4 md:px-6 lg:px-7 flex justify-between items-center mx-6 sm:mx-6 md:mx-12 lg:mx-15 xl:mx-25 mt-5 rounded-xl">
      <Link href="/" title="Homepage">
        <Image
          src={logo}
          alt="Logo"
          title="Logo"
          className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40"
          priority
        />
      </Link>

      <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
        {user ? (
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            <button
              onClick={handleStartTest}
              className="bg-secondary/90 text-white border border-secondary rounded-md px-2 py-1 text-sm sm:px-3 sm:py-2 lg:px-4 lg:py-2 lg:text-base hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Start Test
            </button>

            <div
              className="relative"
              onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
              onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
              onClick={
                isMobile ? () => setIsHovered((prev) => !prev) : undefined
              }
            >
              <button onMouseEnter={checkToken} onClick={checkToken}>
                <Image
                  src={user.imageURL || UserImg}
                  alt="userImage"
                  title="User Image"
                  width={40}
                  height={40}
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover cursor-pointer"
                  priority
                />
              </button>
              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-3 w-60 bg-[var(--bgColor)] rounded-md shadow-lg py-1 z-50 transition-all duration-200 border border-gray-200 ${
                  isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className="px-4 py-4 space-y-2">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Image
                      src={user.imageURL || UserImg}
                      alt="profile"
                      title="Profile"
                      width={32}
                      height={32}
                      className="rounded-full w-8 h-8 object-cover"
                    />
                    <span className="font-bold text-gray-800 text-sm truncate">
                      {user?.name?.charAt(0).toUpperCase() +
                        user?.name?.slice(1)}
                    </span>
                  </div>
                  <hr className="border-gray-200 my-1" />

                  <Link
                    href="/profile"
                    onClick={handleCloseMenu}
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
                  >
                    <Image
                      src={ProfileIco}
                      alt="User Icon"
                      title="User Icon"
                      width={20}
                      height={20}
                      className="w-5 h-5 mr-3"
                    />
                    Profile
                  </Link>
                  <Link
                    href="/updateProfile"
                    onClick={handleCloseMenu}
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
                  >
                    <FiEdit className="w-4 h-4 mr-3 text-gray-500" />
                    Update Profile
                  </Link>
                  <Link
                    href="/testHistory"
                    onClick={handleCloseMenu}
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
                  >
                    <Image
                      src={TestIcon}
                      alt="Test Icon"
                      title="Test Icon"
                      width={20}
                      height={20}
                      className="w-5 h-5 mr-3"
                    />
                    Test History
                  </Link>
                  <Link
                    href="/contact-us"
                    onClick={handleCloseMenu}
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
                  >
                    <Image
                      src={ContactIco}
                      alt="Contact Icon"
                      title="Contact Image"
                      width={20}
                      height={20}
                      className="w-5 h-5 mr-3"
                    />
                    Contact Us
                  </Link>
                  <Link
                    href="/review"
                    onClick={handleCloseMenu}
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
                  >
                    <LiaComment className="w-5 h-5 mr-3 text-gray-500" />
                    Review
                  </Link>
                  <button
                    onClick={() => {
                      handleCloseMenu();
                      handleLogout();
                    }}
                    className="flex items-center w-full px-3 py-2 text-red-500 hover:bg-gray-100 rounded-md text-sm cursor-pointer"
                  >
                    <Image
                      src={LogOutIco}
                      alt="Logout Icon"
                      title="Logout Icon"
                      width={20}
                      height={20}
                      className="w-5 h-5 mr-3"
                    />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NavButton />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center p-0 sm:p-4 bg-opacity-50">
          <ModalThemeWrapper onClose={handleModalClose}>
            <div className="flex justify-center items-center h-full">
              <TestModalOne />
            </div>
          </ModalThemeWrapper>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
