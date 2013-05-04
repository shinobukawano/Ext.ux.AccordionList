# Ext.ux.AccordionList

Sencha Touch 2 custom component.

Collapsible List with using Ext.data.TreeStore. You can use expand and collapse contents by header item tap. And also it can nested infinity!

## Demo


## Document

API:

Guide:

## Getting Started

### Initialization

Place the 'ux' folder somewhere within your application, then add the following to your app (at the top of 'app.js' is a good place)::

    Ext.Loader.setPath({
        'Ext': 'touch/src',
        'Ext.ux': 'ux',
        'AccordionListExample': 'app'
    });

Adjust './ux' to wherever you actually placed the 'ux' folder.

Then in whatever component you wish to use the view, add::

    requires = [
        'Ext.ux.AccordionList',
    ]

Before build package, you must define "${add.dir}/ux" to sencha.cfg::

    app.classpath=${app.dir}/app.js,${app.dir}/ux,${app.dir}/app

### Example

Execute the following command in the sources root directory

    <pre>sencha ant -f project.xml initialize</pre>

Then to place example directory to server's application directory.

## license

Copyright (c) 2013 Shinobu Kawano. This software is licensed under the MIT License.

