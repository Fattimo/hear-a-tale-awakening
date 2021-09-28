import fetch from "isomorphic-unfetch"
import urls from "../../utils/urls"

export const getTeamMember = (name) =>
  fetch(urls.baseUrl + urls.api.testTeam.byName + "?name=" + name, {
    method: "get",
    mode: "same-origin",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!")
      } else if (!json.success) {
        throw new Error(json.message)
      }

      return json.payload
    })
