"use strict";(self.webpackChunkgephi_documentation=self.webpackChunkgephi_documentation||[]).push([[8126],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(a),u=r,m=d["".concat(l,".").concat(u)]||d[u]||h[u]||o;return a?n.createElement(m,i(i({ref:t},c),{},{components:a})):n.createElement(m,i({ref:t},c))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},8589:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const o={id:"graphstreaming",title:"GraphStreaming",sidebar_position:17},i=void 0,s={unversionedId:"Plugins/graphstreaming",id:"Plugins/graphstreaming",title:"GraphStreaming",description:"Description",source:"@site/docs/Plugins/GraphStreaming.md",sourceDirName:"Plugins",slug:"/Plugins/graphstreaming",permalink:"/Plugins/graphstreaming",draft:!1,editUrl:"https://github.com/gephi/gephi-documentation/docs/docs/Plugins/GraphStreaming.md",tags:[],version:"current",sidebarPosition:17,frontMatter:{id:"graphstreaming",title:"GraphStreaming",sidebar_position:17},sidebar:"tutorialSidebar",previous:{title:"Code Sharing Strategy",permalink:"/Plugins/code_sharing_strategy"}},l={},p=[{value:"Description",id:"description",level:2},{value:"Modules",id:"modules",level:2},{value:"Graph Streaming API",id:"graph-streaming-api",level:3},{value:"Server Module",id:"server-module",level:3},{value:"Examples",id:"examples",level:2},{value:"Gephi as Master",id:"gephi-as-master",level:3},{value:"Gephi as Client",id:"gephi-as-client",level:3},{value:"Using a WebSocket Client",id:"using-a-websocket-client",level:3},{value:"Other Examples",id:"other-examples",level:3},{value:"Acknowledgements",id:"acknowledgements",level:2}],c={toc:p};function h(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The purpose of the Graph Streaming API is to build a unified framework for streaming graph objects. Gephi\u2019s data structure and visualization engine has been built with the idea that a graph is not static and might change continuously. By connecting Gephi with external data-sources, we leverage its power to visualize and monitor complex systems or enterprise data in real-time. Moreover, the idea of streaming graph data goes beyond Gephi, and a unified and standardized API could bring interoperability with other available tools for graph and network analysis, as they could start to interoperate with other tools in a distributed and cooperative fashion."),(0,r.kt)("p",null,"This plugin is also used to produce real-time analysis and visualization of graphs using Gephi. For more information on how to visualize Twitter data as graph objects using this plugin, see [","[GraphStreaming#Other Examples|Other Examples]","]."),(0,r.kt)("h2",{id:"modules"},"Modules"),(0,r.kt)("p",null,"Gephi Graph Streaming is divided in different modules: The core modules, that defines the Graph Streaming API and its implementation, the Server modules, responsible for the HTTP REST Server, and the interface modules."),(0,r.kt)("h3",{id:"graph-streaming-api"},"Graph Streaming API"),(0,r.kt)("p",null,"The Graph Streaming API is the core of this plugin. High-level modules can use this API in order to connect to external event sources. The API is format-agnostic, and the programmer must use an implemented StreamType for a given format, or implement one for a different format. For current supported formats, see [","[GraphStreaming#Supported formats|Supported formats]","]."),(0,r.kt)("p",null,"You can use the Graph Streaming API to connect from the Toolkit, without a user interface. In order to connect to a stream data source, a component have to:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Get the current Graph instance:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"ProjectController projectController = Lookup.getDefault().lookup(ProjectController.class);\nProject project = projectController.getCurrentProject();\nWorkspace workspace = projectController.getCurrentWorkspace();\n\n// Get the graph instance\nGraphController graphController = Lookup.getDefault().lookup(GraphController.class);\nGraphModel graphModel = graphController.getModel();\nGraph graph = graphModel.getHierarchicalMixedGraph();\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Get the StreamingController:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"StreamingController controller = Lookup.getDefault().lookup(StreamingController.class);\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Define the endpoint to connect to:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'// Connect to stream using the Streaming API\nStreamingEndpoint endpoint = new StreamingEndpoint();\n// put the url of your master here\nendpoint.setUrl(new URL("http://localhost:8080/workspace0"));\n// endpoint.setStreamType() accepts a StreamType instance, so you\n// have to get it using the controller\nStreamType type = controller.getStreamType("JSON");\nendpoint.setStreamType(type);\n')),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Connect to it and process:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"StreamingConnection connection = controller.connect(endpoint, graph);\nconnection.asynchProcess(); // or connection.process() for synchronous processing\n")),(0,r.kt)("p",null,"The client will connect to the endpoint, process the events and update the graph accordingly. Note that the method connection.process() returns only when the stream finishes. If you want to asynchronously process the stream, you will want to call connection.asynchProcess(). But if you start the asynchronous processing of the stream, you lose control of when the stream finishes. In order to know when the stream finishes, you can control the StreamingConnection object to know when the connection was closed. If you want to know asynchronously when the connection was closed, without controlling the connection object, you can inform a listener to receive the event:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'        StreamingConnection connection = controller.connect(endpoint, graph);\n        connection.addStatusListener(new StatusListener() {\n                    public void onConnectionClosed(StreamingConnection connection) {\n                        System.out.println("Connection was closed!");\n                    }\n                });\n        connection.asynchProcess();\n')),(0,r.kt)("p",null,"If you want to customize the behavior of event processing, doing something else than updating the graph, you can work with more low-level objects like StreamReaders. You can implement you own GraphEventHandler and pass it directly to the StreamReader implementation. For example, to count the received events you could do this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'final AtomicInteger counter = new AtomicInteger();\n\nGraphEventHandler eventHandler = new GraphEventHandler() {\n        public void handleGraphEvent(GraphEvent event) {\n        counter.incrementAndGet();\n        }\n};\n\nURL url = new URL("http://streamingserver/streamingcontext");\nurl.openConnection();\nInputStream inputStream = url.openStream();\n\nGraphEventBuilder eventBuilder = new GraphEventBuilder(endpoint.getUrl());\n\nStreamReaderFactory readerFactory = Lookup.getDefault().lookup(StreamReaderFactory.class);\nStreamReader reader = readerFactory.createStreamReader("JSON", eventHandler, eventBuilder);\nstreamReader.processStream(inputStream);\n')),(0,r.kt)("p",null,"The graph events will be sent to the GraphEventHandler as they arrive in the inputStream. The reported problems/exceptions during the streaming process are reported in the object Report:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"Report report = connection.getReport();\n")),(0,r.kt)("p",null,"You can also write the events in a given format using the StreamWriter:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'ByteArrayOutputStream out = new ByteArrayOutputStream();\nStreamWriterFactory factory = Lookup.getDefault().lookup(StreamWriterFactory.class);\nStreamWriter streamWriter = factory.createStreamWriter("JSON", out);\n')),(0,r.kt)("p",null,"Now you can use it as a GraphEventHandler instance (StreamWriter implements the GraphEventHandler interface), and you can write the events to the output using the given format:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'StreamReaderFactory factory = Lookup.getDefault().lookup(StreamReaderFactory.class);\nStreamReader reader = readerFactory.createStreamReader("JSON", streamWriter, eventBuilder);\nstreamReader.processStream(inputStream);\n')),(0,r.kt)("h3",{id:"server-module"},"Server Module"),(0,r.kt)("p",null,"The Server Module is implemented using Servlet standards. The servlets are run by an embedded ","[http://jetty.codehaus.org/jetty/ Jetty]"," instance."),(0,r.kt)("p",null,"You can start a master programmatically using the API:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'StreamingServer server = Lookup.getDefault().lookup(StreamingServer.class);\nServerControllerFactory controllerFactory = Lookup.getDefault().lookup(ServerControllerFactory.class);\nServerController serverController = controllerFactory.createServerController(graph);\nString context = "/mycontext";\nserver.register(serverController, context);\n')),(0,r.kt)("p",null,"Using this code, the Gephi master will be accessible in the following url: ","[http://your_ip_here:8080/mycontext http://your_ip_here:8080/mycontext]"),(0,r.kt)("p",null,"=== Plugin interface ===\nThe modules responsible for the plugin interface use the core Graph Streaming API to connect to external streams, and the classes in the Server Module to start/stop the internal HTTP server."),(0,r.kt)("p",null,"== Supported formats ==\nThe main Streaming API format supported by Gephi is JSON. For web-based systems, JSON is strongly encouraged over XML, as JSON is more compact and parsing is greatly simplified by the delimited parameter: every object is returned on its own line, and ends with a carriage return. In a streaming situation, it is more practical, as it is possible to parse the data as it arrives, without waiting for a closing tag or for the end of the stream."),(0,r.kt)("p",null,"The current implementation of JSON Streaming Format is very simple and '''still subject to changes'''. It is composed of 6 types of events, divided in 2 types of elements (nodes and edges) and 3 types of operations (add, change, delete):"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"an: Add node"),(0,r.kt)("li",{parentName:"ul"},"cn: Change node"),(0,r.kt)("li",{parentName:"ul"},"dn: Delete node"),(0,r.kt)("li",{parentName:"ul"},"ae: Add edge>"),(0,r.kt)("li",{parentName:"ul"},"ce: Change edge"),(0,r.kt)("li",{parentName:"ul"},'de: Delete edge\nEach event is composed by its event type and a list of objects of type node or edge, depending on the event type. Node and edge objects are similar, and composed of an identifier and a list of attributes. The "add edge" is the only operation in which there is three mandatory attributes: source, target and directed. Source and target are node identifiers, and directed is a boolean representing if the edge is directed or not.')),(0,r.kt)("p",null,"The events are currently represented in the JSON format as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"{ <event_type> :{ <object_identifier> :{ <attribute_name> : <attribute_value> , <attribute_name> : <attribute_value> }}} \n")),(0,r.kt)("p",null,"Following, we show a list of events with some examples for each type of event, represented in the current JSON format implementation:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'{"an":{"A":{"label":"Streaming Node A","size":2}}} // add node A\n{"an":{"B":{"label":"Streaming Node B","size":1}}} // add node B\n{"an":{"C":{"label":"Streaming Node C","size":1}}} // add node C\n{"ae":{"AB":{"source":"A","target":"B","directed":false,"weight":2}}} // add edge A->B\n{"ae":{"BC":{"source":"B","target":"C","directed":false,"weight":1}}} // add edge B->C\n{"ae":{"CA":{"source":"C","target":"A","directed":false,"weight":2}}} // add edge C->A\n{"cn":{"C":{"size":2}}}  // changes the size attribute to 2\n{"cn":{"B":{"label":null}}}  // removes the label attribute\n{"ce":{"AB":{"label":"From A to B"}}} // add the label attribute\n{"de":{"BC":{}}} // delete edge BC\n{"de":{"CA":{}}} // delete edge CA\n{"dn":{"C":{}}}  // delete node C\n')),(0,r.kt)("p",null,"With this format it is possible to put more than one object in each event, as in the following example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'{ "an" : { "A" : { "label" : "Streaming Node A" , "size" : 2 } , "B" : { "label" : "Streaming Node B" , "size" : 1 } , "C" : { "label" : "Streaming Node C" , "size" : 1 } } } \n')),(0,r.kt)("p",null,"But we recommend to send only one object in each event, as it is more suitable for a streaming approach: the data should be read as soon as possible by the client, and the approach using multiple objects by event slows the client reading, because it can't parse the JSON event object until a '\\r' appears."),(0,r.kt)("p",null,"'''We recall that this format is subject to changes, as more requirements are being added to the Graph Streaming API.'''"),(0,r.kt)("p",null,"'''Format changing considerations currently in progress'''"),(0,r.kt)("p",null,"There are some considerations in progress in order to adapt the JSON format to some requirements."),(0,r.kt)("p",null,"The first one is to add support to '''filters'''. Filters are very important when changing groups of objects with the same characteristic. For example, if you want to change the color of all nodes with size=x, you could use a filter event. It would cost much less than sending one event for each node."),(0,r.kt)("p",null,"Another requirement is to support '''identifiers to events'''. In some cases, it would be interesting to assign an identifier to the event. For example, in a distributed environment, the events are produced by event producers, but you cannot be sure that the event consumers receive the events in the same order. As a way to solve this problem, each event producer could assign a timestamp to the event, as a way to ensure that each event consumer produce the same results."),(0,r.kt)("p",null,'Event identifiers will be assigned to events using a special "id" attribute, at the same level of the event type:'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'{ "id" : "1278944510" , "an" : { "A" : { "label" : "Streaming Node A" , "size" : 2 } } } \n')),(0,r.kt)("p",null,'This way, the event identifier will be parsed only if the "id" attribute is present in the event object. Someone that does not want to use identifiers should only ignore the "id" attribute: no overhead is added to the format, it remains compatible with "old style" events, and the format remains concise.'),(0,r.kt)("p",null,"== Source code ==\nThe Gephi Graph Streaming is a Gephi Plugin supported by the core team, and the source code is available as a branch of the ","[https://github.com/gephi/gephi-plugins gephi-plugins repository]",". In order to build the latest version, follow these steps:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Download and install the latest version of ","[http://netbeans.org/ Netbeans IDE]","."),(0,r.kt)("li",{parentName:"ul"},"Fork and checkout the latest version of the gephi-plugins repository:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone git@github.com:username/gephi-plugins.git\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Checkout the graph-streaming branch:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git checkout -t origin/graph-streaming\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Start Netbeans and Open Project. This folder is automatically recognized as a module suite."),(0,r.kt)("li",{parentName:"ul"},"Right click on the project and select 'Run'. This starts Gephi with the Graph Streaming plugin.")),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("p",null,"The Graph Streaming specification allow clients to interact with a master getting data and pushing data to it, in a REST architecture. The same data format used by the master to send graph events to the clients is used by clients to interact with the master."),(0,r.kt)("h3",{id:"gephi-as-master"},"Gephi as Master"),(0,r.kt)("p",null,"In the first example, we will start Gephi as a master to provide graph information to its clients. At the Streaming Tab in the Gephi application, you can access all the features of graph streaming. You can start the Gephi Master by executing the following steps:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Run the Gephi application"),(0,r.kt)("li",{parentName:"ul"},"Create an empty workspace (File/New Project)"),(0,r.kt)("li",{parentName:"ul"},"Add some nodes and edges to your graph"),(0,r.kt)("li",{parentName:"ul"},"Go to the tab Streaming and right-click on the \u201cMaster Server\u201d and select \u201cStart\u201d\nBy default, the HTTP server will listen at port 8080 in plain HTTP, and at port 8443 using SSL. The server path depends on your workspace: each workspace uses a different path. You can configure these parameters (and also Basic Authentication) at the \u201cSettings\u2026\u201d button.")),(0,r.kt)("p",null,"By following these steps, an HTTP server is started, and it exposes a REST interface to access the workspace data by submitting events in the graph streaming format."),(0,r.kt)("p",null,"Now, you can connect to Gephi using any HTTP client. For example, you can use ","[http://curl.haxx.se/ curl]"," to see the data flowing. First of all, open a shell prompt and execute the following command to get the complete graph, using the operation getGraph or no operation at all (getGraph is the default operation):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://localhost:8080/workspace0?operation=getGraph"\n')),(0,r.kt)("p",null,"This operation connects to Gephi in streaming mode. You first receive the graph objects that are already in the graph. Every new object added to the graph is sent to the streaming client. For example, add some nodes to the graph in your workspace, and you will see the events appearing in the command line client."),(0,r.kt)("p",null,"Other operations are used to retrieve node and edge data:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://localhost:8080/workspace0?operation=getNode&id=A"\ncurl "http://localhost:8080/workspace0?operation=getEdge&id=AB"\n')),(0,r.kt)("p",null,"You can use the updateGraph operation to submit new events to your graph. For example, open another shell prompt and execute the following lines, one after the other:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\\"an\\":{\\"A\\":{\\"label\\":\\"Streaming Node A\\"}}}"\ncurl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\\"an\\":{\\"B\\":{\\"label\\":\\"Streaming Node B\\"}}}"\ncurl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\\"an\\":{\\"C\\":{\\"label\\":\\"Streaming Node C\\"}}}"\ncurl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\\"ae\\":{\\"AB\\":{\\"source\\":\\"A\\",\\"target\\":\\"B\\",\\"directed\\":false}}}"\ncurl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\\"ae\\":{\\"BC\\":{\\"source\\":\\"B\\",\\"target\\":\\"C\\",\\"directed\\":false}}}"\ncurl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\\"ae\\":{\\"CA\\":{\\"source\\":\\"C\\",\\"target\\":\\"A\\",\\"directed\\":false}}}"\n')),(0,r.kt)("p",null,"You should see the nodes and edges appearing in the workspace, until they form a triangle. At the same time, the events are sent to any client connected to the Master. You can send more events to the workspace using the same command line, just change the node and edge identifiers."),(0,r.kt)("p",null,"The same events can be sent by just one HTTP request:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl "http://localhost:8080/workspace0?operation=updateGraph" -d $\'{"an":{"A":{"label":"Streaming Node A"}}}\\r\n{"an":{"B":{"label":"Streaming Node B"}}}\\r\n{"an":{"C":{"label":"Streaming Node C"}}}\\r\n{"ae":{"AB":{"source":"A","target":"B","directed":false}}}\\r\n{"ae":{"BC":{"source":"B","target":"C","directed":false}}}\\r\n{"ae":{"CA":{"source":"C","target":"A","directed":false}}}\'\n')),(0,r.kt)("p",null,"You are not limited to a single master by host: each Gephi workspace can be available as a master."),(0,r.kt)("h3",{id:"gephi-as-client"},"Gephi as Client"),(0,r.kt)("p",null,"To illustrate how to connect to a master, ","[http://www.youtube.com/watch?v=7SW_FDiY0sg this video]"," shows Gephi connecting to a master and visualizing the received graph data in real time. The graph in this demo is a part of the Amazon.com library, where the nodes represent books and the edges represent their similarities. For each book, a node is added, the similar books are explored, adding the similar ones as nodes and the similarity as an edge."),(0,r.kt)("h3",{id:"using-a-websocket-client"},"Using a WebSocket Client"),(0,r.kt)("p",null,"'''This feature will be available in a near future.'''"),(0,r.kt)("h3",{id:"other-examples"},"Other Examples"),(0,r.kt)("p",null,"Some other examples are available by using a Python client. Source code and instructions are available in the ","[https://github.com/panisson/pygephi_graphstreaming pygephi_graphstreaming repository]",". This repository also contains the source code of the Python server used to collect data from Twitter and create the video about the ","[https://gephi.org/2011/the-egyptian-revolution-on-twitter/ Egyptian Revolution on Twitter]","."),(0,r.kt)("h2",{id:"acknowledgements"},"Acknowledgements"),(0,r.kt)("p",null,"This plugin was implemented by ","[http://gephi.org/about/people/ Andr","\xe9"," Panisson]","."))}h.isMDXComponent=!0}}]);