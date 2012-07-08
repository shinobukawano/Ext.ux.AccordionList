Ext.define('ListItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'text',
            type: 'string'
        }]
    }
});

Ext.define("AccordionListExample.view.Main", {
    extend: 'Ext.Container',

    requires: ['Ext.TitleBar', 'Ext.ux.AccordionList'],

    config: {
        layout: 'vbox',
        items: [{
            xtype: 'titlebar',
            title: 'AccordionListExample'
        }, {
            xtype: 'accordionlist',
            height: 500,
            defaultExpanded: false,
            store: Ext.create('Ext.data.TreeStore', {
                defaultRootProperty: 'items',
                model: 'ListItem',
                root: {
                    items: [{
                        text: 'Today',
                        items: [{
                            text: 'Eat',
                            leaf: true
                        }, {
                            text: 'Sleep',
                            leaf: true
                        }, {
                            text: 'Drinking',
                            leaf: true
                        }]
                    }, {
                        text: 'Tomorrow',
                        items: [{
                            text: 'Watch TV',
                            leaf: true
                        }, {
                            text: 'Watch Video',
                            leaf: true
                        }]
                    }, {
                        text: 'This week',
                        items: [{
                            text: 'Shopping',
                            leaf: true
                        }]
                    }, {
                        text: 'Later',
                        items: [{
                            text: 'Study',
                            items: [{
                                text: 'Eat',
                                leaf: true
                            }, {
                                text: 'Sleep',
                                leaf: true
                            }, {
                                text: 'Drinking',
                                leaf: true
                            }]
                        }]
                    }]
                }
            })
        }]
    }
});