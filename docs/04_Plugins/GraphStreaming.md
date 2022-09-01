---
id: graphstreaming
title: GraphStreaming
---

== Description ==

The purpose of the Graph Streaming API is to build a unified framework for streaming graph objects. Gephi’s data structure and visualization engine has been built with the idea that a graph is not static and might change continuously. By connecting Gephi with external data-sources, we leverage its power to visualize and monitor complex systems or enterprise data in real-time. Moreover, the idea of streaming graph data goes beyond Gephi, and a unified and standardized API could bring interoperability with other available tools for graph and network analysis, as they could start to interoperate with other tools in a distributed and cooperative fashion.

This plugin is also used to produce real-time analysis and visualization of graphs using Gephi. For more information on how to visualize Twitter data as graph objects using this plugin, see [[GraphStreaming#Other Examples|Other Examples]].

== Modules ==

Gephi Graph Streaming is divided in different modules: The core modules, that defines the Graph Streaming API and its implementation, the Server modules, responsible for the HTTP REST Server, and the interface modules.

=== Graph Streaming API ===

The Graph Streaming API is the core of this plugin. High-level modules can use this API in order to connect to external event sources. The API is format-agnostic, and the programmer must use an implemented StreamType for a given format, or implement one for a different format. For current supported formats, see [[GraphStreaming#Supported formats|Supported formats]].

You can use the Graph Streaming API to connect from the Toolkit, without a user interface. In order to connect to a stream data source, a component have to:

1. Get the current Graph instance:
```java
ProjectController projectController = Lookup.getDefault().lookup(ProjectController.class);
Project project = projectController.getCurrentProject();
Workspace workspace = projectController.getCurrentWorkspace();

// Get the graph instance
GraphController graphController = Lookup.getDefault().lookup(GraphController.class);
GraphModel graphModel = graphController.getModel();
Graph graph = graphModel.getHierarchicalMixedGraph();
```
2. Get the StreamingController:
```java
StreamingController controller = Lookup.getDefault().lookup(StreamingController.class);
```
3. Define the endpoint to connect to:
```java
// Connect to stream using the Streaming API
StreamingEndpoint endpoint = new StreamingEndpoint();
// put the url of your master here
endpoint.setUrl(new URL("http://localhost:8080/workspace0"));
// endpoint.setStreamType() accepts a StreamType instance, so you
// have to get it using the controller
StreamType type = controller.getStreamType("JSON");
endpoint.setStreamType(type);
```
4. Connect to it and process:

```java
StreamingConnection connection = controller.connect(endpoint, graph);
connection.asynchProcess(); // or connection.process() for synchronous processing
```
The client will connect to the endpoint, process the events and update the graph accordingly. Note that the method connection.process() returns only when the stream finishes. If you want to asynchronously process the stream, you will want to call connection.asynchProcess(). But if you start the asynchronous processing of the stream, you lose control of when the stream finishes. In order to know when the stream finishes, you can control the StreamingConnection object to know when the connection was closed. If you want to know asynchronously when the connection was closed, without controlling the connection object, you can inform a listener to receive the event:
```java
        StreamingConnection connection = controller.connect(endpoint, graph);
        connection.addStatusListener(new StatusListener() {
                    public void onConnectionClosed(StreamingConnection connection) {
                        System.out.println("Connection was closed!");
                    }
                });
        connection.asynchProcess();
```
If you want to customize the behavior of event processing, doing something else than updating the graph, you can work with more low-level objects like StreamReaders. You can implement you own GraphEventHandler and pass it directly to the StreamReader implementation. For example, to count the received events you could do this:

```java
final AtomicInteger counter = new AtomicInteger();

GraphEventHandler eventHandler = new GraphEventHandler() {
        public void handleGraphEvent(GraphEvent event) {
        counter.incrementAndGet();
        }
};

URL url = new URL("http://streamingserver/streamingcontext");
url.openConnection();
InputStream inputStream = url.openStream();

GraphEventBuilder eventBuilder = new GraphEventBuilder(endpoint.getUrl());

StreamReaderFactory readerFactory = Lookup.getDefault().lookup(StreamReaderFactory.class);
StreamReader reader = readerFactory.createStreamReader("JSON", eventHandler, eventBuilder);
streamReader.processStream(inputStream);
```
The graph events will be sent to the GraphEventHandler as they arrive in the inputStream. The reported problems/exceptions during the streaming process are reported in the object Report:

```java
Report report = connection.getReport();
```
You can also write the events in a given format using the StreamWriter:

```java
ByteArrayOutputStream out = new ByteArrayOutputStream();
StreamWriterFactory factory = Lookup.getDefault().lookup(StreamWriterFactory.class);
StreamWriter streamWriter = factory.createStreamWriter("JSON", out);
```
Now you can use it as a GraphEventHandler instance (StreamWriter implements the GraphEventHandler interface), and you can write the events to the output using the given format:

```java
StreamReaderFactory factory = Lookup.getDefault().lookup(StreamReaderFactory.class);
StreamReader reader = readerFactory.createStreamReader("JSON", streamWriter, eventBuilder);
streamReader.processStream(inputStream);
```

=== Server Module ===

The Server Module is implemented using Servlet standards. The servlets are run by an embedded [http://jetty.codehaus.org/jetty/ Jetty] instance.

You can start a master programmatically using the API:

```
StreamingServer server = Lookup.getDefault().lookup(StreamingServer.class);
ServerControllerFactory controllerFactory = Lookup.getDefault().lookup(ServerControllerFactory.class);
ServerController serverController = controllerFactory.createServerController(graph);
String context = "/mycontext";
server.register(serverController, context);
```
Using this code, the Gephi master will be accessible in the following url: [http://your_ip_here:8080/mycontext http://your_ip_here:8080/mycontext]

=== Plugin interface ===
The modules responsible for the plugin interface use the core Graph Streaming API to connect to external streams, and the classes in the Server Module to start/stop the internal HTTP server.


== Supported formats ==
The main Streaming API format supported by Gephi is JSON. For web-based systems, JSON is strongly encouraged over XML, as JSON is more compact and parsing is greatly simplified by the delimited parameter: every object is returned on its own line, and ends with a carriage return. In a streaming situation, it is more practical, as it is possible to parse the data as it arrives, without waiting for a closing tag or for the end of the stream.

The current implementation of JSON Streaming Format is very simple and '''still subject to changes'''. It is composed of 6 types of events, divided in 2 types of elements (nodes and edges) and 3 types of operations (add, change, delete):

* an: Add node
* cn: Change node
* dn: Delete node
* ae: Add edge>
* ce: Change edge
* de: Delete edge
Each event is composed by its event type and a list of objects of type node or edge, depending on the event type. Node and edge objects are similar, and composed of an identifier and a list of attributes. The &quot;add edge&quot; is the only operation in which there is three mandatory attributes: source, target and directed. Source and target are node identifiers, and directed is a boolean representing if the edge is directed or not.

The events are currently represented in the JSON format as follows:

```javascript { &lt;event_type&gt; :{ &lt;object_identifier&gt; :{ &lt;attribute_name&gt; : &lt;attribute_value&gt; , &lt;attribute_name&gt; : &lt;attribute_value&gt; }}} 
```
Following, we show a list of events with some examples for each type of event, represented in the current JSON format implementation:

```javascript
{"an":{"A":{"label":"Streaming Node A","size":2}}} // add node A
{"an":{"B":{"label":"Streaming Node B","size":1}}} // add node B
{"an":{"C":{"label":"Streaming Node C","size":1}}} // add node C
{"ae":{"AB":{"source":"A","target":"B","directed":false,"weight":2}}} // add edge A->B
{"ae":{"BC":{"source":"B","target":"C","directed":false,"weight":1}}} // add edge B->C
{"ae":{"CA":{"source":"C","target":"A","directed":false,"weight":2}}} // add edge C->A
{"cn":{"C":{"size":2}}}  // changes the size attribute to 2
{"cn":{"B":{"label":null}}}  // removes the label attribute
{"ce":{"AB":{"label":"From A to B"}}} // add the label attribute
{"de":{"BC":{}}} // delete edge BC
{"de":{"CA":{}}} // delete edge CA
{"dn":{"C":{}}}  // delete node C
```
With this format it is possible to put more than one object in each event, as in the following example:

```javascript { &quot;an&quot; : { &quot;A&quot; : { &quot;label&quot; : &quot;Streaming Node A&quot; , &quot;size&quot; : 2 } , &quot;B&quot; : { &quot;label&quot; : &quot;Streaming Node B&quot; , &quot;size&quot; : 1 } , &quot;C&quot; : { &quot;label&quot; : &quot;Streaming Node C&quot; , &quot;size&quot; : 1 } } } 
```
But we recommend to send only one object in each event, as it is more suitable for a streaming approach: the data should be read as soon as possible by the client, and the approach using multiple objects by event slows the client reading, because it can't parse the JSON event object until a '\r' appears.

'''We recall that this format is subject to changes, as more requirements are being added to the Graph Streaming API.'''

'''Format changing considerations currently in progress'''

There are some considerations in progress in order to adapt the JSON format to some requirements.

The first one is to add support to '''filters'''. Filters are very important when changing groups of objects with the same characteristic. For example, if you want to change the color of all nodes with size=x, you could use a filter event. It would cost much less than sending one event for each node.

Another requirement is to support '''identifiers to events'''. In some cases, it would be interesting to assign an identifier to the event. For example, in a distributed environment, the events are produced by event producers, but you cannot be sure that the event consumers receive the events in the same order. As a way to solve this problem, each event producer could assign a timestamp to the event, as a way to ensure that each event consumer produce the same results.

Event identifiers will be assigned to events using a special &quot;id&quot; attribute, at the same level of the event type:

```javascript { &quot;id&quot; : &quot;1278944510&quot; , &quot;an&quot; : { &quot;A&quot; : { &quot;label&quot; : &quot;Streaming Node A&quot; , &quot;size&quot; : 2 } } } 
```
This way, the event identifier will be parsed only if the &quot;id&quot; attribute is present in the event object. Someone that does not want to use identifiers should only ignore the &quot;id&quot; attribute: no overhead is added to the format, it remains compatible with &quot;old style&quot; events, and the format remains concise.

== Source code ==
The Gephi Graph Streaming is a Gephi Plugin supported by the core team, and the source code is available as a branch of the [https://github.com/gephi/gephi-plugins gephi-plugins repository]. In order to build the latest version, follow these steps:

* Download and install the latest version of [http://netbeans.org/ Netbeans IDE].
* Fork and checkout the latest version of the gephi-plugins repository:

```bash
git clone git@github.com:username/gephi-plugins.git
```
* Checkout the graph-streaming branch:
```bash
git checkout -t origin/graph-streaming
```
* Start Netbeans and Open Project. This folder is automatically recognized as a module suite.
* Right click on the project and select 'Run'. This starts Gephi with the Graph Streaming plugin.

== Examples ==
The Graph Streaming specification allow clients to interact with a master getting data and pushing data to it, in a REST architecture. The same data format used by the master to send graph events to the clients is used by clients to interact with the master.

=== Gephi as Master ===
In the first example, we will start Gephi as a master to provide graph information to its clients. At the Streaming Tab in the Gephi application, you can access all the features of graph streaming. You can start the Gephi Master by executing the following steps:

* Run the Gephi application
* Create an empty workspace (File/New Project)
* Add some nodes and edges to your graph
* Go to the tab Streaming and right-click on the “Master Server” and select “Start”
By default, the HTTP server will listen at port 8080 in plain HTTP, and at port 8443 using SSL. The server path depends on your workspace: each workspace uses a different path. You can configure these parameters (and also Basic Authentication) at the “Settings…” button.

By following these steps, an HTTP server is started, and it exposes a REST interface to access the workspace data by submitting events in the graph streaming format.

Now, you can connect to Gephi using any HTTP client. For example, you can use [http://curl.haxx.se/ curl] to see the data flowing. First of all, open a shell prompt and execute the following command to get the complete graph, using the operation getGraph or no operation at all (getGraph is the default operation):

```bash
curl "http://localhost:8080/workspace0?operation=getGraph"
```
This operation connects to Gephi in streaming mode. You first receive the graph objects that are already in the graph. Every new object added to the graph is sent to the streaming client. For example, add some nodes to the graph in your workspace, and you will see the events appearing in the command line client.

Other operations are used to retrieve node and edge data:

```bash
curl "http://localhost:8080/workspace0?operation=getNode&id=A"
curl "http://localhost:8080/workspace0?operation=getEdge&id=AB"
```
You can use the updateGraph operation to submit new events to your graph. For example, open another shell prompt and execute the following lines, one after the other:

```bash
curl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\"an\":{\"A\":{\"label\":\"Streaming Node A\"}}}"
curl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\"an\":{\"B\":{\"label\":\"Streaming Node B\"}}}"
curl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\"an\":{\"C\":{\"label\":\"Streaming Node C\"}}}"
curl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\"ae\":{\"AB\":{\"source\":\"A\",\"target\":\"B\",\"directed\":false}}}"
curl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\"ae\":{\"BC\":{\"source\":\"B\",\"target\":\"C\",\"directed\":false}}}"
curl "http://localhost:8080/workspace0?operation=updateGraph" -d "{\"ae\":{\"CA\":{\"source\":\"C\",\"target\":\"A\",\"directed\":false}}}"
```
You should see the nodes and edges appearing in the workspace, until they form a triangle. At the same time, the events are sent to any client connected to the Master. You can send more events to the workspace using the same command line, just change the node and edge identifiers.

The same events can be sent by just one HTTP request:

```bash
curl "http://localhost:8080/workspace0?operation=updateGraph" -d $'{"an":{"A":{"label":"Streaming Node A"}}}\r
{"an":{"B":{"label":"Streaming Node B"}}}\r
{"an":{"C":{"label":"Streaming Node C"}}}\r
{"ae":{"AB":{"source":"A","target":"B","directed":false}}}\r
{"ae":{"BC":{"source":"B","target":"C","directed":false}}}\r
{"ae":{"CA":{"source":"C","target":"A","directed":false}}}'
```
You are not limited to a single master by host: each Gephi workspace can be available as a master.

=== Gephi as Client ===
To illustrate how to connect to a master, [http://www.youtube.com/watch?v=7SW_FDiY0sg this video] shows Gephi connecting to a master and visualizing the received graph data in real time. The graph in this demo is a part of the Amazon.com library, where the nodes represent books and the edges represent their similarities. For each book, a node is added, the similar books are explored, adding the similar ones as nodes and the similarity as an edge.

=== Using a WebSocket Client ===

'''This feature will be available in a near future.'''

=== Other Examples ===

Some other examples are available by using a Python client. Source code and instructions are available in the [https://github.com/panisson/pygephi_graphstreaming pygephi_graphstreaming repository]. This repository also contains the source code of the Python server used to collect data from Twitter and create the video about the [https://gephi.org/2011/the-egyptian-revolution-on-twitter/ Egyptian Revolution on Twitter].

== Acknowledgements ==

This plugin was implemented by [http://gephi.org/about/people/ Andr&eacute; Panisson].