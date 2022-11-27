"use strict";(self.webpackChunkgephi_documentation=self.webpackChunkgephi_documentation||[]).push([[3431],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>c});var i=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},a=Object.keys(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=i.createContext({}),p=function(e){var t=i.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},h=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),h=p(r),c=n,g=h["".concat(s,".").concat(c)]||h[c]||u[c]||a;return r?i.createElement(g,l(l({ref:t},d),{},{components:r})):i.createElement(g,l({ref:t},d))}));function c(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,l=new Array(a);l[0]=h;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var p=2;p<a;p++)l[p]=r[p];return i.createElement.apply(null,l)}return i.createElement.apply(null,r)}h.displayName="MDXCreateElement"},5852:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var i=r(7462),n=(r(7294),r(3905));const a={id:"filter",title:"Filter",sidebar_position:9},l=void 0,o={unversionedId:"Plugins/filter",id:"Plugins/filter",title:"Filter",description:"Filters are pruning the graph by keeping only nodes and edges that satisfies filters conditions. They are either predicates or functions that reduce the graph, predicates are easy and return only true or false, whereas functions input a graph and output a graph.",source:"@site/docs/Plugins/Filter.md",sourceDirName:"Plugins",slug:"/Plugins/filter",permalink:"/Plugins/filter",draft:!1,editUrl:"https://github.com/gephi/gephi-documentation/docs/docs/Plugins/Filter.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{id:"filter",title:"Filter",sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"Generator",permalink:"/Plugins/generator"},next:{title:"Extend Data Laboratory",permalink:"/Plugins/Extend_Data_Laboratory"}},s={},p=[{value:"How filtering works in Gephi",id:"how-filtering-works-in-gephi",level:2},{value:"Create a new Filter",id:"create-a-new-filter",level:2},{value:"Set Dependencies",id:"set-dependencies",level:3},{value:"Create FilterBuilder",id:"create-filterbuilder",level:3},{value:"Create Filter",id:"create-filter",level:3},{value:"NodeFilter",id:"nodefilter",level:4},{value:"ComplexFilter",id:"complexfilter",level:4},{value:"Finish the builder",id:"finish-the-builder",level:3},{value:"Properties",id:"properties",level:3},{value:"Provide a UI",id:"provide-a-ui",level:3},{value:"Appendix",id:"appendix",level:2},{value:"Create a CategoryBuilder",id:"create-a-categorybuilder",level:3},{value:"Provide an icon",id:"provide-an-icon",level:3},{value:"Custom Properties",id:"custom-properties",level:3}],d={toc:p};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,i.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Filters are pruning the graph by keeping only nodes and edges that satisfies filters conditions. They are either predicates or functions that reduce the graph, predicates are easy and return only true or false, whereas functions input a graph and output a graph."),(0,n.kt)("p",null,"Please look at [","[Plugin Quick Start]","] to know how to create a new Netbeans Module. When you have your plugin module, that we will call ",(0,n.kt)("em",{parentName:"p"},"MyFilter"),", you can start this tutorial."),(0,n.kt)("p",null,"One can find filters examples in the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/gephi/gephi/tree/master/modules/FiltersPlugin/src/main"},"FiltersPlugin module"),"."),(0,n.kt)("h2",{id:"how-filtering-works-in-gephi"},"How filtering works in Gephi"),(0,n.kt)("p",null,"Gephi has a filter pipeline working with graph copies, where each filter can remove nodes and edges with settings. The Graph API in Gephi has the concept of View, a copy of the complete graph structure identified by an ID and where filters can work on it without disturbing other views. So, when a filter is removing nodes, it is removing them on a copy of the graph structure, the complete graph (named the main view) remains the same. This copy is eventually set as the visible view, the graph shown in the graph window. That is how users visualize a filtered graph. When filtering is disabled, the main view is simply set again as the visible view."),(0,n.kt)("p",null,"The filter pipeline is executed on a separate Thread and therefore doesn't block the rest of the application.\nFilters are wrapped into queries, which can be chained and combined. Similar as SQL nested queries concept, filter queries can have sub-queries and be represented as a tree, where the last executed query is the root. For example, the query ",(0,n.kt)("strong",{parentName:"p"},"INDEGREE(3, EDGE_WEIGHT(2))")," would be executed like below:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"A complete copy of the graph structure is created in a new view"),(0,n.kt)("li",{parentName:"ul"},"It is passed to the ",(0,n.kt)("strong",{parentName:"li"},"EDGE_WEIGHT")," filter, which removes edges under weight 2"),(0,n.kt)("li",{parentName:"ul"},"The sub-graph is passed to the ",(0,n.kt)("strong",{parentName:"li"},"INDEGREE")," filter, which removes nodes with in-degree less than 3 here"),(0,n.kt)("li",{parentName:"ul"},"The graph view is set as ",(0,n.kt)("em",{parentName:"li"},"visible view"),", the graph windows automatically refreshes")),(0,n.kt)("p",null,"When a property is changed in the user interface, for instance the weight threshold, the complete process above is just re-executed and the former graph view is destroyed."),(0,n.kt)("h2",{id:"create-a-new-filter"},"Create a new Filter"),(0,n.kt)("h3",{id:"set-dependencies"},"Set Dependencies"),(0,n.kt)("p",null,"Add ",(0,n.kt)("inlineCode",{parentName:"p"},"FiltersAPI"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"GraphAPI"),", and ",(0,n.kt)("inlineCode",{parentName:"p"},"Lookup")," modules as dependencies for your plugin module. See [","[How To Set Module Dependencies]","]."),(0,n.kt)("h3",{id:"create-filterbuilder"},"Create FilterBuilder"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"FilterBuilder")," is a factory class for building the Filters. The builder is registered in the ",(0,n.kt)("inlineCode",{parentName:"li"},"FilterLibrary"),". The library is the upper panel where users choose the filters they want to use. Another type of builders, named ",(0,n.kt)("inlineCode",{parentName:"li"},"CategoryBuilder")," can create several builders at once and will be detailed later."),(0,n.kt)("li",{parentName:"ul"},"Create a new builder ",(0,n.kt)("em",{parentName:"li"},"MyFilterBuilder")," class, which implements ",(0,n.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/filters/spi/FilterBuilder.html"},(0,n.kt)("inlineCode",{parentName:"a"},"FilterBuilder")),"."),(0,n.kt)("li",{parentName:"ul"},"Add ",(0,n.kt)("inlineCode",{parentName:"li"},"@ServiceProvider")," annotation to your builder class, in order it is detected by the filter library.\nHere is how it should look like:")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},'@ServiceProvider(service = FilterBuilder.class)\npublic class MyFilterBuilder implements FilterBuilder {\n \n    public Category getCategory() {\n        return FilterLibrary.NODE;\n    }\n \n    public String getName() {\n        return "My Filter";\n    }\n \n    public Icon getIcon() {\n        return null;\n    }\n \n    public String getDescription() {\n        return "A filter example";\n    }\n \n    public Filter getFilter() {\n        //TODO\n    }\n \n    public JPanel getPanel(Filter filter) {\n        return null;\n    }\n \n    public void destroy(Filter filter) {\n    }\n}\n')),(0,n.kt)("p",null,"Notice the ",(0,n.kt)("inlineCode",{parentName:"p"},"getCategory()")," method. As the ",(0,n.kt)("inlineCode",{parentName:"p"},"FilterLibrary")," is a tree, this builder needs a parent. That is the category. Use default categories defined in ",(0,n.kt)("inlineCode",{parentName:"p"},"FilterLibrary")," like above or simply return your own:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},'public Category getCategory() {\n    return new Category("Samples Filters");\n}\n')),(0,n.kt)("h3",{id:"create-filter"},"Create Filter"),(0,n.kt)("p",null,"Before creating the filter class, you should decide which filter interface to implement:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/filters/spi/NodeFilter.html"},(0,n.kt)("inlineCode",{parentName:"a"},"NodeFilter")),": Basic filters for nodes, that works as predicates. For a given node the filter's role is to return true if the node is kept or false if it is removed."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/filters/spi/EdgeFilter.html"},(0,n.kt)("inlineCode",{parentName:"a"},"EdgeFilter")),": Basic filters for edges, that works as predicates. For a given edge the filter's role is to return true if the edge is kept or false if it is removed."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"http://gephi.org/docs/api/org/gephi/filters/spi/ComplexFilter.html"},(0,n.kt)("inlineCode",{parentName:"a"},"ComplexFilter")),": Filter working with full graphs and returning a subgraph.")),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"ComplexFilter")," interface is useful when both nodes and edges have to be filtered.\nFor instance, in the case of an edge weight filter (a filter that keeps edges only in a particular weight threshold) we only need ",(0,n.kt)("inlineCode",{parentName:"p"},"EdgeFilter"),". But if I want to design a filter that prunes the graph until it's average degree is 5.5 I need to have control on both nodes and edges. The complex filter is a black box, where nodes and edges can be filtered (e.g. removed) with tricky or complex processes."),(0,n.kt)("h4",{id:"nodefilter"},"NodeFilter"),(0,n.kt)("p",null,"Create a new ",(0,n.kt)("em",{parentName:"p"},"MyFilter")," class, which implements ",(0,n.kt)("inlineCode",{parentName:"p"},"NodeFilter")," interface. The main filter method is ",(0,n.kt)("inlineCode",{parentName:"p"},"evaluate()"),". The ",(0,n.kt)("inlineCode",{parentName:"p"},"init()")," asks if the filter is valid for the given graph. Only valid filters are executed by the system.\nThe example below removes isolated nodes (e.g. with degree equal to 0). The filter is said valid only if the graph have nodes."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},'public class MyFilter implements NodeFilter {\n \n    public boolean init(Graph graph) {\n        return graph.getNodeCount() > 0;\n    }\n \n    public boolean evaluate(Graph graph, Node node) {\n        return graph.getDegree(node) > 0;\n    }\n \n    public void finish() {\n    }\n \n    public String getName() {\n        return "My Filter";\n    }\n \n    public FilterProperty[] getProperties() {\n        return new FilterProperty[0];   //Will be explained later\n    }\n}\n')),(0,n.kt)("p",null,"For specific directed or undirected graphs, just cast the ",(0,n.kt)("inlineCode",{parentName:"p"},"Graph")," in ",(0,n.kt)("inlineCode",{parentName:"p"},"DirectedGraph")," or ",(0,n.kt)("inlineCode",{parentName:"p"},"UndirectedGraph"),"."),(0,n.kt)("h4",{id:"complexfilter"},"ComplexFilter"),(0,n.kt)("p",null,"The complex filter interface is very simple, the ",(0,n.kt)("inlineCode",{parentName:"p"},"filter()")," method directly gives the ",(0,n.kt)("a",{parentName:"p",href:"http://gephi.org/docs/api/org/gephi/graph/api/Graph.html"},(0,n.kt)("inlineCode",{parentName:"a"},"Graph")),"."),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"public Graph filter(Graph graph);")),(0,n.kt)("p",null,"Here is a example of a complex filter. It removes the 50% edges with the lowest weight."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},"public Graph filter(Graph graph) {\n   int edgeCount = graph.getEdgeCount();\n   edgeCount /= 2;\n \n   Edge[] edges = graph.getEdges().toArray();\n   Arrays.sort(edges, new Comparator<Edge>() {\n      public int compare(Edge o1, Edge o2) {\n         return Float.compare(o1.getWeight(), o2.getWeight());\n      }\n   });\n \n   for (int i = 0; i < edgeCount; i++) {\n      Edge edge = edges[i];\n      graph.removeEdge(edge);\n   }\n   return graph;\n}\n")),(0,n.kt)("p",null,"It uses the ",(0,n.kt)("inlineCode",{parentName:"p"},"removeEdge()")," method from the ",(0,n.kt)("inlineCode",{parentName:"p"},"Graph")," API and returns the graph it received."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Can a filter also add elements?"),"\nYes, as far as they are part of the main view as well.\nAs as exemple, here is how the NOT operator works:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},"GraphView graphView = graph.getView();\nGraph mainGraph = graph.getView().getGraphModel().getGraph();\nfor (Node n : mainGraph.getNodes().toArray()) {\n   if (n.getNodeData().getNode(graphView.getViewId()) == null) {\n      //The node n is not in graph\n      graph.addNode(n);\n   } else {\n      //The node n is in graph\n      graph.removeNode(n);\n   }\n}\n")),(0,n.kt)("p",null,"It is possible to find the graph model from the view object. Then the ",(0,n.kt)("inlineCode",{parentName:"p"},"n.getNodeData().getNode(graphView.getViewId())")," line gets the same node in another view. The ",(0,n.kt)("inlineCode",{parentName:"p"},"NodeData")," is common at all views and maintains a list of views where the node is."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Can the complex filter returns a different graph view?"),"\nIt's possible yes, but a use-case needing this is not obvious to find. The ",(0,n.kt)("inlineCode",{parentName:"p"},"GraphModel.newView()")," is the method that duplicates the complete structure."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Can filters work with Hierarchical graph?"),"\nYes, the view copy is copying the complete hierarchy tree.\nJust cast the received graph in ",(0,n.kt)("a",{parentName:"p",href:"http://gephi.org/docs/api/org/gephi/graph/api/HierarchicalGraph.html"},(0,n.kt)("inlineCode",{parentName:"a"},"HierarchicalGraph")),"."),(0,n.kt)("h3",{id:"finish-the-builder"},"Finish the builder"),(0,n.kt)("p",null,"In the builder, return a new instance of your filter in the ",(0,n.kt)("inlineCode",{parentName:"p"},"getFilter()")," method."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},"@Override\npublic Filter getFilter() {\n   return new MyFilter();\n}\n")),(0,n.kt)("h3",{id:"properties"},"Properties"),(0,n.kt)("p",null,"It's very likely your filter will need to define properties, for instance a threshold or a pattern. In the case your filter has a user interface, the Filters API implementation has a system to automatically refresh the filter when a property value is changed. But for that it needs to be aware of these properties. That's why ",(0,n.kt)("inlineCode",{parentName:"p"},"Filter")," interface has a ",(0,n.kt)("inlineCode",{parentName:"p"},"getProperties()")," method."),(0,n.kt)("p",null,"If your filter doesn't have any user interface, it is therefore not necessary to return properties. Otherwise, it is mandatory.\nBelow is how to define a simple ",(0,n.kt)("inlineCode",{parentName:"p"},"useRegex")," boolean property:"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},'FilterProperty p = FilterProperty.createProperty(this, Boolean.class, "useRegex");')),(0,n.kt)("p",null,"As it uses introspection to get and set the value, your class simply needs proper getters and setters. As a result that is how the method id filled:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},'public FilterProperty[] getProperties() {\n        return new FilterProperty[]{\n            FilterProperty.createProperty(this, Boolean.class, "useRegex")\n        };\n    }\n \n    public boolean isUseRegex() {\n        return useRegex;\n    }\n \n    public void setUseRegex(boolean useRegex) {\n        this.useRegex = useRegex;\n    }\n')),(0,n.kt)("p",null,"When the ",(0,n.kt)("inlineCode",{parentName:"p"},"useRegex")," value will be changed (through a checkbox for example), the system will be notified and re-execute the filter."),(0,n.kt)("h3",{id:"provide-a-ui"},"Provide a UI"),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"getPanel()")," method in ",(0,n.kt)("em",{parentName:"p"},"MyFilterBuilder")," can return a user interface for the filter.\nOne can find existing filters user interface code in the ",(0,n.kt)("inlineCode",{parentName:"p"},"FiltersPluginUI")," module.\nThe panel is needed to configure a ",(0,n.kt)("inlineCode",{parentName:"p"},"Filter")," instance, already created. That's why the ",(0,n.kt)("inlineCode",{parentName:"p"},"getPanel()")," method gives the ",(0,n.kt)("inlineCode",{parentName:"p"},"Filter"),". Cast this filter to ",(0,n.kt)("em",{parentName:"p"},"MyFilter"),", it cannot be anything else and configure settings.\nWhen settings are modified, use properties to set the new value. Below is an example of a simple panel, with a checkbox to set the ",(0,n.kt)("inlineCode",{parentName:"p"},"useRegex")," property which we defined earlier."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},'public class MyFilterPanel extends javax.swing.JPanel implements ItemListener {\n \n    private MyFilter filter;\n    private javax.swing.JCheckBox regexCheckbox;\n \n    public MyFilterPanel(MyFilter filter) {\n        this.filter = filter;\n \n        regexCheckbox = new javax.swing.JCheckBox("Use Regex");\n        add(regexCheckbox);\n \n        regexCheckbox.addItemListener(this);\n    }\n \n    public void itemStateChanged(ItemEvent e) {\n        FilterProperty useRegex = filter.getProperties()[0];\n        useRegex.setValue(regexCheckbox.isSelected());\n    }\n}\n')),(0,n.kt)("p",null,"It is important to set the value to the ",(0,n.kt)("inlineCode",{parentName:"p"},"FilterProperty"),", not to ",(0,n.kt)("em",{parentName:"p"},"MyFilter")," directly."),(0,n.kt)("h2",{id:"appendix"},"Appendix"),(0,n.kt)("h3",{id:"create-a-categorybuilder"},"Create a CategoryBuilder"),(0,n.kt)("p",null,"Category builders are typically designed to build a filter that work on Attributes. For example, the ",(0,n.kt)("inlineCode",{parentName:"p"},"AttributeRangeFilter")," works with all attribute columns. That means a ",(0,n.kt)("inlineCode",{parentName:"p"},"FilterBuilder")," has to be created for each column, under a category (e.g. a folder).\nThe following example shows how several ",(0,n.kt)("inlineCode",{parentName:"p"},"AttributeRangeFilterBuilder")," (which implements ",(0,n.kt)("inlineCode",{parentName:"p"},"FilterBuilder"),") are created, one per attribute column.\nThe ",(0,n.kt)("inlineCode",{parentName:"p"},"AttributeUtils")," helps to know if a column is a numerical one."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-java"},"@ServiceProvider(service = CategoryBuilder.class)\npublic class AttributeRangeBuilder implements CategoryBuilder {\n \n    public Category getCategory() {\n        return new Category(\"Range\", null, FilterLibrary.ATTRIBUTES);    //The 'Range' folder will be in the 'Attributes' folder\n    }\n \n    public FilterBuilder[] getBuilders() {\n        List<FilterBuilder> builders = new ArrayList<FilterBuilder>();\n        AttributeModel am = Lookup.getDefault().lookup(AttributeController.class).getModel();\n        for (AttributeColumn c : am.getNodeTable().getColumns()) {\n            if (AttributeUtils.getDefault().isNumberColumn(c) || AttributeUtils.getDefault().isDynamicNumberColumn(c)) {\n                AttributeRangeFilterBuilder b = new AttributeRangeFilterBuilder(c);\n                builders.add(b);\n            }\n        }\n        for (AttributeColumn c : am.getEdgeTable().getColumns()) {\n            if (AttributeUtils.getDefault().isNumberColumn(c) || AttributeUtils.getDefault().isDynamicNumberColumn(c)) {\n                AttributeRangeFilterBuilder b = new AttributeRangeFilterBuilder(c);\n                builders.add(b);\n            }\n        }\n        return builders.toArray(new FilterBuilder[0]);\n    }\n}\n")),(0,n.kt)("h3",{id:"provide-an-icon"},"Provide an icon"),(0,n.kt)("p",null,"Simply return an icon in the ",(0,n.kt)("inlineCode",{parentName:"p"},"FilterBuilder")," implementation."),(0,n.kt)("h3",{id:"custom-properties"},"Custom Properties"),(0,n.kt)("p",null,"Properties natively supports all Java types, as well as Range and ",(0,n.kt)("inlineCode",{parentName:"p"},"AttributeColumn"),". For other types you may have to register a property editor to guarantee serialization to work.\nSerialization is used to write and read properties values, when a Gephi project is saved.\nImplement a property editor class and register it:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Create a new class that extends ",(0,n.kt)("inlineCode",{parentName:"li"},"java.beans.PropertyEditorSupport")," and fill ",(0,n.kt)("inlineCode",{parentName:"li"},"getAstext()")," and ",(0,n.kt)("inlineCode",{parentName:"li"},"setAsText()")," methods."),(0,n.kt)("li",{parentName:"ul"},"Register this editor by doing ",(0,n.kt)("inlineCode",{parentName:"li"},"java.beans.PropertyEditorManager.registerEditor()")," method.")))}u.isMDXComponent=!0}}]);