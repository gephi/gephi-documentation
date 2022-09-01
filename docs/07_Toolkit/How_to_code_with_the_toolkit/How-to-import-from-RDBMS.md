---
id: how-to-import-from-rdbms
title: How to import from RDBMS
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

This demo shows how to import data from a MySQL database. The database format must be "Edge List", basically a table for nodes and a table for edges. See [ImportAPI](http://gephi.org/docs/api/org/gephi/io/importer/api/package-summary.html) documentation also.

To be found by the importer, you need to have following columns:
* Nodes: ID and LABEL
* Edges: SOURCE, TARGET and WEIGHT
* Any other column will be imported as attributes. Other recognized columns are X, Y and SIZE for nodes and ID and LABEL for edges.

A possible toolkit use-case is a layout server. Therefore this demo layout the network imported from the database, layout it and update X, Y columns to the database.

```java
//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Get controllers and models
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
AttributeModel attributeModel = Lookup.getDefault().lookup(AttributeController.class).getModel();
 
//Import database
EdgeListDatabaseImpl db = new EdgeListDatabaseImpl();
db.setDBName("test");
db.setHost("localhost");
db.setUsername("root");
db.setPasswd("");
db.setSQLDriver(new MySQLDriver());
//db.setSQLDriver(new PostgreSQLDriver());
//db.setSQLDriver(new SQLServerDriver());
db.setPort(3306);
db.setNodeQuery("SELECT nodes.id AS id, nodes.label AS label, nodes.url FROM nodes");
db.setEdgeQuery("SELECT edges.source AS source, edges.target AS target, edges.name AS label, edges.weight AS weight FROM edges");
ImporterEdgeList edgeListImporter = new ImporterEdgeList();
Container container = importController.importDatabase(db, edgeListImporter);
container.setAllowAutoNode(false);      //Don't create missing nodes
container.getLoader().setEdgeDefault(EdgeDefault.UNDIRECTED);   //Force UNDIRECTED
 
//Append imported data to GraphAPI
importController.process(container, new DefaultProcessor(), workspace);
 
//See if graph is well imported
UndirectedGraph graph = graphModel.getUndirectedGraph();
System.out.println("Nodes: " + graph.getNodeCount());
System.out.println("Edges: " + graph.getEdgeCount());
 
//Layout - 100 Yifan Hu passes
YifanHuLayout layout = new YifanHuLayout(null, new StepDisplacement(1f));
layout.setGraphModel(graphModel);
layout.resetPropertiesValues();
layout.initAlgo();
for (int i = 0; i < 100 && layout.canAlgo(); i++) {
    layout.goAlgo();
}
layout.endAlgo();
 
//Export X, Y position to the DB
//Connect database
String url = SQLUtils.getUrl(db.getSQLDriver(), db.getHost(), db.getPort(), db.getDBName());
Connection connection = null;
try {
    //System.err.println("Try to connect at " + url);
    connection = db.getSQLDriver().getConnection(url, db.getUsername(), db.getPasswd());
    //System.err.println("Database connection established");
} catch (SQLException ex) {
    if (connection != null) {
try {
    connection.close();
    System.err.println("Database connection terminated");
} catch (Exception e) { /* ignore close errors */ }
    }
    System.err.println("Failed to connect at " + url);
    ex.printStackTrace(System.err);
}
if (connection == null) {
    System.err.println("Failed to connect at " + url);
}
 
//Update
int count = 0;
for (Node node : graph.getNodes().toArray()) {
    String id = node.getNodeData().getId();
    float x = node.getNodeData().x();
    float y = node.getNodeData().y();
 
    String query = "UPDATE " + db.getDBName() + ".nodes SET x = '" + x + "', y = '" + y + "' WHERE nodes.id='" + id+"'";
    try {
        Statement s = connection.createStatement();
        count += s.executeUpdate(query);
        s.close();
 
    } catch (SQLException e) {
        System.err.println("Failed to update line node id = " + id);
    }
}
System.err.println(count + " rows were updated");
 
//Close connection
if (connection != null) {
    try {
        connection.close();
        //System.err.println("Database connection terminated");
    } catch (Exception e) { /* ignore close errors */ }
}
```