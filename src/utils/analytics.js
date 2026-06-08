export const initUmami = () => {
  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID

  if (!scriptUrl || !websiteId) {
    return
  }

  const script = document.createElement('script')
  script.defer = true
  script.src = scriptUrl
  script.setAttribute('data-website-id', websiteId)
  document.head.appendChild(script)
}
