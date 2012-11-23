Ext.define('AccordionListExample.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.ux.AccordionList',
        'AccordionListExample.store.Task'
    ],
    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'titlebar',
                title: 'Accordion List Sample'
            },
            {
                xtype: 'accordionlist',
                store: Ext.create('AccordionListExample.store.Task'),
                flex: 1
            }
        ]
    }
});
