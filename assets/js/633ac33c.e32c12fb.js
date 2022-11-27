"use strict";(self.webpackChunkgephi_documentation=self.webpackChunkgephi_documentation||[]).push([[3445],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>y});var o=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,o,n=function(e,t){if(null==e)return{};var a,o,n={},r=Object.keys(e);for(o=0;o<r.length;o++)a=r[o],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)a=r[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=o.createContext({}),u=function(e){var t=o.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=u(e.components);return o.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=u(a),y=n,m=c["".concat(p,".").concat(y)]||c[y]||d[y]||r;return a?o.createElement(m,i(i({ref:t},s),{},{components:a})):o.createElement(m,i({ref:t},s))}));function y(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,i=new Array(r);i[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var u=2;u<r;u++)i[u]=a[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,a)}c.displayName="MDXCreateElement"},9209:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>u});var o=a(7462),n=(a(7294),a(3905));const r={id:"layout",title:"Layout",sidebar_position:3},i=void 0,l={unversionedId:"Plugins/layout",id:"Plugins/layout",title:"Layout",description:"Available layouts",source:"@site/docs/Plugins/Layout.md",sourceDirName:"Plugins",slug:"/Plugins/layout",permalink:"/Plugins/layout",draft:!1,editUrl:"https://github.com/gephi/gephi-documentation/docs/docs/Plugins/Layout.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{id:"layout",title:"Layout",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"De\u0301marrage rapide (FR)",permalink:"/Plugins/de\u0301marrage-rapide-fr"},next:{title:"Statistics",permalink:"/Plugins/statistics"}},p={},u=[{value:"Available layouts",id:"available-layouts",level:2},{value:"Create a new Layout",id:"create-a-new-layout",level:2},{value:"Set Dependencies",id:"set-dependencies",level:3},{value:"Create LayoutBuilder",id:"create-layoutbuilder",level:3},{value:"Create Layout",id:"create-layout",level:3},{value:"Properties",id:"properties",level:3},{value:"Advanced concepts",id:"advanced-concepts",level:2},{value:"Layout Data",id:"layout-data",level:3},{value:"Custom properties",id:"custom-properties",level:3}],s={toc:u};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"available-layouts"},"Available layouts"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"[","[Force Atlas 2]","]"),(0,n.kt)("li",{parentName:"ul"},"[","[Fruchterman-Reingold]","]"),(0,n.kt)("li",{parentName:"ul"},"[","[OpenOrd]","]"),(0,n.kt)("li",{parentName:"ul"},"[","[YifanHu Multilevel]","]")),(0,n.kt)("h2",{id:"create-a-new-layout"},"Create a new Layout"),(0,n.kt)("p",null,"This How To shows how to create a new layout algorithm in Gephi."),(0,n.kt)("p",null,"Please look at [","[Plugin Quick Start]","] to know how to create a new Netbeans Module. When you have your plugin module, that we will call ",(0,n.kt)("em",{parentName:"p"},"MyLayout"),", you can start this tutorial."),(0,n.kt)("h3",{id:"set-dependencies"},"Set Dependencies"),(0,n.kt)("p",null,"Add ",(0,n.kt)("inlineCode",{parentName:"p"},"LayoutAPI"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"GraphAPI")," (",(0,n.kt)("inlineCode",{parentName:"p"},"UtilitiesAPI")," for ",(0,n.kt)("inlineCode",{parentName:"p"},"@ServiceProvider")," see below and ",(0,n.kt)("inlineCode",{parentName:"p"},"LookupAPI")," since it's almost always useful) modules as dependencies for your plugin module ",(0,n.kt)("em",{parentName:"p"},"MyLayout"),". See [","[How To Set Module Dependencies]","]."),(0,n.kt)("h3",{id:"create-layoutbuilder"},"Create LayoutBuilder"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Layout Builder provides information about the layout algorithm and is responsible for creating your Layout algorithm instances. All Layout algorithms should have their own builder."),(0,n.kt)("li",{parentName:"ul"},"Create a new builder class, for instance ",(0,n.kt)("em",{parentName:"li"},"MyLayoutBuilder")," that implements ",(0,n.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/layout/spi/LayoutBuilder.html"},(0,n.kt)("inlineCode",{parentName:"a"},"LayoutBuilder")),"."),(0,n.kt)("li",{parentName:"ul"},"The builder interface is requesting a ",(0,n.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/layout/spi/LayoutUI.html"},(0,n.kt)("inlineCode",{parentName:"a"},"LayoutUI"))," object. Create an inner or anonymous class that implements ",(0,n.kt)("inlineCode",{parentName:"li"},"LayoutUI"),"."),(0,n.kt)("li",{parentName:"ul"},"Add ",(0,n.kt)("inlineCode",{parentName:"li"},"@ServiceProvider")," annotation to your builder class. Add the following line before ",(0,n.kt)("em",{parentName:"li"},"MyLayoutBuilder")," class definition, as shown below:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},"import org.openide.util.lookup.ServiceProvider;\n \n@ServiceProvider(service = LayoutBuilder.class)\npublic class MyLayoutBuilder implements LayoutBuilder {\n...\n")),(0,n.kt)("h3",{id:"create-layout"},"Create Layout"),(0,n.kt)("p",null,"Create a new class that implements ",(0,n.kt)("a",{parentName:"p",href:"http://gephi.org/docs/api/org/gephi/layout/spi/Layout.html"},(0,n.kt)("inlineCode",{parentName:"a"},"Layout")),". This is the place the algorithm belongs."),(0,n.kt)("p",null,"Methods ",(0,n.kt)("inlineCode",{parentName:"p"},"canAlgo()"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"initAlgo()"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"goAlgo()")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"endAlgo()")," are the logic of the algorithm. But the algorithm is manipulating a graph, so where is this graph? The graph can be get from the ",(0,n.kt)("inlineCode",{parentName:"p"},"GraphModel"),", which is injected through the ",(0,n.kt)("inlineCode",{parentName:"p"},"setGraphModel()")," method (fill ",(0,n.kt)("inlineCode",{parentName:"p"},"setGraphModel()")," with ",(0,n.kt)("inlineCode",{parentName:"p"},"this.graphModel = graphModel;"),"). The system always sets this graph model before ",(0,n.kt)("inlineCode",{parentName:"p"},"initAlgo()")," is called."),(0,n.kt)("p",null,"Add the graph model as a new private field of your class.\nIn your ",(0,n.kt)("inlineCode",{parentName:"p"},"goAlgo()")," method, add the following code to get the current visible graph:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},"graph = graphModel.getHierarchicalGraphVisible();\n")),(0,n.kt)("h3",{id:"properties"},"Properties"),(0,n.kt)("p",null,"Your algorithm may have settings and properties that users may control. To be visible and editable in the Layout UI, properties need to be properly defined."),(0,n.kt)("p",null,"Let's say you have a float speed parameter that you want to expose. That is how to create the appropriate LayoutPropery:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},'LayoutProperty mySpeedProperty = LayoutProperty.createProperty(\n    this, \n    Float.class,\n    "Speed"\n    "Category",\n    "A short description what is this propery doing and how users may modify it",\n    "getSpeed", \n    "setSpeed");\n')),(0,n.kt)("p",null,"Note that you need to create proper getter and setter for each property you want to expose."),(0,n.kt)("h2",{id:"advanced-concepts"},"Advanced concepts"),(0,n.kt)("h3",{id:"layout-data"},"Layout Data"),(0,n.kt)("p",null,"A special mechanism is available if you need to store temporary objects in nodes. In the following example, we will create a new type of layout data which stores a dx and dy value."),(0,n.kt)("p",null,"Create a new ",(0,n.kt)("em",{parentName:"p"},"MyLayoutData")," class that implements ",(0,n.kt)("a",{parentName:"p",href:"http://gephi.org/docs/api/org/gephi/graph/spi/LayoutData.html"},(0,n.kt)("inlineCode",{parentName:"a"},"LayoutData"))," and add two floats dx and dy.\nHow to init? Place the following code at the beginning of ",(0,n.kt)("inlineCode",{parentName:"p"},"goAlgo()"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},"for (Node n : nodes) {\n   if (n.getNodeData().getLayoutData() == null || !(n.getNodeData().getLayoutData() instanceof MyLayoutData)) {\n      n.getNodeData().setLayoutData(new MyLayoutData());\n   }\n}\n")),(0,n.kt)("p",null,"That ensure you have a layout data object for each of your nodes."),(0,n.kt)("h3",{id:"custom-properties"},"Custom properties"),(0,n.kt)("p",null,"Properties can be basic types like Boolean, Float etc. If you want to expose custom types, for instance date, you can provide a ",(0,n.kt)("inlineCode",{parentName:"p"},"PropertyEditor")," class when building the property."),(0,n.kt)("p",null,"Note that a custom ",(0,n.kt)("inlineCode",{parentName:"p"},"PropertyEditor")," class has been created for ",(0,n.kt)("inlineCode",{parentName:"p"},"AttributeColumn")," in the ",(0,n.kt)("inlineCode",{parentName:"p"},"AttributeColumnPropertyEditor")," module. Add this module as a new dependency."))}d.isMDXComponent=!0}}]);