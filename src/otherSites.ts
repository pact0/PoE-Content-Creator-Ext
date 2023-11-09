// import { renderMenu } from "./foreground/injectedMenu";
// renderMenu()

const determineUrl = async () => {
  // const options = (await data.optionsPromise).isEnabledBlacklistGuild;
  const options = {};
  if (!options) return;
  const url = window.location.href;
  const regex =
    /(https:\/\/\w*.pathofexile.com|https:\/\/poe.game.daum.net)\/(\w*)/;
  const match = url.match(regex);
};

// function blacklistCommon( blacklist: any, profileName: string, mark: HTMLElement, nameWrapper: HTMLAnchorElement, addIconBeforeName = false,
// ) {
//   function markUser(
//     wrapper: HTMLElement,
//     nameElem: HTMLAnchorElement,
//     foundUser: IBlacklistEntry,
//     blType: "blacklisted" | "priceFixer",
//     addIconBeforeName = false,
//   ): void {
//     wrapper.classList.add(
//       blType == "blacklisted" ? "blacklisted" : "priceFixer",
//     );
//
//     if (addIconBeforeName) {
//       nameElem.innerHTML =
//         decideIcon(foundUser.categories) + " " + nameElem.innerHTML;
//     } else {
//       nameElem.innerHTML += " " + decideIcon(foundUser.categories);
//     }
//
//     wrapper.setAttribute(
//       "title",
//       (blType == "blacklisted" ? "Blacklisted user: " : "User flagged for: ") +
//         stringCauses(foundUser.causesOfReport),
//     );
//   }
//
//   const foundUser: IBlacklistEntry | undefined = blacklist.find(
//     (user: IBlacklistEntry) => {
//       return user.name.toLowerCase() === profileName.toLowerCase();
//     },
//   );
//
//   if (foundUser) {
//     const blType: "blacklisted" | "priceFixer" = [
//       "swapScammer",
//       "scammer",
//       "otherBlacklisted",
//     ].some((el: string) => foundUser.categories.includes(el))
//       ? "blacklisted"
//       : "priceFixer";
//
//     markUser(
//       mark as HTMLElement,
//       nameWrapper,
//       foundUser,
//       blType,
//       addIconBeforeName,
//     );
//   }
// }
//
async function blacklistGuild(blacklist: any) {
  const members = document.querySelector(".members");
  if (members)
    members.querySelectorAll(".member").forEach(async (member: Element) => {
      const profileLinkEl: HTMLAnchorElement = member.querySelector(
        "a",
      ) as HTMLAnchorElement;
      const profileName: string = profileLinkEl.innerText;
      console.log("Profile Name Guild", profileName);
      // blacklistCommon(
      //   blacklist,
      //   profileName,
      //   member as HTMLElement,
      //   profileLinkEl,
      // );
    });
}

async function blacklistForum(blacklist: any) {
  const members = document.querySelectorAll(".posted-by");
  members.forEach((member: Element) => {
    const profile = member.querySelector(".post_by_account");
    if (profile) {
      const profileLinkEl: HTMLAnchorElement = profile.querySelector(
        "a",
      ) as HTMLAnchorElement;
      const profileName: string = profileLinkEl.innerText;
      console.log("Profile name", profileName);
      // blacklistCommon(
      //   blacklist,
      //   profileName,
      //   member as HTMLElement,
      //   profileLinkEl,
      // );
    }
  });
}

async function blacklistPrivateMessages(blacklist: any) {
  const members = document.querySelectorAll(".profile-link");
  members.forEach((member: Element) => {
    const profile = member.querySelector("a");
    if (profile) {
      const profileName: string = profile.innerText;
      // blacklistCommon(blacklist, profileName, member as HTMLElement, profile);
      console.log("Profile Name");
    }
  });
}

async function blacklistAccount(blacklist: any) {
  const accountCharacters = document.querySelector(".container-content");
  const accountProfile = document.querySelector(".details");

  if (accountCharacters) {
    const accountName = accountCharacters.querySelector("h2") as HTMLElement;
    if (accountName) {
      const profileName: string = accountName.innerText.split("-")[0].trim();
      console.log("Profile Name");
      // blacklistCommon(
      //   blacklist,
      //   profileName,
      //   accountCharacters as HTMLElement,
      //   accountName as HTMLAnchorElement,
      //   true,
      // );
    }
  }
  if (accountProfile) {
    const name = accountProfile.querySelector(".name") as HTMLElement;
    if (name) {
      const profileName: string = name.innerText;
      name.style.display = "flex";
      name.style.justifyContent = "center";
      name.style.flexWrap = "wrap";
      console.log("name", name);
      // blacklistCommon(
      //   blacklist,
      //   profileName,
      //   accountProfile as HTMLElement,
      //   name as HTMLAnchorElement,
      // );
    }
  }

  blacklistForum(blacklist);
}

determineUrl();
