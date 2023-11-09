import {
  changeStatusProfileName,
  handleExchangeItems,
  handleSearchItems,
} from "./helpers";

function onPageLoad() {
  handleSearchItems();
  handleExchangeItems();
  changeStatusProfileName();
}

onPageLoad();
