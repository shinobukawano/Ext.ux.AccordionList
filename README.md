# Ext.ux.AccordionList

Sencha Touch 2 custom component.

Collapsible List with using Ext.data.TreeStore. You can expand and collapse contents by header item tap. Also it can nested infinity.

[![1](image1.png)](https://raw.github.com/kawanoshinobu/Ext.ux.AccordionList/master/image1.png)

[![2](image2.png)](https://raw.github.com/kawanoshinobu/Ext.ux.AccordionList/master/image2.png)

[![3](image3.png)](https://raw.github.com/kawanoshinobu/Ext.ux.AccordionList/master/image3.png)

## Demo

- [Ext.ux.AccordionList Example](http://docs.kawanoshinobu.com/accordionlist)

## Document

- [http://docs.kawanoshinobu.com/touch/#!/api/Ext.ux.AccordionList](http://docs.kawanoshinobu.com/touch/#!/api/Ext.ux.AccordionList)
- [Using Ext.ux.AccordionList](http://docs.kawanoshinobu.com/touch/#!/guide/accordionlist)

## Getting Started

### Initialization

Place the 'ux' folder somewhere within your application, then add the following to your app (at the top of 'app.js' is a good place):

    Ext.Loader.setPath({
        'Ext': 'touch/src',
        'MyApp': 'app',
        'Ext.ux': 'ux'
    });

Adjust './ux' to wherever you actually placed the 'ux' folder.

Then in whatever component you wish to use the view, add:

    requires = [
        'Ext.ux.AccordionList',
    ]

If you use default design, import _accordionlist.scss and include accordionlist mixin.

    // app.scss
    @import 'stylesheets/accordionlist';
    @include accordionlist;

Before build with Sencha Cmd, you must define "${add.dir}/ux" to sencha.cfg:

    app.classpath=${app.dir}/app.js,${app.dir}/ux,${app.dir}/app

### Example

Execute the following command in the sources root directory

    sencha ant -f project.xml initialize

Then to place example directory to server's application directory.

## Version

1.0

## Change log

[2013-05-05] **v1.0.0** KAWANO Shinobu (kawanoshinobu)

* Update for Sencha Touch 2.2
* Refactoring code
* Add some utility config (headerItemCls, contentItemCls, useSelectedHighlights)
* Add new example
* Created API documentation and Usage Guide.

## license

Copyright (c) 2013 KAWANO Shinobu. This software is licensed under the MIT License.

