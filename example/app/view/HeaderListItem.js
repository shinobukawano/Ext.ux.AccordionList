/**
 * @class AccordionListExample.view.HeaderListItem
 * @extends Ext.dataview.component.ListItem
 */
Ext.define('AccordionListExample.view.HeaderListItem', {
    extend: 'Ext.dataview.component.ListItem',
    xtype: 'headerlistitem',
    config: {
        dataMap: {
            getText: {
                setHtml: 'text'
            }
        },
        text: {
            cls: 'text'
        },
        layout: {
            type: 'vbox'
        }
    },

    applyText: function(config) {
        return Ext.factory(config, Ext.Component);
    },

    updateText: function(newName) {
        if (newName) {
            this.add(newName);
        }
    }

});
