export function waitForElmToLoad(selector: string) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      const foundElement = document.querySelector(selector);
      if (foundElement) {
        resolve(foundElement);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function changeProfileName(item: any) {
  item.querySelectorAll(".profile-link").forEach(async (linkEl: Element) => {
    const profileLinkEl: HTMLAnchorElement = linkEl.querySelector(
      "a",
    ) as HTMLAnchorElement;
    const profileName: string = profileLinkEl.innerText;
    profileLinkEl.innerText = "ExampleName";
    console.log("Profile Name", profileName, profileLinkEl);
  });
}

function changeIGN(item: any) {
  item.querySelectorAll(".character-name").forEach(async (linkEl: Element) => {
    const ignElem: HTMLAnchorElement = linkEl as HTMLAnchorElement;
    ignElem.innerText = "ExampleIGN";
  });
}

const iterateItemResult = (item: any) => {
  changeProfileName(item);
  changeIGN(item);
};

function handleNewItems(addedNodes: NodeList) {
  addedNodes.forEach((node) => {
    if (node instanceof HTMLElement && node.tagName.toLowerCase() === "div") {
      const dataId: string | undefined = node.dataset.id;

      if (dataId) {
        if (!node.classList.contains("content-enhanced")) {
          node.classList.add("content-enhanced");
          iterateItemResult(node);
        }
      }
    }
  });
}

export async function handleSearchItems(): Promise<void> {
  await waitForElmToLoad(".results");

  const targetNode: Element | null = document.querySelector(".results");
  if (!targetNode) return;

  const callback: MutationCallback = function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        handleNewItems(mutation.addedNodes);
      }
    }
  };

  const observer: MutationObserver = new MutationObserver(callback);
  observer.observe(targetNode, { childList: true, subtree: true });
}

export async function handleExchangeItems(): Promise<void> {
  await waitForElmToLoad(".results");
  const targetNode: Element | null = document.querySelector(".results");
  if (!targetNode) return;

  const callback = async () => {
    await waitForElmToLoad(".resultset");

    const targetNode: Element | null = document.querySelector(".resultset");
    if (!targetNode) return;

    const addedNodes: any = Array.from(targetNode.children);

    handleNewItems(addedNodes);
  };

  const observer: MutationObserver = new MutationObserver(callback);
  observer.observe(targetNode, { childList: true, subtree: true });
}

export async function changeStatusProfileName() {
  await waitForElmToLoad("#statusBar");

  const targetNode: Element | null = document.querySelector("#statusBar");
  if (!targetNode) return;

  const profileLink = targetNode.querySelector(".profile-link > a");
  if (profileLink) {
    profileLink.innerHTML = "Example Account";
  }
  console.log(profileLink);
}
