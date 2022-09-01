---
id: how-to-use-ranking
title: How to use ranking
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

The demo shows how to do ranking, transform colors and size according to degree or attribute values. See also [RankingAPI](http://gephi.org/docs/api/org/gephi/ranking/api/package-summary.html) documentation (uncommented).
The following ranking are applied to the imported network:
* Rank node colors by degree
* Rank node size by Betweenness Centrality metric
* Rank label size by Betweenness Centrality

An interpolation can be set to transformers, see `setInterpolator()` on transformers.

```java
//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Get controllers and models
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
AttributeModel attributeModel = Lookup.getDefault().lookup(AttributeController.class).getModel();
 
//Import file
Container container;
try {
    File file = new File(getClass().getResource("/org/gephi/toolkit/demos/resources/lesmiserables.gml").toURI());
    container = importController.importFile(file);
    container.getLoader().setEdgeDefault(EdgeDefault.DIRECTED);   //Force DIRECTED
} catch (Exception ex) {
    ex.printStackTrace();
    return;
}
 
//Append imported data to GraphAPI
importController.process(container, new DefaultProcessor(), workspace);
 
//See if graph is well imported
DirectedGraph graph = graphModel.getDirectedGraph();
System.out.println("Nodes: " + graph.getNodeCount());
System.out.println("Edges: " + graph.getEdgeCount());
 
//Rank color by Degree
RankingController rankingController = Lookup.getDefault().lookup(RankingController.class);
Ranking degreeRanking = rankingController.getModel().getRanking(Ranking.NODE_ELEMENT, Ranking.DEGREE_RANKING);
AbstractColorTransformer colorTransformer = (AbstractColorTransformer) rankingController.getModel().getTransformer(Ranking.NODE_ELEMENT, Transformer.RENDERABLE_COLOR);
 
colorTransformer.setColors(new Color[]{new Color(0xFEF0D9), new Color(0xB30000)});
rankingController.transform(degreeRanking,colorTransformer);
 
//Get Centrality
GraphDistance distance = new GraphDistance();
distance.setDirected(true);
distance.execute(graphModel, attributeModel);
 
//Rank size by centrality
AttributeColumn centralityColumn = attributeModel.getNodeTable().getColumn(GraphDistance.BETWEENNESS);
Ranking centralityRanking = rankingController.getModel().getRanking(Ranking.NODE_ELEMENT, centralityColumn.getId());
AbstractSizeTransformer sizeTransformer = (AbstractSizeTransformer) rankingController.getModel().getTransformer(Ranking.NODE_ELEMENT, Transformer.RENDERABLE_SIZE);
sizeTransformer.setMinSize(3);
sizeTransformer.setMaxSize(20);
rankingController.transform(centralityRanking,sizeTransformer);
 
//Rank label size - set a multiplier size
Ranking centralityRanking2 = rankingController.getModel().getRanking(Ranking.NODE_ELEMENT, centralityColumn.getId());
AbstractSizeTransformer labelSizeTransformer = (AbstractSizeTransformer) rankingController.getModel().getTransformer(Ranking.NODE_ELEMENT, Transformer.LABEL_SIZE);
labelSizeTransformer.setMinSize(1);
labelSizeTransformer.setMaxSize(3);
rankingController.transform(centralityRanking2,labelSizeTransformer);
```

To do a ranking with more than 2 colors you can define positions where the color changes and define the corresponding colors. Note that the values are normalised from 0..1. The following example lets colors change from blue over white over green to red for the intervals from 0.0..0.33..0.66..1.0

```java
float[] positions = {0f,0.33f,0.66f,1f};
colorTransformer.setColorPositions(positions);
Color[] colors = new Color[]{new Color(0x0000FF), new Color(0xFFFFFF),new Color(0x00FF00),new Color(0xFF0000)};
colorTransformer.setColors(colors);
```

Note that the final label size can also be influenced by the 'Proportional to node size' option. Disable it for having only the ranking output:

```java
PreviewModel previewModel = Lookup.getDefault().lookup(PreviewController.class).getModel();
previewModel.getProperties().putValue(PreviewProperty.SHOW_NODE_LABELS, Boolean.TRUE);
previewModel.getProperties().putValue(PreviewProperty.NODE_LABEL_PROPORTIONAL_SIZE, Boolean.FALSE);
```