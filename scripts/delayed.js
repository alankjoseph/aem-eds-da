import { loadScript } from "./aem.js"

loadScript("https://securepubads.g.doubleclick.net/tag/js/gpt.js",{async : ""}).then(()=>{
    loadAdScript();
    callAdScript("header1-ad");
    callAdScript("mpu1-ad");
    callAdScript("mpu2-ad");
    callAdScript("mpu3-ad");
    callAdScript("mpu4-ad");


})

function loadAdScript(){
    // Ensure googletag object exists
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(function () {
        var e = googletag
          .sizeMapping()
          .addSize([1024, 0], [[970, 90], [970, 250], [728, 90], [728, 250], "fluid", [1, 1]])
          .addSize([740, 0], [[728, 90], [728, 250], [336, 280], [300, 250], [320, 50], "fluid", [1, 1]])
          .addSize([320, 0], [[320, 100], [320, 50], [336, 280], [300, 250], [300, 100], [300, 75], [300, 50], "fluid", [1, 1]])
          .addSize([0, 0], [300, 250])
          .build();

        var g = googletag
          .sizeMapping()
          .addSize([1024, 0], [[970, 90], [970, 250], [728, 90], [728, 250], [336, 280], [300, 250], "fluid", [1, 1]])
          .addSize([740, 0], [[728, 90], [728, 250], [336, 280], [300, 250], [320, 50], "fluid", [1, 1]])
          .addSize([320, 0], [[336, 280], [300, 250], [300, 100], [320, 100], [320, 50], [300, 75], [300, 50], "fluid", [1, 1]])
          .addSize([0, 0], [300, 250])
          .build();

        googletag
          .defineSlot(
            "/21987057265/vanitha/header1",
            [[970, 90], [970, 250], [728, 90], [728, 250], [336, 280], [300, 250], [320, 50], [300, 100], [300, 75], [300, 50], [1, 1], "fluid"],
            "header1-ad"
          )
          .setTargeting("position", ["ATF"])
          .defineSizeMapping(e)
          .addService(googletag.pubads());
        googletag
            .defineSlot("/21987057265/vanitha/mpu1", [[970, 90], [970, 250], [728, 90], [728, 250], [336, 280], [300, 250], [320, 50], [300, 100], [300, 75], [300, 50], [1, 1], "fluid"], "mpu1-ad")
            .setTargeting("position", ["ATF"])
            .defineSizeMapping(g)
            .addService(googletag.pubads()),
        googletag
            .defineSlot("/21987057265/vanitha/mpu2", [[970, 90], [970, 250], [728, 90], [728, 250], [336, 280], [300, 250], [320, 50], [300, 100], [300, 75], [300, 50], [1, 1], "fluid"], "mpu2-ad")
            .setTargeting("position", ["BTF"])
            .defineSizeMapping(g)
            .addService(googletag.pubads()),
        googletag
            .defineSlot("/21987057265/vanitha/mpu3", [[970, 90], [970, 250], [728, 90], [728, 250], [336, 280], [300, 250], [320, 50], [300, 100], [300, 75], [300, 50], [1, 1], "fluid"], "mpu3-ad")
            .setTargeting("position", ["BTF"])
            .defineSizeMapping(g)
            .addService(googletag.pubads()),
        googletag
            .defineSlot("/21987057265/vanitha/mpu4", [[970, 90], [970, 250], [728, 90], [728, 250], [336, 280], [300, 250], [320, 50], [300, 100], [300, 75], [300, 50], [1, 1], "fluid"], "mpu4-ad")
            .setTargeting("position", ["BTF"])
            .defineSizeMapping(g)
            .addService(googletag.pubads()),

        googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 500,
          renderMarginPercent: 200,
          mobileScaling: 2,
        });

        if (typeof gam_preview_id !== "undefined" && gam_preview_id?.length > 0) {
          googletag.pubads().setTargeting("gam_preview", [gam_preview_id]);
        }

        googletag.pubads().collapseEmptyDivs();
        googletag.pubads().setTargeting("page", ["article"]);
        googletag.pubads().setTargeting("platform", ["web"]);
        googletag.pubads().setTargeting("Content_Category", []);
        googletag.pubads().enableVideoAds();
        googletag.enableServices();

        // ✅ Finally, display the ad
        // googletag.display("header1-ad");
      });
}

function callAdScript(slot){
    const querySelectorElement = `#${slot}`
    const script = document.createElement("script");
      script.textContent = `
        googletag.cmd.push(function () {
          googletag.display("${slot}"); 
        });
      `;
    document.querySelector(querySelectorElement).appendChild(script);
}