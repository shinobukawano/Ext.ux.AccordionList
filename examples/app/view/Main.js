Ext.define('AccordionListExample.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.SegmentedButton',
        'Ext.ux.AccordionList',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh'
    ],
    config: {
        tabBarPosition: 'bottom',
        tabBar: {
            scrollable : 'horizontal'
        },
        items: [
            {
                xtype: 'titlebar',
                title: 'Accordion List Example',
                docked: 'top'
            },
            {
                title: 'Basic',
                iconCls: 'list',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'segmentedbutton',
                                itemId: 'basic',
                                centered: true,
                                items: [
                                    {
                                        text: 'Expand',
                                        action: 'expand'
                                    },
                                    {
                                        text: 'Collapse',
                                        action: 'collapse'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'accordionlist',
                        store: Ext.create('AccordionListExample.store.Task'),
                        flex: 1,
                        itemId: 'basic',
                        listeners: {
                            initialize: function() {
                                this.load();
                            }
                        }
                    }
                ],
                control: {
                    'button[action=expand]': {
                        tap: function() {
                            this.down('accordionlist').doAllExpand();
                        }
                    },
                    'button[action=collapse]': {
                        tap: function() {
                            this.down('accordionlist').doAllCollapse();
                        }
                    }
                }
            },
            {
                title: 'Decorate',
                iconCls: 'star',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'segmentedbutton',
                                itemId: 'decorate',
                                centered: true,
                                items: [
                                    {
                                        text: 'Expand',
                                        action: 'expand'
                                    },
                                    {
                                        text: 'Collapse',
                                        action: 'collapse'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'accordionlist',
                        store: Ext.create('AccordionListExample.store.Task'),
                        flex: 1,
                        singleMode: true,
                        animation: true,
                        animationDuration: 500,
                        showCount: true,
                        indent: true,
                        itemId: 'decorate',
                        listeners: {
                            initialize: function() {
                                this.load();
                            }
                        }
                    }
                ],
                control: {
                    'button[action=expand]': {
                        tap: function() {
                            this.down('accordionlist').doAllExpand();
                        }
                    },
                     'button[action=collapse]': {
                        tap: function() {
                            this.down('accordionlist').doAllCollapse();
                        }
                    }
                }
            },
            {
                title: 'Nested',
                iconCls: 'chart',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'segmentedbutton',
                                itemId: 'nested',
                                centered: true,
                                items: [
                                    {
                                        text: 'Expand',
                                        action: 'expand'
                                    },
                                    {
                                        text: 'Collapse',
                                        action: 'collapse'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'accordionlist',
                        store: Ext.create('AccordionListExample.store.PL'),
                        headerItemTpl: [
                            '<tpl if="this.isExpanded(values)">',
                                '<div class="down"></div>',
                                '<div <tpl if="values.year">style="font-style:italic;"</tpl>>',
                                '{text}</div>',
                            '<tpl else>',
                                '<div class="right"></div>',
                                '<div <tpl if="values.year">style="font-style:italic;"</tpl>>',
                                '{text}</div>',
                            '</tpl>'
                        ].join(''),
                        contentItemTpl: [
                            '<div style="display:-webkit-box;width:100%;text-align:right;">',
                                '<div style="width:20%;"></div>',
                                '<div style="-webkit-box-flex:1;color:#3F51B5">${sales}</div>',
                                '<div style="-webkit-box-flex:1;color:#f44336;">${expenses}</div>',
                                '<div style="-webkit-box-flex:1;color:#009688;">${profits}</div>',
                            '</div>'
                        ].join(''),
                        useSelectedHighlights: false,
                        showCount: true,
                        animation: true,
                        indent: true,
                        animationDuration: 300,
                        flex: 1,
                        itemId: 'nested',
                        listeners: {
                            initialize: function() {
                                this.load();
                                this.addCls('PL-view');
                            }
                        }
                    }
                ],
                control: {
                    'button[action=expand]': {
                        tap: function() {
                            this.down('accordionlist').doAllExpand();
                        }
                    },
                     'button[action=collapse]': {
                        tap: function() {
                            this.down('accordionlist').doAllCollapse();
                        }
                    }
                }
            },
            {
                title: 'Paging',
                iconCls: 'bird',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'accordionlist',
                        store: Ext.create('AccordionListExample.store.BigTask'),
                        listConfig: {
                            plugins: [
                                {
                                    xclass: 'Ext.plugin.ListPaging',
                                    autoPaging: true
                                },
                                {
                                    xclass: 'Ext.plugin.PullRefresh',
                                    pullText: 'Pull down for more data!'
                                }
                            ]
                        },
                        flex: 1,
                        itemId: 'paging',
                        listeners: {
                            initialize: function() {
                                this.load();
                            }
                        }
                    }
                ],
                control: {
                    'button[action=expand]': {
                        tap: function() {
                            this.down('accordionlist').doAllExpand();
                        }
                    },
                     'button[action=collapse]': {
                        tap: function() {
                            this.down('accordionlist').doAllCollapse();
                        }
                    }
                }
            },
            {
                title: 'Components',
                iconCls: 'box',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'segmentedbutton',
                                itemId: 'components',
                                centered: true,
                                items: [
                                    {
                                        text: 'Expand',
                                        action: 'expand'
                                    },
                                    {
                                        text: 'Collapse',
                                        action: 'collapse'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'accordionlist',
                        store: Ext.create('AccordionListExample.store.Components'),
                        flex: 1,
                        indent: true,
                        useComponents: true,
                        defaultType: 'examplelistitem',
                        itemId: 'components',
                        listeners: {
                            initialize: function() {
                                this.load();
                                this.addCls('components-view');
                            }
                        }
                    }
                ],
                control: {
                    'button[action=expand]': {
                        tap: function() {
                            this.down('accordionlist').doAllExpand();
                        }
                    },
                     'button[action=collapse]': {
                        tap: function() {
                            this.down('accordionlist').doAllCollapse();
                        }
                    }
                }
            },
            {
                title: 'Grouped',
                iconCls: 'user',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'segmentedbutton',
                                itemId: 'grouped',
                                centered: true,
                                items: [
                                    {
                                        text: 'Expand',
                                        action: 'expand'
                                    },
                                    {
                                        text: 'Collapse',
                                        action: 'collapse'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'accordionlist',
                        store: Ext.create('AccordionListExample.store.Grouped'),
                        flex: 1,
                        showCount: true,
                        indent: true,
                        itemId: 'grouped',
                        indexBar: {
                            margin:1,
                            listeners: {
                                index: function (html, target, eOpts) {
                                    console.log('inside indexbar', target);
                                }
                            }
                        }
                        // XXX: This is very very slow...
                        // listeners: {
                        //     initialize: function() {
                        //         this.load();
                        //     }
                        // }
                    }
                ],
                control: {
                    'button[action=expand]': {
                        tap: function() {
                            this.down('accordionlist').doAllExpand();
                        }
                    },
                     'button[action=collapse]': {
                        tap: function() {
                            this.down('accordionlist').doAllCollapse();
                        }
                    }
                }
            }
        ],
        listeners: {
            // XXX: For grouped accordionList
            activeitemchange: function(self, newItem) {
                var me    = this,
                    list  = newItem.down('accordionlist'),
                    store = list.getStore();

                if (store.getCount() === 0) {
                    me.setMasked({
                        xtype: 'loadmask'
                    });
                    store.on('load', function() {
                        me.setMasked(false);
                    }, me, { single: true });
                    store.load({
                        callback: function() {
                            list.getList().refresh();
                        }
                    });
                }
            }
        }
    }

});

// If you use index bar, it might be better to override
// Ext.dataview.List scroolToRecord in case of record is empty.
Ext.define('Override.dataview.List', {
    override : 'Ext.dataview.List',
    scrollToRecord: function(record, animate, overscroll) {
        var me = this,
            store = me.getStore(),
            index = store.indexOf(record);

        item = me.listItems[index];

        if (item) {
            me.callParent(arguments);
        }
    }
});

