(this["webpackJsonptcg-portal"]=this["webpackJsonptcg-portal"]||[]).push([[0],{34:function(t,n,e){},35:function(t,n,e){},36:function(t,n,e){},43:function(t,n,e){},44:function(t,n,e){},64:function(t,n,e){"use strict";e.r(n);var c=e(0),o=e.n(c),a=e(26),s=e.n(a),i=(e(34),e(35),e(10)),r=e(2),j=e(11),u=(e(36),e(1)),b=function(){var t=Object(c.useState)(!1),n=Object(j.a)(t,2),e=n[0],o=(n[1],Object(r.g)().state);return!0===e?Object(u.jsx)(r.a,{to:(null===o||void 0===o?void 0:o.from)||"/dashboard"}):Object(u.jsx)("div",{className:"Login",children:"Login Component Works!! With latest"})},d=(e(43),function(){return Object(u.jsx)("div",{className:"Dashboard",children:"Dashboard component works!!! With new changes"})}),h=(e(44),function(){return Object(u.jsx)("div",{className:"NotFound",children:"404 page not found!!!"})}),f=e(16),l=e(29),O=e(28),p=e.n(O),g=function(t){p.a.get("https://contractorsgarage.com/api/user/is-logged-in").then((function(n){t(n)}),(function(n){t(null,n)}))},x=["children"],m=function(t){var n=t.children,e=Object(l.a)(t,x),o=Object(c.useState)(),a=Object(j.a)(o,2),s=a[0],i=a[1],b=Object(r.g)();return Object(c.useEffect)((function(){g((function(t,e){t&&200===t.status?i(n):i(Object(u.jsx)(r.a,{to:{pathname:"/",state:{from:b}}}))}))}),[]),Object(u.jsx)(r.b,Object(f.a)(Object(f.a)({},e),{},{render:function(){return s}}))};var v=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(i.a,{children:Object(u.jsxs)(r.d,{children:[Object(u.jsx)(r.b,{path:"/",exact:!0,component:b}),Object(u.jsx)(m,{path:"/dashboard",exact:!0,children:Object(u.jsx)(d,{})}),Object(u.jsx)(r.b,{path:"*",exact:!0,component:h})]})})})},F=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,65)).then((function(n){var e=n.getCLS,c=n.getFID,o=n.getFCP,a=n.getLCP,s=n.getTTFB;e(t),c(t),o(t),a(t),s(t)}))};e(63);s.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(v,{})}),document.getElementById("root")),F()}},[[64,1,2]]]);
//# sourceMappingURL=main.40383277.chunk.js.map