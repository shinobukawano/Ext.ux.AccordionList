Ext.define("AccordionListExample.view.Main", {
    extend: 'Ext.Container',

    requires: [
        'Ext.TitleBar',
        'Ext.ux.AccordionList'
    ],

    config: {
        layout: 'vbox',
        items: [{
            xtype: 'titlebar',
            title: 'AccordionListExample'
        }, {
            xtype: 'accordionlist',
            flex: 1,
            defaultExpanded: true,
            store: Ext.create('AccordionListExample.store.ListItems')
        }]
    }
});
