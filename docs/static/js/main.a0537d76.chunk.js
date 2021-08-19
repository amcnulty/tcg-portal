(this["webpackJsonptcg-portal"]=this["webpackJsonptcg-portal"]||[]).push([[0],{100:function(e,t,c){},115:function(e,t,c){},116:function(e,t,c){},124:function(e,t,c){},126:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),a=c(20),i=c.n(a),o=(c(71),c(72),c(13)),r=c(10),A=c(11),l="SET_USER",d=c(22),j=function(e,t){switch(t.type){case l:return Object(d.a)(Object(d.a)({},e),{},{currentUser:t.payload});default:return e}},b=c(2),h={currentUser:null},u=Object(n.createContext)(h),O=function(e){var t=Object(n.useReducer)(j,h),c=Object(A.a)(t,2),s=c[0],a=c[1];return Object(b.jsx)(u.Provider,{value:[s,a],children:e.children})},g=c(23),m=c.n(g),x="https://contractorsgarage.com",E={withCredentials:!0},I=function(e){m.a.get(x+"/api/user/is-logged-in",E).then((function(t){e(t)}),(function(t){e(null,t)}))},p=function(e,t){m.a.post(x+"/api/user/login",e,E).then(t,(function(e){return t(null,e)}))},Q=function(e){m.a.post(x+"/api/user/logout",null,E).then(e,(function(t){return e(null,t)}))},C=function(e){m.a.get(x+"/portal/user/get-all-users",E).then(e,(function(t){return e(null,t)}))},N=function(e){m.a.get(x+"/portal/locations",E).then(e,(function(t){return e(null,t)}))},S=(c(92),function(){var e=Object(n.useState)(!1),t=Object(A.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)(""),i=Object(A.a)(a,2),o=i[0],d=i[1],j=Object(n.useState)(""),h=Object(A.a)(j,2),O=h[0],g=h[1],m=Object(n.useContext)(u),x=Object(A.a)(m,2),E=(x[0],x[1]),I=Object(r.h)().state;if(!0===c)return Object(b.jsx)(r.a,{to:(null===I||void 0===I?void 0:I.from)||"/dashboard"});return Object(b.jsx)("div",{className:"Login",children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),p({username:o,password:O},(function(e,t){e&&200===e.status?(E({type:l,payload:e.data}),s(!0)):console.log(t)}))},children:[Object(b.jsxs)("div",{className:"mb-3",children:[Object(b.jsx)("label",{htmlFor:"username",className:"form-label",children:"Username"}),Object(b.jsx)("input",{id:"username",className:"form-control",type:"text",value:o,onChange:function(e){return d(e.target.value)}})]}),Object(b.jsxs)("div",{className:"mb-3",children:[Object(b.jsx)("label",{htmlFor:"password",className:"form-label",children:"Password"}),Object(b.jsx)("input",{id:"password",className:"form-control",type:"password",value:O,onChange:function(e){return g(e.target.value)}})]}),Object(b.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Submit"})]})})}),J=(c(97),function(){var e=Object(n.useState)([]),t=Object(A.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)([]),i=Object(A.a)(a,2),l=i[0],d=i[1],j=Object(r.g)(),h=Object(n.useContext)(u),O=Object(A.a)(h,2),g=O[0];O[1];Object(n.useEffect)((function(){N((function(e,t){e&&200===e.status&&s(e.data)})),C((function(e,t){e&&200===e.status&&d(e.data)}))}),[]);return Object(b.jsxs)("div",{className:"Dashboard",children:[Object(b.jsxs)("div",{className:"container",children:[Object(b.jsxs)("h1",{className:"my-4",children:["Welcome, ",g.currentUser&&g.currentUser.firstName]}),Object(b.jsxs)("div",{className:"row",children:[Object(b.jsx)("div",{className:"col-12 col-md-6",children:Object(b.jsxs)("div",{className:"card p-5 mb-3 mb-md-0",children:[Object(b.jsx)("h3",{children:"Number of Locations"}),Object(b.jsx)("h5",{className:"fw-bold themeText",children:c.length}),Object(b.jsx)(o.b,{to:"/locations",children:"Manage Locations"})]})}),g.currentUser&&g.currentUser.isAdmin&&Object(b.jsx)("div",{className:"col-12 col-md-6",children:Object(b.jsxs)("div",{className:"card p-5",children:[Object(b.jsx)("h3",{children:"Number of Users"}),Object(b.jsx)("h5",{className:"fw-bold themeText",children:l.length}),Object(b.jsx)(o.b,{to:"/users",children:"Manage Users"})]})})]})]}),"Dashboard component works!!! With new changes",Object(b.jsx)("button",{className:"btn btn-danger",onClick:function(){Q((function(e,t){e&&200===e.status&&j.push("/")}))},children:"Logout"})]})}),v=(c(98),function(){return Object(b.jsx)("div",{className:"NotFound",children:"404 page not found!!!"})}),k=c(65),f=["children"],B=function(e){var t=e.children,c=Object(k.a)(e,f),s=Object(n.useState)(),a=Object(A.a)(s,2),i=a[0],o=a[1],j=Object(r.h)(),h=Object(n.useContext)(u),O=Object(A.a)(h,2),g=O[0],m=O[1];return Object(n.useEffect)((function(){g.currentUser?o(t):I((function(e,c){e&&200===e.status?(o(t),m({type:l,payload:e.data})):o(Object(b.jsx)(r.a,{to:{pathname:"/",state:{from:j}}}))}))}),[c.path]),Object(b.jsx)(r.b,Object(d.a)(Object(d.a)({},c),{},{render:function(){return i}}))},R=(c(99),function(){return Object(b.jsx)("div",{className:"Settings",children:"Settings Component Works!!"})}),U=(c(100),c(127)),T=c(136),w=c(137),F=c(128),Y=function(e){var t=e.location,c=Object(n.useState)(!1),s=Object(A.a)(c,2),a=s[0],i=s[1],o=t.thumbnailImage?t.thumbnailImage.src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAg0AAAGlCAIAAAD23VLdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUxQTQyRkMyRkNCMjExRTM5NTU4OTZEQkJFNzU1OEY1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUxQTQyRkMzRkNCMjExRTM5NTU4OTZEQkJFNzU1OEY1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTFBNDJGQzBGQ0IyMTFFMzk1NTg5NkRCQkU3NTU4RjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTFBNDJGQzFGQ0IyMTFFMzk1NTg5NkRCQkU3NTU4RjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7hkGSKAAAPo0lEQVR42uzdW1vaWBiA0eF8qOd2ejH//6/1Yg6KUIUAAeYraS21iIIYIVnrwrF9fGyysycvmwSoLBaLP34zm81Go9F4PE7TdD6fr/0ZAI5dpVKpLbVarU6nE9+s+ZlHDYhCDAaDiIThAyibSMXZ2dmjWvzSiSRJer2e1QNAmVcYFxcXEYw1nbi/v+/3+8YIgFhVnJyc/NKJ0WgUKwlDA0Dm8vIyW1V868RsNvvnn3883QTAg0ql8vnz51qtVo0/DAYDkQBgVXQh6hDfVLNbYI0IAI9EHaIRVZEAYEMqquPx2EAAsFY0opqmqYEAYK1oRHU+nxsIANaKRlTd6QTAU6IRVaMAwAY6AYBOAKATAOgEADoBgE4AoBMA6AQAOgGATgCATgCgEwDoBAA6AYBOAKATAOgEADoBgE4AgE4AoBMA7Ev9vf7hbrdbX2q32w4DwFOSJEmXhsNhWTpRrVYvLi5arZbDD/Cs1lJ8E4+q+/3+bDbLeQMqX758yfPfazabEYlarVapVBx+gJdbLBYRidvb28lkkuuD+/xXEiIBsMvj+kolzp9xFo1zaWE7cXZ2JhIAr0zF+fl5MTvRbDY7nY5IALwyFe12u9vtFrATjUZDJAD2taoo5nrC0QXYi3o9v7tVc11POLQAe5HnK8/y60SeqySAYsvzafxqIfcKgOPrBAA6AYBOAKATAKATAOgEADoBgE4AoBMA6AQAOgGATgCgEwCgEwDoBAA6AYBOAKATAOgEADoBgE4AoBMA6AQA6AQA26sbgv2azWbT6XQ+n6dL8U3295PJZPXHms3m91BXq/Wl+KbRaNRqNWMI6ETRTH4Yj8cPYXikUqms/jF+cv36rlpttVrNH4wtoBNHbDQaJUurbXjUg6c89WPxq0ZLWTPaS51Ox2gDOnE0IgxZIR7y8MI2bNuP+P3DpSwYHz58sMIAdOKgZWfth6eM9piHzc14CEar1eouORaAThxcIb5+/ZqmaQ552BCM8VJsyenpqVoAOnEQkiTp9/vvVYi1wYiN6fV6UYvz8/N2u+0YATrxPuJ0PBgMskvK716ItbW4vr7udDpnZ2f1uuMI6ES+ohB3d3eLxeKgCvF7LbIr6pGKk5MTRw3QiTzMZrNer5ddrD7YSKzWImLW7/cnk8n5+bmX6QE68bbisfnNzc0hLyM2LCwiFVdXV+6dBfbL+zv9NBgMrq+vjysSq7WIldC///57d3fnUAI6sX/ZHUSVpSPdhWzj+/1+7IsDCujEniMxHA6PtxCPahH7IhXAvpT9+sRsNru5uZlMJsWIxGoq0jS9urpyZRuwnnhVJK6vrwsWiYdUxH7F3sU+muWATuwoTqPT6bR4kXhIRexd7KNZDujELnq9XoEjsZoK1yoAndglEoW5cP1sKlzWBnRiO4PBoCSRWE1F7LXpDujE85IkyV4nUaq9jv2NvY59N+MBndgkuwu2bJF4SEXsu9ufAJ3YJHvvptIe7Nj3GAGTHtCJ9QaDQSFfKrHVkiJGwIUKQCfWSNP07u6uzJF4SEWMQ/bxfAA68VO/3y/zM06rss+rMA6ATvyULFlMPCwpsgExFIBOfHd7eysSj1IRY2IcAJ34Zjgcuhn0dzEmMTLGAdCJb7c5WUysXVK48QnQCYsJSwpAJywmXrGk8GHaQKk7kSSJxcRm0+nUjU9AeTsxGo0sJp5dUsQoGQegvJ1wgI0SoBNPnv68APslYpSkAihjJ0r1SUSvkX2KkXEAStcJl2eNFaATm058FhNbLSkmk4lxAErUiel06tBuZTweGwSgRJ3w6NiIATrh0bERA3RiJ2mauiN2WzFiPuQOKEsnptOpi9jbihFzUaeEvLEN5V1POK7GjWcNh8O///7bpSnK2In5fO64GjeejUSv11ssFv/9959UULpOmPTGjZdEorIkFZSxE8BLIpH9USrQCeDJSEgFJe2E+3Z249aXckZCKihjJ7x4QifYKhJSQek64cUTxo1tIyEVlKsTwA6RkAp0AkTipStLqUAnQCSkghJ3oloVv13UajWDIBJSQSk64Xynr7wyElJBwTsBIvH6SEgFOgEiIRWUtRPNZtNxNW4isUdSoROF2yXPsxs3kdg3qdCJQqnX646rcRMJqUAnnO+MG/lFQip0omjnO0+hbD0PqlWdEAmpoCydiHnsJRTbajQa3gdQJKSCsnTiD7fu7LQIMwgiIRXoBEZMJKQCnVhqt9sOrRETCalAJzZNXye+rSLh4oRISAXl6kRotVqOrrESCalAJzad+9wd+6IZUK12u13jIBJSQek6UavVPEx+YVA96SQSUkEZOxGzVide2AmDIBJSQRk7ETqdjhfcPbvqilEyDiIhFZS0EzFlT05OHOMNYnw86SQSUkF5OxG63a4lxYbFhCvYIiEVlL0TlhQWEyIhFejEM1qtliXF2sWEK9giIRXoxPcT4unpqSP9SIyJfIqEVKAT32dqp9PxPnerYjRiTDzpJBJSgU78nKnn5+cO9oMYDZEQCalAJ35Rr9dd0M7EOPi0CZGQCnRizTQ9PT11fmw2mzEOFhMiIRXoxPppenl5WeY3B4x9v7i4EAmRkAp04kmxnijzhYrYd/c4iYRUoBPPzNF2u13OCxWx1z6PSCSkAp140Rw9PT0t2/tVxP66LCESUoFObDFHz8/Py/OKithTN8KKhFSgE1vP0YuLizLc/hT76Nq1SEgFOrGLWq12dXVV7FTE3sU+unYtElKBTuw4QYudiodIOB+JhFSgE69NRfGuVcQeiYRISAU6sbdUfPz4sUh3QMW+xB6JhEhIBTqxtwma3QFVjFScnJxkdzc5H4mEVKATe56jcXo96jf2iC2/urryOgmRkAp04g3naLvd/vjx4zFe2Y5t/vTpU6vVcjISCalAJ952jsYJ988//zyu9/aIrY1tdkFCJKQCnchpjmbv7fH58+fDvw8qtjC2M3uuyclIJKQCnch1mmb3QV1eXh7m69Riq2Lb3NckElLBW/O5ZpumaXxtt9uNRiNJkvv7+9lsdiCF+PDhQ2yYQohESVLx6dMnH3GvE4e+sPiwNBqNvn79+o61iC05PT3tdDqrJUMkpAKdOIiFRegsxdpiPB7HuSDPbeh2u61WK9YQ8iASUoFOHHow2kvxuD5qkSy93b+Y/VtRiOxVHc4+IiEVUqETR1OLOHFny4v4Y6Ri8sPrf3/zhyhE/L/xaE2DSEiFVOjEMdUi01rK/jJSMZ/Ps69pmsZfzpZ+/w21pT+WL5GL6sTUz74+tEEeRAKp0IkCNqPRaGTleOoHHqz24NkfRiSQivfi9RP7n8e/e+VPIhL8ngqvq9AJEAmkQidAJJAKnQCRQCp0AkQCqdAJQCSkQicAkZAKdAJEQirQCRAJqUAnQCSQCp0AkUAqdAJEAqnQCRAJpEInQCSQCp0AkUAqdAJEQiSkAp0AkZAKdAJEAqnQCRAJpEInQCSQCp0AkUAqdAJEAqnQCRAJpEInQCSQCp0AkUAq0AlEAqmQCp0AkUAqdAJEAqnQCRAJpEInQCSQCp0AkUAqdAJEAqnQCRAJpEInQCSQCp2gaGazmSkuEkiFTvBkJK6vr8fjccmnuEggFTrBk5GYTqcln+IigVToBM9EosxTXCSQCp3g+UiUdoqLBFKhE7w0EiWc4iKBVOgE20WiVFNcJJAKnWCXSJRkiosEUqET7B6Jwk9xkUAqdILXRqLAU1wkkAqdYD+RKOQUFwmkQifYZyQKNsVFAqnQCfYficJMcZFAKnSCt4pEAaa4SCAVOsHbRuKop7hIIBU6QR6RONIpLhJIhU6QXySOboqLBFKhE+QdiSOa4iLBsaRCJyhaJI4iFf1+XyQ4llToBAWMxIGnIgpxd3cnEhxLKnSCYkbiYFMRkRgOhyIBOsH7R+IAUyESoBMcViQOKhUiATrBIUbiQFIhEqATHG4kVlNxe3sbWyUSoBOIxPpUxPbEVuWZCpEAneA4IvEuqRAJ0AmOKRI5p0IkQCc4vkjklgqRAJ3gWCORQypEAnSC447Em6ZCJEAnKEIk3igVIgE6QXEisfdUiAToBEWLxB5TIRKgExQzEntJhUiATlDkSLwyFSIBOkHxI7FzKkQCdIKyRGKHVIgE6ATlisRWqRAJ0AnKGIkXpkIkQCcobySeTYVIgE5Q9khsSIVIgE4gEk+mQiSgAOqGQCTeKBWNRkMkQCcQiSdTUfJBAJ1AJJ5JhfkAxeD6hEgA6IRIAOiESADohEgA6IRIAOiESADohEgA6IRIiASgE4gEoBOIBIBOiASATogEgE6IBIBOiASATogEgE6IBIBOiASATogEgE4gEgA6IRIAOiESADohEgA6IRIAOiESADohEgA6IRIAOiESADohEgCUvhMiAaATIgGgEyIBoBMiAaATIgGgEyIBoBMiAaATIgGgEyIBQOE7IRIAOiESADohEgA6IRIAOpETkQDQiU1EAkAnNhEJAJ0AQCcA0AkAdAIAnQBAJwDQCQDQCQB0AgCdAEAnANAJAHQCAJ0AQCcA0AkA0AkAdAIAnQBAJwDQCQB0AgCdAEAnANAJANAJAHQCAJ0AQCcA0AkAdAIAnQBAJwDQCQB0AgB0AgCdAEAnANAJAHQCAJ0AQCcA0AkAdAIAdAIAnQBAJwDQCQB0AgCdAOBo1Yu3S3/99ZfjCmA9AYBOAKATAOgEADoBgE4AoBMAoBMA6AQAOgGATgCgEwDoBAA6AYBOAKATAKATAOgEADoBgE4AoBMA6AQAOgGATgCgEwDoRF5ms5nhBtCJJ00mE8MNsBdJkugEAE+aTqc6AcCT0jQtZidGo5GjC/BKSZIMh8MCdqJSqfR6PVezAV4jzqK3t7dxRi1gJ8Jisbi5uZEKgJ0j0e/3cz6LVr58+ZJzKiKDV1dX7XbbIQd4uSRJYiURkchzMfEOnchSEV+73W6j0ajX6/G1VquZAQBP5SFN0+l0ml2TyDkSoZ7/Pmc7uXoRJv/dBjgW2WPrdzxV1t9rz7UB4CjOlt7fCQCdAEAnANAJAHQCAJ0AQCcA0AkAdAIAnQAAnQBAJwDQCQB0AgCdAEAnANAJAHQCAJ0AAJ0AQCcA0AkAculEpVIxCgCsFY2oBgMBwPrFRKjX6wYCgLWiEdVWq2UgAFgrGlHtdDoGAoC1ohHVWq0mFQCsjUQ04ttF7LOzM3c9AbAquhB1+PbNYrGI/4xGo16vZ1wAyFxeXmbPNn3vRLi/v+/3+4YGgFhJnJycfF9YPHQiJEkSq4rVvwGgVCqVysXFxep168qjKsxms8FgMBqNDBZA2UQeYiVRq9V+Kcfa1UPUIlIxHo/TNJ3P51YYAEVdPWQvuG61WtndTb//zP8CDABplCshKJUUlwAAAABJRU5ErkJggg==";return Object(b.jsx)("div",{className:"LocationCard",children:t&&Object(b.jsxs)("div",{className:"card",children:[Object(b.jsx)("div",{className:"card-header themeBackground",children:Object(b.jsx)("h3",{children:t.name})}),Object(b.jsx)("div",{className:"card-body",style:{backgroundImage:"url("+o+")",backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",minHeight:"250px"},children:Object(b.jsx)("div",{className:"shadowFade",children:Object(b.jsxs)("address",{className:"p-3 fw-bold",children:[Object(b.jsx)("p",{className:"m-0",children:t.addressFirstLine?t.addressFirstLine:"[address first line]"}),Object(b.jsx)("p",{children:t.addressSecondLine?t.addressSecondLine:"[address second line]"})]})})}),Object(b.jsxs)("div",{className:"card-footer cardFooterBackground d-flex justify-content-between",children:[Object(b.jsx)("button",{className:"btn btn-primary",children:"Manage"}),Object(b.jsxs)(U.a,{isOpen:a,toggle:function(){return i((function(e){return!e}))},children:[Object(b.jsx)(T.a,{tag:"span",children:Object(b.jsx)("button",{className:"btn",children:Object(b.jsx)("i",{className:"fas fa-ellipsis-v"})})}),Object(b.jsxs)(w.a,{children:[Object(b.jsx)(F.a,{children:"View"}),Object(b.jsx)(F.a,{children:"Edit"}),Object(b.jsx)(F.a,{children:"Hide Location"}),Object(b.jsx)(F.a,{divider:!0}),Object(b.jsx)(F.a,{children:"Delete"})]})]})]})]})})},y=(c(115),function(){var e=Object(n.useState)([]),t=Object(A.a)(e,2),c=t[0],s=t[1],a=Object(n.useContext)(u),i=Object(A.a)(a,2),o=i[0];i[1];return Object(n.useEffect)((function(){N((function(e,t){e&&200===e.status&&s(e.data)}))}),[]),Object(b.jsx)("div",{className:"Locations",children:Object(b.jsxs)("div",{className:"container mb-5 pb-5",children:[Object(b.jsx)("h2",{className:"my-4",children:"Location Management"}),Object(b.jsx)("p",{children:"Below is a list of the locations you have access to. From here you can select a location to make updates. To create a new location select the 'New Location' button and you will be taken to a creation screen where you can create and upload content."}),Object(b.jsx)("div",{className:"row my-5",children:Object(b.jsxs)("div",{className:"card p-4",children:[Object(b.jsx)("h4",{children:"Create New Location"}),o.currentUser&&o.currentUser.isAdmin||o.currentUser&&o.currentUser.maxLocationAllowance>c.length?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("p",{children:"Create a new location. You will be able to first create a draft and preview what it will look like before publishing."}),Object(b.jsx)("button",{className:"btn btn-primary col-xl-2 col-lg-3 col-sm-4",children:"New Location"})]}):Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("p",{children:["You have reached your maximum location allowance of ",Object(b.jsx)("b",{children:o.currentUser&&o.currentUser.maxLocationAllowance}),"!"]}),Object(b.jsxs)("p",{children:["Please contact your administrator to request an increase in your max location allowance. For more information about listing with Contractors Garage visit the ",Object(b.jsx)("a",{href:"https://www.contractorsgarage.com/development-services",target:"_blank",children:"List With Us"})," page."]})]})]})}),Object(b.jsxs)("div",{className:"row mb-5 pb-5",children:[Object(b.jsx)("h4",{children:"Your Locations"}),c.map((function(e){return Object(b.jsx)("div",{className:"col-12 col-md-6 col-xxl-4 my-2",children:Object(b.jsx)(Y,{location:e})},e._id)}))]})]})})}),V=(c(116),function(){return Object(b.jsx)("div",{className:"Toolbar toolbarBackground",children:Object(b.jsxs)("ul",{className:"list-unstyled",children:[Object(b.jsx)("li",{children:Object(b.jsx)(o.b,{className:"text-decoration-none",to:"/dashboard",children:"Dashboard"})}),Object(b.jsx)("li",{children:Object(b.jsx)(o.b,{className:"text-decoration-none",to:"/locations",children:"Locations"})}),Object(b.jsx)("li",{children:Object(b.jsx)(o.b,{className:"text-decoration-none",to:"/settings",children:"Settings"})})]})})}),D=c(129),M=c(130),L=c(131),q=c(132),P=c(133),K=c(134),G=c(135),W=function(){var e=Object(n.useState)(!1),t=Object(A.a)(e,2),c=t[0],s=t[1],a=Object(r.h)(),i=function(){return s(!c)},l=function(e){return e===a.pathname?"active":""};return Object(b.jsx)("div",{className:"MobileHeader",children:Object(b.jsxs)(D.a,{light:!0,expand:"md",className:"justify-content-between",children:[Object(b.jsx)(M.a,{className:"p-0",tag:o.b,to:"/",children:"CG"}),Object(b.jsx)(L.a,{onClick:i}),Object(b.jsx)(q.a,{isOpen:c,navbar:!0,children:Object(b.jsxs)(P.a,{className:"ml-auto",navbar:!0,children:[Object(b.jsx)(K.a,{children:Object(b.jsx)(G.a,{onClick:i,tag:o.b,to:"/dashboard",className:l("/dashboard"),children:"Dashboard"})}),Object(b.jsx)(K.a,{children:Object(b.jsx)(G.a,{onClick:i,tag:o.b,to:"/locations",className:l("/locations"),children:"Locations"})}),Object(b.jsx)(K.a,{children:Object(b.jsx)(G.a,{onClick:i,tag:o.b,to:"/settings",className:l("/settings"),children:"Settings"})})]})})]})})},Z=(c(124),function(){return Object(b.jsx)("div",{className:"Users",children:"Users Component works!!!"})});var z=function(){return Object(b.jsx)(O,{children:Object(b.jsx)("div",{className:"App lightTheme",children:Object(b.jsx)(o.a,{children:Object(b.jsxs)("div",{className:"row m-0",children:[Object(b.jsx)(r.b,{path:"/",render:function(e){return"/"!==e.location.pathname&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"d-none d-md-block col-2 p-0",children:Object(b.jsx)(V,{})}),Object(b.jsx)("div",{className:"d-md-none",children:Object(b.jsx)(W,{})})]})}}),Object(b.jsx)("div",{className:"col-md-10 mainContent",children:Object(b.jsxs)(r.d,{children:[Object(b.jsx)(r.b,{path:"/",exact:!0,component:S}),Object(b.jsx)(B,{path:"/dashboard",exact:!0,children:Object(b.jsx)(J,{})}),Object(b.jsx)(B,{path:"/locations",exact:!0,children:Object(b.jsx)(y,{})}),Object(b.jsx)(B,{path:"/users",exact:!0,children:Object(b.jsx)(Z,{})}),Object(b.jsx)(B,{path:"/settings",exact:!0,children:Object(b.jsx)(R,{})}),Object(b.jsx)(r.b,{path:"*",exact:!0,component:v})]})})]})})})})},H=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,138)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),n(e),s(e),a(e),i(e)}))};c(125);i.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(z,{})}),document.getElementById("root")),H()},71:function(e,t,c){},72:function(e,t,c){},92:function(e,t,c){},97:function(e,t,c){},98:function(e,t,c){},99:function(e,t,c){}},[[126,1,2]]]);
//# sourceMappingURL=main.a0537d76.chunk.js.map