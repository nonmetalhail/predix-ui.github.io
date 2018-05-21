/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer/app-drawer.html","7feac1cc84f195720855cde750e7b123"],["/bower_components/app-localize-behavior/app-localize-behavior.html","5031a9138a5356ed5d34ec62c4b29168"],["/bower_components/app-route/app-location.html","7a0c778bf24958c02a2605883d6da186"],["/bower_components/app-route/app-route-converter-behavior.html","5a63c198ae4cba1ab739a252dd6cfcb2"],["/bower_components/intl-messageformat/dist/intl-messageformat.min.js","a490f83a6cb5b12763adb727d9358184"],["/bower_components/iron-ajax/iron-ajax.html","9c4b6dcab1bfefda01e1e92c20ec0fd7"],["/bower_components/iron-ajax/iron-request.html","59437674aeaba5f0284448c688f2c8bf"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","158291888902617fc64c2a06c712f42e"],["/bower_components/iron-collapse/iron-collapse.html","2444bcde7f42c230067c54317dcfb6c5"],["/bower_components/iron-flex-layout/iron-flex-layout.html","86f5632de27232c3ecfc31764d1b2da2"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","6b87c648e3917a7cb05690cae7bb607c"],["/bower_components/iron-icon/iron-icon.html","debc120f67705cfb2bc37db968374b24"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","b3a14205f43ad9735ad3e6494898b49b"],["/bower_components/iron-label/iron-label.html","996547b8cbe429d1b00926faa429ad3a"],["/bower_components/iron-location/iron-location.html","c90fef10bb429984309c4be655abec2a"],["/bower_components/iron-location/iron-query-params.html","70d8e957b4a65c5fa2bfaa84a506d11c"],["/bower_components/iron-media-query/iron-media-query.html","fe3162edc6d58755239a62e8bb76b064"],["/bower_components/iron-meta/iron-meta.html","20b2f269b1c17aafaec5f6706d8223b7"],["/bower_components/iron-pages/iron-pages.html","19eac64ee73191e3f7ba10d55b5d85a8"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","d53df766f3dafba80dc534e6c709d98f"],["/bower_components/iron-selector/iron-multi-selectable.html","953183f1a4fd69e3ed2028a440faff20"],["/bower_components/iron-selector/iron-selectable.html","dfcce53c91fbda4d69ea50c31f36ac9b"],["/bower_components/iron-selector/iron-selection.html","f9d3a17ab6a7d8013164f2e07fd8b9a7"],["/bower_components/iron-selector/iron-selector.html","e106c83c3473f4cd5528da00cc7c7572"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","b158b246a572932bba798ed9b7960df9"],["/bower_components/polymer/lib/elements/array-selector.html","5f57ce80cbb1ab325e1411b076bbe50d"],["/bower_components/polymer/lib/elements/custom-style.html","e0a116cc87dd72c738e9b794f2f82235"],["/bower_components/polymer/lib/elements/dom-bind.html","ca559a2d01b3c688c2bfd173a268bd7f"],["/bower_components/polymer/lib/elements/dom-if.html","ecf1387c9ca5401dcce2f6c50d309075"],["/bower_components/polymer/lib/elements/dom-module.html","75d69be4e7092f29d8896571dc9507a4"],["/bower_components/polymer/lib/elements/dom-repeat.html","6cc118cc54697d7844ba33fc19025808"],["/bower_components/polymer/lib/legacy/class.html","d42913d38a838574fc57d452d97277d4"],["/bower_components/polymer/lib/legacy/legacy-element-mixin.html","59a52e1d908d9bd58666e3829091544e"],["/bower_components/polymer/lib/legacy/mutable-data-behavior.html","cceda7ef2069cf511ca799e57857fe76"],["/bower_components/polymer/lib/legacy/polymer-fn.html","ceda318f1c92e5273d3e3d834eae953f"],["/bower_components/polymer/lib/legacy/polymer.dom.html","9d7985dbd99cfcc353a9a8086297b5de"],["/bower_components/polymer/lib/legacy/templatizer-behavior.html","56de443f08fe4e0dc135be423cd98ea0"],["/bower_components/polymer/lib/mixins/dir-mixin.html","40ae8d3c2a4af6ab82c512a5e06f0ff0"],["/bower_components/polymer/lib/mixins/element-mixin.html","617d646c9a4b8e477daec53e4cbb995a"],["/bower_components/polymer/lib/mixins/gesture-event-listeners.html","0b4c8433c259bc8e0a496bb3927ed291"],["/bower_components/polymer/lib/mixins/mutable-data.html","9c5767db1c3902d95257ae88164819d8"],["/bower_components/polymer/lib/mixins/properties-changed.html","2dad601ce25ca39cc49de6b83ccbed7a"],["/bower_components/polymer/lib/mixins/properties-mixin.html","429401dc25a542a9720e514b4a051d89"],["/bower_components/polymer/lib/mixins/property-accessors.html","14013b43709aaff5861772e8f68209a5"],["/bower_components/polymer/lib/mixins/property-effects.html","34f042486e50b40c786b108ca6c1f47b"],["/bower_components/polymer/lib/mixins/template-stamp.html","f6cf813167f5db2e93fdcde9f77c0707"],["/bower_components/polymer/lib/utils/array-splice.html","6f3cfeff74c598231afe76444853e930"],["/bower_components/polymer/lib/utils/async.html","bae1cc8bb949e6b81a9e78aceb1541e2"],["/bower_components/polymer/lib/utils/boot.html","f9f8d556136c8bc95e88be252b49e094"],["/bower_components/polymer/lib/utils/case-map.html","b0cc7b550e688ad9ef7464baad5443aa"],["/bower_components/polymer/lib/utils/debounce.html","4eb694a375658be583d92859f4d79d7a"],["/bower_components/polymer/lib/utils/flattened-nodes-observer.html","d606239b5c156cdd858c70a9a329520e"],["/bower_components/polymer/lib/utils/flush.html","7afdc955e0ac5c287690223bff04b21c"],["/bower_components/polymer/lib/utils/gestures.html","013ed3cccf017cc3974e00e015f3c1dc"],["/bower_components/polymer/lib/utils/html-tag.html","6db9677983f154a2f6623b51be79659d"],["/bower_components/polymer/lib/utils/import-href.html","3889681d5cb896e6f021369cb6e95810"],["/bower_components/polymer/lib/utils/mixin.html","08e9e4654c38ae9a963f1b6d9e8dde80"],["/bower_components/polymer/lib/utils/path.html","c8d3081beb8079c6e716b9a8d807b333"],["/bower_components/polymer/lib/utils/render-status.html","c17e0ad482e5d8924c01738c3bbd09c7"],["/bower_components/polymer/lib/utils/resolve-url.html","ff87a9a3fa8e81cabd662bf0fa3dc413"],["/bower_components/polymer/lib/utils/settings.html","102bc386f3b7ff8c4240bb84d38e79db"],["/bower_components/polymer/lib/utils/style-gather.html","d0c4324b11329a49c326a5a69debe53b"],["/bower_components/polymer/lib/utils/templatize.html","085ff513e5a5169dda5240a1450358df"],["/bower_components/polymer/lib/utils/unresolved.html","320f9d2a7b685679be25099adee15257"],["/bower_components/polymer/polymer-element.html","7091722c04dbc119ec2b145aa0b22368"],["/bower_components/polymer/polymer.html","ba5af3fdbe6d66d284ba073c5cb6a2b8"],["/bower_components/promise-polyfill/Promise.js","58a1f1fdae357ea5ee4e91b2dc07c997"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","ac6a87c0cf7d1d39ba6fc4e6f82e48eb"],["/bower_components/px-alert-label/css/px-alert-label-styles.html","7132d072f24f7f6c86cd0218b81c4fdc"],["/bower_components/px-alert-label/px-alert-label.html","d71d377d31051bb4808c1952952f3044"],["/bower_components/px-alert-message/css/px-alert-message-styles.html","c0856f02df044d068473867786655fe0"],["/bower_components/px-alert-message/px-alert-message.html","faa04338d5248648426501fef206dcbc"],["/bower_components/px-dark-demo-theme/px-dark-demo-theme-styles.html","19cfbf9a76ad517b8ce4c94659fe1aa1"],["/bower_components/px-dark-theme/px-dark-theme-styles.html","6a49b6fc324bb507190fa954be222f14"],["/bower_components/px-demo/css/px-demo-content-helper-styles.html","815e2c8b4deed300a21afe4e65751d55"],["/bower_components/px-demo/css/px-demo-styles.html","28053a46b44e55089c7719dc8a5974c3"],["/bower_components/px-demo/monogram-wdmk.png","cbe89427cbac5735ba8994e2fefab6f8"],["/bower_components/px-demo/px-demo-api-viewer.html","bda2aafa4338197700a0f416cbb505d9"],["/bower_components/px-demo/px-demo-behaviors.html","75a8595e395a6b2a53ac3acbdf7f8d67"],["/bower_components/px-demo/px-demo-code-editor.html","dfb621e0242c158ba6df6a4378bf658b"],["/bower_components/px-demo/px-demo-collection.html","031fb2918e340ff7748ee18777b4211c"],["/bower_components/px-demo/px-demo-component-snippet.html","5082d6c20cc6b973b95778235b8e7722"],["/bower_components/px-demo/px-demo-configs.html","461af2fcd404530fb32cea5d8c591fd5"],["/bower_components/px-demo/px-demo-footer.html","a0f9b1feee51f0caaeda7123f4248264"],["/bower_components/px-demo/px-demo-header.html","b8978e149a11ec3358dcbe120d7fa6ec"],["/bower_components/px-demo/px-demo-interactive.html","45a23b6c9d690d7f6712cbe0e8b3e7ad"],["/bower_components/px-demo/px-demo-props.html","6c7ecad233a41d487d2c057680bf6c44"],["/bower_components/px-demo/px-demo-theme-switcher.html","0e689dc58c3a3fe05dae3ce513d4e87a"],["/bower_components/px-demo/px-demo-theme-util.html","439648db296ca70710b3217368f82687"],["/bower_components/px-demo/px-demo.html","fc5f140a56c3562b1c0689651b29af3c"],["/bower_components/px-icon-set/px-icon-set-communication.html","498a0b24b06ef0324878b39e59f5b8f7"],["/bower_components/px-icon-set/px-icon-set-document.html","ef5d4f8d74f5db3e72cd5e9c06a917f6"],["/bower_components/px-icon-set/px-icon-set-feature.html","ca03f02f9db3d28f9e907728af757823"],["/bower_components/px-icon-set/px-icon-set-navigation.html","c2d6d9bb424bb9c7db34c278207f3f65"],["/bower_components/px-icon-set/px-icon-set-object.html","b3857c1ec6bda72aa0cfb9321f73ba85"],["/bower_components/px-icon-set/px-icon-set-utility.html","0652792676196dd60a43b58e2d7dce31"],["/bower_components/px-icon-set/px-icon-set-vis.html","16c4fc80bf5236e95c8ab2a1058eb8e4"],["/bower_components/px-icon-set/px-icon-set.html","c176cc30be5b0939ed5ee1e3da3f5497"],["/bower_components/px-icon-set/px-icon.html","4b68070ce354b3a996140dfa92c45635"],["/bower_components/px-spinner/css/px-spinner-styles.html","9a2ecf22ce0ad1e90130d08a1c3dba41"],["/bower_components/px-spinner/demo/px-spinner-demo.html","e22f1d684fb46f928d845accbb44d5e8"],["/bower_components/px-spinner/px-modernizr.html","85baa59ed6ae879f2701767e982b66ac"],["/bower_components/px-spinner/px-spinner.html","d1ae0c398c2d96dc45d6af428b28ed02"],["/bower_components/px-theme/px-theme-local-fonts-styles.html","a4d2a8d8859a48193643885cd8ec15b8"],["/bower_components/px-theme/px-theme-styles.html","e564da593d05d28f6dd62656090c8f7c"],["/bower_components/px-toggle/css/px-toggle-styles.html","e958d3c550f843e4ac226594a7e38980"],["/bower_components/px-toggle/demo/px-toggle-demo.html","19b7afb2472ff51df219d31ab6da16a6"],["/bower_components/px-toggle/dist/px-toggle.js","0b9e40690d863c9f6f0b12c85eef35b1"],["/bower_components/px-toggle/px-toggle.es6.js","aaaa66bdddc27400e2f1f65a752e76a5"],["/bower_components/px-toggle/px-toggle.html","06fefe7fc1f5742dec6b6923db3e58a7"],["/bower_components/px-typography-design/type/GEInspiraSans-Bold.woff","2e53145e77ccfd1ab1b30076782adb56"],["/bower_components/px-typography-design/type/GEInspiraSans.woff","a443694e5dd43b3ced15bee2a1a67366"],["/bower_components/shadycss/apply-shim.html","a7855a6be7cd2ceab940f13c1afba1f3"],["/bower_components/shadycss/apply-shim.min.js","5dde11c0ae000a209ed0dc13a58eaa07"],["/bower_components/shadycss/custom-style-interface.html","7784f566f143bec28bf67b864bedf658"],["/bower_components/shadycss/custom-style-interface.min.js","93eba7a23d2f96764005909ad4f0b294"],["/bower_components/webcomponentsjs/custom-elements-es5-adapter.js","a5043c1d0dd16d84558ee6cc2276212e"],["/bower_components/webcomponentsjs/webcomponents-loader.js","f7eb9862b1725aef7e59f8584c2a2efb"],["/css/predix-ui-hero-animation-icons-styles.html","f039ce79a9b1a197d27a3fea8ff13ae6"],["/css/predix-ui-hero-animation-styles.html","cfef82864c39d722b5c16aeaf9cfd2f9"],["/css/predix-ui-homepage-styles.html","dadbb78804a23742e00ea02ea87af748"],["/css/px-catalog-api-search-styles.html","b4393aa2f5823c4ed624110c077a6a77"],["/css/px-catalog-code-snippet-styles.html","bb767707f71d8f0f3b90b47e9fc9fb2c"],["/css/px-catalog-code-styles.html","6ef74cfc256f1fe1356e5695b3301824"],["/css/px-catalog-component-gallery-styles.html","fb0f778df03cb06c4017770ec9d26971"],["/css/px-catalog-footer-styles.html","52e3e2e51a82771e88900a3d7e8bd275"],["/css/px-catalog-page-styles.html","b1fdff7d8f9ee6a122eaa97854351e19"],["/css/px-catalog-styles.html","9d3a617a6147c8a21d764ce1a7927b43"],["/css/px-catalog-theme-styles.html","42d378b6d34ee89eba26f22376c822ce"],["/css/px-catalog-treenav-link-styles.html","44b0e38083ee2f67b627fffd57a04855"],["/css/px-catalog-treenav-styles.html","8f1ff416a07502d5c6af162f578391d4"],["/css/px-catalog-version-finder-styles.html","4f1a8745c43e82d4456f700d228398d7"],["/css/px-cla-styles.html","402d4f0359cbe9bae8c97a2d7d06c4a7"],["/css/px-hero-image-styles.html","758e2f8330477a69e0285208e66915f5"],["/css/px-sb-list-styles.html","b75eb0f5b09469208b3054ca1a546d3a"],["/css/px-sb-styles.html","14dbecd5d3516e5499ef742858877e44"],["/elements/px-catalog-api-search/lunr.js","cef2d2f315488f5c15cefc6a51ad80b0"],["/elements/px-catalog-api-search/px-catalog-api-search.html","f1dd2d636d294aedb82831a77fe0f235"],["/elements/px-catalog-code-snippet/px-catalog-code-snippet.html","0c25fc3b17753a04353946322c8a76a7"],["/elements/px-catalog-code-snippet/px-catalog-prism.html","910da760935d8309f7ad5d8bee4684c0"],["/elements/px-catalog-page/px-catalog-page-behavior.html","5af84a00a2139eb8fed3881641e0a947"],["/elements/px-catalog-page/px-catalog-page-elements.html","3e2aa1b90a35e585f83aa983c9241391"],["/elements/px-catalog-router/px-catalog-router.html","eb281638cf106d0ec787afe02efc18b5"],["/elements/px-catalog-treenav/px-catalog-treenav-link.html","24b4568d35a8eef9716e44600a5d9c6a"],["/elements/px-catalog-treenav/px-catalog-treenav.html","9b0bbae4cb8e78d4d4ae2bde217cb749"],["/elements/px-catalog-version-finder/px-catalog-version-finder.html","ac5089dd15c56758ba999b2ed7ea3fb8"],["/elements/px-catalog-version-finder/versions.json","4e1c4a84c97bf8cf31d04ed7b01ee221"],["/elements/px-catalog/pages.json","73eb42986788b56f9091a4fdfc728726"],["/elements/px-catalog/px-catalog-page-viewer.html","8d179bd8221a2f8f98e7e5651ef59280"],["/elements/px-catalog/px-catalog-theme-switcher.html","c72b73bc60dc37a7932e4b1e723256d7"],["/elements/px-catalog/px-catalog.html","e38a4c02bd12f9eeb47f925a32636884"],["/elements/px-demo-theme-switcher/css-parse.js","45e1df03d1fde7d011ad911ea778a187"],["/elements/px-demo-theme-switcher/px-demo-theme-util.html","904c10120fd02dce269f09a4394f9722"],["/elements/px-demo-theme-switcher/style-properties.js","1a991e2edefb56e98db3fe72010d5a55"],["/elements/px-hero-image/predix-ui-hero-animation-airplane.html","4c8eb5c5c0b738ac06145abff10c7e77"],["/elements/px-hero-image/predix-ui-hero-animation-chart.html","2777e96c73b90eb0826286d4a8c8c893"],["/elements/px-hero-image/predix-ui-hero-animation-clouds.html","e06621cd62e25580dd2a58b45e47e5fa"],["/elements/px-hero-image/predix-ui-hero-animation-gauge.html","e98c4e55b7265915dd799686360f1a81"],["/elements/px-hero-image/predix-ui-hero-animation-turbine.html","df1183b0209d26b4d734b251ca0d30b1"],["/elements/px-hero-image/predix-ui-hero-animation.html","b071309795168c7ac1e81d624dbeea1f"],["/elements/px-hero-image/px-hero-image.html","91189131323df8a2c465d16a9237fd99"],["/elements/px-lazy-load/px-lazy-load-behavior.html","1d9985f9adc00c31cb700a8801a09a62"],["/elements/px-site-notifications/px-sw-notification.html","ff6eee1f625a4e85919b04d6c9c41895"],["/index.html","602dcafc2e02fe88ff18b31a05e7057b"],["/manifest.json","c9b10132c13ac81f601d08657fbb65ae"],["/pages/about/introduction.html","91dae69a5b24af0bedd4a4324be4d1e3"],["/pages/about/release-notes.html","e77ba94ac8c26e8d06b65081d36de4d6"],["/pages/about/resources.html","a25baa11d494992dac95ac65c4c7fedd"],["/pages/about/sample-app.html","6abb449e1f0bf13377e41282a070782e"],["/pages/about/start-designing.html","3088dff44827466265c38cfc6070ac02"],["/pages/about/start-developing.html","b639214ddcb99759cc09378021338159"],["/pages/app-data.json","c2eec50d8ebe7258c5dfd5838abbc301"],["/pages/build-data.json","cffc690b8838d59df9de2ef07f6dbe45"],["/pages/component-gallery/component-data.json","a6acdbc7fe4e5a30e3ce196754c6c8a0"],["/pages/component-gallery/component-gallery.html","346721b1267fce1b2e7d91fd95e4f3f2"],["/pages/component-gallery/repo-data.json","56ee44ebc84a16fbfc59230a4d8c3992"],["/pages/component-gallery/tile-data.json","bd2727fbc8832056370694edd3bd296d"],["/pages/design/Predix_Iconography_Guidelines.pdf","fa95212f14ccd2718637cdce132859fe"],["/pages/design/color.html","f112e436201c8fcbc4179b2cbb648b64"],["/pages/design/data-vis.html","a7f2608def22f064de256a2a54d53ec8"],["/pages/design/design-principles.html","47dbcbb17f62db63e1c56725c9292880"],["/pages/design/elevation-layering.html","bceab06b6bf80144d757301a745b9da0"],["/pages/design/forms.html","7f2c1a2ce14c8eb63b13b550ed0b0c93"],["/pages/design/iconography.html","bc5c4ab3707d8430952559031a7f3d38"],["/pages/design/layout-examples.html","f664a6cd2c845d854dd771061035ef77"],["/pages/design/materiality.html","ead1b359517b7b2fcd8ea59069295099"],["/pages/design/mobile.html","ba17dff4495d5c17e4ed50a5e9c6d6d6"],["/pages/design/navigation.html","5446452ad4184dcf00f93f57271efe79"],["/pages/design/page-layout.html","88926097f2950b9bf45082815795bfeb"],["/pages/design/typography.html","42a5da58485d070dab9385c10e785fbc"],["/pages/design/writing.html","6379c3b8ce2edd367f45c80b8539683d"],["/pages/develop/cla.html","2f429f8517b28f0ef12b695b7e614ff6"],["/pages/develop/context-browser.html","0102f0e133da7a7093817d10b2d9d413"],["/pages/develop/contribution.html","2b2459ad3626659417eb94ea8b2de5c5"],["/pages/develop/css-overview.html","38ebe0f4fe20487aafec9b918f22838d"],["/pages/develop/data-grid/cell-renderers.html","d1e5bb8870d90c5ea6e7486b2ee48a5c"],["/pages/develop/data-grid/define-columns.html","385bfaba9fabb84319aa8ac9e47cd3ae"],["/pages/develop/data-grid/expandable-rows.html","e7c5faf9b94af6852f97be0b8dc468a7"],["/pages/develop/data-grid/load-data.html","eb080ebef219081bc8d764f2492aa9ba"],["/pages/develop/data-grid/overview.html","45b29f28400938dddb35ca9374185958"],["/pages/develop/datetime-changes.html","18d56a7cf694ca8e5a430fc6d02a146d"],["/pages/develop/frameworks/angular.html","7a1871b14808916eef3670b2b472cfe4"],["/pages/develop/frameworks/vue.html","038ad037922967dd336706eaa833c955"],["/pages/develop/icons.html","b541b9e3564cb962003cb542c31a79a6"],["/pages/develop/internationalization.html","83b606fe11bd225c93152865d56c4e24"],["/pages/develop/localizable-strings.html","6c12e25e2f408d21ad544b89ecabc9db"],["/pages/develop/map.html","76da8ac037bfcdc028a79433f93a40b2"],["/pages/develop/migrate/api-changes.html","5aea0eb2431fb2942f654513eaac3be2"],["/pages/develop/migrate/icons.html","cf44728eb3f8d4fab02277a02c58bfcc"],["/pages/develop/migrate/theme.html","cc755b6929221864581a34019f9594a4"],["/pages/develop/migrate/vis.html","ff4c12f6504512beb0d43cf8ebda89bd"],["/pages/develop/mobile.html","295b1eec5e67d2b6cc9f06cb3536e745"],["/pages/develop/stacking-context.html","f6ccca29dd7b27e423f2ce7252cdb4f0"],["/pages/develop/theme.html","882590f325514224149d5b2b972d1584"],["/pages/develop/transpile.html","350ebbcb11b0071c89b16a7455933141"],["/pages/develop/vis/annotations.html","16c3954acc12229dc57e42a304be73cb"],["/pages/develop/vis/configure-axis.html","f3d5023de66136d5846a817531998bb1"],["/pages/develop/vis/configure-charts.html","ead708a5852b8ba78fefbdd0cd4232d7"],["/pages/develop/vis/configure-toolbar.html","0ec85047ad71b2dc11d7cd47500b640a"],["/pages/develop/vis/configure-toolbar_data.json","b71c8fc843134875c54dea8a27d25324"],["/pages/develop/vis/crosshair.html","35080f3c95d7297523225950f9d7aac9"],["/pages/develop/vis/framework-overview.html","57accd327003e43ac379bf6d83c92559"],["/pages/develop/vis/multi-axis.html","3abcf6cef4dfeab4337bc9e1458bd2d4"],["/pages/develop/vis/terminology.html","9e38d05a88d54ad7b513c6a932d7e2b9"],["/pages/develop/vis/web-workers.html","823659fd8a0e4c623040343a3d3dda67"],["/pages/home.html","d5e332bed9c2420cf1f9a759fe334e9e"],["/pages/tools/api-search.html","7ef8ccd082a4d5cc4350310731f4d530"],["/pages/tools/version-finder.html","fdbcfcb93ff62bd9dab5bc31ad65323b"],["/type/GEInspiraSans-Bold.eot","76ed48fc07259af776ed63253194a1bf"],["/type/GEInspiraSans-Bold.svg","c88faaefab3e7c6afc481190d77c3b94"],["/type/GEInspiraSans-Bold.svgz","a4800690c3ca1721bdd8b7f3bc498a6d"],["/type/GEInspiraSans-Bold.ttf","74d32c6b887369a416327bf803fc885f"],["/type/GEInspiraSans-Bold.woff","2e53145e77ccfd1ab1b30076782adb56"],["/type/GEInspiraSans-Bold.woff2","a85d4c51fda3747ae393555efec8bc69"],["/type/GEInspiraSans-BoldItalic.eot","1e01b72d96a3c6d2db320cabc0c2818e"],["/type/GEInspiraSans-BoldItalic.svg","906d7807743934e8eefc104d53900275"],["/type/GEInspiraSans-BoldItalic.svgz","e46f94795c4d4d94ba3daf9b21a45dc9"],["/type/GEInspiraSans-BoldItalic.ttf","4cd1a6d1c933bedec92b06025be3b9ed"],["/type/GEInspiraSans-BoldItalic.woff","f5222dfa3e2f8c6ab178130e79e5a938"],["/type/GEInspiraSans-BoldItalic.woff2","1928a59996e51036320718c0a1b7d427"],["/type/GEInspiraSans-Italic.eot","58cef27cba3b88704f9bdf83946b8c46"],["/type/GEInspiraSans-Italic.svg","7f7d36798d52af5fb69fa535b07baf32"],["/type/GEInspiraSans-Italic.svgz","583f3302fcde887ceb6c1697901dff94"],["/type/GEInspiraSans-Italic.ttf","16bf3a90afe693ca20d1d125303dd65a"],["/type/GEInspiraSans-Italic.woff","4389f2fffc6683de1defcbac2b264ac3"],["/type/GEInspiraSans-Italic.woff2","640ea5c2135498739950c4cffbbbcd8d"],["/type/GEInspiraSans.eot","268234e728bca77250a0a95fbfb8b66e"],["/type/GEInspiraSans.svg","83bd30add447f3ade981d09c19dbe8d7"],["/type/GEInspiraSans.svgz","9432299021b1db7e9f1084f8e4bdb67f"],["/type/GEInspiraSans.ttf","4e2e3ae31004c38b2b4d903bcbc942b0"],["/type/GEInspiraSans.woff","a443694e5dd43b3ced15bee2a1a67366"],["/type/GEInspiraSans.woff2","7fabd773b5033881cd909da1ca34b275"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([null], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("bower_components/**", toolbox.fastest, {});
toolbox.router.get("img/**", toolbox.fastest, {});




