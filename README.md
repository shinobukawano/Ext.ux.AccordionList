# Ext.ux.AccordionList

Custom component for Sencha Touch 2.

Collapsible List with Ext.data.TreeStore. You can expand and collapse the contents by header item tap. Also it can nest infinitely.

    Note:
    Do you want to implement the accordion list feature in Ext JS 6 modern toolkit?

    Umm.. this component doesn't support Ext JS 6.
    But no worries! You can use a similar feature by 'treelist' component.

    Let's try it at Kitchen sink. :)
    http://examples.sencha.com/extjs/6.0.0/examples/kitchensink/?profile=modern-triton#demo/tree-list

This component was introduced at [Sencha Insight #6](http://us6.campaign-archive2.com/?u=35c628e5bf74b167e4791ffb8&id=f36913f231)

![eyecatch](https://raw.github.com/kawanoshinobu/Ext.ux.AccordionList/master/resources/eyecatch.png)

## Demo

- [Ext.ux.AccordionList Example](http://kawanoshinobu.com/public/demo/accordionlist/)

## Document

- [Ext.ux.AccordionList Document](http://kawanoshinobu.com/public/demo/docs.accordionlist/)

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

Before build with Sencha Cmd, you must define "${add.dir}/../src/ux" to sencha.cfg:

    app.classpath=${app.dir}/app.js,${app.dir}/../src/ux,${app.dir}/app

### Example

Execute the following command in the sources root directory

    sencha ant -f build.xml initialize

Then to place examples directory to server's application directory.

## Integrate into Sencha Architect

If you want to use AccordionList with Architect, please install ‘Ext.ux.AccordionList.aux’. Then you will find this component at Toolbox section. Please drag component to design area, that’s all.

**NOTE** You can check the usage project with installing /architect/accordionListSample.xda to the Architect. To tell you the truth, it requires a little bit hacking.. You need to set store instance at initialize event handler because Architect does not support to use TreeStore at user extensions config.

![architect](https://raw.github.com/kawanoshinobu/Ext.ux.AccordionList/master/resources/architect.png)

## Test

You can execute Siesta based unit test. To run the test, install this project into where the web server can serve your apps, and access to http://localhost/Ext.ux.AccordionList/tests from browser.

![siesta](https://raw.github.com/kawanoshinobu/Ext.ux.AccordionList/master/resources/siesta.png)

## useComponents

You can add component into header item and content item. In first, you must create a class which extends "Ext.ux.AccordionListItem". Then, define dataMap for header item and content item. Way of define is same to dataMap of Ext.dataview.DataItem.

    Ext.define('AccordionListExample.view.ListItem', {
        extend: 'Ext.ux.AccordionListItem',
        xtype : 'examplelistitem',

        config: {
            ...

            headerDataMap: {
                getText: {
                    setHtml: 'text'
                },
                getButton: {
                    setIconCls: 'icon'
                }
            },
            contentDataMap: {
                getLimit: {
                    setValue: 'limit'
                },
                getMessage: {
                    setValue: 'message'
                }
            }

You created data item class. Next, you specify use this in your view config.

            {
                xtype: 'accordionlist',
                store: Ext.create('AccordionListExample.store.Components'),
                flex: 1,
                indent: true,

                // Specify useComponents.
                useComponents: true,
                // Specify data item's xtype you created.
                defaultType: 'examplelistitem',

                listeners: {
                    initialize: function() {
                        this.load();
                    }
                }
            }

That's ok. Accordion List appears components bound items. You can check it at example site.

## Version

1.1.1

## Change log

[2015-05-01] **v1.1.1** Shinobu Kawano (kawanoshinobu)

* Update for Sencha Touch 2.4.0
* Update for Sencha Architect 3.2
* Fixed the animation bug occurs in nested items

[2013-11-27] **v1.1.0** Shinobu Kawano (kawanoshinobu)

* Update for Sencha Touch 2.3.1
* Add paging and pull refresh feature
* Add bind component feature
* Add grouping and index bar feature
* Add indent feature
* Add some config to integrate into Sencha Architect
* Change test tool, Jasmine to Siesta

[2013-06-15] **v1.0.1** Shinobu Kawano (kawanoshinobu)

* Add singleMode feature
* Add animation feature
* Add showCount feature
* Add new example (decorate)

[2013-05-05] **v1.0.0** Shinobu Kawano (kawanoshinobu)

* Update for Sencha Touch 2.2
* Refactoring code
* Add some utility config (headerItemCls, contentItemCls, useSelectedHighlights)
* Add new example
* Add Jasmine and Phantomjs based unit test
* Created API documentation

## license

Copyright (c) 2015 KAWANO Shinobu. This software is licensed under the MIT License.

