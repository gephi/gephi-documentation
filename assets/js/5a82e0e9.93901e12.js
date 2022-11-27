"use strict";(self.webpackChunkgephi_documentation=self.webpackChunkgephi_documentation||[]).push([[1579],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,g=d["".concat(o,".").concat(m)]||d[m]||u[m]||r;return n?a.createElement(g,l(l({ref:t},c),{},{components:n})):a.createElement(g,l({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=d;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:i,l[1]=s;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4584:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const r={id:"statistics",title:"Statistics",sidebar_position:4},l=void 0,s={unversionedId:"Plugins/statistics",id:"Plugins/statistics",title:"Statistics",description:"Available statistics",source:"@site/docs/Plugins/Statistics.md",sourceDirName:"Plugins",slug:"/Plugins/statistics",permalink:"/Plugins/statistics",draft:!1,editUrl:"https://github.com/gephi/gephi-documentation/docs/docs/Plugins/Statistics.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"statistics",title:"Statistics",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Layout",permalink:"/Plugins/layout"},next:{title:"Import",permalink:"/Plugins/import"}},o={},p=[{value:"Available statistics",id:"available-statistics",level:2},{value:"Create a new Metric",id:"create-a-new-metric",level:2},{value:"Set Dependencies",id:"set-dependencies",level:3},{value:"Create StatisticsBuilder",id:"create-statisticsbuilder",level:3},{value:"Create Statistics",id:"create-statistics",level:3},{value:"Set LongTask",id:"set-longtask",level:3},{value:"Create StatisticsUI",id:"create-statisticsui",level:3},{value:"Implementation help",id:"implementation-help",level:2},{value:"Use Progress",id:"use-progress",level:3},{value:"Lock your algorithm",id:"lock-your-algorithm",level:3},{value:"Write results for each node/edge",id:"write-results-for-each-nodeedge",level:3},{value:"Sample",id:"sample",level:3}],c={toc:p};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"available-statistics"},"Available statistics"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"[","[Average Clustering Coefficient]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Average Path Length]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Betweenness Centrality]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Closeness Centrality]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Connected Components]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Degree]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Degree Power Law]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Diameter]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Eigenvector Centrality]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Graph Density]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[HITS]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[Modularity]","]"),(0,i.kt)("li",{parentName:"ul"},"[","[PageRank]","]")),(0,i.kt)("h2",{id:"create-a-new-metric"},"Create a new Metric"),(0,i.kt)("p",null,"This HowTo shows how to create a new statistic/metric algorithm in Gephi."),(0,i.kt)("p",null,"Please look at [","[Plugin Quick Start]","] to know how to create a new Netbeans Module. When you have your plugin module, that we will call ",(0,i.kt)("em",{parentName:"p"},"MyMetric"),", you can start this tutorial."),(0,i.kt)("h3",{id:"set-dependencies"},"Set Dependencies"),(0,i.kt)("p",null,"Add ",(0,i.kt)("inlineCode",{parentName:"p"},"StatisticsAPI"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphAPI")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"AttributesAPI")," modules as dependencies for your plugin module ",(0,i.kt)("em",{parentName:"p"},"MyMetric"),". See [","[How To Set Module Dependencies]","]. Also add ",(0,i.kt)("inlineCode",{parentName:"p"},"LongTaskAPI")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Lookup"),", which will be used."),(0,i.kt)("h3",{id:"create-statisticsbuilder"},"Create StatisticsBuilder"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Statistics Builder provides information about the metric algorithm and is responsible for creating your Statistics algorithm instances. All metric algorithms should have their own builder."),(0,i.kt)("li",{parentName:"ul"},"Create a new builder class, for instance ",(0,i.kt)("inlineCode",{parentName:"li"},"MyMetricBuilder")," that implements ",(0,i.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/statistics/spi/StatisticsBuilder.html"},(0,i.kt)("inlineCode",{parentName:"a"},"StatisticsBuilder")),"."),(0,i.kt)("li",{parentName:"ul"},"Fill ",(0,i.kt)("inlineCode",{parentName:"li"},"getName()")," method by returning a display name like ",(0,i.kt)("em",{parentName:"li"},"My Metric"),". Leaves other methods untouched for the moment."),(0,i.kt)("li",{parentName:"ul"},"Add ",(0,i.kt)("inlineCode",{parentName:"li"},"@ServiceProvider")," annotation to your builder class. Add the following line before ",(0,i.kt)("em",{parentName:"li"},"MyMetricBuilder")," class definition, as shown below:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"@ServiceProvider(service = StatisticsBuilder.class)\npublic class MyMetricBuilder implements StatisticsBuilder {\n...\n")),(0,i.kt)("h3",{id:"create-statistics"},"Create Statistics"),(0,i.kt)("p",null,"Create a new class that implements ",(0,i.kt)("a",{parentName:"p",href:"http://gephi.org/docs/api/org/gephi/statistics/spi/Statistics.html"},(0,i.kt)("inlineCode",{parentName:"a"},"Statistics"))," and name it ",(0,i.kt)("em",{parentName:"p"},"MyMetric"),". This is the place the algorithm belongs.\nLocate the ",(0,i.kt)("inlineCode",{parentName:"p"},"execute()")," method, you will add your code here. The ",(0,i.kt)("inlineCode",{parentName:"p"},"getReport()")," method should return plain text or HTML text that describe the algorithm execution. Create a new field"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},' private String report = "";')),(0,i.kt)("p",null,"and return report in ",(0,i.kt)("inlineCode",{parentName:"p"},"getReport()"),". That done, go back to ",(0,i.kt)("inlineCode",{parentName:"p"},"StatisticsBuilder")," and fill remaining methods like above:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"public Statistics getStatistics() {\n    return new MyMetric();\n}\n\npublic Class<? extends Statistics> getStatisticsClass() {\n    return MyMetric.class;\n}\n")),(0,i.kt)("p",null,"Details about how to use ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphModel")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"AttributeModel")," are said in the next section."),(0,i.kt)("h3",{id:"set-longtask"},"Set LongTask"),(0,i.kt)("p",null,"To let your algorithm task be cancelled and its progress watched, implement ",(0,i.kt)("inlineCode",{parentName:"p"},"LongTask")," interface on ",(0,i.kt)("em",{parentName:"p"},"MyMetric"),".\nAdd two fields:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"private boolean cancel = false;\nprivate ProgressTicket progressTicket;\n")),(0,i.kt)("p",null,"and implement new methods:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"public boolean cancel() {\n    cancel = true;\n    return true;\n}\n\npublic void setProgressTicket(ProgressTicket progressTicket) {\n    this.progressTicket = progressTicket;\n}\n")),(0,i.kt)("p",null,"Use the cancel field to terminate your algorithm execution properly and return from ",(0,i.kt)("inlineCode",{parentName:"p"},"execute()"),".\nSee [","[HowTo use Progress]","] for more details."),(0,i.kt)("h3",{id:"create-statisticsui"},"Create StatisticsUI"),(0,i.kt)("p",null,"Create a new class that implements ",(0,i.kt)("inlineCode",{parentName:"p"},"StatisticsUI")," and name it ",(0,i.kt)("em",{parentName:"p"},"MyMetricUI"),". The user interfaces is defined here and allows to be automatically added to the ",(0,i.kt)("inlineCode",{parentName:"p"},"Statistics")," module in Gephi.\nAdd ",(0,i.kt)("inlineCode",{parentName:"p"},"@ServiceProvider")," annotation to your UI class. Add the following line before ",(0,i.kt)("em",{parentName:"p"},"MyMetricUI")," class definition, as shown below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"@ServiceProvider(service = StatisticsUI.class)\npublic class MyMetricUI implements StatisticsUI{\n...\n")),(0,i.kt)("p",null,"First implement description method:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'public String getDisplayName() {\n    return "My Metric";\n}\n\npublic String getCategory() {\n    return StatisticsUI.CATEGORY_NETWORK_OVERVIEW;\n}\n\npublic int getPosition() {\n    return 800;\n}\n \n public Class<? extends Statistics> getStatisticsClass() {\n   return MyMetric.class;\n }\n')),(0,i.kt)("p",null,"The category is just where you want your metric to be displayed: ",(0,i.kt)("strong",{parentName:"p"},"NODE"),", ",(0,i.kt)("strong",{parentName:"p"},"EDGE")," or ",(0,i.kt)("strong",{parentName:"p"},"NETWORK"),". The position control the order the metric front-end are displayed. Returns a value between 1 and 1000, that indicates the position. Less means upper."),(0,i.kt)("p",null,"Now create a new JPanel for your metric settings panel. Name it ",(0,i.kt)("em",{parentName:"p"},"MyMetricPanel"),". Add setters and getters for all properties users can edit. Let's say the panel gives the choice on the graph type and has ",(0,i.kt)("inlineCode",{parentName:"p"},"isDirected()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"setDirected()")," methods."),(0,i.kt)("p",null,"Now the ",(0,i.kt)("inlineCode",{parentName:"p"},"setup()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"unsetup()")," are filled. It follow the injection pattern, an instance of ",(0,i.kt)("em",{parentName:"p"},"MyMetric")," is pushed to let the UI control it."),(0,i.kt)("p",null,"First add fields to store the current metric:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"private MyMetricPanel panel;\nprivate MyMetric myMetric;\n")),(0,i.kt)("p",null,"and fill ",(0,i.kt)("inlineCode",{parentName:"p"},"getSettingsPanel()"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"setup()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"unsetup()"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"public JPanel getSettingsPanel() {\n    panel = new MyMetricPanel();\n    return panel;\n}\n\npublic void setup(Statistics statistics) {\n    this.myMetric = (MyMetric) statistics;\n    if(panel!=null) {\n        panel.setDirected(myMetric.isDirected());\n    }\n}\n \npublic void unsetup() {\n    if(panel!=null) {\n        myMetric.setDirected(panel.isDirected());\n    }\n    panel = null;\n}\n")),(0,i.kt)("p",null,"The final step is the ",(0,i.kt)("inlineCode",{parentName:"p"},"getValue()"),", which returns the result value on the front-end. If your metric doesn't have a single result value, return ",(0,i.kt)("inlineCode",{parentName:"p"},"null"),"."),(0,i.kt)("h2",{id:"implementation-help"},"Implementation help"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"execute()")," method gives both ",(0,i.kt)("inlineCode",{parentName:"p"},"GraphModel")," for getting graph structure and AttributeModel to write results in new attribute columns."),(0,i.kt)("h3",{id:"use-progress"},"Use Progress"),(0,i.kt)("p",null,"If you know how many steps your algorithm is doing, for instance if your algorithm just reads nodes:"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Progress.start(progressTicket, graph.getNodeCount());")),(0,i.kt)("p",null,"and ",(0,i.kt)("inlineCode",{parentName:"p"},"Progress.progress(progressTicket)")," within the loop."),(0,i.kt)("h3",{id:"lock-your-algorithm"},"Lock your algorithm"),(0,i.kt)("p",null,"It's preferable to execute your algorithm in a read lock, in order no other thread can modify the graph while execution. Never return ",(0,i.kt)("inlineCode",{parentName:"p"},"execute()")," with a lock open, see ",(0,i.kt)("a",{parentName:"p",href:"http://gephi.org/docs/api/org/gephi/graph/api/Graph.html"},"Graph Locking")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"graph.readLock();\n//Your algorithm\ngraph.readUnlockAll();\n")),(0,i.kt)("h3",{id:"write-results-for-each-nodeedge"},"Write results for each node/edge"),(0,i.kt)("p",null,"It's easy, you create a new column and set row's value for each node. If you want to write an in-degree column, in ",(0,i.kt)("inlineCode",{parentName:"p"},"execute()"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'AttributeTable nodeTable = attributeModel.getNodeTable();\nAttributeColumn inCol = nodeTable.getColumn("indegree");\n \nif (inCol == null) {\n    inCol = nodeTable.addColumn("indegree", "In Degree", AttributeType.INT, AttributeOrigin.COMPUTED, 0);\n}\n \nfor (Node n : graph.getNodes()) {\n    AttributeRow row = (AttributeRow) n.getNodeData().getAttributes();\n    row.setValue(inCol, graph.getInDegree(n));\n}\n')),(0,i.kt)("h3",{id:"sample"},"Sample"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'public void execute(GraphModel graphModel, AttributeModel attributeModel) {\n    report += "Algorithm started ";\n    Graph graph = graphModel.getGraphVisible();\n    graph.readLock();\n\n    try {\n        Progress.start(progressTicket, graph.getNodeCount());\n\n        for (Node n : graph.getNodes()) {\n            //do something\n            Progress.progress(progressTicket);\n            if (cancel) {\n                break;\n            }\n        }\n        graph.readUnlockAll();\n    } catch (Exception e) {\n        e.printStackTrace();\n        //Unlock graph\n        graph.readUnlockAll();\n   }\n}\n')))}u.isMDXComponent=!0}}]);