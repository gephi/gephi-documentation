"use strict";(self.webpackChunkgephi_documentation=self.webpackChunkgephi_documentation||[]).push([[956],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>c});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=s(r),c=a,h=m["".concat(p,".").concat(c)]||m[c]||u[c]||i;return r?n.createElement(h,o(o({ref:t},d),{},{components:r})):n.createElement(h,o({ref:t},d))}));function c(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6969:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const i={id:"preview-renderer",title:"Preview renderer",sidebar_position:11},o=void 0,l={unversionedId:"Plugins/preview-renderer",id:"Plugins/preview-renderer",title:"Preview renderer",description:"Introduction",source:"@site/docs/Plugins/Preview_renderer.md",sourceDirName:"Plugins",slug:"/Plugins/preview-renderer",permalink:"/Plugins/preview-renderer",draft:!1,editUrl:"https://github.com/gephi/gephi-documentation/docs/docs/Plugins/Preview_renderer.md",tags:[],version:"current",sidebarPosition:11,frontMatter:{id:"preview-renderer",title:"Preview renderer",sidebar_position:11},sidebar:"tutorialSidebar",previous:{title:"Extend Data Laboratory",permalink:"/Plugins/Extend_Data_Laboratory"},next:{title:"Add a module panel",permalink:"/Plugins/Add_a_module_panel"}},p={},s=[{value:"Introduction",id:"introduction",level:2},{value:"How renderers work",id:"how-renderers-work",level:3},{value:"Create a new Renderer",id:"create-a-new-renderer",level:2},{value:"Set Dependencies",id:"set-dependencies",level:3},{value:"Create new Renderer",id:"create-new-renderer",level:3},{value:"Implement the <code>isRendererForItem</code>",id:"implement-the-isrendererforitem",level:3},{value:"Implement <code>getProperties</code>",id:"implement-getproperties",level:3},{value:"Implement render",id:"implement-render",level:3},{value:"Overwrite an existing renderer",id:"overwrite-an-existing-renderer",level:2},{value:"Appendix",id:"appendix",level:2},{value:"Custom properties",id:"custom-properties",level:3},{value:"Complex pre-process",id:"complex-pre-process",level:3},{value:"How to read all items of a particular type",id:"how-to-read-all-items-of-a-particular-type",level:3},{value:"How to use constants and data generated in pre-process",id:"how-to-use-constants-and-data-generated-in-pre-process",level:3},{value:"Default item data",id:"default-item-data",level:3}],d={toc:s};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,"Preview is a highly customizable module and plug-ins can implements new renderers to display additional elements on screen, for instance hulls for groups. It's also possible to overwrite existing renderers and replace node or edge aspect."),(0,a.kt)("p",null,"Please look at [","[Plugin Quick Start]","] to know how to create a new Netbeans Module. When you have your plugin module, that we will call ",(0,a.kt)("strong",{parentName:"p"},"MyRenderer"),", you can start this tutorial."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"One can find renderers examples in the ",(0,a.kt)("a",{parentName:"strong",href:"https://github.com/gephi/gephi/tree/master/modules/PreviewPlugin"},"PreviewPlugin")," module.")),(0,a.kt)("h3",{id:"how-renderers-work"},"How renderers work"),(0,a.kt)("p",null,"Renderers describe how a particular item is rendered and has the code to dray on a rendering target (Processing, SVG or PDF). Items are for example the node or edges of the graph and are given to renderers to be drawn. Each item (e.g. node, edge) should have it's renderer."),(0,a.kt)("p",null,"Rendering is a three-steps process:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"First the ",(0,a.kt)("inlineCode",{parentName:"li"},"preProcess()")," method is called on all renderers to let them initialize additional attributes for their items. The best example is the edge renderer which will initialize the source and target position in the ",(0,a.kt)("inlineCode",{parentName:"li"},"EdgeItem")," object during this phase. In general the ",(0,a.kt)("inlineCode",{parentName:"li"},"preProcess()")," method is the best for complex algorithms or gathering data from other items. Note that the ",(0,a.kt)("inlineCode",{parentName:"li"},"preProcess()")," method is called only once per refresh, unlike ",(0,a.kt)("inlineCode",{parentName:"li"},"render()")," which is called many times."),(0,a.kt)("li",{parentName:"ol"},"The ",(0,a.kt)("inlineCode",{parentName:"li"},"isRendererForitem()")," is then used to determine which renderer should be used to render an item. The method provides an access to the preview properties. For instance, if the properties says the edge display is disabled, the edge renderer should return false for every item. Note that nothing avoids several renderer to returns true for the same item."),(0,a.kt)("li",{parentName:"ol"},"The ",(0,a.kt)("inlineCode",{parentName:"li"},"render()")," method is finally called for every item which the renderer returned ",(0,a.kt)("inlineCode",{parentName:"li"},"true")," at ",(0,a.kt)("inlineCode",{parentName:"li"},"isRendererForitem()"),". It receives the properties and the render target. It uses the item attributes and properties to determine item aspects and the render target to obtain the canvas.")),(0,a.kt)("p",null,"If you want to create your own ",(0,a.kt)("inlineCode",{parentName:"p"},"Item")," look at [","[HowTo add a preview item]","]"),(0,a.kt)("h2",{id:"create-a-new-renderer"},"Create a new Renderer"),(0,a.kt)("h3",{id:"set-dependencies"},"Set Dependencies"),(0,a.kt)("p",null,"Add Preview API, Processing Wrapper, iText Wrapper and Lookup modules as dependencies for your plugin module. See [","[How To Set Module Dependencies]","]."),(0,a.kt)("h3",{id:"create-new-renderer"},"Create new Renderer"),(0,a.kt)("p",null,"Create a new renderer ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"MyRenderer"))," class, which implements ",(0,a.kt)("inlineCode",{parentName:"p"},"Renderer"),"."),(0,a.kt)("p",null,"Add ",(0,a.kt)("inlineCode",{parentName:"p"},"@ServiceProvider")," annotation to your renderer class, so it is detected by the system."),(0,a.kt)("p",null,"Here is how it should look like:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"@ServiceProvider(service = Renderer.class)\npublic class MyRenderer implements Renderer {\n \n    public String getDisplayName(){\n        //return user friendly name for the renderer\n    }\n \n    public void preProcess(PreviewModel previewModel) {\n        //TODO\n    }\n \n    public void render(Item item, RenderTarget target, PreviewProperties properties) {\n        //TODO\n    }\n \n    public PreviewProperty[] getProperties() {\n        //TODO\n    }\n \n    public boolean isRendererForitem(Item item, PreviewProperties properties) {\n        //TODO\n    }\n \n    public boolean needsItemBuilder(ItemBuilder itemBuilder, PreviewProperties properties) {\n        //TODO\n    }\n}\n")),(0,a.kt)("h3",{id:"implement-the-isrendererforitem"},"Implement the ",(0,a.kt)("inlineCode",{parentName:"h3"},"isRendererForItem")),(0,a.kt)("p",null,"Each item returns a different value for its ",(0,a.kt)("inlineCode",{parentName:"p"},"getType()")," method so it's easy to know if the item is a node, an edge or a label."),(0,a.kt)("p",null,"The method also receives the current properties and can query values."),(0,a.kt)("p",null,"Here is the code from the edge arrow renderer that only works when items are non-directed edges:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"public boolean isRendererForitem(Item item, PreviewProperties properties) {\n    return item.getType().equals(Item.EDGE) && properties.getBooleanValue(PreviewProperty.DIRECTED)\n                && (Boolean) item.getData(EdgeItem.DIRECTED);\n}\n")),(0,a.kt)("h3",{id:"implement-getproperties"},"Implement ",(0,a.kt)("inlineCode",{parentName:"h3"},"getProperties")),(0,a.kt)("p",null,"You can add your own properties attached to the renderer. Typically each renderer has its own properties. For instance the node renderer has border size or color as properties. Once defined a property will be shawn to the user who can change its value."),(0,a.kt)("p",null,"Properties have a identifier, a display name, a description and a type. It's important to have a unique identifier to each property. Be sure to choose something not already taken."),(0,a.kt)("p",null,"Properties are displayed in categories. You can either set an existing category or define a new one. Existing categories are ",(0,a.kt)("inlineCode",{parentName:"p"},"PreviewProperty.CATEGORY_NODES"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"PreviewProperty.CATEGORY_EDGES"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"PreviewProperty.CATEGORY_NODE_LABELS"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"PreviewProperty.CATEGORY_EDGE_LABELS")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"PreviewProperty.CATEGORY_EDGE_ARROWS"),"."),(0,a.kt)("p",null,"Here is how to create a property ",(0,a.kt)("inlineCode",{parentName:"p"},'"Border width"'),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},'public PreviewProperty[] getProperties() {\n    return new PreviewProperty[]{\n                    PreviewProperty.createProperty(this, "border_width", Float.class,\n                    "Border width",\n                    "",\n                    PreviewProperty.CATEGORY_NODES).setValue(1f)};\n}\n')),(0,a.kt)("p",null,"Properties should have a default value. It is set at the creation of the property simply by calling ",(0,a.kt)("inlineCode",{parentName:"p"},"setValue()"),". "),(0,a.kt)("h3",{id:"implement-render"},"Implement render"),(0,a.kt)("p",null,"The render method receives an item and draw it to a render target. There is three possible render targets:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/preview/api/ProcessingTarget.html"},"Processing")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/preview/api/SVGTarget.html"},"SVG")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/preview/api/PDFTarget.html"},"PDF"))),(0,a.kt)("p",null,"Renderers should implement the drawing routines for the three targets. One might ask why the same code has to be duplicated in three different ways. Unfortunately there is no unified drawing toolkit flexible and efficient enough to support this task at this point. The good news is that renderers have total control on what is drawn. It's verbose but flexible."),(0,a.kt)("p",null,"When the target is Processing, renderers obtain the ",(0,a.kt)("a",{parentName:"p",href:"http://processing.googlecode.com/svn/trunk/processing/build/javadoc/core/index.html?processing/core/PGraphicsJava2D.html"},"PGraphicsJava2D")," object. For the SVG target, renderers obtain Batik's ",(0,a.kt)("a",{parentName:"p",href:"http://xmlgraphics.apache.org/batik/using/dom-api.html"},"Document")," instance. As the PDF target rely on the iText library renderers obtain the ",(0,a.kt)("a",{parentName:"p",href:"http://api.itextpdf.com/itext/index.html?com/itextpdf/text/pdf/PdfContentByte.html"},"PdfContentByte")," object."),(0,a.kt)("p",null,"Example how to handle the three targets in render:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},'public void render(Item item, RenderTarget target, PreviewProperties properties) {\n    if (target instanceof ProcessingTarget) {\n        renderProcessing(item, (ProcessingTarget) target, properties);\n    } else if (target instanceof SVGTarget) {\n        renderSVG(item, (SVGTarget) target, properties);\n    } else if (target instanceof PDFTarget) {\n        renderPDF(item, (PDFTarget) target, properties);\n    }\n}\n \npublic void renderProcessing(Item item, ProcessingTarget target, PreviewProperties properties) {\n    PGraphics graphics = target.getGraphics();\n    ...\n}\n \npublic void renderPDF(Item item, PDFTarget target, PreviewProperties properties) {\n    PdfContentByte cb = target.getContentByte();\n    ...\n}\n \npublic void renderSVG(Item item, SVGTarget target, PreviewProperties properties) {\n    Element elem = target.createElement("circle");\n    ...\n    target.getTopElement("nodes").appendChild(elem);\n}\n')),(0,a.kt)("p",null,"Look at renderers examples in the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/gephi/gephi/tree/master/modules/PreviewPlugin"},"PreviewPlugin")," module."),(0,a.kt)("h2",{id:"overwrite-an-existing-renderer"},"Overwrite an existing renderer"),(0,a.kt)("p",null,"The default renderers can be overridden or extended.\nExtend or replace an existing renderer"),(0,a.kt)("p",null,"To extend or completely replace a default Renderer by your own implementation, create a new Renderer and set the annotation like below. In addition add [","[Preview Plugin]","] module as a dependency."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"@ServiceProvider(service=Renderer.class, position=XXX) public class MyRenderer extends NodeRenderer")),(0,a.kt)("p",null,"Being XXX the new position of the renderer Then you can reuse parts of the base class or just override them."),(0,a.kt)("p",null,"Default renderers are:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"org.gephi.preview.plugin.renderers.NodeRenderer")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"org.gephi.preview.plugin.renderers.EdgeRenderer")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"org.gephi.preview.plugin.renderers.NodeLabelRenderer")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"org.gephi.preview.plugin.renderers.EdgeLabelRenderer")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"org.gephi.preview.plugin.renderers.ArrowRenderer"))),(0,a.kt)("h2",{id:"appendix"},"Appendix"),(0,a.kt)("h3",{id:"custom-properties"},"Custom properties"),(0,a.kt)("p",null,"Properties are usually default Java primitives like ",(0,a.kt)("inlineCode",{parentName:"p"},"Float")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"Color"),". Custom property types can be used if a valid property editor is defined. Property editors define how a property value should be serialized and provide a custom UI to let the user modify the value. For instance to define a new property type ",(0,a.kt)("inlineCode",{parentName:"p"},"NumberRange")," one could create a UI with two text fields to enter number ranges."),(0,a.kt)("p",null,"Create the new type class and then create a new property editor:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"public class NumberRangePropertyEditor extends java.beans.PropertyEditorSupport {\n        @Override\n        public Component getCustomEditor() {\n                //TODO returns custom JPanel\n        }\n \n        @Override\n        public String getAsText() {\n                //TODO returns the value as string\n        }\n \n        @Override\n        public void setAsText(String text) {\n                //TODO set value from the text\n        }\n \n        @Override\n        public boolean supportsCustomEditor() {\n                return true;\n        }\n}\n")),(0,a.kt)("p",null,"One can find property editors examples in the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/gephi/gephi/tree/master/modules/DesktopPreview"},"DesktopPreview")," module."),(0,a.kt)("h3",{id:"complex-pre-process"},"Complex pre-process"),(0,a.kt)("p",null,"In each renderer the ",(0,a.kt)("inlineCode",{parentName:"p"},"preProcess()")," method allows to access all preview data and execute complex algorithms."),(0,a.kt)("h3",{id:"how-to-read-all-items-of-a-particular-type"},"How to read all items of a particular type"),(0,a.kt)("p",null,"Simply by querying the preview model:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"Item[] edgeItems = previewModel.getItems(Item.EDGE);\n")),(0,a.kt)("h3",{id:"how-to-use-constants-and-data-generated-in-pre-process"},"How to use constants and data generated in pre-process"),(0,a.kt)("p",null,"Renderers should remain ",(0,a.kt)("strong",{parentName:"p"},"stateless"),". That means one shouldn't define any variable or fields in the renderer class itself. Instead all data can be put in the property system."),(0,a.kt)("p",null,"Here is an example how to calculate the min and max edge weight in the ",(0,a.kt)("inlineCode",{parentName:"p"},"preProcess()")," and use it in ",(0,a.kt)("inlineCode",{parentName:"p"},"render()"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},'public void preProcess(PreviewModel previewModel) {\n    PreviewProperties properties = previewModel.getProperties();\n    Item[] edgeItems = previewModel.getItems(Item.EDGE);\n \n    for (Item edge : edgeItems) {\n        minWeight = Math.min(minWeight, (Float) edge.getData(EdgeItem.WEIGHT));\n        maxWeight = Math.max(maxWeight, (Float) edge.getData(EdgeItem.WEIGHT));\n    }\n    properties.putValue("weight.min", minWeight);\n    properties.putValue("weight.max", maxWeight);\n}\n \npublic void render(Item item, RenderTarget target, PreviewProperties properties) {\n    float minWeight = properties.getFloatValue("weight.min");\n    float maxWeight = properties.getFloatValue("weight.max");\n    ...\n}\n')),(0,a.kt)("p",null,"For additional data generated per item, simply call ",(0,a.kt)("inlineCode",{parentName:"p"},"item.setData()"),"."),(0,a.kt)("h3",{id:"default-item-data"},"Default item data"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Node")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"x (float)"),(0,a.kt)("li",{parentName:"ul"},"y (float)"),(0,a.kt)("li",{parentName:"ul"},"size (float)"),(0,a.kt)("li",{parentName:"ul"},"color (color)")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Edge")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"weight (float)"),(0,a.kt)("li",{parentName:"ul"},"directed (boolean)"),(0,a.kt)("li",{parentName:"ul"},"mutual (boolean)"),(0,a.kt)("li",{parentName:"ul"},"self_loop (boolean)"),(0,a.kt)("li",{parentName:"ul"},"meta_edge (boolean)"),(0,a.kt)("li",{parentName:"ul"},"color (color)")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Node Label")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"label (string)"),(0,a.kt)("li",{parentName:"ul"},"color (color)"),(0,a.kt)("li",{parentName:"ul"},"size (float)"),(0,a.kt)("li",{parentName:"ul"},"width (float)"),(0,a.kt)("li",{parentName:"ul"},"height (float)"),(0,a.kt)("li",{parentName:"ul"},"visible (boolean)")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Edge Labels")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"label (string)"),(0,a.kt)("li",{parentName:"ul"},"color (color)"),(0,a.kt)("li",{parentName:"ul"},"size (float)"),(0,a.kt)("li",{parentName:"ul"},"width (float)"),(0,a.kt)("li",{parentName:"ul"},"height (float)"),(0,a.kt)("li",{parentName:"ul"},"visible (boolean)")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Edges have additional data set by the default edge renderer:")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"source (nodeitem)"),(0,a.kt)("li",{parentName:"ul"},"target (nodeitem)")))}u.isMDXComponent=!0}}]);