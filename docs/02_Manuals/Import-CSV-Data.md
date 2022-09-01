---
id: import-csv-data
title: Import CSV Data
---

## Introduction

This manual shows what steps are necessary to import CSV files into Gephi with data laboratory, which will expect that each row of the file is a node or an edge.

Note that the import can be done at any moment, the workspace does not need to be empty. You should know some general aspects of the import process: 


- You may choose which columns to import. The only exceptions are 'Source' and 'Target' for edges tables, which are mandatory and can't be deselected
- If a column title already exists in the workspace you will be able to use it but the data type of the column can't be changed, and imported data will be parsed to fit the existing column type
- Data for each row and column will be parsed to the given/existing column data type when possible. If this is not possible for a given cell, then it will be set to a null value
- You can choose what table to import the rows to (nodes or edges), but the behaviour and requirements are different. Be aware of what options you have selected before executing the import process

Next we'll learn how to use the import wizard to customize the data to our needs based on the options available. 

## Launching the import CSV wizard and first step

Start by clicking 'Import CSV' button in Data Laboratory as shown in the picture 

![launch-import-csv-wizard](https://cloud.githubusercontent.com/assets/197285/5621089/42079e06-9532-11e4-8060-c8331475fad6.png)

Then the import wizard will open and you are presented with some generic, table independent options. 

![import-csv-step1](https://cloud.githubusercontent.com/assets/197285/5621090/4c450e1c-9532-11e4-98f1-f14a5f17b55f.png)

In this step you will indicate the format of the CSV file and can preview the resulting table.

- First specify a CSV file that is not empty
- Then choose the values separator from some common options and the encoding/charset of the file
- Finally select the table to import the rows and columns of the file. Edges table files require, at minimum, columns labeled 'Source' and 'Target' (which can be case insensitive)

## Last step - Choosing columns details and table specific options

This final step offers some common options and behaviour descriptions for both nodes tables or edges tables:

- You can mark what columns to use and select their type when they don't exist yet
- If no node/edge Id column is provided or it is empty for some row, an automatic id will be assigned

### Importing to nodes table

When importing to nodes table you can also indicate if you want to update a node's data instead of creating a new node when a node with that id already exists.

![import-csv-step2-nodes](https://cloud.githubusercontent.com/assets/197285/5621094/520d375c-9532-11e4-9779-a77ee3474fa3.png)

### Importing to edges table

In case of importing to edges table, the behaviour is a bit different:

- 'Source' and 'Target' node Ids are mandatory for all rows
- Edge type is optional and its default is 'Directed'

![import-csv-step2-edges](https://cloud.githubusercontent.com/assets/197285/5621096/5661d20e-9532-11e4-8c8d-e3dcfb779c70.png)