{
    "classAlias": "widget.accordionlist",
    "className" : "Ext.ux.AccordionList",
    "inherits"  : "container",
    "autoName"  : "MyAccordionList",

    "toolbox"   : {
        "name"    : "AccordionList",
        "category": "Views",
        "groups"  : ["Views"]
    },

    //add custom configs
    configs   : [
        {
            name        : 'store',
            type        : 'store',
            initialValue: null
        },
        {
            name        : 'displayField',
            type        : 'string',
            initialValue: 'text'
        },
        {
            name        : 'headerOpenTpl',
            type        : 'string',
            initialValue: '<div class="down"></div><div>{0}</div>'
        },
        {
            name        : 'headerCloseTpl',
            type        : 'string',
            hidden      : false,
            initialValue: '<div class="right"></div><div>{0}</div>'
        },
        {
            name        : 'contentItemTpl',
            type        : 'string',
            initialValue: '{0}'
        },
        {
            name        : 'listConfig',
            type        : 'object',
            initialValue: null
        },
        {
            name        : 'defaultExpanded',
            type        : 'boolean',
            initialValue: false
        },
        {
            name        : 'useSelectedHighlights',
            type        : 'boolean',
            initialValue: true
        },
        {
            name        : 'singleMode',
            type        : 'boolean',
            initialValue: false
        },
        {
            name        : 'animation',
            type        : 'boolean',
            initialValue: false
        },
        {
            name        : 'showCount',
            type        : 'boolean',
            initialValue: false
        },
        {
            name        : 'indent',
            type        : 'boolean',
            initialValue: false
        },
        {
            name        : 'useComponents',
            type        : 'boolean',
            initialValue: false
        },
        {
            name        : 'defaultType',
            type        : 'string',
            initialValue: ''
        },
        {
            name        : 'indexBar',
            type        : 'object',
            initialValue: null
        }
    ],

    //define listeners
    listeners : [],

}
