Ext.define('AccordionListExample.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.ux.AccordionList'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                xtype: 'titlebar',
                title: 'Accordion List Example',
                docked: 'top'
            },
            {
                title: 'Simple',
                iconCls: 'list',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'accordionlist',
                        store: Ext.create('AccordionListExample.store.Task'),
                        flex: 1
                    }
                ]
            }
        ]
    }
});
