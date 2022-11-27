"use strict";(self.webpackChunkgephi_documentation=self.webpackChunkgephi_documentation||[]).push([[3031],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>h});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=s(r),h=i,m=c["".concat(l,".").concat(h)]||c[h]||d[h]||a;return r?n.createElement(m,o(o({ref:t},u),{},{components:r})):n.createElement(m,o({ref:t},u))}));function h(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=c;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:i,o[1]=p;for(var s=2;s<a;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},9070:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>s});var n=r(7462),i=(r(7294),r(3905));const a={id:"export",title:"Export",sidebar_position:7},o=void 0,p={unversionedId:"Plugins/export",id:"Plugins/export",title:"Export",description:"This HowTo shows, in about 15 minutes how to create a new exporter in Gephi. Exporters export data from Gephi to various targets, like files or streams.",source:"@site/docs/Plugins/Export.md",sourceDirName:"Plugins",slug:"/Plugins/export",permalink:"/Plugins/export",draft:!1,editUrl:"https://github.com/gephi/gephi-documentation/docs/docs/Plugins/Export.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{id:"export",title:"Export",sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Spigot importer with Wizard",permalink:"/Plugins/Spigot_importer_with_Wizard"},next:{title:"Generator",permalink:"/Plugins/generator"}},l={},s=[{value:"Create a new Exporter",id:"create-a-new-exporter",level:2},{value:"Set Dependencies",id:"set-dependencies",level:3},{value:"Create Exporter Builder",id:"create-exporter-builder",level:3},{value:"Create Exporter",id:"create-exporter",level:3},{value:"Finish the builder",id:"finish-the-builder",level:3},{value:"With settings UI",id:"with-settings-ui",level:2},{value:"Create MyExporterUI",id:"create-myexporterui",level:3},{value:"Register the UI",id:"register-the-ui",level:3},{value:"Remember settings",id:"remember-settings",level:3}],u={toc:s};function d(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This HowTo shows, in about 15 minutes how to create a new exporter in Gephi. Exporters export data from Gephi to various targets, like files or streams."),(0,i.kt)("p",null,"Please look at [","[Plugin Quick Start]","] to know how to create a new Netbeans Module. When you have your plugin module, that we will call ",(0,i.kt)("em",{parentName:"p"},"MyExporter"),", you can start this tutorial."),(0,i.kt)("p",null,"One can find file exporter examples in the ",(0,i.kt)("inlineCode",{parentName:"p"},"ExportPlugin")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"PreviewExport")," modules."),(0,i.kt)("h2",{id:"create-a-new-exporter"},"Create a new Exporter"),(0,i.kt)("h3",{id:"set-dependencies"},"Set Dependencies"),(0,i.kt)("p",null,"Add ",(0,i.kt)("inlineCode",{parentName:"p"},"ExportAPI"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"ProjectAPI"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"Lookup")," modules as dependencies for your plugin module ",(0,i.kt)("em",{parentName:"p"},"MyExport"),". See [","[How To Set Module Dependencies]","]."),(0,i.kt)("h3",{id:"create-exporter-builder"},"Create Exporter Builder"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ExporterBuilder")," is a factory class for building the important instance, all Exporters should have their own builder.\nCreate a new builder ",(0,i.kt)("em",{parentName:"p"},"MyExporterBuilder")," class, which implements one of the following interface:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/io/exporter/spi/GraphFileExporterBuilder.html"},(0,i.kt)("inlineCode",{parentName:"a"},"GraphFileExporterBuilder"))," - For graph export (like GEXF, GraphML, CSV...)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/io/exporter/spi/VectorFileExporterBuilder.html"},(0,i.kt)("inlineCode",{parentName:"a"},"VectorFileExporterBuilder"))," - Vector graphics (like SVG, PDF, ...)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/io/exporter/spi/ExporterBuilder.html"},(0,i.kt)("inlineCode",{parentName:"a"},"ExportBuilder"))," - Anything else")),(0,i.kt)("p",null,"Let's say we create a exporter for a custom graph format with ",(0,i.kt)("em",{parentName:"p"},".foo")," extension, so we choose ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphFileExporterBuilder"),"."),(0,i.kt)("p",null,"Fill the ",(0,i.kt)("inlineCode",{parentName:"p"},"getFileTypes()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"getName()")," methods like below, for a single file format supported named ",(0,i.kt)("em",{parentName:"p"},"foo"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'public String getName() {\n   return "foo";\n}\n \npublic FileType[] getFileTypes() {\n   return new FileType[]{new FileType(".foo", "Foo files")};\n}\n')),(0,i.kt)("p",null,"Add ",(0,i.kt)("inlineCode",{parentName:"p"},"@ServiceProvider")," annotation to your builder class to declare you are implementing an ",(0,i.kt)("inlineCode",{parentName:"p"},"Exporter")," service. Add the following line before ",(0,i.kt)("em",{parentName:"p"},"MyExporterBuilder")," class definition, as shown below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"@ServiceProvider(service = GraphFileExporterBuilder.class)\npublic class MyExporterBuilder implements GraphFileExporterBuilder{\n...\n")),(0,i.kt)("p",null,"This annotation registers your implementation in the system, in order it can be discovered at runtime."),(0,i.kt)("p",null,"Put ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphFileExporterBuilder.class")," as the annotation service parameter for graph files, ",(0,i.kt)("inlineCode",{parentName:"p"},"VectorFileExporterBuilder.class")," for vector graphics and ",(0,i.kt)("inlineCode",{parentName:"p"},"ExportBuilder.class")," for the rest."),(0,i.kt)("h3",{id:"create-exporter"},"Create Exporter"),(0,i.kt)("p",null,"Create a new exporter class, which implements ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphExporter"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"VectorExporter")," or simply ",(0,i.kt)("inlineCode",{parentName:"p"},"Exporter"),", depending what you set for the builder."),(0,i.kt)("p",null,"The exporter is where the job is done, in its ",(0,i.kt)("inlineCode",{parentName:"p"},"execute()")," method. The main input object the export needs is the Workspace. In Gephi, data are stored within workspaces. It is the place the exporter will find what to export. Before being executed by the export controller, the exporter will receive the workspace and other parameters through setters methods."),(0,i.kt)("p",null,"Implement also ",(0,i.kt)("a",{parentName:"p",href:"http://gephi.org/docs/api/org/gephi/io/exporter/spi/ByteExporter.html"},(0,i.kt)("inlineCode",{parentName:"a"},"ByteExporter"))," interface for byte streams or ",(0,i.kt)("a",{parentName:"p",href:"http://gephi.org/docs/api/org/gephi/io/exporter/spi/CharacterExporter.html"},(0,i.kt)("inlineCode",{parentName:"a"},"CharacterExporter"))," for texts. These are the two ways you can output data in a exporter, either text (",(0,i.kt)("inlineCode",{parentName:"p"},"java.io.Writer"),") or byte (",(0,i.kt)("inlineCode",{parentName:"p"},"java.io.OutputStream"),"). Note that XML is text-based. So exporters are not specifically exporting to a file or a stream, they export to a Writer or an ",(0,i.kt)("inlineCode",{parentName:"p"},"OutputStream"),". The controller later decides what to do with it."),(0,i.kt)("p",null,"Add also ",(0,i.kt)("inlineCode",{parentName:"p"},"LongTask")," interface to your class, in order you will be able to use progress and cancel management. Add ",(0,i.kt)("inlineCode",{parentName:"p"},"LongTaskAPI")," as a dependency to profit from LongTask.\nYour exporter should now look like below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"public class MyExporter implements GraphExporter, CharacterExporter {\n \n    private boolean exportVisible = false;\n    private Workspace workspace;\n    private Writer writer;\n \n    @Override\n    public boolean execute() {\n        //Do the job\n    }\n \n    @Override\n    public void setWorkspace(Workspace workspace) {\n        this.workspace = workspace;\n    }\n \n    @Override\n    public Workspace getWorkspace() {\n        return workspace;\n    }\n \n    @Override\n    public void setWriter(Writer writer) {\n        this.writer = writer;\n    }\n \n     @Override\n    public void setExportVisible(boolean exportVisible) {\n        this.exportVisible = exportVisible;\n    }\n \n    @Override\n    public boolean isExportVisible() {\n        return exportVisible;\n    }\n}\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphExporter")," interface has an additional parameter: ",(0,i.kt)("inlineCode",{parentName:"p"},"exportVisible"),". It indicates if either the complete or only the visible graph should be exported. At any time the system keeps the complete graph in memory. When users use filtering, the visible graph is different, as some nodes/edges have been removed. Below is the way to retrieve the good graph with this parameter."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"public boolean execute() {\n   GraphModel graphModel = workspace.getLookup().lookup(GraphModel.class);\n   Graph graph = null;\n   if (exportVisible) {\n      graph = graphModel.getGraphVisible();\n   } else {\n      graph = graphModel.getGraph();\n   }\n   //Do the job\n}\n")),(0,i.kt)("h3",{id:"finish-the-builder"},"Finish the builder"),(0,i.kt)("p",null,"In the builder, return a new instance of your exporter in the ",(0,i.kt)("inlineCode",{parentName:"p"},"buildExporter()")," method."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"@Override\npublic GraphExporter buildExporter() {\n   return new MyExporter();\n}\n")),(0,i.kt)("h2",{id:"with-settings-ui"},"With settings UI"),(0,i.kt)("p",null,"You can create an ",(0,i.kt)("inlineCode",{parentName:"p"},"ExporterUI")," class for your exporter. It is not mandatory and the exporter will work normally with default settings."),(0,i.kt)("h3",{id:"create-myexporterui"},"Create MyExporterUI"),(0,i.kt)("p",null,"Create a new exporter UI class, for instance ",(0,i.kt)("em",{parentName:"p"},"MyExporterUI")," that implements ",(0,i.kt)("inlineCode",{parentName:"p"},"ExporterUI"),"."),(0,i.kt)("p",null,"Your UI class is responsible of providing the JPanel associated to your exporter and set settings value to your ",(0,i.kt)("em",{parentName:"p"},"MyExporter")," instance. The system will ask for a JPanel, show a setting dialog and then call ",(0,i.kt)("inlineCode",{parentName:"p"},"unsetup()"),". If users validate the settings panel by hitting OK, the ",(0,i.kt)("inlineCode",{parentName:"p"},"unsetup()")," method is called with update set as true and ask the UI to write the setting values.\nThe sample below will help you:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'public class MyExporterUI implements ExporterUI {\n \n   private JPanel panel;\n   private MyExporter exporter;\n \n   public void setup(Exporter exporter) {\n     this.exporter= (MyExporter)exporter;\n   }\n \n   public JPanel getPanel() {\n     panel = new JPanel();\n     return panel;\n   }\n \n   public void unsetup(boolean update) {\n     if(update) {\n        //The user clicked OK when closing settings\n     } else {\n        //Cancel was hit\n     }\n     panel = null;\n     exporter = null;\n   }\n \n   public String getDisplayName() {\n     return "Exporter Foo";\n   }\n \n   public boolean isUIForExporter(Exporter exporter) {\n     return exporter instanceof MyExporter;\n   }\n}\n')),(0,i.kt)("h3",{id:"register-the-ui"},"Register the UI"),(0,i.kt)("p",null,"Add ",(0,i.kt)("inlineCode",{parentName:"p"},"@ServiceProvider")," annotation to your UI class. Add the following line before ",(0,i.kt)("em",{parentName:"p"},"MyexporterUI")," class definition, as shown below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"@ServiceProvider(service = ExporterUI.class)\npublic class MyExporterUI implements ExporterUI{\n...\n")),(0,i.kt)("p",null,"Note that by doing this your class becomes a singleton."),(0,i.kt)("h3",{id:"remember-settings"},"Remember settings"),(0,i.kt)("p",null,"How to remember last settings set to the exporter, as each time a new export is made, a new instance of Exporter is created."),(0,i.kt)("p",null,"It is the ",(0,i.kt)("inlineCode",{parentName:"p"},"ExporterUI"),"'s role to remember settings. The only thing to do is load settings at ",(0,i.kt)("inlineCode",{parentName:"p"},"setup()")," and save settings at unsetup. Look at existing classes in the ",(0,i.kt)("inlineCode",{parentName:"p"},"ExporterPluginUI")," module to have an example."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"image",src:r(1821).Z,width:"597",height:"430"})))}d.isMDXComponent=!0},1821:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/00_image-190bbf83f8d3044278ec3f70d6848c5a.png"}}]);