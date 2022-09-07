export default function () {
  const isIPad = () => {
    return navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform); //Deprecated
    // /macOS/.test(navigator.userAgentData.platform); // Newer alternative, but not fully supported
  }

  function isSmartphone() {
    return !!navigator.userAgent.match(/iPhone|Android.+Mobile/);
  }

  const isEdge = (): boolean => {
    const userA = window.navigator.userAgent;
    // if(userA.indexOf("Chrome/")>-1 || userA.indexOf("Edge/")>-1)
    return userA.indexOf("Edg/") > -1 || userA.indexOf("Edge/") > -1;
  }

  const isWindows = (): boolean => {
    const version = window.navigator.appVersion
    return version.indexOf("Window") > -1;
  }

  return {
    isIPad, isSmartphone, isEdge, isWindows,
  }
}
