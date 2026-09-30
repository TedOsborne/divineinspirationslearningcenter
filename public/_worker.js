const HOST_TO_SITE = {
  "divineinspirationslearningcenter.com": "divineinspirationslearningcenter",
  "www.divineinspirationslearningcenter.com": "divineinspirationslearningcenter",
  "forms.divineinspirationlearningcenter.com": "forms-divineinspirationlearningcenter",
  "essencecoastalclinic.com": "essencecoastalclinic",
  "www.essencecoastalclinic.com": "essencecoastalclinic",
  "friendlypayandhr.consulting": "friendlypayandhr",
  "www.friendlypayandhr.consulting": "friendlypayandhr",
  "jdcrecord.com": "jdcrecord",
  "www.jdcrecord.com": "jdcrecord",
  "parent-handbook.divineinspirationlearningcenter.com": "parent-handbook-divineinspiration",
  "parent-handbook.divineinspirationslearningcenter.com": "parent-handbook-divineinspiration",
  "professionalsconcretesolutions.com": "professionalsconcretesolutions",
  "www.professionalsconcretesolutions.com": "professionalsconcretesolutions",
  "standardamericanweb-houston.com": "standardamericanweb-houston",
  "www.standardamericanweb-houston.com": "standardamericanweb-houston",
  "standardamericanweb-parkeddomains.com": "standardamericanweb-parkeddomains",
  "www.standardamericanweb-parkeddomains.com": "standardamericanweb-parkeddomains",
  "tedxsunnyside.com": "tedxsunnyside",
  "www.tedxsunnyside.com": "tedxsunnyside"
};

function siteForHost(hostname) {
  if (hostname.endsWith(".pages.dev")) {
    return "divineinspirationslearningcenter";
  }
  return HOST_TO_SITE[hostname.toLowerCase()];
}

async function fetchAsset(request, env, site, pathname) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = `/sites/${site}${pathname}`;
  return env.ASSETS.fetch(new Request(assetUrl, request));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const site = siteForHost(url.hostname);

    if (!site) {
      return new Response("Unknown site", {
        status: 404,
        headers: { "content-type": "text/plain; charset=UTF-8" }
      });
    }

    let response = await fetchAsset(request, env, site, url.pathname);
    if (response.status !== 404) return response;

    const lastSegment = url.pathname.split("/").pop() || "";
    if (!lastSegment.includes(".")) {
      const fallback = url.pathname.endsWith("/")
        ? `${url.pathname}index.html`
        : `${url.pathname}/index.html`;
      response = await fetchAsset(request, env, site, fallback);
    }

    return response;
  }
};
