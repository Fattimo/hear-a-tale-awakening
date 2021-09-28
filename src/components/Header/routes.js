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
    name: "App Home",
    link: urls.pages.app.home,
    auth: true,
  },
]

export default routes
