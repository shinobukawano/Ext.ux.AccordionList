{
    "className" : "Ext.ux.AccordionListItem",
    "classAlias": "widget.accordionlistitem",
    "inherits"  : "Ext.dataview.component.ListItem",
    "autoName"  : "MyAccordionListItem",
    "noSetup"   : true,

    "toolbox"   : {
        "name"    : "AccordionListItem",
        "category": "Views",
        "groups"  : ["Views"]
    },

    //add custom configs
    configs   : [
        {
            name        : 'headerDataMap',
            type        : 'object',
            hidden      : false,
            initialValue: {},
            merge       : false
        },
        {
            name        : 'contentDataMap',
            type        : 'object',
            hidden      : false,
            initialValue: {},
            merge       : false
        },
        {
            name        : 'indent',
            type        : 'boolean',
            hidden      : false,
            initialValue: false,
            merge       : false
        }
    ],

    //define listeners
    listeners : []
}
