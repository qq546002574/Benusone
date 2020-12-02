/**
 * Docsify config
 */
gitalkConfig = {
  clientID: "9388931e4a25fdbeb4fd",
  clientSecret: "3933f84912eecdcadd74138c575116941a60524e",
  repo: "qq546002574.github.io",
  owner: "qq546002574",
  admin: ["qq546002574"],
  perPage: 20,
  language: "en",
  labels: ["💬Gitalk"],
  pagerDirection: "last",
  id: location.pathname,
  distractionFreeMode: false
};
window.$docsify = {
  name: "Benusone",
  repo: "https://github.com/qq546002574/qq546002574.github.io",
  auto2top: true,
  loadNavbar: true,
  loadSidebar: true,
  mergeNavbar: true,
  subMaxLevel: 2,
  homepage: "README.md",
  ga: "UA-122081516-1",
  search: {
    noData: {
      "/zh-cn/": "找不到结果!",
      "/": "No results!"
    },
    paths: "auto",
    placeholder: {
      "/zh-cn/": "搜索",
      "/": "Search"
    }
  },
  plugins: [
    function(hook, vm) {
      hook.beforeEach(function(html) {
        var url =
          "https://github.com/qq546002574/qq546002574.github.io/blob/master/" +
          vm.route.file;
        var editHtml = "[📝 EDIT DOCUMENT](" + url + ")\n";

        return editHtml + html;
      });

      hook.doneEach(function() {
        var label, domObj, main, divEle, gitalk;
        label = vm.route.path.split("/").pop();
        domObj = Docsify.dom;
        main = domObj.getNode("#main");

        /**
         * render gittalk
         */
        if (vm.route.path.includes("zh-cn")) {
          gitalkConfig.language = "zh-CN";
        }
        Array.apply(
          null,
          document.querySelectorAll("div.gitalk-container")
        ).forEach(function(ele) {
          ele.remove();
        });
        divEle = domObj.create("div");
        divEle.id = "gitalk-container-" + label;
        divEle.className = "gitalk-container";
        divEle.style = "width: " + main.clientWidth + "px; margin: 0 auto 20px;";
        domObj.appendTo(domObj.find(".content"), divEle);
        gitalk = new Gitalk(
          Object.assign(gitalkConfig, { id: !label ? "home" : label })
        );
        gitalk.render("gitalk-container-" + label);
      });
    }
  ]
};
