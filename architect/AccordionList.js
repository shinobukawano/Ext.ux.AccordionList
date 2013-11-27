{
    "className" : "Ext.ux.AccordionList",
    "classAlias": "widget.accordionlist",
    "inherits"  : "container",
    "autoName"  : "MyAccordionList",
    "noSetup"   : true,

    "toolbox"   : {
        "name"    : "AccordionList",
        "category": "Views",
        "groups"  : ["Views"]
    },

    //add custom configs
    configs   : [
        {
            name        : 'store',
            type        : 'object',
            hidden      : false,
            initialValue: 'YourTreeStoreInstance',
            merge       : false
        },
        {
            name        : 'displayField',
            type        : 'string',
            hidden      : false,
            initialValue: 'text',
            merge       : false
        },
        {
            name        : 'headerOpenTpl',
            type        : 'string',
            hidden      : false,
            initialValue: '<div class="down"></div><div>{0}</div>',
            merge       : false
        },
        {
            name        : 'headerCloseTpl',
            type        : 'string',
            hidden      : false,
            initialValue: '<div class="right"></div><div>{0}</div>',
            merge       : false
        },
        {
            name        : 'contentItemTpl',
            type        : 'string',
            hidden      : false,
            initialValue: '{0}',
            merge       : false
        },
        {
            name        : 'listConfig',
            type        : 'object',
            hidden      : false,
            initialValue: null,
            merge       : false
        },
        {
            name        : 'defaultExpanded',
            type        : 'boolean',
            hidden      : false,
            initialValue: false,
            merge       : false
        },
        {
            name        : 'useSelectedHighlights',
            type        : 'boolean',
            hidden      : false,
            initialValue: true,
            merge       : false
        },
        {
            name        : 'singleMode',
            type        : 'boolean',
            hidden      : false,
            initialValue: false,
            merge       : false
        },
        {
            name        : 'animation',
            type        : 'boolean',
            hidden      : false,
            initialValue: false,
            merge       : false
        },
        {
            name        : 'showCount',
            type        : 'boolean',
            hidden      : false,
            initialValue: false,
            merge       : false
        },
        {
            name        : 'indent',
            type        : 'boolean',
            hidden      : false,
            initialValue: false,
            merge       : false
        },
        {
            name        : 'useComponents',
            type        : 'boolean',
            hidden      : false,
            initialValue: false,
            merge       : false
        },
        {
            name        : 'defaultType',
            type        : 'string',
            hidden      : false,
            initialValue: '',
            merge       : false
        },
        {
            name        : 'indexBar',
            type        : 'object',
            hidden      : false,
            initialValue: null,
            merge       : false
        }
    ],

    //define listeners
    listeners : [],

}
