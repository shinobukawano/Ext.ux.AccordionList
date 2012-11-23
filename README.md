Ext.ux.AccordionList
=======

Accordion list with using Ext.data.TreeStore. You can use expand and collapse contents by header item tap. And also it can nested infinity!

about
-----

This is Senca Touch 2 custom component.

To see a current working demo, visit http://accordionlist.senchafy.com on a mobile device or Google Chrome or Safari.

Getting Started
---------------

All you need to do is place the 'ux' folder somewhere within your application, then add the following to your app (at the top of 'app.js' is a good place)::

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

For a more complete example, see `app/view/Main.js`.

2.1 with Sencha Cmd
-------------------

Before build package, you must define "${add.dir}/ux" to sencha.cfg

    app.classpath=${app.dir}/app.js,${app.dir}/ux,${app.dir}/app

license
-------

Copyright (c) 2012 Shinobu Kawano. This software is licensed under the MIT License.

