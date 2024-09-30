/* eslint-disable react-hooks/exhaustive-deps */
import { communityStateAtom } from "@/atoms/communitiesAtom";
import { defaultMenuItem, directoryMenuAtom } from "@/atoms/directoryMenuAtom";
import { DirectoryMenuItem } from "@/types/directoryMenu";
import { useAtom, useAtomValue } from "jotai";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoPeopleCircleOutline } from "react-icons/io5";

/**
 * A custom hook that manages state and behavior of navigation directory menu.
 * It synchronizes selected menu item with current URL path and community context,
 * and provides functions for toggling menu and navigating between different sections of the app.
 * @returns An object containing directory state and functions for menu interaction.
 */
const useDirectory = () => {
  const [directoryState, setDirectoryState] = useAtom(directoryMenuAtom);
  const router = useRouter();
  const pathname = usePathname();
  const communityStateValue = useAtomValue(communityStateAtom);

  /**
   * Updates selected menu item and routes to the chosen page.
   * @param menuItem - Item user clicked in the directory list.
   * @returns Closes menu if it was open and navigates to the link.
   */
  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router.push(menuItem.link);
    if (directoryState.isOpen) {
      setDirectoryOpen(false);
    }
  };

  /**
   * Toggles directory menu open or closed.
   * @param isOpen - Whether the menu should be open.
   */
  const setDirectoryOpen = (isOpen: boolean) => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen,
    }));
  };

  const toggleMenuOpen = () => {
    setDirectoryOpen(!directoryState.isOpen);
  };

  /**
   * If user is currently in a community, then directory menu will be set to community menu item.
   * This is done to ensure that the user can navigate back to the community page from any page.
   */
  useEffect(() => {
    const { currentCommunity } = communityStateValue;

    if (currentCommunity && pathname !== "/" && pathname !== "/communities") {
      // if user is currently in a community and not on home page
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: currentCommunity?.id,
          link: `community/${currentCommunity?.id}`,
          imageURL: currentCommunity?.imageURL,
          icon: IoPeopleCircleOutline,
          iconColor: { base: "red.500", _dark: "red.400" },
        },
      }));
    } else if (pathname === "/communities") {
      // if user is on communities page
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: "Communities",
          link: "/communities",
          imageURL: "",
          icon: IoPeopleCircleOutline,
          iconColor: { base: "red.500", _dark: "red.400" },
        },
      }));
    } else if (pathname === "/") {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: defaultMenuItem,
      }));
    }
  }, [communityStateValue.currentCommunity, pathname]);

  return { directoryState, toggleMenuOpen, setDirectoryOpen, onSelectMenuItem };
};

export default useDirectory;
