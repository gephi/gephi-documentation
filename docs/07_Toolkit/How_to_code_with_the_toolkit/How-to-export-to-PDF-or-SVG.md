---
id: how-to-export-to-pdf-or-svg
title: How to export to PDF or SVG
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

## Preview

Preview is the last step before export and allows display customization and aesthetics refinements. It works with the current workspace. The example below shows how to change edge coloring mode, edge thickness and label font size. See [PreviewAPI](http://gephi.org/docs/api/org/gephi/preview/api/package-summary.html) documentation.

```java
//Preview
PreviewModel model = Lookup.getDefault().lookup(PreviewController.class).getModel();
 
PreviewProperties prop = model.getProperties();
prop.putValue(PreviewProperty.SHOW_NODE_LABELS, Boolean.TRUE);
prop.putValue(PreviewProperty.EDGE_COLOR, new EdgeColor(Color.GRAY));
prop.putValue(PreviewProperty.EDGE_THICKNESS, new Float(0.1f));
prop.putValue(PreviewProperty.NODE_LABEL_FONT, prop.getFontValue(PreviewProperty.NODE_LABEL_FONT).deriveFont(8));
```

## Export to PDF

The PDF and SVG exporter works with settings made in Preview. As with all exporters, it is possible to write the result in a Writer or OutputStream. In the exemple below the [PDFExporter](http://gephi.org/docs/toolkit/org/gephi/io/exporter/preview/PDFExporter.html) is retrieved and configured.

```java
//Simple PDF export
ExportController ec = Lookup.getDefault().lookup(ExportController.class);
try {
   ec.exportFile(new File("simple.pdf"));
} catch (IOException ex) {
   ex.printStackTrace();
   return;
}
 
//PDF Exporter config and export to Byte array
PDFExporter pdfExporter = (PDFExporter) ec.getExporter("pdf");
pdfExporter.setPageSize(PageSize.A0);
ByteArrayOutputStream baos = new ByteArrayOutputStream();
ec.exportStream(baos, pdfExporter);
byte[] pdf = baos.toByteArray();
```