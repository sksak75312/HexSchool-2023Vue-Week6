import{e as c,p as v}from"./swal-FXd2eKjy.js";import{L as y}from"./LoadingOverlay-_dypeP48.js";import{_ as L,c as a,a as t,F as u,e as $,b,r as V,o as n,n as O,t as i,d as h}from"./index-gzh1gDBb.js";import"./sweetalert2.all--W2uxDSh.js";var k={VITE_API:"https://ec-course-api.hexschool.io",VITE_PATH:"eerovuelive",BASE_URL:"/HexSchool-2023Vue-Week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API:_,VITE_PATH:p}=k,P={data(){return{products:null,tempData:{}}},methods:{getClientProducts(){this.$refs.LoadingOverlay.isLoading=!0,this.$http.get(`${_}/v2/api/${p}/products`).then(e=>{this.products=e.data.products,this.$refs.LoadingOverlay.isLoading=!1}).catch(e=>{c(e.response.data.message),this.$refs.LoadingOverlay.isLoading=!1})},postCart(e,l=1){this.$refs.LoadingOverlay.isLoading=!0;const r={product_id:e,qty:l};this.$http.post(`${_}/v2/api/${p}/cart`,{data:r}).then(o=>{v(o.data.message),this.$refs.LoadingOverlay.isLoading=!1}).catch(o=>{this.$refs.LoadingOverlay.isLoading=!1,c(o.response.data.message)})},singleProduct(e){this.$router.push(`/product/${e}`)}},mounted(){this.getClientProducts()},components:{LoadingOverlayVue:y}},C={class:"container"},x={class:"mt-4"},E={class:"table align-middle"},A=t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1),I={style:{width:"200px"}},T={class:"h6"},S={class:"h5"},D={class:"btn-group btn-group-sm"},B=["onClick"],H=t("i",{class:"fas fa-spinner fa-pulse"},null,-1),N=["onClick"],R=t("i",{class:"fas fa-spinner fa-pulse"},null,-1);function w(e,l,r,o,g,d){const f=V("LoadingOverlayVue");return n(),a(u,null,[t("div",C,[t("div",x,[t("table",E,[A,t("tbody",null,[(n(!0),a(u,null,$(g.products,s=>(n(),a("tr",{key:s.id},[t("td",I,[t("div",{style:O([{height:"100px","background-size":"cover","background-position":"center"},{backgroundImage:`url(${s.imageUrl})`}])},null,4)]),t("td",null,i(s.title),1),t("td",null,[t("del",T,"原價 "+i(s.origin_price)+" 元",1),t("div",S,"現在只要 "+i(s.price)+" 元",1)]),t("td",null,[t("div",D,[t("button",{type:"button",class:"btn btn-outline-secondary",onClick:m=>d.singleProduct(s.id)},[H,h(" 查看更多 ")],8,B),t("button",{type:"button",class:"btn btn-outline-danger",onClick:m=>d.postCart(s.id)},[R,h(" 加到購物車 ")],8,N)])])]))),128))])])])]),b(f,{ref:"LoadingOverlay"},null,512)],64)}const W=L(P,[["render",w]]);export{W as default};
