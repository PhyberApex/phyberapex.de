const appendUmamiScript = (scriptUrl, websiteId) => {
  const script = document.createElement('script')
  script.defer = true
  script.src = scriptUrl
  script.setAttribute('data-website-id', websiteId)
  document.head.appendChild(script)
}

export const initUmami = () => {
  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL
  const recorderUrl = import.meta.env.VITE_UMAMI_RECORDER_URL
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID

  if (!websiteId) {
    return
  }

  if (scriptUrl) {
    appendUmamiScript(scriptUrl, websiteId)
  }

  if (recorderUrl) {
    appendUmamiScript(recorderUrl, websiteId)
  }
}
