import urls from "../../../utils/urls"

const routes = [
  {
    name: "Home",
    link: urls.pages.index,
    auth: false,
    atEnd: false,
  },
  {
    name: "SSR",
    link: urls.pages.ssr,
    auth: false,
    atEnd: false,
  },
  {
    name: "Reader",
    link: urls.pages.reader,
    auth: false,
    atEnd: false,
  },
]

export default routes
