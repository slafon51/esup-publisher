class CookieUtils {
  // Récupération de la valeur d'un cookie
  getCookie (name) {
    if (!document.cookie) {
      return null
    }

    const cookie = document.cookie.split(';')
      .map(c => c.trim())
      .find(c => c.startsWith(name))

    if (cookie === null || cookie === undefined) {
      return null
    }
    return decodeURIComponent(cookie.split('=')[1])
  }

  // Modification de la valeur d'un cookie
  setCookie (name, value) {
    const path = ';path=' + process.env.VUE_APP_BACK_BASE_URL
    if (!document.cookie) {
      document.cookie = name + '=' + encodeURIComponent(value) + path
    } else {
      const cookie = document.cookie.split(';').find(c => c.trim().startsWith(name + '='))
      if (!cookie) {
        document.cookie = name + '=' + encodeURIComponent(value) + path
      } else {
        const key = cookie.split('=')[0]
        document.cookie = key + '=' + encodeURIComponent(value) + path
      }
    }
  }
}

export default new CookieUtils()
